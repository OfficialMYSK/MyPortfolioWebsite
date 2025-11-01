const bg = document.querySelector(".background");
const content = document.querySelector(".content");
const fadeElements = document.querySelectorAll(".hero-title, .hero-subtitle, .about, .featured-work");
const footer = document.querySelector(".footer");
const overlayBtns = document.querySelectorAll('.overlay-btn');
const contactSection = document.querySelector('.contact-section');
const contactForm = document.getElementById('contactForm');

// Scroll animation variables (only for index page)
let targetScroll = 0;
let currentScroll = 0;
let currentBgOffset = 0;
let isSnapping = false;
let maxScroll = 0;

// Check if we're on index page (has content but no contact section)
function isIndexPage() {
    return content && !contactSection;
}

// Check if we're on contact page
function isContactPage() {
    return contactSection !== null;
}

// Check if we're on projects page
function isProjectsPage() {
    return document.querySelector('.projects-section') !== null;
}

// Update overlay button colors based on page and scroll position
function updateOverlayColors() {
    // If we're on contact page, always use light text
    if (isContactPage() || isProjectsPage()) {
        overlayBtns.forEach(btn => {
            btn.style.color = 'aliceblue';
        });
        return;
    }
    
    // If we're on index page, use dynamic colors based on scroll
    if (isIndexPage() && footer) {
        const footerTop = footer.offsetTop;
        const viewportHeight = window.innerHeight;
        const inFooter = currentScroll >= footerTop - viewportHeight * 0.5;
        
        if (inFooter) {
            overlayBtns.forEach(btn => {
                btn.style.color = 'aliceblue';
            });
        } else {
            overlayBtns.forEach(btn => {
                btn.style.color = 'rgb(15, 15, 15)';
            });
        }
    }
}

// Index page scroll functionality
function initIndexPage() {
    if (!isIndexPage()) return;
    
    const easeContent = 0.02;
    const easeBg = 0.01;
    const scrollFactor = 0.5;
    const snapThreshold = 0.9;

    function calculateMaxScroll() {
        const contentHeight = content.scrollHeight;
        const viewportHeight = window.innerHeight;
        maxScroll = Math.max(0, contentHeight - viewportHeight);
        
        document.body.style.height = `${contentHeight}px`;
        if (bg) bg.style.height = `${contentHeight}px`;
        
        return maxScroll;
    }

    maxScroll = calculateMaxScroll();

    window.addEventListener("resize", () => {
        maxScroll = calculateMaxScroll();
        targetScroll = Math.min(targetScroll, maxScroll);
    });

    // Handle manual wheel scrolling
    window.addEventListener("wheel", (e) => {
        e.preventDefault();
        
        if (isSnapping) return;
        
        const delta = e.deltaY * scrollFactor;
        const newTarget = targetScroll + delta;
        
        const footerTop = footer.offsetTop;
        const viewportHeight = window.innerHeight;
        
        if (delta > 0 && newTarget > footerTop - viewportHeight * snapThreshold) {
            targetScroll = footerTop;
            isSnapping = true;
        }
        else if (delta < 0 && targetScroll >= footerTop && newTarget < footerTop - viewportHeight * 0.7) {
            targetScroll = footerTop - viewportHeight;
            isSnapping = true;
        }
        else {
            targetScroll = Math.max(0, Math.min(newTarget, maxScroll));
        }
    }, { passive: false });

    // Touch events for mobile
    let touchStartY = 0;

    window.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    }, { passive: false });

    window.addEventListener('touchmove', (e) => {
        if (isSnapping) {
            e.preventDefault();
            return;
        }
        
        const touchY = e.touches[0].clientY;
        const delta = touchStartY - touchY;
        
        const newTarget = targetScroll + delta * 2;
        
        const footerTop = footer.offsetTop;
        const viewportHeight = window.innerHeight;
        
        if (delta > 0 && newTarget > footerTop - viewportHeight * snapThreshold) {
            targetScroll = footerTop;
            isSnapping = true;
            e.preventDefault();
        }
        else if (delta < 0 && targetScroll >= footerTop && newTarget < footerTop - viewportHeight * 0.7) {
            targetScroll = footerTop - viewportHeight;
            isSnapping = true;
            e.preventDefault();
        }
        else {
            targetScroll = Math.max(0, Math.min(newTarget, maxScroll));
        }
        
        touchStartY = touchY;
    }, { passive: false });

    function animate() {
        currentScroll += (targetScroll - currentScroll) * easeContent;
        
        if (isSnapping && Math.abs(currentScroll - targetScroll) < 1) {
            isSnapping = false;
        }

        const desiredBg = currentScroll * -0.5;
        currentBgOffset += (desiredBg - currentBgOffset) * easeBg;

        if (bg) bg.style.transform = `translateY(${currentBgOffset}px)`;
        if (content) content.style.transform = `translateY(${-currentScroll}px)`;

        updateOverlayColors();

        // Fade elements
        fadeElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            let visibility;
            
            if (el.classList.contains('featured-work')) {
                visibility = 1;
            } else {
                visibility = 1 - Math.abs(rect.top + rect.height / 2 - windowHeight / 2) / (windowHeight * 0.3);
                visibility = Math.pow(Math.max(0, Math.min(1, visibility)), 1.5);
            }
            
            el.style.opacity = visibility;
        });

        requestAnimationFrame(animate);
    }

    calculateMaxScroll();
    animate();
}

// Contact page functionality
function initContactPage() {
    if (!isContactPage()) return;
    
    // Contact form handling
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };
            
            console.log('Form submitted:', formData);
            alert('Thank you for your message! I\'ll get back to you soon.');
            contactForm.reset();
        });
    }
    
    // Set overlay colors for contact page
    updateOverlayColors();
}

// Initialize the appropriate page
if (isIndexPage()) {
    initIndexPage();
} else if (isContactPage()) {
    initContactPage();
} else if (isProjectsPage()) {
    initProjectsPage();
}

// Check if we're on about page
function isAboutPage() {
    return document.querySelector('.about-page') !== null;
}

// About page functionality
function initAboutPage() {
    if (!isAboutPage()) return;
    
    // Add about-page class to body
    document.body.classList.add('about-page');
    
    // Set overlay colors for about page
    overlayBtns.forEach(btn => {
        btn.style.color = 'aliceblue';
    });
    
    // Disable scroll animations for this page
    document.body.style.overflowY = 'auto';
    document.body.style.height = 'auto';
    document.body.style.scrollSnapType = 'none';
    
    if (content) {
        content.style.transform = 'none';
        content.style.position = 'static';
    }
    
    if (bg) {
        bg.style.transform = 'none';
        bg.style.height = '100vh';
    }
}

// Update initialization in main.js:
if (isAboutPage()) {
    initAboutPage();
}

// Always initialize overlay colors
updateOverlayColors();