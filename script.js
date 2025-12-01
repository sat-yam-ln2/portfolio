// Core Application Logic

document.addEventListener('DOMContentLoaded', () => {
    initStarfield();
    initTypewriter();
    initResearchSection();
    initCursorTrail();
    initScrollReveal();
    initSkillsConstellation();
    initEasterEggs();
    initOrbitalPhilosophy();
    initMissionControl();
    initAnalytics();
});

// --- Starfield Animation ---
function initStarfield() {
    const canvas = document.getElementById('starfield');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    // Star properties
    const stars = [];
    const starCount = 200;
    const speed = 0.2;

    class Star {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.z = Math.random() * width; // Depth
            this.size = Math.random() * 1.5;
            this.color = this.getRandomColor();
        }

        getRandomColor() {
            const colors = ['#ffffff', '#e0e0e0', '#cccccc', '#b0b0b0'];
            return colors[Math.floor(Math.random() * colors.length)];
        }

        update() {
            // Move star towards the viewer (simple 3D effect)
            // Or just simple parallax for now: move left
            this.x -= speed * (this.size * 0.5);

            // Reset if out of bounds
            if (this.x < 0) {
                this.x = width;
                this.y = Math.random() * height;
            }
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < starCount; i++) {
        stars.push(new Star());
    }

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Parallax effect based on mouse
        const centerX = width / 2;
        const centerY = height / 2;

        const moveX = (mouseX - centerX) * 0.0005;
        const moveY = (mouseY - centerY) * 0.0005;

        stars.forEach(star => {
            star.x += moveX * star.size;
            star.y += moveY * star.size;
        });
    });

    // Shooting stars
    function createShootingStar() {
        const shootingStar = document.createElement('div');
        shootingStar.className = 'shooting-star';
        shootingStar.style.top = Math.random() * 50 + '%';
        shootingStar.style.left = Math.random() * 100 + '%';
        shootingStar.style.animationDelay = Math.random() * 2 + 's';
        document.querySelector('.hero-section').appendChild(shootingStar);

        setTimeout(() => shootingStar.remove(), 3000);
    }

    // Create shooting stars periodically
    setInterval(createShootingStar, 3000);

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, width, height);

        stars.forEach(star => {
            star.update();
            star.draw();
        });

        // Draw constellation lines between nearby stars
        drawConstellations();

        requestAnimationFrame(animate);
    }

    function drawConstellations() {
        // Connect stars that are close to each other
        ctx.lineWidth = 0.2;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';

        for (let i = 0; i < stars.length; i++) {
            for (let j = i + 1; j < stars.length; j++) {
                const dx = stars[i].x - stars[j].x;
                const dy = stars[i].y - stars[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(stars[i].x, stars[i].y);
                    ctx.lineTo(stars[j].x, stars[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    animate();

    // Resize handler
    window.addEventListener('resize', () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    });
}

// --- Typewriter Effect ---
function initTypewriter() {
    const textElement = document.getElementById('typewriter');
    if (!textElement) return;

    const phrases = [
        "AI/ML RESEARCHER",
        "COSMIC ENGINEER",
        "MATHEMATICIAN",
        "PROBLEM SOLVER"
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            textElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            textElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500; // Pause before new phrase
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

// --- Research Section Interaction ---
function initResearchSection() {
    const planets = document.querySelectorAll('.planet');
    const title = document.getElementById('planet-title');
    const desc = document.getElementById('planet-desc');

    if (!title || !desc) return;

    const planetData = {
        'planet-1': { title: 'NEURAL NETWORKS', desc: 'Architectures, Optimization, Backpropagation' },
        'planet-2': { title: 'COMPUTATIONAL INTEL', desc: 'Evolutionary Algorithms, Swarm Intelligence' },
        'planet-3': { title: 'AI RESEARCH', desc: 'LLMs, Computer Vision, Reinforcement Learning' },
        'planet-4': { title: 'MATHEMATICS', desc: 'Linear Algebra, Calculus, Probability Theory' },
        'planet-5': { title: 'PHYSICS', desc: 'Quantum Mechanics, Thermodynamics, Relativity' },
        'planet-6': { title: 'SPACE SCIENCE', desc: 'Orbital Mechanics, Propulsion Systems' }
    };

    planets.forEach(planet => {
        planet.addEventListener('mouseenter', () => {
            // Find which planet class it has
            const planetClass = Array.from(planet.classList).find(c => c.startsWith('planet-'));
            if (planetData[planetClass]) {
                title.textContent = planetData[planetClass].title;
                desc.textContent = planetData[planetClass].desc;
                title.style.color = 'var(--accent-cyan)';
            }
        });

        planet.addEventListener('mouseleave', () => {
            title.textContent = 'EXPLORE THE SYSTEM';
            desc.textContent = 'Hover over planets to view research domains.';
            title.style.color = ''; // Reset color
        });
    });
}

// --- Cursor Trail Effect ---
function initCursorTrail() {
    const trails = [];
    const maxTrails = 15;
    const speedOfLight = '299792458'; // Speed of light digits
    let digitIndex = 0;

    document.addEventListener('mousemove', (e) => {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.left = e.clientX + 'px';
        trail.style.top = e.clientY + 'px';

        // Display the current digit from speed of light
        const currentDigit = speedOfLight[digitIndex % speedOfLight.length];
        trail.textContent = currentDigit;
        trail.style.fontSize = '12px';
        trail.style.fontFamily = 'var(--font-mono)';
        trail.style.color = 'var(--accent-cyan)';
        trail.style.display = 'flex';
        trail.style.alignItems = 'center';
        trail.style.justifyContent = 'center';
        trail.style.width = '20px';
        trail.style.height = '20px';

        document.body.appendChild(trail);
        trails.push(trail);
        digitIndex++;

        // Fade out and remove
        setTimeout(() => {
            trail.style.opacity = '0';
            trail.style.transform = 'scale(0)';
        }, 10);

        setTimeout(() => {
            trail.remove();
            trails.shift();
        }, 500);

        // Limit number of trails
        if (trails.length > maxTrails) {
            const oldTrail = trails.shift();
            if (oldTrail && oldTrail.parentNode) {
                oldTrail.remove();
            }
        }
    });
}

// --- Scroll Reveal Animation ---
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
}

// --- Skills Constellation Canvas ---
function initSkillsConstellation() {
    const canvas = document.getElementById('skills-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const container = canvas.parentElement;

    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;

    const nodes = [];
    const nodeCount = 30;

    class Node {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = 2;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }

        draw() {
            ctx.fillStyle = '#00F0FF';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < nodeCount; i++) {
        nodes.push(new Node());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw connections
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.1)';
        ctx.lineWidth = 1;

        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.stroke();
                }
            }
        }

        // Update and draw nodes
        nodes.forEach(node => {
            node.update();
            node.draw();
        });

        requestAnimationFrame(animate);
    }

    const title = document.getElementById('planet-title');
    const desc = document.getElementById('planet-desc');

    if (!title || !desc) return;

    const planetData = {
        'planet-1': { title: 'NEURAL NETWORKS', desc: 'Architectures, Optimization, Backpropagation' },
        'planet-2': { title: 'COMPUTATIONAL INTEL', desc: 'Evolutionary Algorithms, Swarm Intelligence' },
        'planet-3': { title: 'AI RESEARCH', desc: 'LLMs, Computer Vision, Reinforcement Learning' },
        'planet-4': { title: 'MATHEMATICS', desc: 'Linear Algebra, Calculus, Probability Theory' },
        'planet-5': { title: 'PHYSICS', desc: 'Quantum Mechanics, Thermodynamics, Relativity' },
        'planet-6': { title: 'SPACE SCIENCE', desc: 'Orbital Mechanics, Propulsion Systems' }
    };

    planets.forEach(planet => {
        planet.addEventListener('mouseenter', () => {
            // Find which planet class it has
            const planetClass = Array.from(planet.classList).find(c => c.startsWith('planet-'));
            if (planetData[planetClass]) {
                title.textContent = planetData[planetClass].title;
                desc.textContent = planetData[planetClass].desc;
                title.style.color = 'var(--accent-cyan)';
            }
        });

        planet.addEventListener('mouseleave', () => {
            title.textContent = 'EXPLORE THE SYSTEM';
            desc.textContent = 'Hover over planets to view research domains.';
            title.style.color = ''; // Reset color
        });
    });
}

// --- Cursor Trail Effect ---
function initCursorTrail() {
    const trails = [];
    const maxTrails = 15;
    const speedOfLight = '299792458'; // Speed of light digits
    let digitIndex = 0;

    document.addEventListener('mousemove', (e) => {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.left = e.clientX + 'px';
        trail.style.top = e.clientY + 'px';

        // Display the current digit from speed of light
        const currentDigit = speedOfLight[digitIndex % speedOfLight.length];
        trail.textContent = currentDigit;
        trail.style.fontSize = '12px';
        trail.style.fontFamily = 'var(--font-mono)';
        trail.style.color = 'var(--accent-cyan)';
        trail.style.display = 'flex';
        trail.style.alignItems = 'center';
        trail.style.justifyContent = 'center';
        trail.style.width = '20px';
        trail.style.height = '20px';

        document.body.appendChild(trail);
        trails.push(trail);
        digitIndex++;

        // Fade out and remove
        setTimeout(() => {
            trail.style.opacity = '0';
            trail.style.transform = 'scale(0)';
        }, 10);

        setTimeout(() => {
            trail.remove();
            trails.shift();
        }, 500);

        // Limit number of trails
        if (trails.length > maxTrails) {
            const oldTrail = trails.shift();
            if (oldTrail && oldTrail.parentNode) {
                oldTrail.remove();
            }
        }
    });
}

// --- Scroll Reveal Animation ---
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
}

// --- Skills Constellation Canvas ---
function initSkillsConstellation() {
    const canvas = document.getElementById('skills-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const container = canvas.parentElement;

    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;

    const nodes = [];
    const nodeCount = 30;

    class Node {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = 2;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }

        draw() {
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < nodeCount; i++) {
        nodes.push(new Node());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw connections
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 1;

        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.stroke();
                }
            }
        }

        // Update and draw nodes
        nodes.forEach(node => {
            node.update();
            node.draw();
        });

        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', () => {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
    });
}

