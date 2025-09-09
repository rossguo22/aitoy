// 导航栏滚动效果
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

// 平滑滚动导航
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

// 移动端导航菜单
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // 关闭移动端菜单
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

// 简化的AOS动画实现
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// 用户评价轮播
function initTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.classList.toggle('active', i === index);
        });
    }
    
    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }
    
    // 每5秒切换一次
    if (testimonials.length > 1) {
        setInterval(nextTestimonial, 5000);
    }
}

// 视差滚动效果
function initParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // 英雄区域视差效果
        const heroVisual = document.querySelector('.hero-visual');
        if (heroVisual) {
            heroVisual.style.transform = `translateY(${rate}px)`;
        }
        
        // 浮动泰迪熊额外效果
        const floatingTeddy = document.querySelector('.floating-teddy');
        if (floatingTeddy) {
            const rotation = scrolled * 0.1;
            floatingTeddy.style.transform = `translateY(${rate * 0.3}px) rotate(${rotation}deg)`;
        }
    });
}

// 产品卡片悬停效果增强
function initProductCardEffects() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// 特色功能卡片动画效果
function initFeatureCardEffects() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px) rotateY(5deg)';
            card.style.boxShadow = '0 25px 50px rgba(255, 116, 217, 0.2)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotateY(0deg)';
            card.style.boxShadow = 'none';
        });
    });
}

