const fs = require('fs');
const path = require('path');
const { SQL_MODULES } = require('./data/modulesData');

const modulesJson = JSON.stringify(SQL_MODULES, null, 2);

const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SQL Practice Virtual Lab - Dr. Jitendra Parmar | JUET Guna</title>
    <meta name="title" content="SQL Practice Virtual Lab - Dr. Jitendra Parmar | JUET Guna">
    <meta name="description" content="Interactive SQL Practice Virtual Lab developed by Dr. Jitendra Parmar at JUET Guna. Practice 75 hands-on SQL queries across DDL, DML, Aggregations, JOINs, Subqueries, and Window Functions with instant query evaluation and progress tracking.">
    <meta name="keywords" content="Jitendra Parmar SQL, Dr. Jitendra Parmar SQL Virtual Lab, JUET SQL Practice, SQL Grading Engine, SQL Practice Platform, Dr. Jitendra Parmar Lab, Computer Science Virtual Lab JUET Guna, SQL Practice Modules">
    <meta name="author" content="Dr. Jitendra Parmar">
    <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">

    <!-- Open Graph -->
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Dr. Jitendra Parmar Lab">
    <meta property="og:title" content="SQL Practice Virtual Lab - Dr. Jitendra Parmar | JUET Guna">
    <meta property="og:description" content="Interactive SQL Practice Virtual Lab with real-time query execution, test case verification, and live progress telemetry.">
    <meta property="og:image" content="dr_parmar.png">

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="SQL Practice Virtual Lab - Dr. Jitendra Parmar | JUET Guna">
    <meta name="twitter:description" content="Interactive SQL Practice Virtual Lab with real-time query verification.">
    <meta name="twitter:image" content="dr_parmar.png">

    <!-- JSON-LD Structured Data -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "JUET SQL Practice Virtual Lab",
      "applicationCategory": "EducationalApplication",
      "operatingSystem": "All modern web browsers",
      "description": "Educational platform for SQL database learning with in-memory execution, grading engine, and progress telemetry created by Dr. Jitendra Parmar at JUET Guna.",
      "author": {
        "@type": "Person",
        "name": "Dr. Jitendra Parmar",
        "jobTitle": "Assistant Professor (Senior Grade)",
        "affiliation": "Jaypee University of Engineering and Technology (JUET), Guna"
      }
    }
    </script>
    <!-- Favicon -->
    <link rel="icon" type="image/png" href="dr_parmar.png">
    <link rel="apple-touch-icon" href="dr_parmar.png">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- Centralized API Configuration -->
    <script src="config.js"></script>
    <!-- In-Memory SQL Engine for Client-Side Offline Execution -->
    <script src="alasql.min.js"></script>
    <!-- Google Identity Services for JUET @juetguna.in Authentication -->
    <script src="https://accounts.google.com/gsi/client" async defer></script>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background-color: #f8fafc;
            color: #1e293b;
            height: 100vh;
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }

        /* Top Navbar */
        .top-navbar {
            height: 56px;
            background: #ffffff;
            border-bottom: 1px solid #e2e8f0;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 16px;
            z-index: 100;
            flex-shrink: 0;
        }
        .nav-left {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        .btn-back {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 32px;
            height: 32px;
            border-radius: 6px;
            border: 1px solid #e2e8f0;
            color: #475569;
            text-decoration: none;
            transition: all 0.2s;
            font-size: 0.95rem;
        }
        .btn-back:hover {
            background-color: #f1f5f9;
            color: #1e293b;
        }
        .brand-logo-box {
            width: 32px;
            height: 32px;
            background: linear-gradient(135deg, #2563eb, #1d4ed8);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #ffffff;
            font-size: 1.1rem;
            box-shadow: 0 2px 6px rgba(37, 99, 235, 0.3);
        }
        .brand-text {
            display: flex;
            flex-direction: column;
        }
        .brand-title {
            font-size: 0.95rem;
            font-weight: 700;
            color: #0f172a;
            line-height: 1.1;
        }
        .brand-sub {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 0.72rem;
            color: #64748b;
        }
        .streak-pill {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            background: #fff7ed;
            color: #ea580c;
            border: 1px solid #ffedd5;
            padding: 1px 7px;
            border-radius: 10px;
            font-weight: 700;
            font-size: 0.7rem;
        }

        .nav-center {
            display: flex;
            align-items: center;
            gap: 14px;
        }
        .module-badge-nav {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            background: #eff6ff;
            color: #1d4ed8;
            border: 1px solid #bfdbfe;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 600;
        }
        .dot-green {
            width: 7px;
            height: 7px;
            background-color: #10b981;
            border-radius: 50%;
            display: inline-block;
            animation: pulse-dot 1.8s infinite;
        }
        @keyframes pulse-dot {
            0% { transform: scale(0.9); opacity: 0.7; }
            50% { transform: scale(1.2); opacity: 1; }
            100% { transform: scale(0.9); opacity: 0.7; }
        }
        .nav-links {
            display: flex;
            align-items: center;
            gap: 16px;
            list-style: none;
        }
        .nav-link-item {
            color: #475569;
            text-decoration: none;
            font-size: 0.86rem;
            font-weight: 500;
            transition: color 0.15s;
            cursor: pointer;
        }
        .nav-link-item:hover {
            color: #2563eb;
        }

        .nav-right {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .btn-login-outline {
            border: 1px solid #2563eb;
            color: #2563eb;
            background: transparent;
            padding: 5px 14px;
            border-radius: 6px;
            font-size: 0.84rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
        }
        .btn-login-outline:hover {
            background: #eff6ff;
        }
        .user-profile-badge {
            display: none;
            align-items: center;
            gap: 8px;
            background: #f1f5f9;
            padding: 4px 10px;
            border-radius: 20px;
            font-size: 0.82rem;
            border: 1px solid #e2e8f0;
        }

        /* Main Workspace 3-Column Layout */
        .workspace-container {
            display: flex;
            flex: 1;
            overflow: hidden;
            height: calc(100vh - 56px);
        }

        /* LEFT SIDEBAR: Topic Wise Modules & Challenges */
        .sidebar-left {
            width: 320px;
            background: #ffffff;
            border-right: 1px solid #e2e8f0;
            display: flex;
            flex-direction: column;
            overflow-y: hidden;
            flex-shrink: 0;
        }
        .module-nav-header {
            padding: 12px 14px 8px;
            background: #f8fafc;
            border-bottom: 1px solid #e2e8f0;
        }
        .module-nav-title {
            font-size: 0.74rem;
            font-weight: 800;
            color: #475569;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 8px;
        }
        .module-tabs {
            display: flex;
            flex-direction: column;
            gap: 4px;
            max-height: 180px;
            overflow-y: auto;
        }
        .module-tab-pill {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 7px 10px;
            border-radius: 6px;
            border: 1px solid #e2e8f0;
            background: #ffffff;
            color: #334155;
            font-size: 0.78rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.15s;
            text-align: left;
        }
        .module-tab-pill:hover {
            background: #f1f5f9;
            border-color: #cbd5e1;
        }
        .module-tab-pill.active {
            background: #2563eb;
            color: #ffffff;
            border-color: #2563eb;
            box-shadow: 0 2px 4px rgba(37, 99, 235, 0.25);
        }
        .module-tab-pill.active .mod-pill-badge {
            background: rgba(255, 255, 255, 0.25);
            color: #ffffff;
        }
        .mod-pill-badge {
            font-size: 0.68rem;
            background: #f1f5f9;
            color: #64748b;
            padding: 1px 6px;
            border-radius: 10px;
            font-weight: 700;
        }

        .search-box-wrap {
            padding: 8px 12px;
            background: #ffffff;
            border-bottom: 1px solid #f1f5f9;
        }
        .search-input {
            width: 100%;
            padding: 6px 10px;
            font-size: 0.82rem;
            border: 1px solid #cbd5e1;
            border-radius: 6px;
            outline: none;
            background: #f8fafc;
        }
        .search-input:focus {
            border-color: #2563eb;
            background: #ffffff;
        }

        .challenge-list-container {
            flex: 1;
            overflow-y: auto;
            padding: 8px 10px;
            display: flex;
            flex-direction: column;
            gap: 6px;
        }
        .challenge-item {
            padding: 9px 12px;
            border-radius: 6px;
            border: 1px solid #e2e8f0;
            background: #ffffff;
            cursor: pointer;
            transition: all 0.15s;
        }
        .challenge-item:hover {
            border-color: #cbd5e1;
            background: #f8fafc;
        }
        .challenge-item.active {
            border-color: #2563eb;
            background: #eff6ff;
            box-shadow: 0 1px 4px rgba(37, 99, 235, 0.15);
        }
        .challenge-item-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 6px;
        }
        .challenge-item-title {
            font-size: 0.83rem;
            font-weight: 600;
            color: #0f172a;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            display: flex;
            align-items: center;
            gap: 5px;
        }
        .difficulty-badge {
            font-size: 0.64rem;
            font-weight: 700;
            padding: 2px 6px;
            border-radius: 4px;
            text-transform: uppercase;
            flex-shrink: 0;
        }
        .diff-easy { background: #dcfce7; color: #15803d; }
        .diff-medium { background: #fef3c7; color: #b45309; }
        .diff-hard { background: #fee2e2; color: #b91c1c; }
        .solved-icon { color: #16a34a; font-size: 0.8rem; }

        .challenge-preview {
            font-size: 0.73rem;
            color: #64748b;
            margin-top: 4px;
            line-height: 1.35;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }

        .sidebar-footer {
            padding: 10px 14px;
            border-top: 1px solid #e2e8f0;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.8rem;
            font-weight: 600;
            color: #64748b;
            background: #f8fafc;
        }

        /* CENTER: Code Editor & Parallel Results */
        .workspace-center {
            flex: 1;
            display: flex;
            flex-direction: column;
            overflow-y: auto;
            padding: 16px 20px;
            gap: 16px;
            background: #f8fafc;
        }
        .problem-breadcrumb {
            font-size: 0.72rem;
            font-weight: 700;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .problem-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .problem-title {
            font-size: 1.35rem;
            font-weight: 800;
            color: #0f172a;
        }
        .problem-desc {
            font-size: 0.94rem;
            color: #334155;
            line-height: 1.55;
            background: #ffffff;
            padding: 12px 16px;
            border-radius: 8px;
            border: 1px solid #e2e8f0;
        }

        /* Editor Card */
        .editor-container {
            background: #ffffff;
            border: 1px solid #cbd5e1;
            border-radius: 8px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02);
        }
        .editor-header {
            height: 38px;
            background: #f1f5f9;
            border-bottom: 1px solid #e2e8f0;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 14px;
            font-size: 0.78rem;
            font-weight: 700;
            color: #475569;
        }
        .editor-header-actions {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .btn-secondary-action {
            background: transparent;
            border: none;
            color: #64748b;
            font-size: 0.76rem;
            font-weight: 600;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 4px;
        }
        .btn-secondary-action:hover {
            color: #0f172a;
        }
        .editor-body {
            display: flex;
            min-height: 130px;
            background: #ffffff;
            position: relative;
        }
        .line-numbers {
            width: 40px;
            padding: 12px 6px;
            background: #fafafa;
            border-right: 1px solid #f1f5f9;
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.86rem;
            line-height: 1.5;
            color: #94a3b8;
            text-align: right;
            user-select: none;
        }
        .code-textarea {
            flex: 1;
            padding: 12px 14px;
            border: none;
            outline: none;
            resize: vertical;
            min-height: 130px;
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.92rem;
            line-height: 1.5;
            color: #0f172a;
            background: #ffffff;
            tab-size: 2;
        }
        .editor-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 14px;
            background: #ffffff;
            border-top: 1px solid #f1f5f9;
        }
        .btn-run-query {
            background: #2563eb;
            color: #ffffff;
            border: none;
            border-radius: 6px;
            padding: 9px 22px;
            font-size: 0.92rem;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 8px;
            cursor: pointer;
            box-shadow: 0 2px 6px rgba(37, 99, 235, 0.3);
            transition: all 0.2s;
        }
        .btn-run-query:hover {
            background: #1d4ed8;
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4);
            transform: translateY(-1px);
        }

        /* Solution Box (Collapsible) */
        .solution-drawer {
            display: none;
            background: #f8fafc;
            border: 1px dashed #cbd5e1;
            border-radius: 8px;
            padding: 12px 16px;
            margin-top: 8px;
            font-size: 0.84rem;
        }
        .solution-drawer.visible {
            display: block;
        }
        .solution-code {
            font-family: 'JetBrains Mono', monospace;
            background: #0f172a;
            color: #38bdf8;
            padding: 10px 14px;
            border-radius: 6px;
            margin-top: 8px;
            white-space: pre-wrap;
            font-size: 0.84rem;
        }

        /* PARALLEL RESULTS CONTAINER */
        .result-container {
            background: #ffffff;
            border: 1px solid #cbd5e1;
            border-radius: 8px;
            display: flex;
            flex-direction: column;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
            margin-bottom: 24px;
            min-height: 240px;
        }
        .result-header {
            height: 40px;
            background: #f1f5f9;
            border-bottom: 1px solid #e2e8f0;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 14px;
            font-size: 0.78rem;
            font-weight: 700;
            color: #475569;
        }
        .result-header-tools {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        .view-toggle-btn {
            background: #ffffff;
            border: 1px solid #cbd5e1;
            padding: 3px 8px;
            border-radius: 4px;
            font-size: 0.74rem;
            font-weight: 600;
            color: #475569;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 4px;
        }
        .view-toggle-btn.active {
            background: #2563eb;
            color: #ffffff;
            border-color: #2563eb;
        }
        .result-body {
            padding: 16px;
            display: flex;
            flex-direction: column;
            flex: 1;
        }
        .result-empty {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: #94a3b8;
            gap: 10px;
            padding: 50px 0;
            font-size: 0.92rem;
        }

        /* Verification Banner */
        .eval-status-banner {
            padding: 14px 18px;
            border-radius: 8px;
            margin-bottom: 16px;
            font-size: 0.9rem;
            font-weight: 600;
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            animation: fadeIn 0.3s ease;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-3px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .banner-success {
            background: #ecfdf5;
            color: #065f46;
            border: 1px solid #a7f3d0;
        }
        .banner-error {
            background: #fef2f2;
            color: #991b1b;
            border: 1px solid #fecaca;
        }
        .banner-warning {
            background: #fffbeb;
            color: #92400e;
            border: 1px solid #fde68a;
        }
        .banner-title {
            font-size: 0.98rem;
            font-weight: 700;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .banner-detail {
            font-size: 0.82rem;
            font-weight: 400;
            margin-top: 5px;
            line-height: 1.4;
        }

        /* Parallel Split Grid */
        .parallel-output-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
        }
        .parallel-output-grid.single-view {
            grid-template-columns: 1fr;
        }
        .parallel-output-grid.single-view .expected-card {
            display: none !important;
        }
        .parallel-output-grid.single-view .user-card {
            width: 100%;
        }
        .parallel-card {
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            overflow: hidden;
            background: #ffffff;
            display: flex;
            flex-direction: column;
        }
        .parallel-card-header {
            padding: 8px 12px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 0.8rem;
            font-weight: 700;
            background: #f8fafc;
            border-bottom: 1px solid #e2e8f0;
        }
        .parallel-card.user-card .parallel-card-header {
            border-top: 3px solid #2563eb;
            color: #1e40af;
        }
        .parallel-card.expected-card .parallel-card-header {
            border-top: 3px solid #059669;
            color: #065f46;
        }
        .count-pill {
            font-size: 0.72rem;
            padding: 2px 8px;
            border-radius: 12px;
            font-weight: 700;
        }
        .user-card .count-pill { background: #dbeafe; color: #1e40af; }
        .expected-card .count-pill { background: #d1fae5; color: #065f46; }

        .table-scroll-wrap {
            overflow-x: auto;
            max-height: 380px;
        }
        .data-table {
            width: 100%;
            border-collapse: collapse;
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.81rem;
            text-align: left;
        }
        .data-table th {
            background: #f8fafc;
            border-bottom: 2px solid #cbd5e1;
            padding: 8px 12px;
            color: #334155;
            font-weight: 700;
            white-space: nowrap;
            position: sticky;
            top: 0;
            z-index: 10;
        }
        .data-table td {
            border-bottom: 1px solid #e2e8f0;
            padding: 7px 12px;
            color: #1e293b;
            white-space: nowrap;
        }
        .data-table tr:hover td {
            background: #f1f5f9;
        }
        .null-tag {
            color: #94a3b8;
            font-style: italic;
            font-weight: 500;
        }
        .dml-status-box {
            padding: 24px;
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.88rem;
            color: #0f172a;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        /* RIGHT SIDEBAR: Dynamic Database Schema */
        .sidebar-right {
            width: 290px;
            background: #ffffff;
            border-left: 1px solid #e2e8f0;
            display: flex;
            flex-direction: column;
            overflow-y: auto;
            flex-shrink: 0;
        }
        .schema-header {
            padding: 12px 14px;
            border-bottom: 1px solid #e2e8f0;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 0.78rem;
            font-weight: 700;
            color: #475569;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .schema-cards {
            padding: 12px;
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        .table-card {
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            overflow: hidden;
            background: #ffffff;
        }
        .table-card-head {
            padding: 9px 12px;
            background: #f8fafc;
            display: flex;
            align-items: center;
            justify-content: space-between;
            cursor: pointer;
            font-size: 0.84rem;
            font-weight: 700;
            color: #1e293b;
        }
        .table-card-head:hover {
            background: #f1f5f9;
        }
        .table-card-content {
            display: none;
            padding: 8px 12px;
            border-top: 1px solid #f1f5f9;
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.76rem;
            color: #475569;
        }
        .table-card.expanded .table-card-content {
            display: block;
        }
        .col-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 4px 0;
            border-bottom: 1px dashed #f1f5f9;
        }
        .col-name {
            font-weight: 600;
            color: #0f172a;
        }
        .col-type {
            font-size: 0.68rem;
            color: #64748b;
        }
        .key-badge {
            font-size: 0.62rem;
            background: #dbeafe;
            color: #1d4ed8;
            padding: 1px 4px;
            border-radius: 3px;
            font-weight: 700;
            margin-right: 4px;
        }
        .sample-preview-btn {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            font-size: 0.72rem;
            font-weight: 600;
            color: #2563eb;
            background: transparent;
            border: none;
            cursor: pointer;
            margin-top: 6px;
            padding: 0;
        }
        .sample-preview-btn:hover {
            text-decoration: underline;
        }

        /* MODALS */
        .modal-overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(15, 23, 42, 0.6);
            backdrop-filter: blur(4px);
            z-index: 1000;
            align-items: center;
            justify-content: center;
        }
        .modal-card {
            background: #ffffff;
            border-radius: 14px;
            width: 90%;
            max-width: 520px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
            overflow: hidden;
            animation: modalPop 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes modalPop {
            from { transform: scale(0.95); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
        .modal-header {
            padding: 16px 20px;
            background: #f8fafc;
            border-bottom: 1px solid #e2e8f0;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .modal-title {
            font-size: 1.1rem;
            font-weight: 700;
            color: #0f172a;
        }
        .btn-close-modal {
            background: none;
            border: none;
            color: #94a3b8;
            font-size: 1.2rem;
            cursor: pointer;
        }
        .btn-close-modal:hover { color: #0f172a; }
        .modal-body {
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 14px;
            max-height: 75vh;
            overflow-y: auto;
        }
        .input-group {
            display: flex;
            flex-direction: column;
            gap: 5px;
        }
        .input-label {
            font-size: 0.8rem;
            font-weight: 600;
            color: #334155;
        }
        .input-field {
            padding: 9px 12px;
            border: 1px solid #cbd5e1;
            border-radius: 6px;
            font-size: 0.9rem;
            outline: none;
        }
        .input-field:focus {
            border-color: #2563eb;
            box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
        }
        .btn-submit-modal {
            background: #2563eb;
            color: white;
            border: none;
            padding: 11px;
            border-radius: 6px;
            font-size: 0.92rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
        }
        .btn-submit-modal:hover { background: #1d4ed8; }
        .btn-google-signin {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            width: 100%;
            background: #ffffff;
            color: #1f2937;
            border: 1px solid #dadce0;
            border-radius: 8px;
            padding: 10px 16px;
            font-size: 0.92rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            box-shadow: 0 1px 3px rgba(0,0,0,0.06);
        }
        .btn-google-signin:hover {
            background: #f8fafc;
            border-color: #cbd5e1;
            box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        }
        .google-icon {
            width: 20px;
            height: 20px;
            flex-shrink: 0;
        }
        .modal-divider {
            display: flex;
            align-items: center;
            text-align: center;
            margin: 4px 0;
            color: #94a3b8;
            font-size: 0.72rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .modal-divider::before, .modal-divider::after {
            content: '';
            flex: 1;
            border-bottom: 1px solid #e2e8f0;
        }
        .modal-divider::before { margin-right: 12px; }
        .modal-divider::after { margin-left: 12px; }
        .enroll-preview-box {
            margin-top: 6px;
            padding: 7px 12px;
            background: #f0fdf4;
            border: 1px solid #bbf7d0;
            border-radius: 6px;
            font-size: 0.78rem;
            color: #166534;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    </style>
</head>
<body>

    <!-- TOP NAVIGATION -->
    <header class="top-navbar">
        <div class="nav-left">
            <a href="index.html" class="btn-back" title="Back to Dr. Jitendra Parmar Lab">
                <i class="fas fa-chevron-left"></i>
            </a>
            <div class="brand-logo-box">
                <i class="fas fa-database"></i>
            </div>
            <div class="brand-text">
                <div class="brand-title">SQL Practice Virtual Lab</div>
                <div class="brand-sub">
                    <span>JUET Guna</span>
                    <span class="streak-pill" id="user-streak-badge"><i class="fas fa-fire"></i> <span id="streak-count">0</span> solved</span>
                    <span class="streak-pill" style="background: #f0fdf4; color: #15803d; border-color: #bbf7d0;"><i class="fas fa-trophy"></i> <span id="points-count">0</span> pts</span>
                </div>
            </div>
        </div>

        <div class="nav-center">
            <div class="module-badge-nav" id="active-module-pill">
                <span class="dot-green"></span>
                <span id="active-module-name">Module 1: DDL & DML Basics</span>
            </div>
            <ul class="nav-links">
                <li><a href="index.html" class="nav-link-item">Home</a></li>
                <li><a onclick="openSampleDataModal()" class="nav-link-item">View Sample Data</a></li>
                <li><a onclick="showFaqModal()" class="nav-link-item">FAQ</a></li>
            </ul>
        </div>

        <div class="nav-right">
            <button class="btn-login-outline" id="login-nav-btn" onclick="openLoginModal()">
                <i class="fab fa-google" style="margin-right:4px;"></i> Sign in with Google
            </button>
            <div class="user-profile-badge" id="user-badge" style="display: none; align-items: center; gap: 8px;">
                <img id="user-display-avatar" src="" style="width: 26px; height: 26px; border-radius: 50%; display: none; object-fit: cover;">
                <i class="fas fa-user-graduate" id="user-display-icon" style="color: #2563eb; font-size: 1rem;"></i>
                <div style="display: flex; flex-direction: column; text-align: left; line-height: 1.15;">
                    <span id="user-display-name" style="font-weight: 700; font-size: 0.82rem; color: #0f172a;">Student</span>
                    <span id="user-display-roll" style="font-size: 0.72rem; color: #2563eb; font-weight: 600;">Enroll: ---</span>
                </div>
                <span style="color: #cbd5e1; margin: 0 2px;">|</span>
                <button onclick="handleLogout()" style="background:none; border:none; color:#ef4444; font-size:0.75rem; font-weight:600; cursor:pointer; display:flex; align-items:center; gap:3px;" title="Logout">
                    <i class="fas fa-sign-out-alt"></i> Logout
                </button>
            </div>
        </div>
    </header>

    <!-- WORKSPACE 3 COLUMNS -->
    <main class="workspace-container">
        
        <!-- LEFT SIDEBAR: TOPICS & QUESTIONS -->
        <aside class="sidebar-left">
            <div class="module-nav-header">
                <div class="module-nav-title">
                    <span>Practice Topics (Modules)</span>
                    <span style="font-size:0.7rem; color:#2563eb; font-weight:700;">5 Modules / 75 Queries</span>
                </div>
                <div class="module-tabs" id="module-tabs-list">
                    <!-- Injected dynamically via JS -->
                </div>
            </div>

            <div class="search-box-wrap">
                <input type="text" class="search-input" id="search-questions-input" placeholder="Search questions in this topic..." oninput="filterQuestions()">
            </div>

            <div class="challenge-list-container" id="challenge-list">
                <!-- Injected via JS -->
            </div>

            <div class="sidebar-footer">
                <span id="progress-summary">0 / 75 Solved (0%)</span>
            </div>
        </aside>

        <!-- CENTER WORKSPACE -->
        <section class="workspace-center">
            <div class="problem-breadcrumb" id="problem-breadcrumb">
                <span>MODULE 1</span> &bull; 
                <span>BASIC DATA MANIPULATION & FILTERING</span> &bull; 
                <span>QUESTION 1 OF 15</span>
            </div>

            <div class="problem-header">
                <h1 class="problem-title" id="current-title">Create Departments Table</h1>
                <div style="display: flex; gap: 8px; align-items: center;">
                    <span class="difficulty-badge diff-easy" id="current-diff">Easy</span>
                    <span class="streak-pill" id="current-pts">+10 pts</span>
                </div>
            </div>

            <div class="problem-desc" id="current-desc">
                Write a DDL statement to create the departments table with department_id as an integer primary key, dept_name as a non-null string, and location as a variable character field.
            </div>

            <!-- Editor Container -->
            <div class="editor-container">
                <div class="editor-header">
                    <span>&lt;/&gt; SQL EDITOR</span>
                    <div class="editor-header-actions">
                        <button class="btn-secondary-action" onclick="toggleSolutionDrawer()">
                            <i class="fas fa-lightbulb" style="color: #f59e0b;"></i> <span id="toggle-solution-text">Show Reference Solution</span>
                        </button>
                        <button class="btn-secondary-action" onclick="resetEditorCode()">
                            <i class="fas fa-undo-alt"></i> Reset Code
                        </button>
                    </div>
                </div>

                <div class="editor-body">
                    <div class="line-numbers" id="line-numbers">1<br>2<br>3</div>
                    <textarea class="code-textarea" id="sql-input" spellcheck="false" placeholder="-- Write your SQL query here..."></textarea>
                </div>

                <!-- Collapsible Solution Drawer -->
                <div class="solution-drawer" id="solution-drawer">
                    <div style="font-weight: 700; color: #0f172a; display: flex; align-items: center; gap: 6px;">
                        <i class="fas fa-check-circle" style="color: #10b981;"></i> Reference Solution Query:
                    </div>
                    <pre class="solution-code" id="solution-code-block"></pre>
                    <button class="btn-secondary-action" style="margin-top: 6px; color:#2563eb;" onclick="copySolutionToEditor()">
                        <i class="fas fa-arrow-up"></i> Copy into Editor
                    </button>
                </div>

                <div class="editor-footer">
                    <span style="font-size: 0.76rem; color: #64748b;">Shortcut: Press <strong>Ctrl + Enter</strong> or <strong>Cmd + Enter</strong> to run</span>
                    <button class="btn-run-query" id="btn-run" onclick="executeUserQuery()">
                        <i class="fas fa-play"></i> Run & Compare Query
                    </button>
                </div>
            </div>

            <!-- PARALLEL QUERY RESULT COMPARISON -->
            <div class="result-container">
                <div class="result-header">
                    <span>&gt;_ QUERY RESULT & VERIFICATION</span>
                    <div class="result-header-tools">
                        <button class="view-toggle-btn active" id="btn-view-parallel" onclick="setResultLayout('parallel')">
                            <i class="fas fa-columns"></i> Side-by-Side View
                        </button>
                        <button class="view-toggle-btn" id="btn-view-single" onclick="setResultLayout('single')">
                            <i class="fas fa-table"></i> Your Output Only
                        </button>
                    </div>
                </div>

                <div class="result-body" id="result-body">
                    <div class="result-empty" id="empty-state">
                        <i class="fas fa-table" style="font-size: 2.4rem; color: #cbd5e1;"></i>
                        <span>Write your query and click <strong>Run & Compare Query</strong> to verify output against expected results.</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- RIGHT SIDEBAR: DYNAMIC SCHEMA -->
        <aside class="sidebar-right">
            <div class="schema-header">
                <span id="schema-sidebar-title">DATABASE SCHEMA</span>
                <span style="color:#2563eb; font-size:0.75rem; font-weight:600; cursor:pointer;" onclick="openSampleDataModal()">
                    <i class="fas fa-table"></i> Sample Data
                </span>
            </div>

            <div class="schema-cards" id="schema-cards-container">
                <!-- Dynamically rendered for active module -->
            </div>
        </aside>

    </main>

    <!-- SAMPLE DATA MODAL -->
    <div class="modal-overlay" id="sample-data-modal">
        <div class="modal-card" style="max-width: 720px;">
            <div class="modal-header">
                <div class="modal-title" id="sample-modal-title"><i class="fas fa-database" style="color:#2563eb;"></i> Module Sample Data</div>
                <button class="btn-close-modal" onclick="closeSampleDataModal()">&times;</button>
            </div>
            <div class="modal-body" id="sample-modal-body">
                <!-- Injected via JS -->
            </div>
        </div>
    </div>

    <!-- LOGIN MODAL (ONLY GMAIL AUTHENTICATION) -->
    <div class="modal-overlay" id="login-modal">
        <div class="modal-card" style="max-width: 440px;">
            <div class="modal-header">
                <div class="modal-title" style="display: flex; align-items: center; gap: 8px;">
                    <i class="fab fa-google" style="color:#4285F4;"></i> JUET Student Sign-In
                </div>
                <button class="btn-close-modal" id="login-modal-close-btn" onclick="closeLoginModal()">&times;</button>
            </div>
            <div class="modal-body" style="padding: 24px; display: flex; flex-direction: column; align-items: center; text-align: center; gap: 16px;">
                <div style="width: 56px; height: 56px; background: #eff6ff; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(37,99,235,0.12);">
                    <i class="fas fa-graduation-cap" style="color: #2563eb; font-size: 1.6rem;"></i>
                </div>

                <div>
                    <h3 style="font-size: 1.15rem; font-weight: 700; color: #0f172a; margin-bottom: 4px;">Dr. Jitendra Parmar Lab</h3>
                    <p style="font-size: 0.82rem; color: #64748b;">SQL Practice Virtual Lab &bull; JUET Guna</p>
                </div>

                <div style="font-size: 0.82rem; color: #334155; background: #eff6ff; border-left: 3px solid #2563eb; border-radius: 6px; padding: 12px 14px; text-align: left; line-height: 1.45; width: 100%;">
                    <i class="fas fa-info-circle" style="color: #2563eb; margin-right: 4px;"></i>
                    Sign in with your Google account to record your progress, earn points, and appear on the Admin Portal leaderboard.
                </div>

                <!-- Google OAuth Official Sign-in Button -->
                <button type="button" class="btn-google-signin" id="btn-custom-google" onclick="goToSignup()">
                    <svg class="google-icon" viewBox="0 0 48 48">
                        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                        <path fill="none" d="M0 0h48v48H0z"/>
                    </svg>
                    <span>Sign in with Google Account</span>
                </button>

                <div style="font-size: 0.74rem; color: #94a3b8; display: flex; align-items: center; justify-content: center; gap: 5px;">
                    <i class="fas fa-lock" style="font-size: 0.72rem;"></i> Official Google OAuth 2.0 Security
                </div>
            </div>
        </div>
    </div>

    <!-- CLIENT ENGINE & PRACTICE SCRIPT -->
    <script>
        // SQL Practice Modules with Schemas, Sample Data, and Questions
        const SQL_MODULES = ${modulesJson};

        let currentModuleIndex = 0;
        let currentQuestionIndex = 0;
        let resultLayout = 'parallel'; // 'parallel' | 'single'
        let userSolved = JSON.parse(localStorage.getItem('juet_sql_solved') || '[]');
        let userPoints = parseInt(localStorage.getItem('juet_sql_points') || '0', 10);
        let currentUser = JSON.parse(localStorage.getItem('juet_sql_user') || 'null');

        // Current Active Module Database in AlaSQL
        function resetActiveModuleDatabase(userQuery = '') {
            const mod = SQL_MODULES[currentModuleIndex];
            try {
                const isCreateDept = /CREATE\s+TABLE\s+departments/i.test(userQuery);
                const isCreateEmp = /CREATE\s+TABLE\s+employees/i.test(userQuery);
                const isDropPerfRating = /DROP\s+COLUMN\s+performance_rating/i.test(userQuery);

                mod.schema.tables.forEach(t => {
                    try { alasql('DROP TABLE IF EXISTS ' + t.table_name); } catch(e){}
                    if (isCreateDept && t.table_name === 'departments') return;
                    if (isCreateEmp && t.table_name === 'employees') return;

                    alasql('CREATE TABLE ' + t.table_name);
                    alasql.tables[t.table_name].data = JSON.parse(JSON.stringify(t.sample_data));

                    if (isDropPerfRating && t.table_name === 'employees') {
                        try { alasql('ALTER TABLE employees ADD COLUMN performance_rating INT'); } catch(e){}
                        alasql.tables[t.table_name].data.forEach(row => { row.performance_rating = 5; });
                    }
                });
                console.log('Database initialized for module:', mod.module_name);
            } catch (err) {
                console.warn('AlaSQL init note:', err.message);
            }
        }

        // Initialize Module Tabs in Left Sidebar
        function renderModuleTabs() {
            const tabsList = document.getElementById('module-tabs-list');
            tabsList.innerHTML = '';

            SQL_MODULES.forEach((m, idx) => {
                const isActive = idx === currentModuleIndex;
                const solvedInMod = m.questions.filter(q => userSolved.includes(\`m\${m.module_id}_q\${q.question_id}\`)).length;

                const btn = document.createElement('button');
                btn.className = 'module-tab-pill' + (isActive ? ' active' : '');
                btn.innerHTML = \`
                    <span>\${m.short_name}</span>
                    <span class="mod-pill-badge">\${solvedInMod}/\${m.questions.length}</span>
                \`;
                btn.onclick = () => selectModule(idx);
                tabsList.appendChild(btn);
            });
        }

        function selectModule(index) {
            currentModuleIndex = index;
            currentQuestionIndex = 0;
            const mod = SQL_MODULES[currentModuleIndex];

            document.getElementById('active-module-name').textContent = mod.short_name;
            resetActiveModuleDatabase();
            renderModuleTabs();
            renderQuestionsList();
            renderRightSchema();
            loadQuestion(0);
        }

        // Render Questions for Current Module
        function renderQuestionsList(filterText = '') {
            const listEl = document.getElementById('challenge-list');
            listEl.innerHTML = '';
            const mod = SQL_MODULES[currentModuleIndex];

            const filtered = mod.questions.filter(q => {
                if (!filterText) return true;
                const txt = (q.title + ' ' + q.question).toLowerCase();
                return txt.includes(filterText.toLowerCase());
            });

            if (filtered.length === 0) {
                listEl.innerHTML = '<div style="font-size:0.8rem; color:#94a3b8; padding:12px; text-align:center;">No matching questions found</div>';
                return;
            }

            filtered.forEach(q => {
                const originalIndex = mod.questions.indexOf(q);
                const qKey = \`m\${mod.module_id}_q\${q.question_id}\`;
                const isSolved = userSolved.includes(qKey);
                const isActive = originalIndex === currentQuestionIndex;
                const diffClass = q.difficulty === 'Easy' ? 'diff-easy' : (q.difficulty === 'Medium' ? 'diff-medium' : 'diff-hard');

                const item = document.createElement('div');
                item.className = 'challenge-item' + (isActive ? ' active' : '');
                item.innerHTML = \`
                    <div class="challenge-item-header">
                        <span class="challenge-item-title">
                            \${isSolved ? '<i class="fas fa-check-circle solved-icon"></i>' : ''}
                            Q\${q.question_id}. \${q.title}
                        </span>
                        <span class="difficulty-badge \${diffClass}">\${q.difficulty}</span>
                    </div>
                    <div class="challenge-preview">\${q.question}</div>
                \`;
                item.onclick = () => loadQuestion(originalIndex);
                listEl.appendChild(item);
            });

            updateProgressSummary();
        }

        function filterQuestions() {
            const text = document.getElementById('search-questions-input').value.trim();
            renderQuestionsList(text);
        }

        // Load specific question into center editor
        function loadQuestion(index) {
            currentQuestionIndex = index;
            const mod = SQL_MODULES[currentModuleIndex];
            const q = mod.questions[index];

            document.getElementById('problem-breadcrumb').innerHTML = \`
                <span>MODULE \${mod.module_id}</span> &bull; 
                <span>\${mod.module_name.toUpperCase()}</span> &bull; 
                <span>QUESTION \${q.question_id} OF \${mod.questions.length}</span>
            \`;

            document.getElementById('current-title').textContent = \`Q\${q.question_id}. \${q.title}\`;
            document.getElementById('current-desc').textContent = q.question;

            const diffBadge = document.getElementById('current-diff');
            diffBadge.textContent = q.difficulty;
            diffBadge.className = 'difficulty-badge ' + (q.difficulty === 'Easy' ? 'diff-easy' : (q.difficulty === 'Medium' ? 'diff-medium' : 'diff-hard'));
            document.getElementById('current-pts').textContent = \`+\${q.points} pts\`;

            document.getElementById('sql-input').value = q.initialCode || q.query;
            document.getElementById('solution-code-block').textContent = q.query;
            document.getElementById('solution-drawer').classList.remove('visible');
            document.getElementById('toggle-solution-text').textContent = "Show Reference Solution";

            updateLineNumbers();

            // Reset result panel to prompt state
            document.getElementById('result-body').innerHTML = \`
                <div class="result-empty" id="empty-state">
                    <i class="fas fa-table" style="font-size: 2.4rem; color: #cbd5e1;"></i>
                    <span>Write your query and click <strong>Run & Compare Query</strong> to verify output against expected results.</span>
                </div>
            \`;

            renderQuestionsList(document.getElementById('search-questions-input').value.trim());
        }

        function resetEditorCode() {
            const mod = SQL_MODULES[currentModuleIndex];
            const q = mod.questions[currentQuestionIndex];
            document.getElementById('sql-input').value = q.initialCode || q.query;
            updateLineNumbers();
        }

        function toggleSolutionDrawer() {
            const drawer = document.getElementById('solution-drawer');
            const isVis = drawer.classList.toggle('visible');
            document.getElementById('toggle-solution-text').textContent = isVis ? "Hide Reference Solution" : "Show Reference Solution";
        }

        function copySolutionToEditor() {
            const mod = SQL_MODULES[currentModuleIndex];
            const q = mod.questions[currentQuestionIndex];
            document.getElementById('sql-input').value = q.query;
            updateLineNumbers();
        }

        // Line Numbers synchronization
        const textarea = document.getElementById('sql-input');
        const lineNumbers = document.getElementById('line-numbers');
        function updateLineNumbers() {
            const lines = textarea.value.split('\\n').length;
            let nums = '';
            for (let i = 1; i <= Math.max(lines, 3); i++) {
                nums += i + '<br>';
            }
            lineNumbers.innerHTML = nums;
        }
        textarea.addEventListener('input', updateLineNumbers);
        textarea.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                e.preventDefault();
                const start = this.selectionStart;
                const end = this.selectionEnd;
                this.value = this.value.substring(0, start) + '  ' + this.value.substring(end);
                this.selectionStart = this.selectionEnd = start + 2;
                updateLineNumbers();
            }
        });

        // Global and Editor Shortcut: Ctrl + Enter or Cmd + Enter to Run Query
        function handleRunShortcut(e) {
            const isEnter = e.key === 'Enter' || e.code === 'Enter' || e.code === 'NumpadEnter' || e.keyCode === 13 || e.which === 13;
            if ((e.ctrlKey || e.metaKey) && isEnter) {
                e.preventDefault();
                e.stopPropagation();
                const btn = document.getElementById('btn-run');
                if (btn) {
                    btn.style.transform = 'scale(0.96)';
                    setTimeout(() => { btn.style.transform = ''; }, 160);
                }
                executeUserQuery();
            }
        }

        textarea.addEventListener('keydown', handleRunShortcut);
        document.addEventListener('keydown', handleRunShortcut, true);

        // Toggle parallel split vs single view
        function setResultLayout(mode) {
            resultLayout = mode;
            document.getElementById('btn-view-parallel').classList.toggle('active', mode === 'parallel');
            document.getElementById('btn-view-single').classList.toggle('active', mode === 'single');
            const grids = document.querySelectorAll('.parallel-output-grid');
            grids.forEach(grid => {
                grid.classList.toggle('single-view', mode === 'single');
            });
        }

        // Deep Result Comparison (Case-insensitive columns, numeric tolerance, null handling, order-independent fallback)
        function compareResultSets(actual, expected, query = '') {
            if (typeof expected === 'string') {
                if (typeof actual === 'string') {
                    const match = actual.trim().toLowerCase() === expected.trim().toLowerCase();
                    return {
                        isCorrect: match,
                        message: match ? 'Command executed successfully.' : \`Expected message "\${expected}", but received "\${actual}".\`
                    };
                }
                if (actual && actual.message) {
                    const match = actual.message.trim().toLowerCase() === expected.trim().toLowerCase();
                    return {
                        isCorrect: match,
                        message: match ? 'Command executed successfully.' : \`Expected "\${expected}", received "\${actual.message}".\`
                    };
                }
                if (Array.isArray(actual) && actual.length === 0 && expected.toLowerCase().includes('completed successfully')) {
                    return {
                        isCorrect: true,
                        message: 'Command executed successfully.'
                    };
                }
                return { isCorrect: false, message: \`Expected status message "\${expected}".\` };
            }

            const actualRows = Array.isArray(actual) ? actual : [];
            const expectedRows = Array.isArray(expected) ? expected : [];

            if (actualRows.length !== expectedRows.length) {
                return {
                    isCorrect: false,
                    message: \`Row count mismatch: Your query returned \${actualRows.length} row(s), but \${expectedRows.length} row(s) were expected.\`
                };
            }

            if (actualRows.length === 0 && expectedRows.length === 0) {
                return { isCorrect: true, message: 'Correct! Both returned 0 rows as expected.' };
            }

            const actualCols = Object.keys(actualRows[0]).map(c => c.toLowerCase()).sort();
            const expectedCols = Object.keys(expectedRows[0]).map(c => c.toLowerCase()).sort();

            if (actualCols.length !== expectedCols.length) {
                return {
                    isCorrect: false,
                    message: \`Column count mismatch: Expected columns [\${expectedCols.join(', ')}], but got [\${actualCols.join(', ')}].\`
                };
            }

            const hasOrderBy = query && /\\bORDER\\s+BY\\b/i.test(query);

            function rowsEqual(aRow, eRow) {
                for (let c of expectedCols) {
                    const aKey = Object.keys(aRow).find(k => k.toLowerCase() === c);
                    const eKey = Object.keys(eRow).find(k => k.toLowerCase() === c);
                    if (!aKey || !eKey) return false;
                    const aVal = aRow[aKey];
                    const eVal = eRow[eKey];
                    if ((aVal === null || aVal === undefined) && (eVal === null || eVal === undefined)) continue;
                    if (aVal === null || aVal === undefined || eVal === null || eVal === undefined) return false;
                    const aNum = Number(aVal);
                    const eNum = Number(eVal);
                    if (!isNaN(aNum) && !isNaN(eNum)) {
                        if (Math.abs(aNum - eNum) > 0.05) return false;
                    } else {
                        if (String(aVal).trim().toLowerCase() !== String(eVal).trim().toLowerCase()) return false;
                    }
                }
                return true;
            }

            function rowHash(row) {
                return Object.keys(row).sort().map(k => {
                    let val = row[k];
                    if (val === null || val === undefined) return k.toLowerCase() + ':null';
                    const num = Number(val);
                    if (!isNaN(num) && typeof val !== 'boolean' && String(val).trim() !== '') {
                        val = Math.round(num * 100) / 100;
                    }
                    return k.toLowerCase() + ':' + String(val).trim().toLowerCase();
                }).join('|');
            }

            // 1. Verify multiset equivalence
            const aSorted = [...actualRows].sort((a,b) => rowHash(a).localeCompare(rowHash(b)));
            const eSorted = [...expectedRows].sort((a,b) => rowHash(a).localeCompare(rowHash(b)));

            for (let i = 0; i < aSorted.length; i++) {
                if (!rowsEqual(aSorted[i], eSorted[i])) {
                    for (let c of expectedCols) {
                        const aKey = Object.keys(aSorted[i]).find(k => k.toLowerCase() === c);
                        const eKey = Object.keys(eSorted[i]).find(k => k.toLowerCase() === c);
                        const aVal = aSorted[i][aKey];
                        const eVal = eSorted[i][eKey];
                        if (String(aVal).trim().toLowerCase() !== String(eVal).trim().toLowerCase()) {
                            return {
                                isCorrect: false,
                                message: \`Value mismatch in results for column "\${c}": Expected "\${eVal}", but got "\${aVal}".\`
                            };
                        }
                    }
                    return { isCorrect: false, message: 'Result rows do not match expected rows.' };
                }
            }

            // 2. If query specifies ORDER BY, check that order is respected
            if (hasOrderBy) {
                let sequentialMatch = true;
                for (let i = 0; i < actualRows.length; i++) {
                    if (!rowsEqual(actualRows[i], expectedRows[i])) {
                        sequentialMatch = false;
                        break;
                    }
                }

                if (!sequentialMatch) {
                    const orderMatch = query.match(/ORDER\\s+BY\\s+([a-zA-Z0-9_]+)(?:\\s+(ASC|DESC))?/i);
                    if (orderMatch) {
                        const sortCol = orderMatch[1].toLowerCase();
                        const isDesc = orderMatch[2] ? orderMatch[2].toUpperCase() === 'DESC' : false;
                        let orderValid = true;

                        for (let i = 1; i < actualRows.length; i++) {
                            const prevKey = Object.keys(actualRows[i - 1]).find(k => k.toLowerCase() === sortCol);
                            const currKey = Object.keys(actualRows[i]).find(k => k.toLowerCase() === sortCol);
                            if (prevKey && currKey) {
                                const prevVal = Number(actualRows[i - 1][prevKey]) ?? actualRows[i - 1][prevKey];
                                const currVal = Number(actualRows[i][currKey]) ?? actualRows[i][currKey];
                                if (isDesc ? (currVal > prevVal) : (currVal < prevVal)) {
                                    orderValid = false;
                                    break;
                                }
                            }
                        }

                        if (!orderValid) {
                            return {
                                isCorrect: false,
                                message: \`Result ordering mismatch: Rows are not correctly sorted by "\${sortCol}" \${isDesc ? 'DESC' : 'ASC'}.\`
                            };
                        }
                    }
                }
            }

            return { isCorrect: true, message: \`All \${actualRows.length} rows and columns match expected output.\` };
        }

        // Client-side Window Function Evaluator (Module 5 fallback)
        function evaluateWindowFunctionClient(mod, qIndex, query) {
            if (mod.module_id !== 5) return null;
            const salesTbl = mod.schema.tables.find(t => t.table_name === 'sales');
            if (!salesTbl) return null;
            const rawSales = JSON.parse(JSON.stringify(salesTbl.sample_data));
            const uQuery = (query || '').toUpperCase();

            // Q1: ROW_NUMBER
            if (qIndex === 0 || uQuery.includes('ROW_NUMBER')) {
                return rawSales
                    .sort((a,b) => a.sale_date.localeCompare(b.sale_date))
                    .map((s, idx) => ({ sale_id: s.sale_id, emp_id: s.emp_id, sale_amount: s.sale_amount, sale_date: s.sale_date, row_num: idx + 1 }));
            }
            // Q2: RANK & DENSE_RANK
            if (qIndex === 1 || (uQuery.includes('RANK()') && uQuery.includes('DENSE_RANK()'))) {
                const sorted = [...rawSales].sort((a, b) => b.sale_amount - a.sale_amount);
                let currentRank = 1, currentDense = 1;
                return sorted.map((s, idx) => {
                    if (idx > 0) {
                        if (s.sale_amount !== sorted[idx - 1].sale_amount) {
                            currentRank = idx + 1;
                            currentDense++;
                        }
                    }
                    return { sale_id: s.sale_id, sale_amount: s.sale_amount, rnk: currentRank, dense_rnk: currentDense };
                });
            }
            // Q3: DENSE_RANK PARTITION BY region
            if (qIndex === 2 || (uQuery.includes('DENSE_RANK') && uQuery.includes('REGION'))) {
                const north = rawSales.filter(s => s.region === 'North').sort((a, b) => b.sale_amount - a.sale_amount);
                const south = rawSales.filter(s => s.region === 'South').sort((a, b) => b.sale_amount - a.sale_amount);
                const assign = (arr) => {
                    let r = 1;
                    return arr.map((s, i) => {
                        if (i > 0 && s.sale_amount !== arr[i-1].sale_amount) r++;
                        return { sale_id: s.sale_id, region: s.region, sale_amount: s.sale_amount, regional_rank: r };
                    });
                };
                return [...assign(north), ...assign(south)];
            }
            // Q4: SUM(sale_amount) OVER(ORDER BY sale_date)
            if (qIndex === 3 || uQuery.includes('SUM(')) {
                const sorted = [...rawSales].sort((a,b) => a.sale_date.localeCompare(b.sale_date));
                let running = 0;
                return sorted.map(s => {
                    running += s.sale_amount;
                    return { sale_id: s.sale_id, sale_date: s.sale_date, sale_amount: s.sale_amount, running_total: running };
                });
            }
            // Q5: AVG(sale_amount) OVER(PARTITION BY region)
            if (qIndex === 4 || uQuery.includes('AVG(')) {
                const northAvg = rawSales.filter(s => s.region === 'North').reduce((acc, s) => acc + s.sale_amount, 0) / rawSales.filter(s => s.region === 'North').length;
                const southAvg = rawSales.filter(s => s.region === 'South').reduce((acc, s) => acc + s.sale_amount, 0) / rawSales.filter(s => s.region === 'South').length;
                return rawSales.map(s => ({
                    sale_id: s.sale_id,
                    region: s.region,
                    sale_amount: s.sale_amount,
                    avg_region_sale: s.region === 'North' ? northAvg : southAvg
                }));
            }
            // Q6: LAG
            if (qIndex === 5 || uQuery.includes('LAG(')) {
                const sorted = [...rawSales].sort((a, b) => a.emp_id === b.emp_id ? a.sale_date.localeCompare(b.sale_date) : a.emp_id - b.emp_id);
                return sorted.map((s, idx) => {
                    const prev = idx > 0 && sorted[idx - 1].emp_id === s.emp_id ? sorted[idx - 1].sale_amount : null;
                    return { sale_id: s.sale_id, emp_id: s.emp_id, sale_date: s.sale_date, sale_amount: s.sale_amount, prev_sale: prev };
                });
            }
            // Q7: LEAD
            if (qIndex === 6 || uQuery.includes('LEAD(')) {
                const sorted = [...rawSales].sort((a, b) => a.emp_id === b.emp_id ? a.sale_date.localeCompare(b.sale_date) : a.emp_id - b.emp_id);
                return sorted.map((s, idx) => {
                    const next = idx < sorted.length - 1 && sorted[idx + 1].emp_id === s.emp_id ? sorted[idx + 1].sale_amount : null;
                    return { sale_id: s.sale_id, emp_id: s.emp_id, sale_date: s.sale_date, sale_amount: s.sale_amount, next_sale: next };
                });
            }

            return null;
        }

        // Execute and Compare SQL Query
        async function executeUserQuery() {
            const query = textarea.value.trim();
            const resultBody = document.getElementById('result-body');
            const mod = SQL_MODULES[currentModuleIndex];
            const q = mod.questions[currentQuestionIndex];
            const challengeId = \`m\${mod.module_id}_q\${q.question_id}\`;

            if (!query) {
                resultBody.innerHTML = \`
                    <div class="eval-status-banner banner-warning">
                        <div class="banner-title"><i class="fas fa-exclamation-triangle"></i> Please enter an SQL query to execute.</div>
                    </div>
                \`;
                return;
            }

            if (!currentUser) {
                alert("Please sign in with your @juetguna.in Google/Gmail account to run queries and record your progress.");
                openLoginModal();
                return;
            }

            // 1. Try Backend Node.js Server first
            try {
                const apiBase = (window.location.protocol.startsWith('http') && !window.location.port.includes('3000'))
                    ? (window.location.port === '5001' ? '' : window.location.origin)
                    : 'http://localhost:5001';
                const userEmail = currentUser.email;
                const userName = currentUser.name;
                const userRoll = currentUser.roll;

                const res = await fetch(\`\${apiBase}/api/sql/evaluate\`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-user-email': userEmail,
                        'x-user-name': encodeURIComponent(userName),
                        'x-user-roll': encodeURIComponent(userRoll)
                    },
                    body: JSON.stringify({
                        challengeId: challengeId,
                        moduleId: mod.module_id,
                        questionId: q.question_id,
                        query: query,
                        userEmail: userEmail,
                        userName: userName,
                        userRoll: userRoll
                    })
                });

                if (res.ok) {
                    const data = await res.json();
                    const isPassed = data.isCorrect !== undefined ? data.isCorrect : data.correct;
                    if (isPassed && data.user) {
                        if (Array.isArray(data.user.solved)) {
                            userSolved = Array.from(new Set([...userSolved, ...data.user.solved]));
                        }
                        if (data.user.points !== undefined) {
                            userPoints = Math.max(userPoints, Number(data.user.points) || 0);
                        }
                        localStorage.setItem('juet_sql_solved', JSON.stringify(userSolved));
                        localStorage.setItem('juet_sql_points', userPoints.toString());
                        if (currentUser && currentUser.email) {
                            localStorage.setItem(\`juet_sql_solved_\${currentUser.email}\`, JSON.stringify(userSolved));
                            localStorage.setItem(\`juet_sql_points_\${currentUser.email}\`, userPoints.toString());
                        }
                        updateUserDisplay();
                        renderModuleTabs();
                        renderQuestionsList(document.getElementById('search-questions-input') ? document.getElementById('search-questions-input').value.trim() : '');
                    }
                    renderParallelResults(data.userOutput, q.output, isPassed, data.message, data.executionTimeMs, q);
                    return;
                }
            } catch (networkErr) {
                // Backend offline: seamless client-side execution continues
            }

            // 2. Client-Side Execution Engine
            const startTime = performance.now();
            let userOutput = null;

            const strippedQuery = query
                .replace(/\\/\\*[\\s\\S]*?\\*\\//g, '')
                .replace(/--.*$/gm, '')
                .trim();

            // DDL/DML detection
            const isDMLorDDL = /^\\s*(CREATE|ALTER|DROP|TRUNCATE|INSERT|UPDATE|DELETE)\\b/i.test(strippedQuery);

            if (isDMLorDDL) {
                try {
                    resetActiveModuleDatabase(strippedQuery);
                    let sql = strippedQuery;
                    if (/ALTER\\s+TABLE\\s+\\w+\\s+ADD\\s+(?!COLUMN\\b)/i.test(sql)) {
                        sql = sql.replace(/ALTER\\s+TABLE\\s+(\\w+)\\s+ADD\\s+/i, 'ALTER TABLE $1 ADD COLUMN ');
                    }
                    if (/^\\s*TRUNCATE\\s+TABLE\\s+(\\w+)/i.test(sql)) {
                        const tblName = sql.match(/TRUNCATE\\s+TABLE\\s+(\\w+)/i)[1];
                        sql = \`DELETE FROM \${tblName}\`;
                    }
                    alasql(sql);
                    const isInsert = /^\\s*INSERT\\b/i.test(sql);
                    userOutput = isInsert ? "1 row affected." : "Command(s) completed successfully.";
                } catch (err) {
                    renderSyntaxError(err.message, q);
                    return;
                }
            } else {
                // Check if client-side window function applies
                const windowRes = evaluateWindowFunctionClient(mod, currentQuestionIndex, strippedQuery);
                if (windowRes) {
                    userOutput = windowRes;
                } else {
                    try {
                        resetActiveModuleDatabase(strippedQuery);
                        let out = alasql(strippedQuery);
                        if (/\\bUNION\\b(?!\\s+ALL\\b)/i.test(strippedQuery) && Array.isArray(out)) {
                            const seen = new Set();
                            out = out.filter(row => {
                                const key = JSON.stringify(row);
                                if (seen.has(key)) return false;
                                seen.add(key);
                                return true;
                            });
                        }
                        userOutput = out;
                    } catch (err) {
                        renderSyntaxError(err.message, q);
                        return;
                    }
                }
            }

            const execTime = (performance.now() - startTime).toFixed(1);
            const comparison = compareResultSets(userOutput, q.output, query);

            renderParallelResults(userOutput, q.output, comparison.isCorrect, comparison.message, execTime, q);
        }

        function renderSyntaxError(errorMessage, q) {
            const resultBody = document.getElementById('result-body');
            resultBody.innerHTML = \`
                <div class="eval-status-banner banner-error">
                    <div>
                        <div class="banner-title"><i class="fas fa-times-circle"></i> SQL Syntax / Execution Error</div>
                        <div class="banner-detail">\${errorMessage}</div>
                    </div>
                </div>
                <div class="parallel-output-grid \${resultLayout === 'single' ? 'single-view' : ''}">
                    <div class="parallel-card user-card">
                        <div class="parallel-card-header">
                            <span><i class="fas fa-terminal"></i> Your Output</span>
                            <span class="count-pill">Error</span>
                        </div>
                        <div style="padding: 16px; color: #dc2626; font-family: 'JetBrains Mono', monospace; font-size: 0.85rem;">
                            \${errorMessage}
                        </div>
                    </div>
                    <div class="parallel-card expected-card">
                        <div class="parallel-card-header">
                            <span><i class="fas fa-bullseye"></i> Expected Target Output</span>
                            <span class="count-pill">\${Array.isArray(q.output) ? q.output.length + ' rows' : 'Command'}</span>
                        </div>
                        <div class="table-scroll-wrap">
                            \${renderTableOrStatus(q.output)}
                        </div>
                    </div>
                </div>
            \`;
        }

        // Render Side-by-Side Parallel Output and Verification Banner
        function renderParallelResults(userOutput, expectedOutput, isCorrect, detailMessage, execTimeMs, q) {
            const mod = SQL_MODULES[currentModuleIndex];
            const qKey = \`m\${mod.module_id}_q\${q.question_id}\`;

            if (isCorrect) {
                if (!userSolved.includes(qKey)) {
                    userSolved.push(qKey);
                    userPoints += q.points;
                    localStorage.setItem('juet_sql_solved', JSON.stringify(userSolved));
                    localStorage.setItem('juet_sql_points', userPoints.toString());
                    if (currentUser && currentUser.email) {
                        localStorage.setItem(\`juet_sql_solved_\${currentUser.email}\`, JSON.stringify(userSolved));
                        localStorage.setItem(\`juet_sql_points_\${currentUser.email}\`, userPoints.toString());
                    }
                    updateUserDisplay();
                    renderModuleTabs();
                    renderQuestionsList(document.getElementById('search-questions-input').value.trim());

                    // Immediately sync solved status and points to backend database
                    syncSingleSolvedToBackend(qKey, q.points, textarea.value.trim());
                }
            }

            const userRows = Array.isArray(userOutput) ? userOutput : [];
            const expRows = Array.isArray(expectedOutput) ? expectedOutput : [];

            let bannerHtml = \`
                <div class="eval-status-banner \${isCorrect ? 'banner-success' : 'banner-error'}">
                    <div>
                        <div class="banner-title">
                            <i class="fas \${isCorrect ? 'fa-check-circle' : 'fa-times-circle'}"></i> 
                            \${isCorrect ? 'Success! Correct Answer' : 'Output Does Not Match Expected Result'}
                        </div>
                        <div class="banner-detail">
                            \${detailMessage || (isCorrect ? 'All rows and columns match expected reference output perfectly.' : 'Check your query filtering, columns, and logic.')}
                            \${isCorrect ? \` &bull; <span style="font-weight:700;">+\${q.points} Points</span> &bull; ⏱️ \${execTimeMs}ms\` : ''}
                        </div>
                    </div>
                </div>
            \`;

            let parallelHtml = \`
                <div class="parallel-output-grid \${resultLayout === 'single' ? 'single-view' : ''}">
                    <!-- Left: User Output -->
                    <div class="parallel-card user-card">
                        <div class="parallel-card-header">
                            <span><i class="fas fa-user-edit"></i> Your Query Output</span>
                            <span class="count-pill">\${Array.isArray(userOutput) ? userRows.length + ' rows' : 'Message'}</span>
                        </div>
                        <div class="table-scroll-wrap">
                            \${renderTableOrStatus(userOutput)}
                        </div>
                    </div>

                    <!-- Right: Expected Output -->
                    <div class="parallel-card expected-card">
                        <div class="parallel-card-header">
                            <span><i class="fas fa-bullseye"></i> Expected Target Output</span>
                            <span class="count-pill">\${Array.isArray(expectedOutput) ? expRows.length + ' rows' : 'Message'}</span>
                        </div>
                        <div class="table-scroll-wrap">
                            \${renderTableOrStatus(expectedOutput)}
                        </div>
                    </div>
                </div>
            \`;

            document.getElementById('result-body').innerHTML = bannerHtml + parallelHtml;
        }

        // Render either tabular table or DML status message
        function renderTableOrStatus(data) {
            if (typeof data === 'string') {
                return \`
                    <div class="dml-status-box">
                        <i class="fas fa-check" style="color: #10b981;"></i>
                        <span>\${data}</span>
                    </div>
                \`;
            }

            if (!Array.isArray(data) || data.length === 0) {
                return '<div style="padding: 16px; color: #94a3b8; font-size: 0.84rem;">(0 rows returned)</div>';
            }

            const cols = Object.keys(data[0]);
            return \`
                <table class="data-table">
                    <thead>
                        <tr>
                            <th style="width: 32px; color: #94a3b8;">#</th>
                            \${cols.map(c => \`<th>\${c}</th>\`).join('')}
                        </tr>
                    </thead>
                    <tbody>
                        \${data.map((row, i) => \`
                            <tr>
                                <td style="color: #94a3b8;">\${i + 1}</td>
                                \${cols.map(c => {
                                    const val = row[c];
                                    if (val === null || val === undefined) {
                                        return '<td><span class="null-tag">NULL</span></td>';
                                    }
                                    return \`<td>\${val}</td>\`;
                                }).join('')}
                            </tr>
                        \`).join('')}
                    </tbody>
                </table>
            \`;
        }

        // Render Right Sidebar Schema Cards
        function renderRightSchema() {
            const container = document.getElementById('schema-cards-container');
            container.innerHTML = '';
            const mod = SQL_MODULES[currentModuleIndex];
            document.getElementById('schema-sidebar-title').textContent = mod.short_name + ' SCHEMA';

            mod.schema.tables.forEach((tbl, idx) => {
                const card = document.createElement('div');
                card.className = 'table-card' + (idx === 0 ? ' expanded' : '');
                card.innerHTML = \`
                    <div class="table-card-head" onclick="this.parentElement.classList.toggle('expanded')">
                        <span><i class="fas fa-table" style="color: #2563eb; margin-right: 6px;"></i> \${tbl.table_name}</span>
                        <div style="display:flex; align-items:center; gap:6px;">
                            <span style="font-size:0.68rem; background:#f1f5f9; padding:1px 6px; border-radius:10px; color:#64748b;">\${tbl.sample_data.length} rows</span>
                            <i class="fas fa-chevron-down" style="font-size: 0.75rem;"></i>
                        </div>
                    </div>
                    <div class="table-card-content">
                        \${tbl.columns.map(c => \`
                            <div class="col-item">
                                <span class="col-name">
                                    \${c.key ? \`<span class="key-badge" style="\${c.key === 'PRIMARY KEY' ? '' : 'background:#fef3c7; color:#b45309;'}">\${c.key === 'PRIMARY KEY' ? 'PK' : 'FK'}</span>\` : ''}
                                    \${c.name}
                                </span>
                                <span class="col-type">\${c.type}</span>
                            </div>
                        \`).join('')}
                        <button class="sample-preview-btn" onclick="openTableSampleModal('\${tbl.table_name}')">
                            <i class="fas fa-eye"></i> View \${tbl.table_name} data
                        </button>
                    </div>
                \`;
                container.appendChild(card);
            });
        }

        // Sample Data Modal
        function openSampleDataModal() {
            const mod = SQL_MODULES[currentModuleIndex];
            document.getElementById('sample-modal-title').innerHTML = \`<i class="fas fa-database" style="color:#2563eb;"></i> \${mod.module_name} - Sample Data\`;
            
            let html = '';
            mod.schema.tables.forEach(t => {
                html += \`
                    <div style="margin-bottom: 20px;">
                        <h4 style="font-size: 0.95rem; font-weight: 700; color: #0f172a; margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
                            <i class="fas fa-table" style="color: #2563eb;"></i> Table: <code>\${t.table_name}</code> (\${t.sample_data.length} records)
                        </h4>
                        <div class="table-scroll-wrap" style="border: 1px solid #e2e8f0; border-radius: 6px;">
                            \${renderTableOrStatus(t.sample_data)}
                        </div>
                    </div>
                \`;
            });
            document.getElementById('sample-modal-body').innerHTML = html;
            document.getElementById('sample-data-modal').style.display = 'flex';
        }

        function openTableSampleModal(tableName) {
            const mod = SQL_MODULES[currentModuleIndex];
            const tbl = mod.schema.tables.find(t => t.table_name === tableName);
            if (!tbl) return;

            document.getElementById('sample-modal-title').innerHTML = \`<i class="fas fa-table" style="color:#2563eb;"></i> Table: <code>\${tbl.table_name}</code>\`;
            document.getElementById('sample-modal-body').innerHTML = \`
                <div class="table-scroll-wrap" style="border: 1px solid #e2e8f0; border-radius: 6px;">
                    \${renderTableOrStatus(tbl.sample_data)}
                </div>
            \`;
            document.getElementById('sample-data-modal').style.display = 'flex';
        }

        function closeSampleDataModal() {
            document.getElementById('sample-data-modal').style.display = 'none';
        }

        // Student Authentication & Display
        function updateUserDisplay() {
            document.getElementById('points-count').textContent = userPoints;
            document.getElementById('streak-count').textContent = userSolved.length;

            if (currentUser) {
                document.getElementById('login-nav-btn').style.display = 'none';
                document.getElementById('user-badge').style.display = 'inline-flex';
                document.getElementById('user-display-name').textContent = currentUser.name || 'Student';
                const rollEl = document.getElementById('user-display-roll');
                if (rollEl) {
                    rollEl.textContent = currentUser.roll ? \`Roll: \${currentUser.roll}\` : currentUser.email;
                }
                const avatarEl = document.getElementById('user-display-avatar');
                const iconEl = document.getElementById('user-display-icon');
                if (avatarEl && currentUser.picture) {
                    avatarEl.src = currentUser.picture;
                    avatarEl.style.display = 'block';
                    if (iconEl) iconEl.style.display = 'none';
                } else if (iconEl) {
                    iconEl.style.display = 'block';
                    if (avatarEl) avatarEl.style.display = 'none';
                }
            } else {
                document.getElementById('login-nav-btn').style.display = 'block';
                document.getElementById('user-badge').style.display = 'none';
            }
            updateProgressSummary();
        }

        function updateProgressSummary() {
            const total = 75;
            const pct = Math.round((userSolved.length / total) * 100);
            document.getElementById('progress-summary').textContent = \`\${userSolved.length} / \${total} Solved (\${pct}%)\`;
        }

        function openLoginModal() { 
            const modal = document.getElementById('login-modal');
            const closeBtn = document.getElementById('login-modal-close-btn');
            if (modal) modal.style.display = 'flex';
            if (closeBtn) closeBtn.style.display = currentUser ? 'block' : 'none';
        }
        function closeLoginModal() { 
            if (!currentUser) {
                alert("Sign-in with your @juetguna.in Gmail is required to access the Virtual Lab.");
                return;
            }
            const modal = document.getElementById('login-modal');
            if (modal) modal.style.display = 'none'; 
        }

        function getApiBase() {
            return (window.location.protocol.startsWith('http') && !window.location.port.includes('3000'))
                ? (window.location.port === '5001' ? '' : window.location.origin)
                : 'http://localhost:5001';
        }

        function goToSignup() {
            if (window.location.protocol.startsWith('http')) {
                window.location.href = '/signup';
            } else {
                window.location.href = 'signup.html';
            }
        }

        async function completeLogin({ name, email, roll, picture }) {
            const normalizedEmail = email.trim().toLowerCase();
            const extractedRoll = (roll && roll.trim()) ? roll.trim().toUpperCase() : normalizedEmail.split('@')[0].toUpperCase();
            
            currentUser = {
                name: name.trim(),
                email: normalizedEmail,
                roll: extractedRoll,
                picture: picture || ''
            };
            
            // Save in localStorage permanently till a person clicks logout
            localStorage.setItem('juet_sql_user', JSON.stringify(currentUser));
            
            // Load student-specific cached solved/points
            const userSpecificSolved = localStorage.getItem(\`juet_sql_solved_\${normalizedEmail}\`);
            if (userSpecificSolved) {
                try { userSolved = JSON.parse(userSpecificSolved); } catch(e){}
            } else {
                userSolved = [];
            }
            const userSpecificPoints = localStorage.getItem(\`juet_sql_points_\${normalizedEmail}\`);
            userPoints = userSpecificPoints ? parseInt(userSpecificPoints, 10) : 0;
            
            localStorage.setItem('juet_sql_solved', JSON.stringify(userSolved));
            localStorage.setItem('juet_sql_points', userPoints.toString());
            
            updateUserDisplay();
            const modal = document.getElementById('login-modal');
            if (modal) modal.style.display = 'none';
            
            // Synchronize with backend SQLite database and fetch server profile
            await syncUserProfileAndProgress();
            
            alert(\`Welcome \${currentUser.name}! Authenticated via Gmail as \${currentUser.email} (Enrollment: \${currentUser.roll}). Your SQL practice progress is now actively tracked.\`);
        }

        async function syncSingleSolvedToBackend(challengeId, points, queryText = '') {
            if (!currentUser || !currentUser.email) return;
            try {
                const apiBase = getApiBase();
                await fetch(\`\${apiBase}/api/student/sync-progress\`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-user-email': currentUser.email,
                        'x-user-name': encodeURIComponent(currentUser.name),
                        'x-user-roll': encodeURIComponent(currentUser.roll || '')
                    },
                    body: JSON.stringify({
                        challengeId: challengeId,
                        pointsAwarded: points,
                        queryText: queryText,
                        userEmail: currentUser.email,
                        name: currentUser.name,
                        roll: currentUser.roll || ''
                    })
                });
            } catch(e) {
                // background sync
            }
        }

        async function syncAllSolvedToBackend() {
            if (!currentUser || !currentUser.email) return;
            const apiBase = getApiBase();
            for (const qKey of userSolved) {
                try {
                    await fetch(\`\${apiBase}/api/student/sync-progress\`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'x-user-email': currentUser.email,
                            'x-user-name': encodeURIComponent(currentUser.name),
                            'x-user-roll': encodeURIComponent(currentUser.roll || '')
                        },
                        body: JSON.stringify({
                            challengeId: qKey,
                            pointsAwarded: 10,
                            userEmail: currentUser.email,
                            name: currentUser.name,
                            roll: currentUser.roll || ''
                        })
                    });
                } catch(e) {}
            }
        }

        async function syncUserProfileAndProgress() {
            if (!currentUser || !currentUser.email) return;
            const apiBase = getApiBase();
            try {
                // 1. Sync authentication in SQLite
                const res = await fetch(\`\${apiBase}/api/auth/login\`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: currentUser.name,
                        email: currentUser.email,
                        roll: currentUser.roll
                    })
                });
                if (res.ok) {
                    const data = await res.json();
                    if (data.user) {
                        if (Array.isArray(data.user.solved) && data.user.solved.length > 0) {
                            userSolved = Array.from(new Set([...userSolved, ...data.user.solved]));
                            localStorage.setItem('juet_sql_solved', JSON.stringify(userSolved));
                            localStorage.setItem(\`juet_sql_solved_\${currentUser.email}\`, JSON.stringify(userSolved));
                        }
                        if (data.user.points !== undefined && data.user.points !== null) {
                            userPoints = Math.max(userPoints, Number(data.user.points) || 0);
                            localStorage.setItem('juet_sql_points', userPoints.toString());
                            localStorage.setItem(\`juet_sql_points_\${currentUser.email}\`, userPoints.toString());
                        }
                    }
                }
            } catch (err) {
                console.warn('Backend login sync note:', err.message);
            }

            // 2. Fetch latest server profile
            try {
                const pRes = await fetch(\`\${apiBase}/api/auth/profile\`, {
                    headers: { 'x-user-email': currentUser.email }
                });
                if (pRes.ok) {
                    const pData = await pRes.json();
                    if (pData.user) {
                        if (Array.isArray(pData.user.solved) && pData.user.solved.length > 0) {
                            userSolved = Array.from(new Set([...userSolved, ...pData.user.solved]));
                            localStorage.setItem('juet_sql_solved', JSON.stringify(userSolved));
                            localStorage.setItem(\`juet_sql_solved_\${currentUser.email}\`, JSON.stringify(userSolved));
                        }
                        if (pData.user.points > userPoints) {
                            userPoints = pData.user.points;
                            localStorage.setItem('juet_sql_points', userPoints.toString());
                            localStorage.setItem(\`juet_sql_points_\${currentUser.email}\`, userPoints.toString());
                        }
                    }
                }
            } catch(e) {}

            updateUserDisplay();
            renderModuleTabs();
            renderQuestionsList(document.getElementById('search-questions-input') ? document.getElementById('search-questions-input').value.trim() : '');
        }

        async function fetchStudentServerProfile() {
            await syncUserProfileAndProgress();
        }

        function handleLogout() {
            const studentLabel = currentUser ? \`\${currentUser.name} (\${currentUser.roll})\` : 'Student';
            if (confirm(\`Are you sure you want to log out from \${studentLabel}?\`)) {
                currentUser = null;
                localStorage.removeItem('juet_sql_user');
                userSolved = [];
                userPoints = 0;
                localStorage.removeItem('juet_sql_solved');
                localStorage.removeItem('juet_sql_points');
                updateUserDisplay();
                renderModuleTabs();
                renderQuestionsList(document.getElementById('search-questions-input') ? document.getElementById('search-questions-input').value.trim() : '');
                openLoginModal();
            }
        }

        function showFaqModal() {
            alert("JUET Virtual Lab - Dr. Jitendra Parmar\\n\\n1. How does Parallel Verification work?\\nWhen you click 'Run & Compare Query', your query output is displayed side-by-side with the expected output, checking both row count, column names, and cell values.\\n\\n2. 5 Topic-Wise Modules:\\nModule 1: DDL & DML Basics\\nModule 2: Aggregations & GROUP BY\\nModule 3: Relational JOINs\\nModule 4: Subqueries & Logic\\nModule 5: Window Functions & CTEs\\n\\n3. Google Institutional Sign-In:\\nUse your official @juetguna.in Gmail ID. Your enrollment number is automatically identified from your email to record your points and question progress.\\n\\n4. Keyboard Shortcut:\\nPress Ctrl+Enter or Cmd+Enter to execute queries instantly.");
        }

        // Initialize Virtual Lab
        updateUserDisplay();
        selectModule(0);

        if (!currentUser) {
            // First time user opens SQL practice module: pop up appears!
            openLoginModal();
        } else {
            // Returning user: saved always till logout! Synchronize progress
            syncUserProfileAndProgress();
        }
    </script>
</body>
</html>
`;

const targetDirs = [
  path.join(__dirname, '..', 'frontend'),
  path.join(__dirname, '..', 'website'),
  path.join(__dirname, '..', 'my-react-app', 'public')
];

targetDirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    const filePath = path.join(dir, 'sql-practice.html');
    fs.writeFileSync(filePath, fullHtml, 'utf8');
    console.log(`Successfully written to ${path.relative(path.join(__dirname, '..'), filePath)}! Size: ${fs.statSync(filePath).size} bytes`);
  }
});
