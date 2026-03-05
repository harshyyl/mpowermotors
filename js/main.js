document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        document.querySelectorAll('.nav-links a').forEach(item => {
            item.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 100;

        revealElements.forEach(el => {
            const revealTop = el.getBoundingClientRect().top;
            if (revealTop < windowHeight - revealPoint) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger on initial load

    // Number Counter Animation
    const counters = document.querySelectorAll('.counter');
    let hasCounted = false;

    const startCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000; // ms
            const increment = target / (duration / 16); // 60fps
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.innerText = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target;
                }
            };
            updateCounter();
        });
    };

    const counterSection = document.querySelector('.stats');
    if (counterSection) {
        window.addEventListener('scroll', () => {
            if (!hasCounted) {
                const sectionTop = counterSection.getBoundingClientRect().top;
                if (sectionTop < window.innerHeight - 50) {
                    startCounters();
                    hasCounted = true;
                }
            }
        });
    }

    // Hero Slider
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');
    let currentSlide = 0;
    let slideInterval;

    const goToSlide = (n) => {
        if (!slides.length) return;
        
        // Remove active class from all
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentSlide = (n + slides.length) % slides.length;
        
        // Add active class to current
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    };


    const nextSlide = () => goToSlide(currentSlide + 1);

    // Initialize auto-sliding
    if (slides.length > 1) {
        slideInterval = setInterval(nextSlide, 5000);
        
        // Allow manual dot clicking
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                clearInterval(slideInterval); // Reset timer on manual click
                goToSlide(index);
                slideInterval = setInterval(nextSlide, 5000);
            });
        });
    }

    // GDPR Cookie Banner Logic
    if (!localStorage.getItem('cookieConsent')) {
        const bannerHTML = `
            <div class="cookie-banner" id="cookieBanner">
                <div class="cookie-header">
                    <i class="fa-solid fa-cookie-bite"></i>
                    Your Privacy matters
                </div>
                <div class="cookie-text">
                    We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies. Read our <a href="legal.html">Cookie Policy</a>.
                </div>
                <div class="cookie-buttons">
                    <button class="cookie-btn cookie-decline" id="declineCookies">Decline</button>
                    <button class="cookie-btn cookie-accept" id="acceptCookies">Accept All</button>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', bannerHTML);

        setTimeout(() => {
            const banner = document.getElementById('cookieBanner');
            if(banner) banner.classList.add('show');
        }, 1500); // 1.5s delay

        document.getElementById('acceptCookies')?.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'accepted');
            const banner = document.getElementById('cookieBanner');
            if(banner) {
                banner.classList.remove('show');
                setTimeout(() => banner.remove(), 600);
            }
        });

        document.getElementById('declineCookies')?.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'declined');
            const banner = document.getElementById('cookieBanner');
            if(banner) {
                banner.classList.remove('show');
                setTimeout(() => banner.remove(), 600);
            }
        });
    }
});
