document.addEventListener('DOMContentLoaded', () => {
    
    const socialConfig = {
        twitter: {
            enabled: false, 
            comingSoon: true
        },
        youtube: {
            enabled: false, 
            comingSoon: true
        }
    };

    
    function updateSocialButtons() {
        
        const twitterBtn = document.querySelector('.social-btn.twitter');
        if (twitterBtn) {
            if (!socialConfig.twitter.enabled && socialConfig.twitter.comingSoon) {
                twitterBtn.classList.add('coming-soon');
                twitterBtn.href = '#';
                const span = twitterBtn.querySelector('span');
                if (span) span.textContent = 'COMING SOON';
            }
        }

        
        const youtubeBtn = document.querySelector('.social-btn.youtube');
        if (youtubeBtn) {
            if (!socialConfig.youtube.enabled && socialConfig.youtube.comingSoon) {
                youtubeBtn.classList.add('coming-soon');
                youtubeBtn.href = '#';
                const span = youtubeBtn.querySelector('span');
                if (span) span.textContent = 'COMING SOON';
            }
        }
    }

    
    window.copyServerIP = () => {
        const ip = document.querySelector('.ip-container code').textContent;
        navigator.clipboard.writeText(ip).then(() => {
            const button = document.querySelector('.copy-button');
            const icon = button.querySelector('i');
            const text = button.querySelector('span');
            
            
            const originalIcon = icon.className;
            const originalText = text.textContent;
            
            
            icon.className = 'fas fa-check';
            text.textContent = 'Copied!';
            button.style.background = '#4CAF50';
            button.style.borderColor = '#4CAF50';
            
            
            setTimeout(() => {
                icon.className = originalIcon;
                text.textContent = originalText;
                button.style.background = '';
                button.style.borderColor = '';
            }, 2000);
        });
    };

    
    const animateValue = (element, start, end, duration) => {
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            element.textContent = Math.floor(current);
            
            if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
                element.textContent = end;
                clearInterval(timer);
            }
        }, 16);
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const value = entry.target.textContent;
                animateValue(entry.target, 0, parseInt(value), 1500);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-value').forEach(stat => {
        statsObserver.observe(stat);
    });

    
    document.querySelectorAll('.step').forEach((step, index) => {
        step.addEventListener('mouseenter', () => {
            step.style.transform = 'translateY(-5px)';
            step.style.borderColor = 'var(--primary)';
        });

        step.addEventListener('mouseleave', () => {
            step.style.transform = '';
            step.style.borderColor = '';
        });
    });

    
    document.addEventListener('mousemove', (e) => {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
        document.querySelector('.play-content').style.backgroundPosition = `calc(50% + ${moveX}px) calc(50% + ${moveY}px)`;
    });

    
    updateSocialButtons();
});
