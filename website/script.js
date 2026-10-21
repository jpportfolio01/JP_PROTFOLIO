// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Handle external page navigation
const externalLinks = document.querySelectorAll('a[href$=".html"]');
externalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Add loading state or transition effect here if needed
        const href = link.getAttribute('href');
        console.log(`Navigating to ${href}`);
    });
});

// Smooth scrolling for navigation links
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

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.research-card, .contact-item, .about-description, .education-item, .access-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect on page load
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title .gradient-text');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 50);
    }
});

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
        heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Contact form functionality (if needed in the future)
function handleContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Handle form submission here
            alert('Thank you for your message! Dr. Jitendra Parmar will get back to you soon.');
        });
    }
}

// Initialize contact form
document.addEventListener('DOMContentLoaded', handleContactForm);

// Smooth reveal animation for cards
function revealCards() {
    const cards = document.querySelectorAll('.research-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 150);
    });
}

// Counter animation for statistics (if needed)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Initialize all animations
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in animation to hero elements
    const heroElements = document.querySelectorAll('.hero-text > *');
    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    // Initialize profile image animation
    const profileImg = document.querySelector('.profile-img');
    if (profileImg) {
        profileImg.style.opacity = '0';
        profileImg.style.transform = 'scale(0.8)';
        profileImg.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
            profileImg.style.opacity = '1';
            profileImg.style.transform = 'scale(1)';
        }, 800);
    }
});

