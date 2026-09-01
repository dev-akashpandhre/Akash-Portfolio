/**
 * ====================================================================
 * AKASH PORTFOLIO — INTERACTIVE PARTICLES SYSTEM (js/particles.js)
 * ====================================================================
 * Renders an optimized HTML5 Canvas network animation featuring
 * floating particle nodes, dynamic connection lines, and interactive
 * mouse proximity effects matching the blue-purple accent palette.
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('particles-canvas') || document.querySelector('.particles-canvas');

    if (!canvas) {
        return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = 0;
    let height = 0;
    let particles = [];

    // Configuration parameters
    const config = {
        particleCount: 45,
        maxDistance: 120,
        particleRadius: 2,
        baseSpeed: 0.6,
        primaryColor: 'rgba(99, 102, 241, ',   // Indigo/Blue accent
        secondaryColor: 'rgba(168, 85, 247, ' // Purple accent
    };

    // Mouse coordinates tracker
    const mouse = {
        x: null,
        y: null,
        radius: 140
    };

    /**
     * Resizes canvas to match container or viewport dimensions.
     */
    const resizeCanvas = () => {
        const parent = canvas.parentElement;
        width = canvas.width = parent ? parent.clientWidth : window.innerWidth;
        height = canvas.height = parent ? parent.clientHeight : window.innerHeight;
    };

    /**
     * Particle Node Constructor
     */
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * config.baseSpeed;
            this.vy = (Math.random() - 0.5) * config.baseSpeed;
            this.radius = Math.random() * config.particleRadius + 1;
            this.color = Math.random() > 0.5 ? config.primaryColor : config.secondaryColor;
            this.alpha = Math.random() * 0.5 + 0.3;
        }

        update() {
            // Screen edge bounce
            if (this.x + this.vx > width || this.x + this.vx < 0) {
                this.vx = -this.vx;
            }
            if (this.y + this.vy > height || this.y + this.vy < 0) {
                this.vy = -this.vy;
            }

            this.x += this.vx;
            this.y += this.vy;

            // Interactive mouse repulsion
            if (mouse.x !== null && mouse.y !== null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouse.radius) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const maxDistance = mouse.radius;
                    const force = (maxDistance - distance) / maxDistance;
                    const directionX = forceDirectionX * force * 1.5;
                    const directionY = forceDirectionY * force * 1.5;

                    this.x -= directionX;
                    this.y -= directionY;
                }
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.fillStyle = `${this.color}${this.alpha})`;
            ctx.fill();
        }
    }

    /**
     * Instantiates particles array.
     */
    const initParticles = () => {
        particles = [];
        // Adjust particle density based on screen resolution
        const count = width < 768 ? Math.floor(config.particleCount / 2) : config.particleCount;
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    };

    /**
     * Connects neighboring particles within distance threshold.
     */
    const connectParticles = () => {
        const length = particles.length;
        for (let a = 0; a < length; a++) {
            for (let b = a + 1; b < length; b++) {
                const dx = particles[a].x - particles[b].x;
                const dy = particles[a].y - particles[b].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < config.maxDistance) {
                    const opacity = (1 - dist / config.maxDistance) * 0.25;
                    ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})`;
                    ctx.lineWidth = 0.8;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    };

    /**
     * Main animation loop.
     */
    const animate = () => {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }

        connectParticles();
        animationFrameId = requestAnimationFrame(animate);
    };

    // Event listeners
    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });

    window.addEventListener('mousemove', (event) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = event.clientX - rect.left;
        mouse.y = event.clientY - rect.top;
    });

    window.addEventListener('mouseout', () => {
        mouse.x = null;
        mouse.y = null;
    });

    // Pause canvas loop when tab is hidden to conserve CPU/battery
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(animationFrameId);
        } else {
            animate();
        }
    });

    // Initialize system
    resizeCanvas();
    initParticles();
    animate();
});