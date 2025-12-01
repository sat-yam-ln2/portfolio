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
            const colors = ['#ffffff', '#E8EDF2', '#00F0FF', '#FFB627'];
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
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.15)';

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
            const colors = ['#00F0FF', '#FF6B35', '#B537F2', '#FFB627'];
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
                    ctx.strokeStyle = `rgba(0, 240, 255, ${0.1 * (1 - distance / 80)})`;
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
                ctx.strokeStyle = `rgba(0, 240, 255, ${0.15 * (1 - distCenter / 100)})`;
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