// --- Easter Eggs ---
function initEasterEggs() {
    // Easter Egg 1: Speed of Light Code (299792458)
    const speedOfLightCode = '299792458'; // Speed of light in m/s
    let speedOfLightInput = '';
    let speedOfLightTimeout;

    // Easter Egg 2: General Relativity (E=mc²) - Type "emc2"
    const relativityCode = 'emc2';
    let relativityInput = '';
    let relativityTimeout;

    document.addEventListener('keydown', (e) => {
        const key = e.key.toLowerCase();

        // Check Speed of Light Code (numbers only)
        if (e.key >= '0' && e.key <= '9') {
            speedOfLightInput += e.key;

            clearTimeout(speedOfLightTimeout);
            speedOfLightTimeout = setTimeout(() => {
                speedOfLightInput = '';
            }, 2000);

            if (speedOfLightInput === speedOfLightCode) {
                activateSpeedOfLight();
                speedOfLightInput = '';
            } else if (speedOfLightInput.length >= speedOfLightCode.length) {
                speedOfLightInput = '';
            }
        }

        // Check General Relativity Code (letters and numbers)
        if ((key >= 'a' && key <= 'z') || (key >= '0' && key <= '9')) {
            relativityInput += key;

            clearTimeout(relativityTimeout);
            relativityTimeout = setTimeout(() => {
                relativityInput = '';
            }, 2000);

            if (relativityInput === relativityCode) {
                activateGeneralRelativity();
                relativityInput = '';
            } else if (relativityInput.length >= relativityCode.length) {
                relativityInput = '';
            }
        }
    });

    function activateSpeedOfLight() {
        console.log('⚡ SPEED OF LIGHT ACTIVATED! c = 299,792,458 m/s ⚡');

        document.body.style.animation = 'speed-of-light 3s ease-in-out';

        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(45deg, #fff, #00F0FF, #FFB627);
            color: #000;
            padding: 3rem 4rem;
            border-radius: 8px;
            font-family: var(--font-mono);
            font-size: 2rem;
            font-weight: 700;
            z-index: 10000;
            box-shadow: 0 0 100px rgba(255, 255, 255, 1);
            animation: speed-of-light 3s ease-in-out;
            text-align: center;
        `;
        notification.innerHTML = `
            ⚡ LIGHT SPEED! ⚡<br>
            <span style="font-size: 1.2rem;">c = 299,792,458 m/s</span>
        `;
        document.body.appendChild(notification);

        // Create light burst effect
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const burst = document.createElement('div');
                burst.className = 'shooting-star';
                burst.style.top = Math.random() * 100 + '%';
                burst.style.left = Math.random() * 100 + '%';
                burst.style.animationDuration = '0.5s';
                document.body.appendChild(burst);
                setTimeout(() => burst.remove(), 500);
            }, i * 50);
        }
        setTimeout(() => {
            document.body.style.animation = '';
            notification.remove();
        }, 3000);
    }

    function activateGeneralRelativity() {
        console.log('🌌 GENERAL RELATIVITY ACTIVATED! E = mc² 🌌');

        // Apply time dilation effect
        document.body.style.animation = 'time-dilation 4s ease-in-out';

        // Create Einstein's equation notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #1a1f3a, #2d1b4e, #1a1f3a);
            color: #fff;
            padding: 4rem 5rem;
            border-radius: 12px;
            font-family: 'Georgia', serif;
            font-size: 3rem;
            font-weight: 400;
            z-index: 10000;
            box-shadow: 0 0 80px rgba(138, 43, 226, 0.6);
            animation: time-dilation 4s ease-in-out;
            text-align: center;
            border: 2px solid rgba(138, 43, 226, 0.5);
        `;
        notification.innerHTML = `
            <div style="font-size: 1rem; color: var(--accent-purple); margin-bottom: 1rem; font-family: var(--font-mono);">GENERAL RELATIVITY</div>
            <div style="font-style: italic; margin-bottom: 1rem;">E = mc²</div>
            <div style="font-size: 0.9rem; color: var(--text-secondary); font-family: var(--font-mono);">Mass-Energy Equivalence</div>
            <div style="font-size: 0.7rem; color: var(--text-muted); margin-top: 1rem; font-family: var(--font-mono);">- Albert Einstein, 1905</div>
        `;
        document.body.appendChild(notification);

        // Create spacetime curvature effect (warping grid lines)
        const gridOverlay = document.createElement('div');
        gridOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: 
                linear-gradient(rgba(138, 43, 226, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(138, 43, 226, 0.1) 1px, transparent 1px);
            background-size: 50px 50px;
            z-index: 9999;
            pointer-events: none;
            animation: spacetime-warp 4s ease-in-out;
        `;
        document.body.appendChild(gridOverlay);

        // Add spacetime warp animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes spacetime-warp {
                0%, 100% { 
                    transform: perspective(1000px) rotateX(0deg);
                    opacity: 0;
                }
                25% {
                    opacity: 0.8;
                    transform: perspective(1000px) rotateX(5deg) scale(1.02);
                }
                50% { 
                    opacity: 1;
                    transform: perspective(1000px) rotateX(-5deg) scale(0.98);
                }
                75% {
                    opacity: 0.8;
                    transform: perspective(1000px) rotateX(3deg) scale(1.01);
                }
            }
        `;
        document.head.appendChild(style);

        setTimeout(() => {
            document.body.style.animation = '';
            notification.remove();
            gridOverlay.remove();
            style.remove();
        }, 4000);
    }
}

// --- Orbital Philosophy Canvas ---
function initOrbitalPhilosophy() {
    const canvas = document.getElementById('philosophy-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const container = canvas.parentElement;

    function resizeCanvas() {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
    }
    resizeCanvas();

    // Particle system for connecting energy beams
    const particles = [];
    const particleCount = 50;

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const angle = Math.random() * Math.PI * 2;
            const distance = 50 + Math.random() * 250;
            
            this.x = centerX + Math.cos(angle) * distance;
            this.y = centerY + Math.sin(angle) * distance;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2 + 0.5;
            this.alpha = Math.random() * 0.5 + 0.2;
            this.color = this.getRandomColor();
            this.life = Math.random() * 100 + 50;
            this.maxLife = this.life;
        }

        getRandomColor() {
            const colors = ['#ffffff', '#e0e0e0', '#cccccc', '#b0b0b0'];
            return colors[Math.floor(Math.random() * colors.length)];
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.life--;

            // Fade out as life decreases
            this.alpha = (this.life / this.maxLife) * 0.5;

            if (this.life <= 0) {
                this.reset();
            }

            // Boundary check
            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                this.reset();
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.alpha;
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    // Draw connections between nearby particles
    function drawConnections() {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 80) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 80)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }

            // Connect particles to center
            const dxCenter = particles[i].x - centerX;
            const dyCenter = particles[i].y - centerY;
            const distCenter = Math.sqrt(dxCenter * dxCenter + dyCenter * dyCenter);

            if (distCenter < 100) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(centerX, centerY);
                ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 * (1 - distCenter / 100)})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update and draw particles
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        // Draw connections
        drawConnections();

        requestAnimationFrame(animate);
    }

    animate();

    // Handle resize
    window.addEventListener('resize', resizeCanvas);
}

