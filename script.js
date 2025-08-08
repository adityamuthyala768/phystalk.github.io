// ================================
// PHYSTALK - ENHANCED JAVASCRIPT
// Performance Optimized & Feature Rich
// ================================

// Performance optimization: Debounce utility
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Throttle utility for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ================================
// CORE FUNCTIONALITY
// ================================

class PhystalkApp {
    constructor() {
        this.init();
    }

    init() {
        this.bindEvents();
        this.initIntersectionObserver();
        this.initPerformanceMonitoring();
        this.initAccessibilityFeatures();
        this.initServiceWorker();
    }

    bindEvents() {
        // Mobile navigation
        this.initMobileNavigation();
        
        // Scroll effects
        this.initScrollEffects();
        
        // Smooth scrolling for anchor links
        this.initSmoothScrolling();
        
        // Keyboard navigation
        this.initKeyboardNavigation();
        
        // Error handling
        this.initErrorHandling();
    }

    // ================================
    // MOBILE NAVIGATION
    // ================================
    
    initMobileNavigation() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (!hamburger || !navMenu) return;

        const toggleMenu = () => {
            const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
            hamburger.setAttribute('aria-expanded', !isExpanded);
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = !isExpanded ? 'hidden' : '';
        };

        hamburger.addEventListener('click', toggleMenu);

        // Close menu when clicking on a link
        navMenu.addEventListener('click', (e) => {
            if (e.target.classList.contains('nav-link')) {
                hamburger.setAttribute('aria-expanded', 'false');
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    }

    // ================================
    // SCROLL EFFECTS
    // ================================
    
    initScrollEffects() {
        const header = document.querySelector('.header');
        const backToTop = document.querySelector('.back-to-top');
        
        const handleScroll = throttle(() => {
            const scrolled = window.pageYOffset;
            
            // Header background opacity
            if (header) {
                if (scrolled > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            }
            
            // Back to top button
            if (backToTop) {
                if (scrolled > 300) {
                    backToTop.classList.add('visible');
                } else {
                    backToTop.classList.remove('visible');
                }
            }
            
            // Parallax effects for cosmic elements
            const cosmicElements = document.querySelectorAll('.planet, .nebula, .blackhole');
            cosmicElements.forEach((element, index) => {
                const speed = 0.1 + (index * 0.05);
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        }, 16);

        window.addEventListener('scroll', handleScroll, { passive: true });
        
        // Back to top functionality
        if (backToTop) {
            backToTop.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    }

    // ================================
    // INTERSECTION OBSERVER
    // ================================
    
    initIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const fadeInObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-visible');
                    
                    // Trigger animations for specific elements
                    if (entry.target.classList.contains('hero-stats')) {
                        this.animateStats();
                    }
                }
            });
        }, observerOptions);

        // Observe elements for fade-in animation
        const fadeElements = document.querySelectorAll('.feature-card, .stat, .hero-stats');
        fadeElements.forEach(el => {
            fadeInObserver.observe(el);
        });
    }

    // ================================
    // STATISTICS ANIMATION
    // ================================
    
