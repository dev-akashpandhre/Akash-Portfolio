/**
 * ====================================================================
 * AKASH PORTFOLIO — SCROLL CONTROLLER (js/scroll.js)
 * ====================================================================
 * Handles scroll reveal animations via IntersectionObserver, smooth
 * offset scrolling for anchor links, scroll reading progress bar,
 * and the floating Back-to-Top button behavior.
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const backToTopBtn = document.getElementById('back-to-top') || document.querySelector('.back-to-top');
    const progressBar = document.getElementById('scroll-progress') || document.querySelector('.scroll-progress');
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    const revealElements = document.querySelectorAll('.reveal, .fade-in, .slide-up, .slide-left, .slide-right');

    /**
     * 1. SCROLL PROGRESS & BACK-TO-TOP VISIBILITY
     */
    const handleScrollEvents = () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

        // Update progress bar width if present
        if (progressBar && scrollHeight > 0) {
            const scrollPercentage = Math.min((scrollTop / scrollHeight) * 100, 100);
            progressBar.style.width = `${scrollPercentage}%`;
        }

        // Toggle back-to-top button visibility
        if (backToTopBtn) {
            if (scrollTop > 300) {
                backToTopBtn.classList.add('visible');
                backToTopBtn.setAttribute('aria-hidden', 'false');
            } else {
                backToTopBtn.classList.remove('visible');
                backToTopBtn.setAttribute('aria-hidden', 'true');
            }
        }
    };

    window.addEventListener('scroll', handleScrollEvents, { passive: true });
    handleScrollEvents(); // Initial run on page load

    /**
     * 2. BACK-TO-TOP CLICK ACTION
     */
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', (event) => {
            event.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /**
     * 3. SMOOTH OFFSET SCROLLING FOR ANCHOR LINKS
     * Accounts for fixed header height dynamically
     */
    anchorLinks.forEach((anchor) => {
        anchor.addEventListener('click', (event) => {
            const targetId = anchor.getAttribute('href');

            // Skip empty links or bare hashes
            if (!targetId || targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                event.preventDefault();

                const header = document.querySelector('.header') || document.querySelector('header');
                const headerOffset = header ? header.offsetHeight : 70;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Update URL hash without jumping
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                }
            }
        });
    });

    /**
     * 4. SCROLL REVEAL ANIMATIONS (IntersectionObserver)
     */
    if ('IntersectionObserver' in window && revealElements.length > 0) {
        const revealOptions = {
            root: null,
            rootMargin: '0px 0px -50px 0px',
            threshold: 0.15
        };

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // Stop observing once animated
                    observer.unobserve(entry.target);
                }
            });
        }, revealOptions);

        revealElements.forEach((el) => revealObserver.observe(el));
    } else {
        // Fallback for older browsers: show elements immediately
        revealElements.forEach((el) => el.classList.add('active'));
    }
});