// ===== MISSION CONTROL ANALYTICS DASHBOARD =====

// Analytics Storage
const ANALYTICS_KEY = 'portfolio_analytics';
const SPACE_CACHE_KEY = 'portfolio_space_cache';

function getAnalytics() {
    const stored = localStorage.getItem(ANALYTICS_KEY);
    if (stored) {
        return JSON.parse(stored);
    }
    return {
        visits: 0,
        dailyVisits: {},
        lastVisit: null,
        sessionTimes: [],
        currentSessionStart: null,
        sectionsViewed: {
            hero: 0,
            philosophy: 0,
            research: 0,
            education: 0,
            contact: 0
        },
        easterEggsFound: [],
        maxScrollDepth: 0,
        activityLog: []
    };
}

function saveAnalytics(data) {
    localStorage.setItem(ANALYTICS_KEY, JSON.stringify(data));
}

function getSpaceCache() {
    const stored = localStorage.getItem(SPACE_CACHE_KEY);
    if (stored) {
        return JSON.parse(stored);
    }
    return {
        apod: null,
        apodDate: null,
        launch: null,
        launchFetched: null
    };
}

function saveSpaceCache(data) {
    localStorage.setItem(SPACE_CACHE_KEY, JSON.stringify(data));
}

// Initialize Analytics Tracking
function initAnalytics() {
    const analytics = getAnalytics();
    
    // Increment visit count
    const today = new Date().toISOString().split('T')[0];
    if (analytics.lastVisit !== today) {
        analytics.visits++;
        analytics.dailyVisits[today] = (analytics.dailyVisits[today] || 0) + 1;
    }
    analytics.lastVisit = today;
    analytics.currentSessionStart = Date.now();
    
    // Log activity
    addActivity('visit', 'New session started');
    
    saveAnalytics(analytics);
    
    // Track section views with Intersection Observer
    trackSectionViews();
    
    // Track scroll depth
    trackScrollDepth();
    
    // Save session time on page unload
    window.addEventListener('beforeunload', () => {
        const analytics = getAnalytics();
        if (analytics.currentSessionStart) {
            const sessionTime = Math.floor((Date.now() - analytics.currentSessionStart) / 1000);
            analytics.sessionTimes.push(sessionTime);
            // Keep only last 20 sessions
            if (analytics.sessionTimes.length > 20) {
                analytics.sessionTimes.shift();
            }
            saveAnalytics(analytics);
        }
    });
}

