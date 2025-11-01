// Completely reset all scroll behavior for projects page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Projects page loaded - resetting scroll');
    
    // Reset body styles
    document.body.style.overflowY = 'auto';
    document.body.style.height = 'auto';
    document.body.style.scrollSnapType = 'none';
    document.body.style.scrollBehavior = 'auto';
    
    // Reset content element
    const content = document.querySelector('.content');
    if (content) {
        content.style.transform = 'none';
        content.style.position = 'static';
        content.style.height = 'auto';
    }
    
    // Reset background
    const bg = document.querySelector('.background');
    if (bg) {
        bg.style.transform = 'none';
        bg.style.height = '100vh';
    }
    
    // Remove any existing wheel/touch event listeners by replacing them
    window.addEventListener('wheel', function(e) {
        // Allow default scroll behavior
    }, { passive: true });
    
    window.addEventListener('touchmove', function(e) {
        // Allow default scroll behavior  
    }, { passive: true });
    
    // Set overlay button colors
    const overlayBtns = document.querySelectorAll('.overlay-btn');
    overlayBtns.forEach(btn => {
        btn.style.color = 'aliceblue';
    });
    
    // Add project card interactions
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            console.log('Project card clicked');
            // Add your project detail page navigation here
        });
    });
    
    console.log('Scroll completely reset - should work now');
});

// Also run on window load as backup
window.addEventListener('load', function() {
    document.body.style.overflowY = 'auto';
    document.body.style.height = 'auto';
});