    animateStats() {
        const stats = document.querySelectorAll('[data-count]');
        stats.forEach(stat => {
            const target = parseInt(stat.dataset.count);
            let current = 0;
            const increment = target / 100;
            const duration = 2000; // 2 seconds
            const stepTime = duration / 100;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target;
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current);
                }
            }, stepTime);
        });
    }

    // ================================
    // SMOOTH SCROLLING
    // ================================
    
    initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ================================
    // KEYBOARD NAVIGATION
    // ================================
    
    initKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Enhanced keyboard navigation for custom elements
            if (e.key === 'Enter' || e.key === ' ') {
                const activeElement = document.activeElement;
                if (activeElement.classList.contains('clickable') || 
                    activeElement.hasAttribute('data-clickable')) {
                    e.preventDefault();
                    activeElement.click();
                }
            }
        });
    }

    // ================================
    // PERFORMANCE MONITORING
    // ================================
    
    initPerformanceMonitoring() {
        // Monitor page load performance
        window.addEventListener('load', () => {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            
            if (loadTime > 3000) {
                console.warn('Page load time is slow:', loadTime + 'ms');
            }
            
            // Track Core Web Vitals
            this.trackWebVitals();
        });
    }

    trackWebVitals() {
        // Largest Contentful Paint (LCP)
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1];
            console.log('LCP:', lastEntry.startTime);
        }).observe({ entryTypes: ['largest-contentful-paint'] });

        // First Input Delay (FID)
        new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
                console.log('FID:', entry.processingStart - entry.startTime);
            }
        }).observe({ entryTypes: ['first-input'] });

        // Cumulative Layout Shift (CLS)
        let clsValue = 0;
        new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
                if (!entry.hadRecentInput) {
                    clsValue += entry.value;
                }
            }
            console.log('CLS:', clsValue);
        }).observe({ entryTypes: ['layout-shift'] });
    }

    // ================================
    // ACCESSIBILITY FEATURES
    // ================================
    
    initAccessibilityFeatures() {
        // Add skip link functionality
        this.addSkipLink();
        
        // Enhanced focus management
        this.initFocusManagement();
        
        // Reduced motion support
        this.initReducedMotion();
        
        // High contrast support
        this.initHighContrast();
    }

    addSkipLink() {
        const skipLink = document.querySelector('.skip-link');
        if (skipLink) {
            skipLink.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector('#main-content');
                if (target) {
                    target.focus();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    }

    initFocusManagement() {
        // Ensure main content is focusable
        const mainContent = document.querySelector('#main-content');
        if (mainContent && !mainContent.getAttribute('tabindex')) {
            mainContent.setAttribute('tabindex', '-1');
        }

        // Focus management for modals/dropdowns
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                this.trapFocus(e);
            }
        });
    }

    trapFocus(e) {
        const activeModal = document.querySelector('.modal.active, .dropdown.active');
        if (!activeModal) return;

        const focusableElements = activeModal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
            if (document.activeElement === firstElement) {
                lastElement.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastElement) {
                firstElement.focus();
                e.preventDefault();
            }
        }
    }

    initReducedMotion() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        if (prefersReducedMotion.matches) {
            document.documentElement.style.setProperty('--transition', 'none');
        }

        prefersReducedMotion.addEventListener('change', () => {
            if (prefersReducedMotion.matches) {
                document.documentElement.style.setProperty('--transition', 'none');
            } else {
                document.documentElement.style.removeProperty('--transition');
            }
        });
    }

    initHighContrast() {
        const prefersHighContrast = window.matchMedia('(prefers-contrast: high)');
        
        const applyHighContrast = () => {
            if (prefersHighContrast.matches) {
                document.body.classList.add('high-contrast');
            } else {
                document.body.classList.remove('high-contrast');
            }
        };

        applyHighContrast();
        prefersHighContrast.addEventListener('change', applyHighContrast);
    }

    // ================================
    // SERVICE WORKER
    // ================================
    
    initServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then((registration) => {
                        console.log('SW registered: ', registration);
                    })
                    .catch((registrationError) => {
                        console.log('SW registration failed: ', registrationError);
                    });
            });
        }
    }

    // ================================
    // ERROR HANDLING
    // ================================
    
    initErrorHandling() {
        window.addEventListener('error', (e) => {
            console.error('Global error:', e.error);
            this.showErrorMessage('Something went wrong. Please refresh the page.');
        });

        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled promise rejection:', e.reason);
            this.showErrorMessage('Network error. Please check your connection.');
        });
    }

    showErrorMessage(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-toast';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: #ef4444;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            z-index: 10000;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(errorDiv);
        
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }
}

// ================================
// UTILITY FUNCTIONS
// ================================

// Local storage utilities with error handling
const Storage = {
    get: (key, defaultValue = null) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            console.error('Error reading from localStorage:', e);
            return defaultValue;
        }
    },
    
    set: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('Error writing to localStorage:', e);
            return false;
        }
    },
    
    remove: (key) => {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            console.error('Error removing from localStorage:', e);
            return false;
        }
    }
};

// Copy to clipboard utility
function copyToClipboard(text, successMessage = 'Copied to clipboard!') {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification(successMessage);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
            fallbackCopyTextToClipboard(text, successMessage);
        });
    } else {
        fallbackCopyTextToClipboard(text, successMessage);
    }
}