function trackSectionViews() {
    const sections = document.querySelectorAll('section[id]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const analytics = getAnalytics();
                const sectionId = entry.target.id;
                if (analytics.sectionsViewed[sectionId] !== undefined) {
                    analytics.sectionsViewed[sectionId]++;
                    saveAnalytics(analytics);
                }
            }
        });
    }, { threshold: 0.3 });
    
    sections.forEach(section => observer.observe(section));
}

function trackScrollDepth() {
    let maxScroll = 0;
    
    window.addEventListener('scroll', () => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = Math.round((window.scrollY / scrollHeight) * 100);
        
        if (scrollPercent > maxScroll) {
            maxScroll = scrollPercent;
            const analytics = getAnalytics();
            analytics.maxScrollDepth = Math.max(analytics.maxScrollDepth, scrollPercent);
            saveAnalytics(analytics);
        }
    });
}

function addActivity(type, text) {
    const analytics = getAnalytics();
    const activity = {
        type,
        text,
        timestamp: Date.now()
    };
    analytics.activityLog.unshift(activity);
    // Keep only last 50 activities
    if (analytics.activityLog.length > 50) {
        analytics.activityLog.pop();
    }
    saveAnalytics(analytics);
}

function recordEasterEgg(eggId) {
    const analytics = getAnalytics();
    if (!analytics.easterEggsFound.includes(eggId)) {
        analytics.easterEggsFound.push(eggId);
        saveAnalytics(analytics);
        addActivity('easter', 'Easter egg #' + eggId + ' discovered!');
    }
}

