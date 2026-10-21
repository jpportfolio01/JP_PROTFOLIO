// Publications Data and Filter Controller for Dr. Jitendra Parmar

var PUBLICATIONS = [
    {
        "id": "j1",
        "type": "journal",
        "title": "Open-world machine learning: Applications, challenges, and opportunities",
        "authors": "J. Parmar, S. S. Chouhan, V. Raychoudhury, and S. S. Rathore",
        "venue": "ACM Computing Surveys (CSUR)",
        "details": "vol. 55, no. 10, pp. 1–37, Feb. 2023, ISSN: 0360-0300",
        "impact": "SCI-Q1 | Impact Factor: 30.4",
        "ranking": "Ranked #1 of 147 in CS Theory",
        "link": "https://doi.org/10.1145/3561381"
    },
    {
        "id": "j2",
        "type": "journal",
        "title": "A machine learning based framework to identify unseen classes in open-world text classification",
        "authors": "J. Parmar, S. S. Chouhan, and V. Raychoudhury",
        "venue": "Information Processing & Management (IP&M)",
        "details": "vol. 60, no. 2, p. 103214, 2023, ISSN: 0306-4573",
        "impact": "SCI-Q1 | Impact Factor: 8.1",
        "ranking": "Elsevier Premier Journal",
        "link": "https://doi.org/10.1016/j.ipm.2022.103214"
    },
    {
        "id": "j3",
        "type": "journal",
        "title": "Systematic literature review on software code smell detection approaches",
        "authors": "P. S. Thakur, S. S. Chouhan, S. S. Rathore, and J. Parmar",
        "venue": "Journal of Systems and Software (JSS)",
        "details": "p. 112784, 2026, ISSN: 0164-1212",
        "impact": "SCI-Q1 | Impact Factor: 4.1",
        "ranking": "Top SE Venue",
        "link": "https://doi.org/10.1016/j.jss.2025.112784"
    },
    {
        "id": "j4",
        "type": "journal",
        "title": "Vaemrs: Variational autoencoder based movie recommender system",
        "authors": "G. Behera, B. K. Swain, R. K. Soni, and J. Parmar",
        "venue": "Journal of Engineering Science & Technology Review",
        "details": "vol. 17, no. 6, 2024, ISSN: 1791-2377",
        "impact": "Scopus Indexed",
        "ranking": null,
        "link": "https://scholar.google.com/citations?user=toHDoiwAAAAJ&hl=en&authuser=1"
    },
    {
        "id": "c1",
        "type": "conference",
        "title": "A survey of machine learning techniques for enhancing scene description in assistive systems",
        "authors": "S. Labhaniya, J. Parmar, S. Pandey, D. Katkade, and D. Mathur",
        "venue": "2025 Eighth International Conference on Image Information Processing (ICIIP)",
        "details": "IEEE, 2025, pp. 407–414",
        "impact": "IEEE Xplore",
        "ranking": null,
        "link": "https://ieeexplore.ieee.org/"
    },
    {
        "id": "c2",
        "type": "conference",
        "title": "Ensemble-based diabetic retinopathy detection using CNN, Random Forest, and AdaBoost",
        "authors": "J. Parmar",
        "venue": "2025 IEEE International Conference on Recent Advances in Computing and Systems (REACS)",
        "details": "IEEE, 2025, pp. 1–6",
        "impact": "IEEE Xplore",
        "ranking": null,
        "link": "https://ieeexplore.ieee.org/"
    },
    {
        "id": "c3",
        "type": "conference",
        "title": "Predictive modeling for chronic kidney disease with machine learning algorithms",
        "authors": "P. J. Barot, J. Parmar, and R. Mishra",
        "venue": "International Conference on Robotics, Control, Automation and Artificial Intelligence (RCAAI)",
        "details": "Springer, 2024, pp. 73–85",
        "impact": "Springer LNNS",
        "ranking": null,
        "link": "https://link.springer.com/"
    },
    {
        "id": "c4",
        "type": "conference",
        "title": "A comprehensive comparative study of breast cancer detection using machine learning techniques to improve diagnosis",
        "authors": "G. Behera, B. K. Swain, J. Parmar, M. Sahu, and B. Panda",
        "venue": "International Conference on Computing, Communication and Learning",
        "details": "Springer, 2024, pp. 151–164",
        "impact": "Springer CCIS",
        "ranking": null,
        "link": "https://link.springer.com/"
    },
    {
        "id": "c5",
        "type": "conference",
        "title": "Identity verification: A decentralized KYC approach using blockchain",
        "authors": "A. Chouke, V. K. Jain, J. Parmar, S. S. P. Shukla, and A. K. Verma",
        "venue": "International Conference on Cyber Warfare, Security and Space Computing",
        "details": "Springer, 2024, pp. 252–264",
        "impact": "Springer Lecture Notes",
        "ranking": null,
        "link": "https://link.springer.com/"
    },
    {
        "id": "c6",
        "type": "conference",
        "title": "Eauthenticate: Enhancing security with machine learning based real-time open-world anti-spoofing method",
        "authors": "O. Delvadia, J. Parmar, P. Gupta, K. L. H. Vardhan, D. Gandhi, and A. K. Verma",
        "venue": "International Conference on Computation of Artificial Intelligence & Machine Learning",
        "details": "Springer, 2024, pp. 305–318",
        "impact": "Springer",
        "ranking": null,
        "link": "https://link.springer.com/"
    },
    {
        "id": "c7",
        "type": "conference",
        "title": "Active learning framework for anomaly detection in astronomical data",
        "authors": "G. H. S. Dixit, J. Parmar, A. K. Verma, R. Mishra, and G. Behera",
        "venue": "2024 15th International Conference on Computing Communication and Networking Technologies (ICCCNT)",
        "details": "IEEE, 2024, pp. 1–8",
        "impact": "IEEE Xplore",
        "ranking": null,
        "link": "https://ieeexplore.ieee.org/"
    },
    {
        "id": "c8",
        "type": "conference",
        "title": "DisEvd: A benchmark dataset for disruptive event identification from online social network",
        "authors": "A. Seetha, J. Parmar, S. S. Chouhan, E. S. Pilli, and A. Jain",
        "venue": "International Conference on Big Data Analytics (BDA)",
        "details": "Springer, 2024, pp. 55–74",
        "impact": "Springer LNCS",
        "ranking": null,
        "link": "https://link.springer.com/"
    },
    {
        "id": "c9",
        "type": "conference",
        "title": "Open-world machine learning for unknown class identification in human-machine interaction systems",
        "authors": "J. Parmar and S. S. Chouhan",
        "venue": "10th International Conference on Frontiers in Intelligent Computing: Theory and Applications (FICTA)",
        "details": "Springer, 2023, pp. 335–343",
        "impact": "Springer Smart Innovation",
        "ranking": null,
        "link": "https://link.springer.com/"
    },
    {
        "id": "c10",
        "type": "conference",
        "title": "OWI: Open-world intent identification framework for dialog based system",
        "authors": "J. Parmar, S. Soni, and S. S. Chouhan",
        "venue": "8th International Conference on Big Data Analytics (BDA)",
        "details": "Springer, 2020, pp. 329–343",
        "impact": "Springer LNCS",
        "ranking": null,
        "link": "https://link.springer.com/"
    },
    {
        "id": "c11",
        "type": "conference",
        "title": "A classification based approach to create database policy for intrusion detection and respond anomaly requests",
        "authors": "J. Parmar",
        "venue": "Conference on IT in Business, Industry and Government (CSIBIG)",
        "details": "IEEE, 2014, pp. 1–7",
        "impact": "IEEE Xplore",
        "ranking": null,
        "link": "https://ieeexplore.ieee.org/"
    },
    {
        "id": "c12",
        "type": "conference",
        "title": "Data security, intrusion detection, database access control, policy creation and anomaly response systems: A review",
        "authors": "J. Parmar",
        "venue": "International Conference on Advances in Engineering & Technology Research (ICAETR)",
        "details": "IEEE, 2014, pp. 1–6",
        "impact": "IEEE Xplore",
        "ranking": null,
        "link": "https://ieeexplore.ieee.org/"
    },
    {
        "id": "c13",
        "type": "conference",
        "title": "A different approach of intrusion detection and response system for relational databases",
        "authors": "J. Parmar and P. Jain",
        "venue": "International Conference on Green Computing, Communication and Conservation of Energy (ICGCE)",
        "details": "IEEE, 2013, pp. 894–899",
        "impact": "IEEE Xplore",
        "ranking": null,
        "link": "https://ieeexplore.ieee.org/"
    },
    {
        "id": "b1",
        "type": "conference",
        "title": "Object detection and trajectory prediction using Faster R-CNN and Kalman filter",
        "authors": "C. Sarkar, J. Parmar, G. Behera, and M. Dhawan",
        "venue": "Intelligent Computing Techniques and Applications",
        "details": "CRC Press (Taylor & Francis Group), 2025, pp. 92–95",
        "impact": "CRC Press Book Chapter",
        "ranking": null,
        "link": "https://scholar.google.com/citations?user=toHDoiwAAAAJ&hl=en&authuser=1"
    }
];

