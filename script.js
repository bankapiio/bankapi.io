// Smooth scrolling for anchor links
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

// Intersection Observer for fade-in animations
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

// Observe all cards and sections
document.querySelectorAll('.feature-card, .use-case-card, .comparables-table').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add hover effect to stats
document.querySelectorAll('.stat-item').forEach(stat => {
    stat.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    stat.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground && scrolled < window.innerHeight) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add data labels for mobile table view
const tableRows = document.querySelectorAll('.table-row');
const headers = ['Domain', 'Sale Price', 'Year', 'Buyer'];

tableRows.forEach(row => {
    const cells = row.querySelectorAll('.table-cell');
    cells.forEach((cell, index) => {
        cell.setAttribute('data-label', headers[index]);
    });
});

// Track button clicks (optional analytics)
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        const buttonText = this.textContent.trim();
        console.log(`Button clicked: ${buttonText}`);
        // Add your analytics tracking here
        // Example: gtag('event', 'click', { 'button_name': buttonText });
    });
});

// Add active state to CTA buttons
document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('mousedown', function() {
        this.style.transform = 'translateY(0) scale(0.98)';
    });
    
    button.addEventListener('mouseup', function() {
        this.style.transform = 'translateY(-2px) scale(1)';
    });
});

// Lazy load optimization
if ('IntersectionObserver' in window) {
    const lazyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
                lazyObserver.unobserve(entry.target);
            }
        });
    });

    document.querySelectorAll('.feature-card, .use-case-card').forEach(card => {
        lazyObserver.observe(card);
    });
}

// Add copy-to-clipboard functionality for domain name
const domainTitle = document.querySelector('.hero-title');
if (domainTitle) {
    domainTitle.style.cursor = 'pointer';
    domainTitle.title = 'Click to copy domain name';
    
    domainTitle.addEventListener('click', async function() {
        try {
            await navigator.clipboard.writeText('BANKAPI.io');
            
            // Show feedback
            const originalText = this.innerHTML;
            this.innerHTML = '<span class="title-main">Copied!</span>';
            this.style.color = 'var(--success-color)';
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.style.color = '';
            }, 1500);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    });
}

// Scroll progress indicator (optional)
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    // You can add a progress bar element if desired
    // document.getElementById('progressBar').style.width = scrolled + '%';
});

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('BANKAPI.io landing page loaded');
    
    // Add entrance animation to hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transition = 'opacity 1s ease';
        }, 100);
    }
});