// Mission Control Panel
function initMissionControl() {
    const btn = document.getElementById('mission-control-btn');
    const panel = document.getElementById('mission-control-panel');
    const closeBtn = document.getElementById('close-panel');
    const minimizeBtn = document.getElementById('minimize-panel');
    const tabs = document.querySelectorAll('.panel-tab');
    const tabContents = document.querySelectorAll('.tab-content');
    const exportBtn = document.getElementById('export-data');
    const resetBtn = document.getElementById('reset-stats');
    const apodViewBtn = document.getElementById('apod-view');
    const apodModal = document.getElementById('apod-modal');
    const apodModalClose = document.getElementById('apod-modal-close');
    
    let panelOpen = false;
    let updateIntervals = [];
    
    // Open panel
    btn.addEventListener('click', () => {
        panel.classList.add('open');
        panelOpen = true;
        btn.style.display = 'none';
        updateDashboard();
        startUpdates();
        // Reinitialize icons in panel
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    });
    
    // Close panel
    closeBtn.addEventListener('click', closePanel);
    minimizeBtn.addEventListener('click', closePanel);
    
    function closePanel() {
        panel.classList.remove('open');
        panelOpen = false;
        btn.style.display = 'flex';
        stopUpdates();
    }
    
    // Tab switching
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;
            
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            tab.classList.add('active');
            document.getElementById('tab-' + tabName).classList.add('active');
            
            if (tabName === 'space') {
                loadSpaceData();
            }
        });
    });
    
    // Export data
    exportBtn.addEventListener('click', () => {
        const analytics = getAnalytics();
        const dataStr = JSON.stringify(analytics, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'portfolio_analytics.json';
        a.click();
        URL.revokeObjectURL(url);
        addActivity('export', 'Analytics data exported');
    });
    
    // Reset stats
    resetBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to reset all analytics? This cannot be undone.')) {
            localStorage.removeItem(ANALYTICS_KEY);
            localStorage.removeItem(SPACE_CACHE_KEY);
            updateDashboard();
            addActivity('reset', 'Analytics reset');
        }
    });
    
    // APOD Modal
    apodViewBtn.addEventListener('click', () => {
        apodModal.classList.add('open');
    });
    
    apodModalClose.addEventListener('click', () => {
        apodModal.classList.remove('open');
    });
    
    apodModal.addEventListener('click', (e) => {
        if (e.target === apodModal) {
            apodModal.classList.remove('open');
        }
    });
    
    // Easter egg: typing "mission control" opens panel
    let typedChars = '';
    document.addEventListener('keydown', (e) => {
        typedChars += e.key.toLowerCase();
        if (typedChars.includes('mission control')) {
            if (!panelOpen) {
                btn.click();
            }
            typedChars = '';
            recordEasterEgg(10);
        }
        if (typedChars.length > 20) {
            typedChars = typedChars.slice(-15);
        }
    });
    
    function startUpdates() {
        // Update time every second
        updateIntervals.push(setInterval(updateTimeZones, 1000));
        // Update dashboard every 30 seconds
        updateIntervals.push(setInterval(updateDashboard, 30000));
    }
    
    function stopUpdates() {
        updateIntervals.forEach(interval => clearInterval(interval));
        updateIntervals = [];
    }
}

