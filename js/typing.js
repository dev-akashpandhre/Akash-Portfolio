/**
 * ====================================================================
 * AKASH PORTFOLIO — TYPING ANIMATION CONTROLLER (js/typing.js)
 * ====================================================================
 * Creates an interactive typewriter effect in the Hero section.
 * Cycles smoothly through defined roles and titles with configurable
 * typing, pausing, and deleting speeds.
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const typingElement = document.getElementById('typing-text') || document.querySelector('.typed-text');

    if (!typingElement) {
        return;
    }

    // Role strings to cycle through
    const roles = [
        'B.Sc. Computer Science Student',
        'Python & Data Analysis Enthusiast',
        'Frontend Developer'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    /**
     * Executes single character addition/deletion recursive loop.
     */
    const executeTypeEffect = () => {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            // Deleting state: remove trailing character
            typingElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50; // Faster deletion rate
        } else {
            // Typing state: append next character
            typingElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100; // Natural typing speed
        }

        // Full word typed out: pause before deleting
        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typeSpeed = 2000; // 2s pause at complete phrase
        } 
        // Word completely cleared: advance to next role
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 400; // Brief pause before starting next word
        }

        setTimeout(executeTypeEffect, typeSpeed);
    };

    // Initial trigger with slight delay to coordinate with preloader exit
    setTimeout(executeTypeEffect, 600);
});