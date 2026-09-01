/**
 * ====================================================================
 * AKASH PORTFOLIO — PRELOADER CONTROLLER (js/loader.js)
 * ====================================================================
 * Manages the initial page loading screen. Ensures smooth entrance
 * animations, disables background scrolling during load, and features
 * a safety timeout fallback to prevent UI locking.
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader') || document.querySelector('.loader-wrapper');
    const body = document.body;

    // If no preloader element exists in the markup, exit early
    if (!preloader) {
        return;
    }

    // Lock page scrolling while the preloader is visible
    body.classList.add('no-scroll');
    preloader.setAttribute('aria-busy', 'true');

    /**
     * Dismisses the preloader with a smooth fade transition.
     */
    const hidePreloader = () => {
        if (preloader.classList.contains('loaded') || preloader.classList.contains('fade-out')) {
            return;
        }

        preloader.classList.add('fade-out');
        preloader.setAttribute('aria-busy', 'false');
        preloader.setAttribute('aria-hidden', 'true');

        // Restore scrolling to the body
        body.classList.remove('no-scroll');

        // Remove element from layout flow after transition completes
        const handleTransitionEnd = () => {
            preloader.style.display = 'none';
            preloader.removeEventListener('transitionend', handleTransitionEnd);
        };

        preloader.addEventListener('transitionend', handleTransitionEnd);

        // Fallback cleanup if transitionend fails to fire
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 600);
    };

    // Primary trigger: Window load event (all assets loaded)
    window.addEventListener('load', hidePreloader);

    // Safety fallback trigger: Force dismiss after 3 seconds if assets hang
    setTimeout(hidePreloader, 3000);
});