let currentFilter = "all";
let searchQuery = "";

function formatAuthors(authorsStr) {
    // Bold 'J. Parmar' or 'Jitendra Parmar'
    return authorsStr
        .replace(/\bJ\. Parmar\b/g, "<strong>J. Parmar</strong>")
        .replace(/\bJitendra Parmar\b/g, "<strong>Jitendra Parmar</strong>");
}

function renderPublications() {
    const container = document.getElementById("publications-container");
    const countDisplay = document.getElementById("showing-count-text");
    if (!container) return;

    let filtered = PUBLICATIONS;

    // 1. Filter by Publication Type (all, journal, conference) - NO YEARWISE per user instruction
    if (currentFilter !== "all") {
        filtered = filtered.filter(p => p.type === currentFilter);
    }

    // 2. Filter by Search Query
    if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase().trim();
        filtered = filtered.filter(p => 
            p.title.toLowerCase().includes(q) ||
            p.authors.toLowerCase().includes(q) ||
            p.venue.toLowerCase().includes(q) ||
            p.details.toLowerCase().includes(q) ||
            (p.impact && p.impact.toLowerCase().includes(q))
        );
    }

    if (countDisplay) {
        countDisplay.textContent = `Showing ${filtered.length} of ${PUBLICATIONS.length} publications`;
    }

    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="no-publications-msg">
                <i class="fas fa-search"></i>
                <h3 style="font-size: 1.2rem; color: #1e293b; margin-bottom: 6px;">No publications found</h3>
                <p>Try clearing your search query or switching publication types.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = filtered.map((pub, index) => {
        const isJournal = pub.type === "journal";
        const typeLabel = isJournal ? "Journal Article" : "Conference Paper";
        const typeIcon = isJournal ? "fa-book-open" : "fa-users";
        const cardClass = isJournal ? "publication-card journal" : "publication-card conference";

        return `
            <article class="${cardClass}" id="${pub.id}">
                <div class="publication-card-top">
                    <span class="publication-type-badge ${pub.type}">
                        <i class="fas ${typeIcon}"></i> ${typeLabel}
                    </span>
                    <div class="publication-badges-right">
                        ${pub.ranking ? `<span class="badge-ranking"><i class="fas fa-trophy"></i> ${pub.ranking}</span>` : ""}
                        ${pub.impact ? `<span class="badge-impact"><i class="fas fa-certificate"></i> ${pub.impact}</span>` : ""}
                    </div>
                </div>

                <h2 class="publication-title">${pub.title}</h2>

                <div class="publication-authors">
                    <i class="fas fa-user-edit"></i>
                    <div>${formatAuthors(pub.authors)}</div>
                </div>

                <div class="publication-venue">
                    <i class="fas fa-graduation-cap"></i>
                    <div>${pub.venue} &bull; <span>${pub.details}</span></div>
                </div>

                <div class="publication-footer">
                    <div style="font-size: 0.8rem; color: #94a3b8; font-family: monospace;">
                        [Ref #${index + 1}]
                    </div>
                    <div style="display: flex; gap: 8px;">
                        <a href="${pub.link}" target="_blank" rel="noopener noreferrer" class="pub-action-btn">
                            <i class="fas fa-external-link-alt"></i> View Paper
                        </a>
                        <a href="https://scholar.google.com/citations?user=toHDoiwAAAAJ&hl=en&authuser=1" target="_blank" rel="noopener noreferrer" class="pub-action-btn">
                            <i class="fas fa-graduation-cap"></i> Scholar
                        </a>
                    </div>
                </div>
            </article>
        `;
    }).join("");
}

