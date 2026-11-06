const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT_DIR = path.resolve(__dirname, '..', '..');
const SETTINGS_PATH = path.join(__dirname, '..', 'data', 'admin_settings.json');

// Memory state for auto-sync queue & status
let autoSyncTimer = null;
let pendingActions = [];
let isSyncing = false;
let lastSyncStatus = {
  success: null,
  timestamp: null,
  message: 'No sync performed yet this session.',
  commitHash: null,
  method: null
};

function getAdminSettings() {
  try {
    if (fs.existsSync(SETTINGS_PATH)) {
      return JSON.parse(fs.readFileSync(SETTINGS_PATH, 'utf8'));
    }
  } catch (e) {}
  return {};
}

function saveAdminSettings(settings) {
  try {
    fs.writeFileSync(SETTINGS_PATH, JSON.stringify(settings, null, 2), 'utf8');
  } catch (e) {
    console.error('Error saving admin settings for git sync:', e);
  }
}

function getGitHubToken() {
  const settings = getAdminSettings();
  return (process.env.GITHUB_TOKEN || process.env.GH_TOKEN || settings.githubToken || '').trim();
}

function getRepoConfig() {
  const settings = getAdminSettings();
  let repo = (process.env.GITHUB_REPO || settings.githubRepo || '').trim();
  if (!repo) {
    // Try to auto-detect from git remote
    try {
      const remoteUrl = execSync('git config --get remote.origin.url', { cwd: ROOT_DIR }).toString().trim();
      const match = remoteUrl.match(/github\.com[:/]([^/]+\/[^/.]+)/);
      if (match) repo = match[1];
    } catch (e) {}
  }
  if (!repo) repo = 'jpportfolio01/JP_PROTFOLIO';
  repo = repo.replace(/^https?:\/\/github\.com\//, '').replace(/\.git$/, '');

  let branch = (settings.githubBranch || process.env.GITHUB_BRANCH || '').trim();
  if (!branch) {
    try {
      branch = execSync('git rev-parse --abbrev-ref HEAD', { cwd: ROOT_DIR }).toString().trim();
      if (branch === 'HEAD') branch = 'main';
    } catch (e) {
      branch = 'main';
    }
  }

  const autoGitSync = settings.autoGitSync !== false; // Default true
  return { repo, branch, autoGitSync };
}

function getGitStatus() {
  let isGitRepo = false;
  let currentBranch = 'main';
  let lastCommit = null;
  let modifiedFiles = [];

  try {
    currentBranch = execSync('git rev-parse --abbrev-ref HEAD', { cwd: ROOT_DIR }).toString().trim();
    const hash = execSync('git rev-parse --short HEAD', { cwd: ROOT_DIR }).toString().trim();
    const msg = execSync('git log -1 --pretty=%B', { cwd: ROOT_DIR }).toString().trim().split('\n')[0];
    const date = execSync('git log -1 --pretty=%cd --date=relative', { cwd: ROOT_DIR }).toString().trim();
    lastCommit = { hash, message: msg, date };
    isGitRepo = true;

    const rawStatus = execSync('git status --porcelain', { cwd: ROOT_DIR }).toString().trim();
    if (rawStatus) {
      modifiedFiles = rawStatus.split('\n').map(l => l.trim()).filter(Boolean);
    }
  } catch (e) {
    // Git might not be in a standard state
  }

  const token = getGitHubToken();
  const { repo, branch, autoGitSync } = getRepoConfig();

  return {
    isGitRepo,
    currentBranch,
    lastCommit,
    modifiedFiles,
    hasUncommittedChanges: modifiedFiles.length > 0,
    hasToken: !!token,
    maskedToken: token ? ('ghp_' + '•'.repeat(16) + token.slice(-4)) : '',
    repo,
    branch,
    autoGitSync,
    isSyncing,
    lastSyncStatus
  };
}

async function commitAndPush(customMessage) {
  if (isSyncing) {
    return {
      success: false,
      error: 'A git sync operation is already in progress. Please wait a moment.'
    };
  }

  const token = getGitHubToken();
  const { repo, branch } = getRepoConfig();

  if (!token) {
    const err = 'No GitHub Personal Access Token configured. Add your token in Admin Settings or Render Environment Variables (GITHUB_TOKEN) to enable automatic cloud persistence.';
    lastSyncStatus = {
      success: false,
      timestamp: new Date().toISOString(),
      message: err,
      commitHash: null,
      method: null
    };
    return { success: false, error: err };
  }

  isSyncing = true;
  const commitMsg = customMessage || `Admin update: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })}`;

  try {
    // 1. Stage modified dynamic files (data, scripts, images, modules)
    const stagePaths = [
      'backend/data/modulesData.js',
      'backend/data/publications.json',
      'backend/data/projects.json',
      'backend/data/team.json',
      'backend/data/vlab_projects.json',
      'backend/data/admin_settings.json',
      'frontend/modulesData.js',
      'frontend/publications.js',
      'frontend/publications.json',
      'frontend/projectsData.js',
      'frontend/projects.json',
      'frontend/team.json',
      'frontend/sql-practice.html',
      'frontend/images/',
      'website/modulesData.js',
      'website/publications.js',
      'website/publications.json',
      'website/projectsData.js',
      'website/projects.json',
      'website/team.json',
      'website/sql-practice.html',
      'website/images/',
      'my-react-app/public/modulesData.js',
      'my-react-app/public/publications.js',
      'my-react-app/public/publications.json',
      'my-react-app/public/projectsData.js',
      'my-react-app/public/projects.json',
      'my-react-app/public/team.json',
      'my-react-app/public/sql-practice.html',
      'my-react-app/public/images/',
      'backend/generate-html.js'
    ];

    stagePaths.forEach(p => {
      try {
        execSync(`git add "${p}"`, { cwd: ROOT_DIR, stdio: 'pipe' });
      } catch (e) {}
    });

    // Check if anything was staged
    let staged = '';
    try {
      staged = execSync('git diff --cached --name-only', { cwd: ROOT_DIR }).toString().trim();
    } catch (e) {}

    if (!staged) {
      isSyncing = false;
      lastSyncStatus = {
        success: true,
        timestamp: new Date().toISOString(),
        message: 'No uncommitted changes detected. Repository is already in sync.',
        commitHash: null,
        method: 'git-cli'
      };
      return {
        success: true,
        message: 'No new changes to commit. Everything is already up to date.'
      };
    }

    // 2. Commit with dedicated Admin author info
    const safeMsg = commitMsg.replace(/"/g, '\\"').replace(/\$/g, '\\$');
    execSync(`git -c user.name="JP Portfolio Admin" -c user.email="admin@juetguna.in" commit -m "${safeMsg}"`, {
      cwd: ROOT_DIR,
      stdio: 'pipe'
    });

    // 3. Authenticated push to GitHub
    const pushUrl = `https://${encodeURIComponent(token)}@github.com/${repo}.git`;

    // Attempt to pull/rebase remote changes first to prevent conflicts
    try {
      execSync(`git pull --rebase "${pushUrl}" ${branch}`, { cwd: ROOT_DIR, stdio: 'pipe' });
    } catch (pullErr) {
      // If rebase fails due to clean/no upstream, continue
    }

    execSync(`git push "${pushUrl}" ${branch}`, { cwd: ROOT_DIR, stdio: 'pipe' });

    const newHash = execSync('git rev-parse --short HEAD', { cwd: ROOT_DIR }).toString().trim();
    isSyncing = false;

    // Trigger deployment hooks if configured (Vercel / Render)
    const deployResults = await triggerDeployHooks();

    lastSyncStatus = {
      success: true,
      timestamp: new Date().toISOString(),
      message: `Committed and pushed successfully to GitHub ${branch} (${newHash})!`,
      commitHash: newHash,
      method: 'git-cli',
      deployHooks: deployResults
    };

    return {
      success: true,
      commitHash: newHash,
      method: 'git-cli',
      deployHooks: deployResults,
      message: `Successfully committed and pushed to GitHub ${repo} [${branch}]!`
    };

  } catch (gitErr) {
    console.warn('Git CLI push failed, trying GitHub REST API fallback:', gitErr.message);

    // Fallback attempt via GitHub REST API
    try {
      const apiResult = await pushViaGitHubApi(token, repo, branch, commitMsg);
      isSyncing = false;
      const deployResults = await triggerDeployHooks();

      lastSyncStatus = {
        success: true,
        timestamp: new Date().toISOString(),
        message: `Committed via GitHub REST API (${apiResult.commitHash || 'API'})`,
        commitHash: apiResult.commitHash || null,
        method: 'github-api',
        deployHooks: deployResults
      };
      return { ...apiResult, deployHooks: deployResults };
    } catch (apiErr) {
      isSyncing = false;
      const combinedError = `Git push failed (${gitErr.message}). API fallback failed: ${apiErr.message}`;
      lastSyncStatus = {
        success: false,
        timestamp: new Date().toISOString(),
        message: combinedError,
        commitHash: null,
        method: null
      };
      return {
        success: false,
        error: combinedError
      };
    }
  }
}

// Trigger configured Vercel or Render Deploy Hooks
async function triggerDeployHooks() {
  const settings = getAdminSettings();
  const vercelHook = (settings.vercelDeployHookUrl || process.env.VERCEL_DEPLOY_HOOK_URL || '').trim();
  const renderHook = (settings.renderDeployHookUrl || process.env.RENDER_DEPLOY_HOOK_URL || '').trim();
  const results = { vercel: null, render: null };

  if (vercelHook) {
    try {
      const res = await fetch(vercelHook, { method: 'POST' });
      const data = await res.json().catch(() => ({}));
      results.vercel = { success: res.ok, status: res.status, data };
      console.log(`[DeployHook] Vercel deploy hook triggered (HTTP ${res.status})`);
    } catch (e) {
      results.vercel = { success: false, error: e.message };
      console.warn(`[DeployHook] Vercel deploy hook error:`, e.message);
    }
  }

  if (renderHook) {
    try {
      const res = await fetch(renderHook, { method: 'POST' });
      const text = await res.text().catch(() => '');
      results.render = { success: res.ok, status: res.status, text };
      console.log(`[DeployHook] Render deploy hook triggered (HTTP ${res.status})`);
    } catch (e) {
      results.render = { success: false, error: e.message };
      console.warn(`[DeployHook] Render deploy hook error:`, e.message);
    }
  }

  return results;
}

// Commit JSON & data files to GitHub via REST API
async function pushViaGitHubApi(token, repo, branch, message) {
  const filesToSync = [
    { localPath: path.join(__dirname, '..', 'data', 'modulesData.js'), remotePath: 'backend/data/modulesData.js' },
    { localPath: path.join(__dirname, '..', '..', 'frontend', 'modulesData.js'), remotePath: 'frontend/modulesData.js' },
    { localPath: path.join(__dirname, '..', '..', 'website', 'modulesData.js'), remotePath: 'website/modulesData.js' },

    { localPath: path.join(__dirname, '..', 'data', 'publications.json'), remotePath: 'backend/data/publications.json' },
    { localPath: path.join(__dirname, '..', '..', 'frontend', 'publications.json'), remotePath: 'frontend/publications.json' },
    { localPath: path.join(__dirname, '..', '..', 'website', 'publications.json'), remotePath: 'website/publications.json' },

    { localPath: path.join(__dirname, '..', 'data', 'projects.json'), remotePath: 'backend/data/projects.json' },
    { localPath: path.join(__dirname, '..', '..', 'frontend', 'projects.json'), remotePath: 'frontend/projects.json' },
    { localPath: path.join(__dirname, '..', '..', 'website', 'projects.json'), remotePath: 'website/projects.json' },

    { localPath: path.join(__dirname, '..', 'data', 'team.json'), remotePath: 'backend/data/team.json' },
    { localPath: path.join(__dirname, '..', '..', 'frontend', 'team.json'), remotePath: 'frontend/team.json' },
    { localPath: path.join(__dirname, '..', '..', 'website', 'team.json'), remotePath: 'website/team.json' },

    { localPath: path.join(__dirname, '..', 'data', 'vlab_projects.json'), remotePath: 'backend/data/vlab_projects.json' },
    { localPath: path.join(__dirname, '..', 'data', 'admin_settings.json'), remotePath: 'backend/data/admin_settings.json' }
  ];

  const headers = {
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
    'User-Agent': 'JUET-Virtual-Lab-Admin'
  };

  // 1. Attempt Atomic Git Trees commit first (1 commit for all files)
  try {
    const refRes = await fetch(`https://api.github.com/repos/${repo}/git/ref/heads/${branch}`, { headers });
    if (refRes.ok) {
      const refData = await refRes.json();
      const latestCommitSha = refData.object.sha;

      const commitRes = await fetch(`https://api.github.com/repos/${repo}/git/commits/${latestCommitSha}`, { headers });
      if (commitRes.ok) {
        const commitData = await commitRes.json();
        const baseTreeSha = commitData.tree.sha;

        const treeItems = [];
        for (const item of filesToSync) {
          if (!fs.existsSync(item.localPath)) continue;
          const content = fs.readFileSync(item.localPath, 'utf8');
          treeItems.push({
            path: item.remotePath,
            mode: '100644',
            type: 'blob',
            content
          });
        }

        if (treeItems.length > 0) {
          const treeRes = await fetch(`https://api.github.com/repos/${repo}/git/trees`, {
            method: 'POST',
            headers,
            body: JSON.stringify({ base_tree: baseTreeSha, tree: treeItems })
          });

          if (treeRes.ok) {
            const treeData = await treeRes.json();
            const newCommitRes = await fetch(`https://api.github.com/repos/${repo}/git/commits`, {
              method: 'POST',
              headers,
              body: JSON.stringify({
                message: `${message} [Atomic Data Sync]`,
                tree: treeData.sha,
                parents: [latestCommitSha]
              })
            });

            if (newCommitRes.ok) {
              const newCommitData = await newCommitRes.json();
              const updateRefRes = await fetch(`https://api.github.com/repos/${repo}/git/refs/heads/${branch}`, {
                method: 'PATCH',
                headers,
                body: JSON.stringify({ sha: newCommitData.sha, force: false })
              });

              if (updateRefRes.ok) {
                const shortSha = newCommitData.sha.substring(0, 7);
                return {
                  success: true,
                  commitHash: shortSha,
                  method: 'github-api-atomic',
                  message: `Successfully synchronized ${treeItems.length} files to GitHub in 1 atomic commit (${shortSha})!`
                };
              }
            }
          }
        }
      }
    }
  } catch (treeErr) {
    console.warn('Atomic Git Tree sync failed, falling back to sequential PUT:', treeErr.message);
  }

  // Fallback: Sequential PUT
  let syncedCount = 0;

  for (const item of filesToSync) {
    if (!fs.existsSync(item.localPath)) continue;
    const content = fs.readFileSync(item.localPath);
    const contentBase64 = content.toString('base64');

    // Get current file sha on GitHub
    let fileSha = null;
    try {
      const getRes = await fetch(`https://api.github.com/repos/${repo}/contents/${item.remotePath}?ref=${branch}`, {
        headers
      });
      if (getRes.ok) {
        const fileData = await getRes.json();
        fileSha = fileData.sha;
      }
    } catch (e) {}

    // Put file to GitHub
    const putBody = {
      message: `${message} [${item.remotePath}]`,
      content: contentBase64,
      branch: branch
    };
    if (fileSha) putBody.sha = fileSha;

    const putRes = await fetch(`https://api.github.com/repos/${repo}/contents/${item.remotePath}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(putBody)
    });

    if (putRes.ok) {
      syncedCount++;
    } else {
      const errJson = await putRes.json().catch(() => ({}));
      console.warn(`Failed to push ${item.remotePath} via API:`, errJson.message || putRes.statusText);
    }
  }

  if (syncedCount > 0) {
    return {
      success: true,
      method: 'github-api',
      message: `Successfully synchronized ${syncedCount} data files directly to GitHub via REST API.`
    };
  } else {
    throw new Error('No files were synchronized via GitHub REST API.');
  }
}

// Queue auto-sync with debouncing
function queueAutoSync(actionName) {
  const { autoGitSync } = getRepoConfig();
  const token = getGitHubToken();

  if (!autoGitSync || !token) {
    // Auto-sync is either disabled or token not yet configured
    return;
  }

  if (actionName) pendingActions.push(actionName);

  if (autoSyncTimer) {
    clearTimeout(autoSyncTimer);
  }

  autoSyncTimer = setTimeout(async () => {
    autoSyncTimer = null;
    const actions = pendingActions.slice();
    pendingActions = [];
    const desc = actions.length > 0 ? actions.join(', ') : 'Admin Portal updates';
    console.log(`[GitSync] Initiating auto-sync for: ${desc}`);
    try {
      const result = await commitAndPush(`Admin Auto-Sync: ${desc}`);
      console.log(`[GitSync] Result:`, result.message || result.error);
    } catch (err) {
      console.error(`[GitSync] Auto-sync failed:`, err.message);
    }
  }, 3500); // 3.5 seconds debounce
}

// Unified Full Data Export
function exportFullData() {
  const modulesPath = path.join(__dirname, '..', 'data', 'modulesData.js');
  const pubPath = path.join(__dirname, '..', 'data', 'publications.json');
  const projectsPath = path.join(__dirname, '..', 'data', 'projects.json');
  const teamPath = path.join(__dirname, '..', 'data', 'team.json');
  const vlabPath = path.join(__dirname, '..', 'data', 'vlab_projects.json');
  const settings = getAdminSettings();

  let modules = [];
  try {
    delete require.cache[require.resolve(modulesPath)];
    modules = require(modulesPath).SQL_MODULES || [];
  } catch (e) {}

  let publications = [];
  try {
    if (fs.existsSync(pubPath)) publications = JSON.parse(fs.readFileSync(pubPath, 'utf8'));
  } catch (e) {}

  let projects = [];
  try {
    if (fs.existsSync(projectsPath)) projects = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));
  } catch (e) {}

  let team = { scholars: [], members: [] };
  try {
    if (fs.existsSync(teamPath)) team = JSON.parse(fs.readFileSync(teamPath, 'utf8'));
  } catch (e) {}

  let vlabProjects = [];
  try {
    if (fs.existsSync(vlabPath)) vlabProjects = JSON.parse(fs.readFileSync(vlabPath, 'utf8'));
  } catch (e) {}

  return {
    platform: 'JUET SQL Virtual Lab & Dr. Jitendra Parmar Portfolio',
    exportedAt: new Date().toISOString(),
    version: '2.0',
    data: {
      modules,
      publications,
      projects,
      team,
      vlabProjects,
      publicSettings: {
        triggerClickCount: settings.triggerClickCount || 8,
        googleClientId: settings.googleClientId || ''
      }
    }
  };
}

module.exports = {
  getGitStatus,
  commitAndPush,
  queueAutoSync,
  getAdminSettings,
  saveAdminSettings,
  exportFullData,
  triggerDeployHooks
};