// 按钮点击效果
function initButtonEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // 创建点击波纹效果
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// 添加波纹效果样式
function addRippleStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// 页面加载动画
function initPageLoadAnimation() {
    // 创建加载器
    const loader = document.createElement('div');
    loader.innerHTML = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            transition: opacity 0.5s ease;
        ">
            <div style="
                font-size: 4rem;
                animation: bounce 1s infinite;
            ">🧸</div>
        </div>
    `;
    
    document.body.appendChild(loader);
    
    // 页面加载完成后移除加载器
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 1000);
    });
}

// 鼠标跟随效果
function initMouseFollowEffect() {
    const cursor = document.createElement('div');
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(255,116,217,0.8) 0%, rgba(135,250,207,0.4) 100%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: difference;
        transition: transform 0.1s ease;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });
    
    // 悬停在可点击元素上时的效果
    const clickableElements = document.querySelectorAll('a, button, .product-card, .feature-card');
    clickableElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
        });
    });
}

// 滚动进度条
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(45deg, #FF74D9, #87FACF);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// 语言切换功能
function initLanguageSwitch() {
    const langButtons = document.querySelectorAll('.lang-btn');
    const elements = {
        // 导航栏
        'nav-home': { zh: '首页', en: 'Home' },
        'nav-competition': { zh: '大赛详情', en: 'Competition' },
        'nav-news': { zh: '赛事动态', en: 'News' },
        'nav-tools': { zh: 'AI工具集', en: 'AI Tools' },
        'nav-contact': { zh: '联系我们', en: 'Contact' },
        
        // 英雄区域
        'hero-title-1': { zh: '2025全球玩具', en: '2025 Global Toy' },
        'hero-title-2': { zh: 'AI设计大赛', en: 'AI Design Competition' },
        'hero-subtitle': { zh: '汇聚全球创意，用AI技术重新定义毛绒玩具设计', en: 'Gathering global creativity, redefining plush toy design with AI technology' },
        'competition-date': { zh: '报名时间：2025年1月1日 - 2025年6月30日', en: 'Registration: Jan 1 - Jun 30, 2025' },
        'btn-register': { zh: '立即报名', en: 'Register Now' },
        'btn-rules': { zh: '查看规则', en: 'View Rules' },
        'stat-participants': { zh: '参赛者', en: 'Participants' },
        'stat-prize': { zh: '总奖金', en: 'Total Prize' },
        'stat-global': { zh: '覆盖范围', en: 'Coverage' },
        
        // 大赛详情
        'competition-title': { zh: '大赛详情', en: 'Competition Details' },
        'awards-title': { zh: '🏆 奖项设置', en: '🏆 Awards' },
        'requirements-title': { zh: '📋 参赛要求', en: '📋 Requirements' },
        'schedule-title': { zh: '⏰ 时间安排', en: '⏰ Schedule' },
        
        // AI工具集
        'tools-title': { zh: 'AI工具集', en: 'AI Tools' },
        'tool-color': { zh: '智能配色工具', en: 'Smart Color Tool' },
        'tool-generate': { zh: 'AI设计生成器', en: 'AI Design Generator' },
        'tool-preview': { zh: '3D预览工具', en: '3D Preview Tool' },
        'tool-modeling': { zh: '智能建模助手', en: 'Smart Modeling Assistant' },
        'tool-use': { zh: '立即使用', en: 'Use Now' },
        
        // 赛事动态
        'news-title': { zh: '赛事动态', en: 'News & Updates' },
        'news-featured': { zh: '最新', en: 'Latest' },
        'news-announcement': { zh: '官方公告', en: 'Official' },
        'news-training': { zh: '培训', en: 'Training' },
        'news-judges': { zh: '评委', en: 'Judges' },
        
        // 参赛者心声
        'testimonials-title': { zh: '参赛者心声', en: 'Participant Voices' },
        
        // CTA区域
        'cta-title': { zh: '加入2025全球玩具AI设计大赛', en: 'Join 2025 Global Toy AI Design Competition' },
        'cta-subtitle': { zh: '展示你的创意才华，与全球设计师同台竞技', en: 'Showcase your creativity and compete with global designers' },
        'cta-register': { zh: '立即报名', en: 'Register Now' },
        'cta-guide': { zh: '下载参赛指南', en: 'Download Guide' },
        
        // 页脚
        'footer-competition': { zh: '大赛信息', en: 'Competition' },
        'footer-support': { zh: '支持', en: 'Support' },
        'footer-contact': { zh: '联系我们', en: 'Contact Us' }
    };
    
    function switchLanguage(lang) {
        // 更新按钮状态
        langButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });
        
        // 更新页面内容
        Object.keys(elements).forEach(key => {
            const element = document.querySelector(`[data-key="${key}"]`);
            if (element && elements[key][lang]) {
                element.textContent = elements[key][lang];
            }
        });
        
        // 更新页面语言属性
        document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    }
    
    // 为语言按钮添加点击事件
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            switchLanguage(btn.dataset.lang);
        });
    });
    
    // 初始化语言
    switchLanguage('zh');
}

// 初始化所有功能
document.addEventListener('DOMContentLoaded', function() {
    // 添加必要的样式
    addRippleStyles();
    
    // 初始化所有动画和效果
    initScrollAnimations();
    initTestimonialSlider();
    initParallaxEffect();
    initProductCardEffects();
    initFeatureCardEffects();
    initButtonEffects();
    initPageLoadAnimation();
    initMouseFollowEffect();
    initScrollProgress();
    initLanguageSwitch();
    
    // 为移动端添加响应式导航样式
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .nav-menu {
                position: fixed;
                left: -100%;
                top: 70px;
                flex-direction: column;
                background-color: rgba(255, 255, 255, 0.98);
                width: 100%;
                text-align: center;
                transition: 0.3s;
                backdrop-filter: blur(10px);
                box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
                padding: 2rem 0;
            }

            .nav-menu.active {
                left: 0;
            }

            .nav-menu li {
                margin: 1rem 0;
            }

            .hamburger.active span:nth-child(2) {
                opacity: 0;
            }

            .hamburger.active span:nth-child(1) {
                transform: translateY(8px) rotate(45deg);
            }

            .hamburger.active span:nth-child(3) {
                transform: translateY(-8px) rotate(-45deg);
            }
        }
    `;
    document.head.appendChild(style);
});

// 性能优化：节流函数
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 使用节流优化滚动事件
const throttledScrollHandler = throttle(() => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
}, 100);

window.addEventListener('scroll', throttledScrollHandler);