function updateDashboard() {
    const analytics = getAnalytics();
    
    // Visitor count
    document.getElementById('visitor-count').textContent = analytics.visits.toLocaleString();
    
    // Today's visitors
    const today = new Date().toISOString().split('T')[0];
    const todayVisits = analytics.dailyVisits[today] || 0;
    document.getElementById('today-visitors').textContent = todayVisits;
    
    // Average session time
    if (analytics.sessionTimes.length > 0) {
        const avgSeconds = Math.round(analytics.sessionTimes.reduce((a, b) => a + b, 0) / analytics.sessionTimes.length);
        const mins = Math.floor(avgSeconds / 60);
        const secs = avgSeconds % 60;
        document.getElementById('avg-session').textContent = mins + 'm ' + secs + 's';
        document.getElementById('session-progress').style.width = Math.min(avgSeconds / 300 * 100, 100) + '%';
    }
    
    // Section views
    const totalViews = Object.values(analytics.sectionsViewed).reduce((a, b) => a + b, 0);
    if (totalViews > 0) {
        const sectionBars = document.querySelectorAll('.section-bar');
        sectionBars.forEach(bar => {
            const sectionName = bar.querySelector('.bar-fill').dataset.section;
            const views = analytics.sectionsViewed[sectionName] || 0;
            const percent = Math.round((views / totalViews) * 100);
            bar.querySelector('.bar-fill').style.width = percent + '%';
            bar.querySelector('.bar-percent').textContent = percent + '%';
        });
    }
    
    // Scroll depth
    const scrollDepth = analytics.maxScrollDepth;
    document.getElementById('scroll-fill').style.width = scrollDepth + '%';
    document.getElementById('scroll-rocket').style.left = scrollDepth + '%';
    document.getElementById('scroll-percent').textContent = scrollDepth + '%';
    
    // Scroll messages
    let scrollMessage = 'Start exploring!';
    if (scrollDepth >= 100) scrollMessage = 'You reached the stars!';
    else if (scrollDepth >= 75) scrollMessage = 'Almost to the cosmos!';
    else if (scrollDepth >= 50) scrollMessage = 'Halfway through the journey!';
    else if (scrollDepth >= 25) scrollMessage = 'Keep scrolling, explorer!';
    document.getElementById('scroll-message').textContent = scrollMessage;
    
    // Sparkline (last 7 days)
    updateSparkline(analytics);
    
    // Easter eggs
    updateEasterEggs(analytics);
    
    // Activity feed
    updateActivityFeed(analytics);
}

