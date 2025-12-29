// ========== PRELOADER ==========
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1000);
});

// ========== PARTICLES.JS CONFIGURATION ==========
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#ffffff'
        },
        shape: {
            type: 'circle',
            stroke: {
                width: 0,
                color: '#000000'
            }
        },
        opacity: {
            value: 0.5,
            random: false,
            anim: {
                enable: false,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 3,
            random: true,
            anim: {
                enable: false,
                speed: 40,
                size_min: 0.1,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#ffffff',
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'grab'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 140,
                line_linked: {
                    opacity: 1
                }
            },
            push: {
                particles_nb: 4
            }
        }
    },
    retina_detect: true
});

// ========== NAVIGATION ==========
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Hamburger menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ========== ACTIVE NAV LINK HIGHLIGHT ==========
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', scrollActive);

// ========== SMOOTH SCROLLING ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ========== SCROLL ANIMATIONS ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Observe elements for scroll animation
document.querySelectorAll('.project-card, .certificate-card, .skill-item, .education-item').forEach(el => {
    el.classList.add('scroll-animate');
    observer.observe(el);
});

// ========== EMAILJS CONFIGURATION ==========
// Initialize EmailJS with your public key
// Replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key
emailjs.init('QhszjcLvA5eN41TEw');

// ========== FORM VALIDATION & SUBMISSION ==========
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

// Validation functions
function validateName(name) {
    return name.trim().length >= 2;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateSubject(subject) {
    return subject.trim().length >= 3;
}

function validateMessage(message) {
    return message.trim().length >= 10;
}

function showError(fieldId, message) {
    const errorElement = document.getElementById(`${fieldId}-error`);
    const inputElement = document.getElementById(fieldId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    inputElement.style.borderColor = '#ff4444';
}

function clearError(fieldId) {
    const errorElement = document.getElementById(`${fieldId}-error`);
    const inputElement = document.getElementById(fieldId);
    errorElement.style.display = 'none';
    inputElement.style.borderColor = 'rgba(255, 255, 255, 0.1)';
}

function clearAllErrors() {
    ['name', 'email', 'subject', 'message'].forEach(fieldId => {
        clearError(fieldId);
    });
}

// Real-time validation
document.getElementById('name').addEventListener('blur', function() {
    if (!validateName(this.value)) {
        showError('name', 'Name must be at least 2 characters long');
    } else {
        clearError('name');
    }
});

document.getElementById('email').addEventListener('blur', function() {
    if (!validateEmail(this.value)) {
        showError('email', 'Please enter a valid email address');
    } else {
        clearError('email');
    }
});

document.getElementById('subject').addEventListener('blur', function() {
    if (!validateSubject(this.value)) {
        showError('subject', 'Subject must be at least 3 characters long');
    } else {
        clearError('subject');
    }
});

document.getElementById('message').addEventListener('blur', function() {
    if (!validateMessage(this.value)) {
        showError('message', 'Message must be at least 10 characters long');
    } else {
        clearError('message');
    }
});

// Form submission
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Clear previous errors and status
    clearAllErrors();
    formStatus.style.display = 'none';
    formStatus.className = 'form-status';
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Validate all fields
    let isValid = true;
    
    if (!validateName(name)) {
        showError('name', 'Name must be at least 2 characters long');
        isValid = false;
    }
    
    if (!validateEmail(email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    if (!validateSubject(subject)) {
        showError('subject', 'Subject must be at least 3 characters long');
        isValid = false;
    }
    
    if (!validateMessage(message)) {
        showError('message', 'Message must be at least 10 characters long');
        isValid = false;
    }
    
    if (!isValid) {
        return;
    }
    
    // Disable submit button
    const submitBtn = contactForm.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const originalText = btnText.textContent;
    btnText.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Prepare template parameters
    const templateParams = {
        from_name: name,
        from_email: email,
        subject: subject,
        message: message,
        to_name: 'sahana' // Replace with your name
    };
    
    // Send email using EmailJS
    // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your actual EmailJS service and template IDs
    emailjs.send('service_7wro3in', 'template_bxslwk5', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            
            // Show success message
            formStatus.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
            formStatus.className = 'form-status success';
            formStatus.style.display = 'block';
            
            // Reset form
            contactForm.reset();
            
            // Re-enable submit button
            btnText.textContent = originalText;
            submitBtn.disabled = false;
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 5000);
            
        }, function(error) {
            console.log('FAILED...', error);
            
            // Show error message
            formStatus.textContent = '✗ Failed to send message. Please try again or contact me directly via email.';
            formStatus.className = 'form-status error';
            formStatus.style.display = 'block';
            
            // Re-enable submit button
            btnText.textContent = originalText;
            submitBtn.disabled = false;
            
            // Hide error message after 5 seconds
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 5000);
        });
});

// ========== SCROLL REVEAL ANIMATIONS ==========
function reveal() {
    const reveals = document.querySelectorAll('.scroll-animate');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', reveal);

// Initial check for elements already in view
reveal();

// ========== DYNAMIC YEAR FOR COPYRIGHT ==========
document.addEventListener('DOMContentLoaded', function() {
    const copyrightElement = document.querySelector('.copyright');
    if (copyrightElement) {
        const currentYear = new Date().getFullYear();
        copyrightElement.textContent = `© ${currentYear} Your Name. All rights reserved.`;
    }
});

// ========== PERFORMANCE OPTIMIZATION ==========
// Debounce function for scroll events
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Apply debounce to scroll events
window.addEventListener('scroll', debounce(scrollActive));
window.addEventListener('scroll', debounce(reveal));

// ========== ACCESSIBILITY IMPROVEMENTS ==========
// Keyboard navigation for project and certificate cards
document.querySelectorAll('.project-card, .certificate-card').forEach(card => {
    card.setAttribute('tabindex', '0');
    
    card.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const link = this.querySelector('a');
            if (link) {
                link.click();
            }
        }
    });
});

// Focus trap for mobile menu
function trapFocus(element) {
    const focusableElements = element.querySelectorAll('a[href], button, textarea, input, select');
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];
    
    element.addEventListener('keydown', function(e) {
        const isTabPressed = e.key === 'Tab';
        
        if (!isTabPressed) {
            return;
        }
        
        if (e.shiftKey) {
            if (document.activeElement === firstFocusableElement) {
                lastFocusableElement.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastFocusableElement) {
                firstFocusableElement.focus();
                e.preventDefault();
            }
        }
    });
}

// Apply focus trap when mobile menu is open
hamburger.addEventListener('click', () => {
    if (navMenu.classList.contains('active')) {
        trapFocus(navMenu);
    }
});

console.log('Portfolio website loaded successfully! 🚀');