// Preloader functionality
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// Back to top button
function createBackToTopButton() {
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.className = 'back-to-top';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        opacity: 0;
        transform: translateY(100px);
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
    `;
    
    document.body.appendChild(backToTop);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.transform = 'translateY(0)';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.transform = 'translateY(100px)';
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    backToTop.addEventListener('mouseenter', () => {
        backToTop.style.transform = 'translateY(-5px) scale(1.1)';
    });
    
    backToTop.addEventListener('mouseleave', () => {
        backToTop.style.transform = 'translateY(0) scale(1)';
    });
}

// Initialize back to top button
document.addEventListener('DOMContentLoaded', createBackToTopButton);

// ===============================================================
// SECRET DYNAMIC CLICK ADMIN PORTAL TRIGGER ON "GET IN TOUCH"
// ===============================================================
function initAdminSecretTrigger() {
    let clickCount = 0;
    let resetTimer = null;
    let requiredClicks = parseInt(localStorage.getItem('juet_admin_trigger_clicks') || '8', 10);

    // Fetch dynamic trigger clicks setting from backend
    async function fetchClickCountSetting() {
        try {
            const apiBase = (window.location.protocol.startsWith('http') && (window.location.port === '5001' || window.location.port === ''))
                ? ''
                : 'http://localhost:5001';
            const res = await fetch(`${apiBase}/api/admin/settings`);
            if (res.ok) {
                const data = await res.json();
                if (data.triggerClickCount) {
                    requiredClicks = data.triggerClickCount;
                    localStorage.setItem('juet_admin_trigger_clicks', requiredClicks.toString());
                }
            }
        } catch(e) {}
    }
    fetchClickCountSetting();

    function handleTriggerClick(e) {
        if (e && e.stopPropagation) {
            e.stopPropagation();
        }
        clickCount++;
        if (resetTimer) clearTimeout(resetTimer);
        resetTimer = setTimeout(() => {
            clickCount = 0;
        }, 5000);

        if (clickCount >= requiredClicks) {
            clickCount = 0;
            openAdminGatewayModal();
        }
    }

    // Attach to any element containing "Get In Touch" or section-title in #contact
    const contactHeadings = document.querySelectorAll('#contact .section-title, a[href="#contact"], .contact-title');
    contactHeadings.forEach(el => {
        el.style.cursor = 'pointer';
        el.addEventListener('click', handleTriggerClick);
    });

    // Also monitor general clicks on any text containing "Get in touch" as fallback
    document.addEventListener('click', (e) => {
        if (e.target.closest('#contact .section-title, a[href="#contact"], .contact-title')) {
            return; // Already handled by element listener
        }
        const targetText = (e.target.textContent || '').trim().toLowerCase();
        if (targetText.includes('get in touch')) {
            handleTriggerClick(e);
        }
    });
}

function openAdminGatewayModal() {
    let modal = document.getElementById('adminGatewayModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'adminGatewayModal';
        modal.style.cssText = `
            position: fixed;
            inset: 0;
            background: rgba(15, 23, 42, 0.85);
            backdrop-filter: blur(8px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 99999;
            padding: 20px;
        `;
        modal.innerHTML = `
            <div style="background: #ffffff; border-radius: 16px; width: 100%; max-width: 420px; padding: 32px 28px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); text-align: center; position: relative;">
                <button id="closeAdminGatewayBtn" style="position: absolute; top: 16px; right: 16px; background: none; border: none; font-size: 1.4rem; color: #94a3b8; cursor: pointer;">&times;</button>
                <div style="width: 56px; height: 56px; border-radius: 14px; background: #eef2ff; color: #4f46e5; display: inline-flex; align-items: center; justify-content: center; font-size: 1.5rem; margin-bottom: 16px;">
                    <i class="fas fa-user-shield"></i>
                </div>
                <h2 style="font-size: 1.35rem; font-weight: 800; color: #0f172a; margin-bottom: 6px;">Admin Portal Access</h2>
                <p style="font-size: 0.84rem; color: #64748b; margin-bottom: 22px;">Faculty administrative verification for Dr. Jitendra Parmar</p>
                <form id="gatewayLoginForm" style="text-align: left;">
                    <div style="margin-bottom: 14px;">
                        <label style="display: block; font-size: 0.8rem; font-weight: 600; color: #334155; margin-bottom: 6px;">User Name</label>
                        <input type="text" id="gwUser" required placeholder="adminparmar" style="width: 100%; padding: 10px 12px; border: 1.5px solid #cbd5e1; border-radius: 8px; font-size: 0.95rem; outline: none;">
                    </div>
                    <div style="margin-bottom: 16px;">
                        <label style="display: block; font-size: 0.8rem; font-weight: 600; color: #334155; margin-bottom: 6px;">Password</label>
                        <input type="password" id="gwPass" required placeholder="Enter password" style="width: 100%; padding: 10px 12px; border: 1.5px solid #cbd5e1; border-radius: 8px; font-size: 0.95rem; outline: none;">
                    </div>
                    <button type="submit" style="width: 100%; background: linear-gradient(135deg, #4f46e5, #4338ca); color: white; border: none; padding: 12px; border-radius: 8px; font-weight: 700; font-size: 0.95rem; cursor: pointer;">
                        <i class="fas fa-lock-open" style="margin-right: 6px;"></i> Authenticate & Enter Admin Suite
                    </button>
                    <div id="gwError" style="display: none; background: #fef2f2; border: 1px solid #fecaca; color: #b91c1c; padding: 8px 12px; border-radius: 6px; font-size: 0.82rem; margin-top: 12px; text-align: center;">
                        Invalid username or password. Access denied.
                    </div>
                </form>
            </div>
        `;
        document.body.appendChild(modal);

        document.getElementById('closeAdminGatewayBtn').onclick = () => {
            modal.style.display = 'none';
        };

        document.getElementById('gatewayLoginForm').onsubmit = async (e) => {
            e.preventDefault();
            const u = document.getElementById('gwUser').value.trim();
            const p = document.getElementById('gwPass').value.trim();
            const err = document.getElementById('gwError');

            try {
                const apiBase = (window.location.protocol.startsWith('http') && (window.location.port === '5001' || window.location.port === ''))
                    ? ''
                    : 'http://localhost:5001';
                const res = await fetch(`${apiBase}/api/admin/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: u, password: p })
                });
                if (res.ok) {
                    const data = await res.json();
                    if (data.success) {
                        sessionStorage.setItem('juet_admin_auth', 'true');
                        localStorage.setItem('juet_admin_auth', 'true');
                        if (data.triggerClickCount) {
                            localStorage.setItem('juet_admin_trigger_clicks', data.triggerClickCount.toString());
                        }
                        modal.style.display = 'none';
                        window.location.href = 'admin.html';
                        return;
                    }
                }
            } catch (networkErr) {}

            const storedPass = localStorage.getItem('juet_admin_password') || 'JITENDRAPARMAR';
            const storedUser = localStorage.getItem('juet_admin_username') || 'adminparmar';
            if (u === storedUser && p === storedPass) {
                sessionStorage.setItem('juet_admin_auth', 'true');
                localStorage.setItem('juet_admin_auth', 'true');
                modal.style.display = 'none';
                window.location.href = 'admin.html';
            } else {
                err.style.display = 'block';
            }
        };
    }

    modal.style.display = 'flex';
    setTimeout(() => {
        const uInput = document.getElementById('gwUser');
        if (uInput) uInput.focus();
    }, 100);
}

document.addEventListener('DOMContentLoaded', initAdminSecretTrigger); 