function updateSparkline(analytics) {
    const container = document.getElementById('visitor-sparkline');
    container.innerHTML = '';
    
    const dates = [];
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        dates.push(date.toISOString().split('T')[0]);
    }
    
    const values = dates.map(d => analytics.dailyVisits[d] || 0);
    const maxVal = Math.max(...values, 1);
    
    values.forEach(val => {
        const bar = document.createElement('div');
        bar.className = 'sparkline-bar';
        bar.style.height = ((val / maxVal) * 100) + '%';
        container.appendChild(bar);
    });
}

function updateEasterEggs(analytics) {
    const container = document.getElementById('easter-eggs');
    container.innerHTML = '';
    
    const totalEggs = 6;
    const found = analytics.easterEggsFound || [];
    
    for (let i = 1; i <= totalEggs; i++) {
        const slot = document.createElement('div');
        slot.className = 'egg-slot' + (found.includes(i) ? ' unlocked' : '');
        slot.textContent = found.includes(i) ? '!' : '?';
        slot.title = found.includes(i) ? 'Unlocked!' : 'Secret #' + i;
        container.appendChild(slot);
    }
    
    document.getElementById('eggs-count').textContent = found.length + ' / ' + totalEggs + ' unlocked';
}

function updateActivityFeed(analytics) {
    const container = document.getElementById('activity-list');
    container.innerHTML = '';
    
    const activities = analytics.activityLog.slice(0, 20);
    
    if (activities.length === 0) {
        container.innerHTML = '<div class="activity-item"><div class="activity-content"><div class="activity-text">No activity yet</div></div></div>';
        return;
    }
    
    activities.forEach(activity => {
        const item = document.createElement('div');
        item.className = 'activity-item';
        
        const icons = {
            visit: '^',
            easter: '!',
            scroll: 'v',
            export: '>',
            reset: 'x'
        };
        
        const timeAgo = getTimeAgo(activity.timestamp);
        
        item.innerHTML = 
            '<div class="activity-icon">' + (icons[activity.type] || '*') + '</div>' +
            '<div class="activity-content">' +
                '<div class="activity-text">' + activity.text + '</div>' +
                '<div class="activity-time">' + timeAgo + '</div>' +
            '</div>';
        
        container.appendChild(item);
    });
}

function getTimeAgo(timestamp) {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return Math.floor(seconds / 60) + ' min ago';
    if (seconds < 86400) return Math.floor(seconds / 3600) + ' hours ago';
    return Math.floor(seconds / 86400) + ' days ago';
}

function updateTimeZones() {
    const now = new Date();
    
    // NPT (Nepal Time - UTC+5:45)
    const nptOffset = 5 * 60 + 45;
    const npt = new Date(now.getTime() + (nptOffset + now.getTimezoneOffset()) * 60000);
    document.getElementById('time-npt').textContent = formatTime(npt);
    
    // UTC
    const utc = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
    document.getElementById('time-utc').textContent = formatTime(utc);
    
    // EST (UTC-5)
    const estOffset = -5 * 60;
    const est = new Date(now.getTime() + (estOffset + now.getTimezoneOffset()) * 60000);
    document.getElementById('time-est').textContent = formatTime(est);
}

function formatTime(date) {
    return date.toLocaleTimeString('en-US', { hour12: false });
}