function fallbackCopyTextToClipboard(text, successMessage) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showNotification(successMessage);
        } else {
            showNotification('Failed to copy text', 'error');
        }
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
        showNotification('Failed to copy text', 'error');
    }
    
    document.body.removeChild(textArea);
}

// Enhanced notification system
function showNotification(message, type = 'success', duration = 3000) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.setAttribute('role', 'alert');
    notification.setAttribute('aria-live', 'polite');
    
    // Create notification content
    const content = document.createElement('div');
    content.className = 'notification-content';
    content.textContent = message;
    
    const closeBtn = document.createElement('button');
    closeBtn.className = 'notification-close';
    closeBtn.innerHTML = '&times;';
    closeBtn.setAttribute('aria-label', 'Close notification');
    closeBtn.addEventListener('click', () => removeNotification(notification));
    
    notification.appendChild(content);
    notification.appendChild(closeBtn);
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'error' ? '#ef4444' : type === 'warning' ? '#f59e0b' : '#10b981'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        z-index: 10001;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        transform: translateX(100%);
        transition: transform 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
        max-width: 400px;
        word-wrap: break-word;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    `;
    
    document.body.appendChild(notification);
    
    // Trigger entrance animation
    requestAnimationFrame(() => {
        notification.style.transform = 'translateX(0)';
    });
    
    // Auto-remove notification
    if (duration > 0) {
        setTimeout(() => {
            removeNotification(notification);
        }, duration);
    }
    
    return notification;
}

function removeNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (document.body.contains(notification)) {
            document.body.removeChild(notification);
        }
    }, 300);
}

// Form validation utility
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateForm(formElement) {
    let isValid = true;
    const requiredFields = formElement.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        const value = field.value.trim();
        const fieldType = field.type;
        
        // Remove previous error styling
        field.classList.remove('error');
        
        // Check if field is empty
        if (!value) {
            field.classList.add('error');
            isValid = false;
            return;
        }
        
        // Validate email fields
        if (fieldType === 'email' && !validateEmail(value)) {
            field.classList.add('error');
            isValid = false;
            return;
        }
    });
    
    return isValid;
}

// Analytics helper (placeholder for future implementation)
function trackEvent(eventName, properties = {}) {
    // Placeholder for analytics tracking
    console.log('Event tracked:', eventName, properties);
    
    // Example implementation with Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, properties);
    }
}

// ================================
// LAZY LOADING
// ================================

function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

// ================================
// THEME MANAGEMENT
// ================================

class ThemeManager {
    constructor() {
        this.currentTheme = this.getStoredTheme() || 'dark';
        this.init();
    }

    init() {
        this.applyTheme(this.currentTheme);
        this.createThemeToggle();
    }

    getStoredTheme() {
        return Storage.get('theme');
    }

    storeTheme(theme) {
        Storage.set('theme', theme);
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.currentTheme = theme;
        this.storeTheme(theme);
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.applyTheme(newTheme);
        trackEvent('theme_changed', { theme: newTheme });
    }

    createThemeToggle() {
        // Future implementation for theme toggle button
        // This would be added to the header navigation
    }
}

// ================================
// INITIALIZATION
// ================================

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new PhystalkApp();
    const themeManager = new ThemeManager();
    
    // Initialize lazy loading
    initLazyLoading();
    
    // Export utilities to global scope
    window.PhystalkUtils = {
        copyToClipboard,
        showNotification,
        validateEmail,
        validateForm,
        debounce,
        throttle,
        Storage,
        trackEvent
    };
    
    console.log('🌌 Phystalk Enhanced Version Loaded Successfully!');
});

// Handle page visibility changes for performance
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        // Page became visible - resume animations if needed
        console.log('Page visible - resuming');
    } else {
        // Page hidden - pause expensive operations
        console.log('Page hidden - pausing');
    }
});

// Handle online/offline status
window.addEventListener('online', () => {
    showNotification('Connection restored!', 'success');
});

window.addEventListener('offline', () => {
    showNotification('No internet connection', 'warning', 0);
});

// Preload critical resources
function preloadCriticalResources() {
    const criticalResources = [
        'resources.html',
        'discord.html',
        'equation.html'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = resource;
        document.head.appendChild(link);
    });
}

// Initialize preloading after page load
window.addEventListener('load', () => {
    setTimeout(preloadCriticalResources, 2000);
});
