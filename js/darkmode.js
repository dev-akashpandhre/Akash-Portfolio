/**
 * ====================================================================
 * AKASH PORTFOLIO — THEME SWITCHER CONTROLLER (js/darkmode.js)
 * ====================================================================
 * Manages Dark and Light theme toggling with localStorage persistence,
 * system preference synchronization (prefers-color-scheme), and
 * accessible icon/label state updates. Default theme is Dark.
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle') || document.querySelector('.theme-toggle');
    const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i, svg') : null;
    const rootElement = document.documentElement;

    const THEME_STORAGE_KEY = 'akash_portfolio_theme';
    const THEME_DARK = 'dark';
    const THEME_LIGHT = 'light';

    /**
     * Updates icon and ARIA accessibility labels based on current theme.
     * @param {string} theme - 'dark' or 'light'
     */
    const updateThemeUI = (theme) => {
        if (!themeToggleBtn) return;

        const isDark = theme === THEME_DARK;

        themeToggleBtn.setAttribute('aria-label', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
        themeToggleBtn.setAttribute('title', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');

        if (themeIcon) {
            if (isDark) {
                // In dark mode, show sun icon to prompt switching to light
                themeIcon.className = 'fas fa-sun';
            } else {
                // In light mode, show moon icon to prompt switching to dark
                themeIcon.className = 'fas fa-moon';
            }
        }
    };

    /**
     * Applies the requested theme to document and updates persistence.
     * @param {string} theme - 'dark' or 'light'
     * @param {boolean} persist - Whether to save to localStorage
     */
    const applyTheme = (theme, persist = true) => {
        if (theme === THEME_LIGHT) {
            rootElement.setAttribute('data-theme', THEME_LIGHT);
            rootElement.classList.remove('dark-theme');
            rootElement.classList.add('light-theme');
        } else {
            rootElement.setAttribute('data-theme', THEME_DARK);
            rootElement.classList.remove('light-theme');
            rootElement.classList.add('dark-theme');
        }

        if (persist) {
            try {
                localStorage.setItem(THEME_STORAGE_KEY, theme);
            } catch (err) {
                console.warn('Unable to access localStorage for theme persistence:', err);
            }
        }

        updateThemeUI(theme);
    };

    /**
     * Resolves initial theme preference upon load.
     * Priority: 1. Saved localStorage -> 2. System preference -> 3. Default to Dark
     */
    const initTheme = () => {
        let savedTheme = null;
        try {
            savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
        } catch (err) {
            console.warn('LocalStorage unavailable:', err);
        }

        if (savedTheme === THEME_LIGHT || savedTheme === THEME_DARK) {
            applyTheme(savedTheme, false);
        } else {
            // Check system preference, otherwise default to dark
            const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            applyTheme(prefersDark ? THEME_DARK : THEME_DARK, false);
        }
    };

    // Initialize theme immediately
    initTheme();

    /**
     * Toggle button click event handler
     */
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = rootElement.getAttribute('data-theme') || THEME_DARK;
            const newTheme = currentTheme === THEME_DARK ? THEME_LIGHT : THEME_DARK;
            applyTheme(newTheme, true);
        });
    }

    /**
     * Listen for OS-level color scheme changes if user hasn't explicitly set a preference
     */
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
            let savedTheme = null;
            try {
                savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
            } catch (err) {
                // Ignore storage access errors
            }

            if (!savedTheme) {
                applyTheme(event.matches ? THEME_DARK : THEME_LIGHT, false);
            }
        });
    }
});