function setupFilters() {
    // Update button counts
    const totalCount = PUBLICATIONS.length;
    const journalCount = PUBLICATIONS.filter(p => p.type === "journal").length;
    const confCount = PUBLICATIONS.filter(p => p.type === "conference").length;

    const countAllEl = document.getElementById("count-all");
    const countJournalEl = document.getElementById("count-journal");
    const countConfEl = document.getElementById("count-conference");
    const statJournalEl = document.getElementById("stat-journal");
    const statConfEl = document.getElementById("stat-conference");
    const statTotalEl = document.getElementById("stat-total");

    if (countAllEl) countAllEl.textContent = totalCount;
    if (countJournalEl) countJournalEl.textContent = journalCount;
    if (countConfEl) countConfEl.textContent = confCount;
    if (statTotalEl) statTotalEl.textContent = totalCount;
    if (statJournalEl) statJournalEl.textContent = journalCount;
    if (statConfEl) statConfEl.textContent = confCount;

    // Type buttons listener
    const buttons = document.querySelectorAll(".type-btn");
    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            buttons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            currentFilter = btn.getAttribute("data-type") || "all";
            renderPublications();
        });
    });

    // Search input listener
    const searchInput = document.getElementById("pub-search");
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            searchQuery = e.target.value;
            renderPublications();
        });
    }

    // Check URL parameters for initial filter (e.g. ?type=journal)
    const urlParams = new URLSearchParams(window.location.search);
    const typeParam = urlParams.get("type");
    if (typeParam && ["journal", "conference"].includes(typeParam)) {
        currentFilter = typeParam;
        buttons.forEach(b => {
            if (b.getAttribute("data-type") === typeParam) {
                b.classList.add("active");
            } else {
                b.classList.remove("active");
            }
        });
    }

    // Check local storage for dynamic admin updates
    const cachedPubs = localStorage.getItem('juet_admin_publications');
    if (cachedPubs) {
        try {
            const parsed = JSON.parse(cachedPubs);
            if (Array.isArray(parsed) && parsed.length > 0) {
                PUBLICATIONS = parsed;
                updateCounts();
            }
        } catch(e) {}
    }

    renderPublications();

    // Also attempt fresh fetch from backend
    fetch('/api/admin/publications')
        .then(res => res.json())
        .then(data => {
            if (data.success && Array.isArray(data.publications)) {
                PUBLICATIONS = data.publications;
                localStorage.setItem('juet_admin_publications', JSON.stringify(data.publications));
                updateCounts();
                renderPublications();
            }
        })
        .catch(() => {});
}

if (typeof document !== 'undefined') {
    document.addEventListener("DOMContentLoaded", () => {
        setupFilters();

        // Hamburger menu toggle
        const hamburger = document.querySelector(".hamburger");
        const navMenu = document.querySelector(".nav-menu");
        if (hamburger && navMenu) {
            hamburger.addEventListener("click", () => {
                hamburger.classList.toggle("active");
                navMenu.classList.toggle("active");
            });
        }
    });
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PUBLICATIONS };
}
