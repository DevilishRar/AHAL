document.addEventListener('DOMContentLoaded', () => {
    
    document.addEventListener('mousemove', (e) => {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
        document.querySelector('.home-content').style.backgroundPosition = `calc(50% + ${moveX}px) calc(50% + ${moveY}px)`;
    });

    
    const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(animateOnScroll, {
        threshold: 0.1,
        rootMargin: '0px'
    });

    
    document.querySelectorAll('.phase-card, .skill-card, .feature-card').forEach(el => {
        observer.observe(el);
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
    });

    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.querySelector('.skill-progress');
                progress.style.width = progress.parentElement.parentElement.classList.contains('farming') ? '85%' :
                                     progress.parentElement.parentElement.classList.contains('combat') ? '70%' :
                                     progress.parentElement.parentElement.classList.contains('crafting') ? '90%' : '75%';
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.skill-card').forEach(card => {
        skillObserver.observe(card);
    });

    
    window.copyIP = () => {
        const ip = document.querySelector('.ip-display code').textContent;
        navigator.clipboard.writeText(ip).then(() => {
            const button = document.querySelector('.copy-ip');
            button.innerHTML = '<i class="fas fa-check"></i>';
            setTimeout(() => {
                button.innerHTML = '<i class="fas fa-copy"></i>';
            }, 2000);
        });
    };

    
    const glitchText = document.querySelector('.glitch-text');
    if (glitchText) {
        setInterval(() => {
            const duration = Math.random() * 200 + 50;
            glitchText.style.textShadow = `
                ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px ${Math.random() * 10}px rgba(255,62,62,0.3),
                ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px ${Math.random() * 10}px rgba(62,255,255,0.3)
            `;
            setTimeout(() => {
                glitchText.style.textShadow = '';
            }, duration);
        }, 3000);
    }
});
