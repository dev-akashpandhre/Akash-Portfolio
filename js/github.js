/**
 * ====================================================================
 * AKASH PORTFOLIO — GITHUB API INTEGRATION (js/github.js)
 * ====================================================================
 * Fetches public profile statistics and latest repositories from the
 * GitHub REST API for user 'dev-akashpandhre'. Includes robust fallback
 * handling for API rate limits and network errors.
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const GITHUB_USERNAME = 'dev-akashpandhre';
    const API_USER_URL = `https://api.github.com/users/${dev-akashpandhre}`;
    const API_REPOS_URL = `https://api.github.com/users/${dev-akashpandhre}/repos?sort=updated&per_page=6`;

    // DOM Elements
    const reposContainer = document.getElementById('github-repos') || document.querySelector('.github-repos-grid');
    const profileStatsContainer = document.getElementById('github-stats') || document.querySelector('.github-stats-container');
    const loaderElement = document.getElementById('github-loader') || document.querySelector('.github-loader');

    if (!reposContainer && !profileStatsContainer) {
        return;
    }

    /**
     * Fallback repository dataset if API request fails or is rate-limited.
     */
    const fallbackRepos = [
        {
            name: '-Student-Performance-Analysis-Using-Python',
            description: 'Complete Data Analysis Project using Python, NumPy, Pandas, Matplotlib and Seaborn.',
            html_url: 'https://github.com/dev-akashpandhre/-Student-Performance-Analysis-Using-Python',
            language: 'Python',
            stargazers_count: 0,
            forks_count: 0
        },
        {
            name: 'SQL_Assignments_Akash',
            description: 'Solved SQL Assignment uploaded on GitHub for practical database learning.',
            html_url: 'https://github.com/dev-akashpandhre/SQL_Assignments_Akash',
            language: 'SQL',
            stargazers_count: 0,
            forks_count: 0
        }
    ];

    /**
     * Sanitizes strings to prevent potential XSS injection.
     * @param {string} str 
     * @returns {string}
     */
    const escapeHTML = (str) => {
        if (!str) return '';
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    };

    /**
     * Generates HTML markup for a single GitHub repository card.
     * @param {Object} repo 
     * @returns {string}
     */
    const createRepoCard = (repo) => {
        const repoName = escapeHTML(repo.name);
        const description = escapeHTML(repo.description) || 'No description provided.';
        const language = escapeHTML(repo.language) || 'Code';
        const stars = repo.stargazers_count || 0;
        const forks = repo.forks_count || 0;
        const url = escapeHTML(repo.html_url);

        return `
            <div class="github-card glass-card reveal">
                <div class="github-card-header">
                    <i class="fas fa-folder-open folder-icon" aria-hidden="true"></i>
                    <div class="github-card-links">
                        <a href="${url}" target="_blank" rel="noopener noreferrer" class="icon-link" aria-label="View repository on GitHub">
                            <i class="fab fa-github" aria-hidden="true"></i>
                        </a>
                    </div>
                </div>
                <h3 class="github-repo-title">
                    <a href="${url}" target="_blank" rel="noopener noreferrer">${repoName}</a>
                </h3>
                <p class="github-repo-desc">${description}</p>
                <div class="github-card-footer">
                    <span class="repo-lang"><span class="lang-dot"></span>${language}</span>
                    <div class="repo-meta">
                        <span><i class="far fa-star" aria-hidden="true"></i> ${stars}</span>
                        <span><i class="fas fa-code-branch" aria-hidden="true"></i> ${forks}</span>
                    </div>
                </div>
            </div>
        `;
    };

    /**
     * Renders user statistics (repos, followers, following).
     * @param {Object} userData 
     */
    const renderProfileStats = (userData) => {
        if (!profileStatsContainer) return;

        const publicRepos = userData.public_repos !== undefined ? userData.public_repos : 2;
        const followers = userData.followers !== undefined ? userData.followers : 0;
        const following = userData.following !== undefined ? userData.following : 0;

        profileStatsContainer.innerHTML = `
            <div class="stat-card glass-card">
                <i class="fas fa-code-branch stat-icon" aria-hidden="true"></i>
                <div class="stat-info">
                    <span class="stat-number">${publicRepos}</span>
                    <span class="stat-label">Public Repos</span>
                </div>
            </div>
            <div class="stat-card glass-card">
                <i class="fas fa-users stat-icon" aria-hidden="true"></i>
                <div class="stat-info">
                    <span class="stat-number">${followers}</span>
                    <span class="stat-label">Followers</span>
                </div>
            </div>
            <div class="stat-card glass-card">
                <i class="fas fa-user-friends stat-icon" aria-hidden="true"></i>
                <div class="stat-info">
                    <span class="stat-number">${following}</span>
                    <span class="stat-label">Following</span>
                </div>
            </div>
        `;
    };

    /**
     * Renders repository cards into grid container.
     * @param {Array} repos 
     */
    const renderRepos = (repos) => {
        if (!reposContainer) return;

        if (!repos || repos.length === 0) {
            reposContainer.innerHTML = `<p class="empty-message">No public repositories found.</p>`;
            return;
        }

        reposContainer.innerHTML = repos.map(createRepoCard).join('');
    };

    /**
     * Main GitHub Data Fetcher
     */
    const fetchGitHubData = async () => {
        if (loaderElement) {
            loaderElement.style.display = 'block';
        }

        try {
            // Fetch profile and repository data concurrently
            const [userResponse, reposResponse] = await Promise.all([
                fetch(API_USER_URL),
                fetch(API_REPOS_URL)
            ]);

            if (!userResponse.ok || !reposResponse.ok) {
                throw new Error(`GitHub API error: ${userResponse.status} / ${reposResponse.status}`);
            }

            const userData = await userResponse.json();
            const reposData = await reposResponse.json();

            renderProfileStats(userData);
            renderRepos(reposData);
        } catch (error) {
            console.warn('GitHub API request failed, loading verified fallback data:', error.message);
            // Render verified fallback data gracefully
            renderProfileStats({ public_repos: 2, followers: 0, following: 0 });
            renderRepos(fallbackRepos);
        } finally {
            if (loaderElement) {
                loaderElement.style.display = 'none';
            }
        }
    };

    fetchGitHubData();
});