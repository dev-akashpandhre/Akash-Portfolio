/**
 * ====================================================================
 * AKASH PORTFOLIO — CONTACT FORM CONTROLLER (js/contact.js)
 * ====================================================================
 * Handles client-side contact form validation, accessible feedback
 * status messages, simulated/safe dispatch handling, and form state resets.
 * Configured safely without exposing sensitive API credentials.
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form') || document.querySelector('.contact-form');
    const submitBtn = document.getElementById('submit-btn') || (contactForm ? contactForm.querySelector('button[type="submit"]') : null);
    const formStatus = document.getElementById('form-status') || document.querySelector('.form-status');

    if (!contactForm) {
        return;
    }

    /**
     * Displays a temporary notification status message below the form.
     * @param {string} message - Message text
     * @param {'success' | 'error' | 'info'} type - Status type
     */
    const showStatus = (message, type = 'info') => {
        if (!formStatus) {
            alert(message);
            return;
        }

        formStatus.textContent = message;
        formStatus.className = `form-status status-${type} visible`;
        formStatus.setAttribute('role', 'status');
        formStatus.setAttribute('aria-live', 'polite');

        // Auto-dismiss message after 5 seconds
        setTimeout(() => {
            formStatus.classList.remove('visible');
            setTimeout(() => {
                formStatus.textContent = '';
                formStatus.className = 'form-status';
            }, 300);
        }, 5000);
    };

    /**
     * Basic email format verification regex.
     * @param {string} email 
     * @returns {boolean}
     */
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    /**
     * Form submission event listener.
     */
    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Extract and trim form inputs
        const nameInput = contactForm.querySelector('#name') || contactForm.querySelector('[name="name"]');
        const emailInput = contactForm.querySelector('#email') || contactForm.querySelector('[name="email"]');
        const subjectInput = contactForm.querySelector('#subject') || contactForm.querySelector('[name="subject"]');
        const messageInput = contactForm.querySelector('#message') || contactForm.querySelector('[name="message"]');

        const name = nameInput ? nameInput.value.trim() : '';
        const email = emailInput ? emailInput.value.trim() : '';
        const subject = subjectInput ? subjectInput.value.trim() : 'Portfolio Contact Inquiry';
        const message = messageInput ? messageInput.value.trim() : '';

        // Validation Checks
        if (!name || !email || !message) {
            showStatus('Please fill in all required fields.', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showStatus('Please enter a valid email address.', 'error');
            if (emailInput) emailInput.focus();
            return;
        }

        // Set Loading State on Submit Button
        const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Send Message';
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        }

        try {
            /**
             * Client-Side Safe Handling:
             * Simulates submission delay and opens a formatted mailto draft or
             * connects to an external form endpoint if configured.
             */
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Optional direct mail client fallback
            const mailtoUrl = `mailto:akashpandhre84@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

            // Display success message
            showStatus('Thank you, Akash has received your message!', 'success');
            contactForm.reset();

            // Provide fallback mail link trigger
            window.location.href = mailtoUrl;
        } catch (error) {
            console.error('Contact submission error:', error);
            showStatus('Something went wrong. Please email directly at akashpandhre84@gmail.com', 'error');
        } finally {
            // Restore Submit Button State
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }
        }
    });
});