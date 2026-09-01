/**
 * ====================================================================
 * AKASH PORTFOLIO — MAIN ORCHESTRATION SCRIPT (js/script.js)
 * ====================================================================
 * Coordinates dynamic data fetching (Projects, Skills, Certificates),
 * handles intelligent path prefixing for subpages ('pages/*.html'),
 * renders dynamic DOM elements with robust fallbacks, and manages
 * the dynamic footer copyright year.
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    // Dynamic Content Containers
    const featuredProjectsContainer = document.getElementById('featured-projects-grid');
    const allProjectsContainer = document.getElementById('all-projects-grid');
    const skillsContainer = document.getElementById('skills-grid');
    const certificatesContainer = document.getElementById('certificates-grid');
    const currentYearSpan = document.getElementById('current-year');

    /**
     * 1. PATH RESOLUTION HELPER
     * Automatically detects if the current document is in the 'pages/' subfolder
     * and prefixes relative asset and data paths with '../' accordingly.
     */
    const isSubpage = window.location.pathname.includes('/pages/') || 
                      window.location.href.includes('/pages/') ||
                      document.querySelector('script[src*="../js/"]');
    const pathPrefix = isSubpage ? '../' : '';

    /**
     * 2. AUTOMATIC FOOTER YEAR
     */
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    /**
     * 3. DATA FALLBACKS (Used when running via file:// or if fetch is blocked)
     */
    const fallbackProjects = [
        {
            title: "Student Performance Analysis Using Python",
            description: "Complete Data Analysis Project exploring academic performance indicators and score trends using Python, NumPy, Pandas, Matplotlib, and Seaborn.",
            technologies: ["Python", "NumPy", "Pandas", "Matplotlib", "Seaborn"],
            image: "assets/images/projects/student-analysis.png",
            github: "https://github.com/dev-akashpandhre/-Student-Performance-Analysis-Using-Python",
            demo: "",
            featured: true,
            category: "Data Analysis"
        },
        {
            title: "Smart Expense Tracker",
            description: "A smart web-based application designed to help users record, manage, categorize, and monitor daily expenses and income with user authentication, dashboards, and financial reports.",
            technologies: ["Python", "Flask", "HTML", "CSS", "JavaScript", "SQL"],
            image: "assets/images/projects/github-project.png",
            github: "https://github.com/dev-akashpandhre",
            demo: "",
            featured: true,
            category: "Web Development"
        },
        {
            title: "SQL Assignments",
            description: "Solved SQL assignments demonstrating practical relational database querying, schema structuring, table joins, and record management.",
            technologies: ["SQL", "Relational Databases"],
            image: "assets/images/projects/sql-assignment.png",
            github: "https://github.com/dev-akashpandhre/SQL_Assignments_Akash",
            demo: "",
            featured: true,
            category: "Database"
        }
    ];

    const fallbackSkills = [
        { name: "Python", category: "Programming & Data", icon: "fab fa-python", level: "Working Knowledge" },
        { name: "NumPy & Pandas", category: "Programming & Data", icon: "fas fa-table", level: "Working Knowledge" },
        { name: "Matplotlib & Seaborn", category: "Programming & Data", icon: "fas fa-chart-bar", level: "Working Knowledge" },
        { name: "SQL", category: "Database", icon: "fas fa-database", level: "Working Knowledge" },
        { name: "HTML5 & CSS3", category: "Frontend", icon: "fab fa-html5", level: "Proficient" },
        { name: "JavaScript", category: "Frontend", icon: "fab fa-js", level: "Working Knowledge" },
        { name: "Flask", category: "Backend", icon: "fas fa-server", level: "Learning" },
        { name: "Git & GitHub", category: "Tools", icon: "fab fa-git-alt", level: "Working Knowledge" },
        { name: "VS Code", category: "Tools", icon: "fas fa-laptop-code", level: "Proficient" }
    ];

    const fallbackCertificates = [];

    /**
     * Helper to safely escape strings for HTML rendering
     */
    const escapeStr = (str) => {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    };

    /**
     * Resolves asset paths dynamically based on current page location
     */
    const resolvePath = (filePath) => {
        if (!filePath) return '';
        if (filePath.startsWith('http://') || filePath.startsWith('https://') || filePath.startsWith('//')) {
            return filePath;
        }
        // Remove existing leading slash or relative dots if present, then prepend calculated prefix
        const cleanPath = filePath.replace(/^(\.\.\/|\.\/|\/)/, '');
        return `${pathPrefix}${cleanPath}`;
    };

    /**
     * 4. RENDER PROJECT CARDS
     */
    const renderProjectCard = (project) => {
        const title = escapeStr(project.title);
        const description = escapeStr(project.description);
        const rawImage = project.image || 'assets/images/projects/github-project.png';
        const image = resolvePath(rawImage);
        const defaultFallbackImage = resolvePath('assets/images/projects/github-project.png');
        const github = escapeStr(project.github);
        const demo = escapeStr(project.demo);
        const category = escapeStr(project.category || 'Project');

        const techBadges = Array.isArray(project.technologies)
            ? project.technologies.map(t => `<span class="tech-badge">${escapeStr(t)}</span>`).join('')
            : '';

        const demoBtn = demo
            ? `<a href="${demo}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline" aria-label="View live demo of ${title}"><i class="fas fa-external-link-alt"></i> Live Demo</a>`
            : '';

        const githubBtn = github
            ? `<a href="${github}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-primary" aria-label="View source code of ${title}"><i class="fab fa-github"></i> GitHub</a>`
            : '';

        return `
            <article class="project-card glass-card reveal">
                <div class="project-image-wrapper">
                    <img src="${image}" alt="${title} Preview Screenshot" class="project-img" loading="lazy" onerror="this.onerror=null; this.src='${defaultFallbackImage}'">
                    <span class="project-category-badge">${category}</span>
                </div>
                <div class="project-content">
                    <h3 class="project-title">${title}</h3>
                    <p class="project-desc">${description}</p>
                    <div class="project-tech-stack">
                        ${techBadges}
                    </div>
                    <div class="project-actions">
                        ${githubBtn}
                        ${demoBtn}
                    </div>
                </div>
            </article>
        `;
    };

    /**
     * 5. RENDER SKILLS CARDS
     */
    const renderSkillCard = (skill) => {
        const name = escapeStr(skill.name);
        const category = escapeStr(skill.category);
        const icon = escapeStr(skill.icon) || 'fas fa-code';
        const level = escapeStr(skill.level) || 'Familiar';

        return `
            <div class="skill-card glass-card reveal">
                <div class="skill-icon-wrap">
                    <i class="${icon}" aria-hidden="true"></i>
                </div>
                <div class="skill-info">
                    <h4 class="skill-name">${name}</h4>
                    <span class="skill-category">${category}</span>
                    <span class="skill-level">${level}</span>
                </div>
            </div>
        `;
    };

    /**
     * 6. RENDER CERTIFICATES
     */
    const renderCertificates = (certificates) => {
        if (!certificatesContainer) return;

        if (!certificates || certificates.length === 0) {
            certificatesContainer.innerHTML = `
                <div class="empty-state glass-card reveal">
                    <i class="fas fa-award empty-icon" aria-hidden="true"></i>
                    <p class="empty-text">Certificates will be added here as I complete relevant courses and certifications.</p>
                </div>
            `;
            return;
        }

        const defaultPlaceholder = resolvePath('assets/images/certificates/certificate-placeholder.png');

        certificatesContainer.innerHTML = certificates.map((cert) => {
            const title = escapeStr(cert.title);
            const issuer = escapeStr(cert.issuer);
            const date = escapeStr(cert.date);
            const rawImage = cert.image || 'assets/images/certificates/certificate-placeholder.png';
            const image = resolvePath(rawImage);
            const url = escapeStr(cert.url);

            return `
                <div class="certificate-card glass-card reveal">
                    <img src="${image}" alt="${title}" class="certificate-img" loading="lazy" onerror="this.onerror=null; this.src='${defaultPlaceholder}'">
                    <div class="certificate-body">
                        <h4 class="certificate-title">${title}</h4>
                        <p class="certificate-issuer">${issuer}</p>
                        <span class="certificate-date">${date}</span>
                        ${url ? `<a href="${url}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline">View Credential</a>` : ''}
                    </div>
                </div>
            `;
        }).join('');
    };

    /**
     * 7. ASYNCHRONOUS DATA LOADER
     */
    const loadPortfolioData = async () => {
        // Load Projects
        try {
            const res = await fetch(`${pathPrefix}data/projects.json`);
            if (!res.ok) throw new Error('Failed to fetch projects.json');
            const data = await res.json();
            const projects = Array.isArray(data) ? data : fallbackProjects;

            if (featuredProjectsContainer) {
                const featured = projects.filter(p => p.featured !== false);
                featuredProjectsContainer.innerHTML = (featured.length > 0 ? featured : projects).map(renderProjectCard).join('');
            }
            if (allProjectsContainer) {
                allProjectsContainer.innerHTML = projects.map(renderProjectCard).join('');
            }
        } catch (err) {
            console.info('Loading fallback projects dataset.');
            if (featuredProjectsContainer) {
                featuredProjectsContainer.innerHTML = fallbackProjects.map(renderProjectCard).join('');
            }
            if (allProjectsContainer) {
                allProjectsContainer.innerHTML = fallbackProjects.map(renderProjectCard).join('');
            }
        }

        // Load Skills
        try {
            const res = await fetch(`${pathPrefix}data/skills.json`);
            if (!res.ok) throw new Error('Failed to fetch skills.json');
            const skills = await res.json();
            if (skillsContainer) {
                skillsContainer.innerHTML = (Array.isArray(skills) ? skills : fallbackSkills).map(renderSkillCard).join('');
            }
        } catch (err) {
            console.info('Loading fallback skills dataset.');
            if (skillsContainer) {
                skillsContainer.innerHTML = fallbackSkills.map(renderSkillCard).join('');
            }
        }

        // Load Certificates
        try {
            const res = await fetch(`${pathPrefix}data/certificates.json`);
            if (!res.ok) throw new Error('Failed to fetch certificates.json');
            const certificates = await res.json();
            renderCertificates(certificates);
        } catch (err) {
            console.info('Loading default certificates state.');
            renderCertificates(fallbackCertificates);
        }
    };

    // Execute Data Loading
    loadPortfolioData();
});