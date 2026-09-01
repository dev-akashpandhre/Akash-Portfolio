/**
 * ====================================================================
 * AKASH PORTFOLIO — NAVIGATION CONTROLLER (js/navbar.js)
 * ====================================================================
 * Handles responsive mobile navigation drawer, glassmorphic header
 * scroll effects, active link highlighting (ScrollSpy), and keyboard
 * accessibility controls.
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    // Core Navigation Elements
    const header = document.querySelector('.header') || document.querySelector('header');
    const navToggle = document.getElementById('nav-toggle') || document.querySelector('.nav-toggle');
    const navMenu = document.getElementById('nav-menu') || document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    /**
     * 1. MOBILE MENU CONTROLLER
     */
    const openMenu = () => {
        if (!navMenu || !navToggle) return;
        navMenu.classList.add('active');
        navToggle.classList.add('active');
        navToggle.setAttribute('aria-expanded', 'true');
        document.body.classList.add('menu-open');
    };

    const closeMenu = () => {
        if (!navMenu || !navToggle) return;
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
    };

    const toggleMenu = () => {
        if (!navMenu) return;
        const isOpen = navMenu.classList.contains('active');
        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    };

    // Toggle button click event
    if (navToggle) {
        navToggle.addEventListener('click', (event) => {
            event.stopPropagation();
            toggleMenu();
        });
    }

    // Close menu when clicking on any navigation link
    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    // Close menu when clicking outside the navigation menu
    document.addEventListener('click', (event) => {
        if (!navMenu || !navToggle) return;
        const isClickInside = navMenu.contains(event.target) || navToggle.contains(event.target);
        if (!isClickInside && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });

    // Keyboard accessibility: Close mobile menu with Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            closeMenu();
            if (navToggle) {
                navToggle.focus();
            }
        }
    });

    /**
     * 2. SCROLLED HEADER EFFECT
     * Adds glassmorphic elevation styling on page scroll
     */
    const handleHeaderScroll = () => {
        if (!header) return;
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
    handleHeaderScroll(); // Initial check on page load

    /**
     * 3. SCROLLSPY (ACTIVE LINK HIGHLIGHTER)
     * Highlights the active navigation link based on current section visibility
     */
    if ('IntersectionObserver' in window && sections.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -60% 0px',
            threshold: 0
        };

        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const activeId = entry.target.getAttribute('id');

                    navLinks.forEach((link) => {
                        const href = link.getAttribute('href');
                        if (href === `#${activeId}` || href.endsWith(`#${activeId}`)) {
                            link.classList.add('active');
                            link.setAttribute('aria-current', 'page');
                        } else if (href && href.startsWith('#')) {
                            link.classList.remove('active');
                            link.removeAttribute('aria-current');
                        }
                    });
                }
            });
        };

        const scrollSpyObserver = new IntersectionObserver(observerCallback, observerOptions);
        sections.forEach((section) => scrollSpyObserver.observe(section));
    }
});