// Custom Cursor with Multi-colored Dripping Effect
let cursor = document.querySelector('.cursor');
let cursorTrail = document.querySelector('.cursor-trail');
let particles = [];

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorTrail.style.left = e.clientX + 'px';
        cursorTrail.style.top = e.clientY + 'px';
    }, 100);
    
    // Create multi-colored dripping particles
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff'];
    
    if (Math.random() < 0.3) { // 30% chance to create particle
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = e.clientX + (Math.random() - 0.5) * 30 + 'px';
        particle.style.top = e.clientY + (Math.random() - 0.5) * 30 + 'px';
        particle.style.width = Math.random() * 4 + 2 + 'px';
        particle.style.height = Math.random() * 4 + 2 + 'px';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9997';
        particle.style.boxShadow = `0 0 ${Math.random() * 10 + 5}px ${particle.style.background}`;
        
        document.body.appendChild(particle);
        
        let life = 1;
        let x = parseFloat(particle.style.left);
        let y = parseFloat(particle.style.top);
        
        const animate = () => {
            life -= 0.03;
            y += 2; // Dripping effect
            x += (Math.random() - 0.5) * 0.5; // Slight horizontal drift
            
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.opacity = life;
            particle.style.transform = `scale(${life})`;
            
            if (life > 0) {
                requestAnimationFrame(animate);
            } else {
                document.body.removeChild(particle);
            }
        };
        
        requestAnimationFrame(animate);
    }
});

// White Starry Background
function createStars() {
    const starsContainer = document.querySelector('.stars-container');
    const numberOfStars = 150;
    
    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 2 + 's';
        star.style.animationDuration = (Math.random() * 3 + 2) + 's';
        starsContainer.appendChild(star);
    }
}

// Section Scroll Animation
function animateOnScroll() {
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Skills Accordion
function initSkillsAccordion() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        const header = card.querySelector('.card-header');
        
        header.addEventListener('click', () => {
            // Close all other cards
            skillCards.forEach(otherCard => {
                if (otherCard !== card) {
                    otherCard.classList.remove('active');
                }
            });
            
            // Toggle current card
            card.classList.toggle('active');
        });
    });
}

// Tooltip System
function initTooltips() {
    const tooltip = document.getElementById('tooltip');
    const skillItems = document.querySelectorAll('.skill-item[data-tooltip]');
    const socialLinks = document.querySelectorAll('.social-link[data-platform]');
    
    function showTooltip(element, text) {
        tooltip.textContent = text;
        tooltip.classList.add('show');
        
        const rect = element.getBoundingClientRect();
        tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
    }
    
    function hideTooltip() {
        tooltip.classList.remove('show');
    }
    
    // Skill item tooltips
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            showTooltip(item, item.getAttribute('data-tooltip'));
        });
        
        item.addEventListener('mouseleave', hideTooltip);
    });
    
    // Social link tooltips
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            const platform = link.getAttribute('data-platform');
            showTooltip(link, `Go to ${platform}`);
        });
        
        link.addEventListener('mouseleave', hideTooltip);
    });
}

// Project Cards Interaction
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const title = card.querySelector('.project-title');
        const sourceBtn = card.querySelector('.source-btn');
        
        // Add click handler to source button
        sourceBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            // Add your GitHub links here
            const projectType = card.getAttribute('data-project');
            let githubUrl = 'https://github.com/Devgaya-Goyal';
            
            switch(projectType) {
                case 'snake':
                    githubUrl += '/snake-game';
                    break;
                case 'cicd':
                    githubUrl += '/cicd-pipeline';
                    break;
                case 'mail':
                    githubUrl += '/mail-app';
                    break;
                case 'media':
                    githubUrl += '/media-access';
                    break;
            }
            
            window.open(githubUrl, '_blank');
        });
        
        // Add hover effects
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Social Links Interaction
function initSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Remove active class from all links
            socialLinks.forEach(otherLink => {
                otherLink.classList.remove('active');
            });
            
            // Add active class to clicked link
            link.classList.add('active');
            
            // Remove active class after 2 seconds
            setTimeout(() => {
                link.classList.remove('active');
            }, 2000);
        });
    });
}

// Name Title Animation
function initNameAnimation() {
    const nameTitle = document.getElementById('nameTitle');
    
    nameTitle.addEventListener('mouseenter', () => {
        nameTitle.style.transform = 'scale(1.05)';
    });
    
    nameTitle.addEventListener('mouseleave', () => {
        nameTitle.style.transform = 'scale(1)';
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createStars();
    animateOnScroll();
    initSkillsAccordion();
    initTooltips();
    initProjectCards();
    initSocialLinks();
    initNameAnimation();
    initSmoothScrolling();
    
    // Make hero section visible immediately
    document.querySelector('.hero-section').classList.add('visible');
});

// Add some interactive particles on click
document.addEventListener('click', (e) => {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'];
    
    for (let i = 0; i < 6; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = e.clientX + 'px';
        particle.style.top = e.clientY + 'px';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        
        document.body.appendChild(particle);
        
        const angle = (Math.PI * 2 * i) / 6;
        const velocity = 100;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        let x = e.clientX;
        let y = e.clientY;
        let opacity = 1;
        
        const animate = () => {
            x += vx * 0.02;
            y += vy * 0.02;
            opacity -= 0.02;
            
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                document.body.removeChild(particle);
            }
        };
        
        requestAnimationFrame(animate);
    }
});