// Space Data Loading
async function loadSpaceData() {
    // Load ISS position
    loadISSPosition();
    
    // Load SpaceX launch
    loadSpaceXLaunch();
    
    // Load NASA APOD
    loadAPOD();
    
    // Load Weather (using a simple approach since we don't have API key)
    updateWeather();
}

async function loadISSPosition() {
    try {
        const response = await fetch('http://api.open-notify.org/iss-now.json');
        const data = await response.json();
        
        if (data.message === 'success') {
            document.getElementById('iss-lat').textContent = parseFloat(data.iss_position.latitude).toFixed(4) + ' deg';
            document.getElementById('iss-lon').textContent = parseFloat(data.iss_position.longitude).toFixed(4) + ' deg';
        }
    } catch (error) {
        console.log('ISS API unavailable');
        document.getElementById('iss-lat').textContent = 'API unavailable';
        document.getElementById('iss-lon').textContent = '--';
    }
}

async function loadSpaceXLaunch() {
    const cache = getSpaceCache();
    const now = Date.now();
    
    // Use cache if less than 1 hour old
    if (cache.launch && cache.launchFetched && (now - cache.launchFetched) < 3600000) {
        displayLaunchData(cache.launch);
        return;
    }
    
    try {
        const response = await fetch('https://api.spacexdata.com/v5/launches/next');
        const data = await response.json();
        
        cache.launch = data;
        cache.launchFetched = now;
        saveSpaceCache(cache);
        
        displayLaunchData(data);
    } catch (error) {
        console.log('SpaceX API unavailable');
        document.getElementById('launch-name').textContent = 'API unavailable';
        document.getElementById('launch-countdown').textContent = '--';
    }
}

function displayLaunchData(data) {
    document.getElementById('launch-name').textContent = data.name || 'Unknown Mission';
    document.getElementById('launch-site').textContent = data.launchpad || '--';
    
    if (data.date_unix) {
        const launchDate = new Date(data.date_unix * 1000);
        const now = new Date();
        const diff = launchDate - now;
        
        if (diff > 0) {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            
            document.getElementById('launch-countdown').textContent = 'T-' + days + 'd ' + hours + 'h ' + mins + 'm';
            
            // Progress bar (assume 30 day window)
            const totalWindow = 30 * 24 * 60 * 60 * 1000;
            const elapsed = totalWindow - diff;
            const progress = Math.min((elapsed / totalWindow) * 100, 100);
            document.getElementById('launch-progress').style.width = Math.max(progress, 0) + '%';
        } else {
            document.getElementById('launch-countdown').textContent = 'Launched!';
            document.getElementById('launch-progress').style.width = '100%';
        }
    }
}

async function loadAPOD() {
    const cache = getSpaceCache();
    const today = new Date().toISOString().split('T')[0];
    
    // Use cache if from today
    if (cache.apod && cache.apodDate === today) {
        displayAPOD(cache.apod);
        return;
    }
    
    // NASA APOD requires API key - we'll use a demo approach
    // In production, you'd use your own API key
    try {
        const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY');
        const data = await response.json();
        
        cache.apod = data;
        cache.apodDate = today;
        saveSpaceCache(cache);
        
        displayAPOD(data);
    } catch (error) {
        console.log('NASA APOD API unavailable');
        document.getElementById('apod-title').textContent = 'API unavailable';
    }
}

function displayAPOD(data) {
    const imageContainer = document.getElementById('apod-image');
    
    if (data.media_type === 'image') {
        imageContainer.innerHTML = '<img src="' + data.url + '" alt="' + data.title + '">';
    } else {
        imageContainer.innerHTML = '<div class="apod-placeholder">Video content</div>';
    }
    
    document.getElementById('apod-title').textContent = data.title || '--';
    
    // Modal data
    document.getElementById('apod-modal-img').src = data.hdurl || data.url;
    document.getElementById('apod-modal-title').textContent = data.title;
    document.getElementById('apod-modal-desc').textContent = data.explanation;
}

function updateWeather() {
    // Simple static weather display since we don't have API key
    // In production, you'd use OpenWeather API
    document.getElementById('weather-temp').textContent = '--';
    document.getElementById('weather-desc').textContent = 'API key required';
    document.getElementById('sunrise').textContent = 'Sunrise: ~6:30 AM';
    document.getElementById('sunset').textContent = 'Sunset: ~5:30 PM';
}
