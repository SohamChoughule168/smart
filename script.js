// Enhanced script.js with professional animations and effects

document.addEventListener('DOMContentLoaded', function() {
    // Initialize page animations
    initializePageAnimations();
    
    // Setup dark mode toggle
    setupDarkModeToggle();
    
    // Setup form animations and handlers
    setupFormAnimations();
    
    // Setup section animations
    setupSectionAnimations();
    
    // Setup component animations
    setupComponentAnimations();
    
    // Populate gallery with animated images
    populateGallery();
});

// Initialize page animations function
function initializePageAnimations() {
    // Add a page loading animation
    document.body.classList.add('loaded');
    
    // Animate header elements sequentially
    const headerElements = document.querySelectorAll('header h1, header nav ul li');
    headerElements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('visible');
        }, 100 + (index * 50));
    });
    
    // Add smooth scroll behavior to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Setup dark mode toggle function
function setupDarkModeToggle() {
    // Add dark mode toggle button to header if it doesn't exist
    if (!document.getElementById('dark-mode-toggle')) {
        const nav = document.querySelector('header nav ul');
        const darkModeToggle = document.createElement('li');
        darkModeToggle.innerHTML = '<button id="dark-mode-toggle" class="dark-mode-toggle">🌙</button>';
        nav.appendChild(darkModeToggle);
        
        // Initialize dark mode from localStorage or system preference
        const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        const savedDarkMode = localStorage.getItem('darkMode') === 'true';
        
        if (savedDarkMode || prefersDarkMode) {
            document.body.classList.add('dark-mode');
            document.getElementById('dark-mode-toggle').innerHTML = '☀️';
        }
        
        // Setup dark mode toggle event
        document.getElementById('dark-mode-toggle').addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            const isDarkMode = document.body.classList.contains('dark-mode');
            this.innerHTML = isDarkMode ? '☀️' : '🌙';
            localStorage.setItem('darkMode', isDarkMode);
            
            // Add transition effect to all elements
            document.querySelectorAll('*').forEach(element => {
                element.style.transition = 'background-color 0.5s ease, color 0.5s ease';
            });
            
            // Remove transition after animation completes
            setTimeout(() => {
                document.querySelectorAll('*').forEach(element => {
                    element.style.removeProperty('transition');
                });
            }, 500);
        });
    }
}

// Setup form animations function
function setupFormAnimations() {
    // Enhanced form submissions with animations
    document.querySelectorAll('form').forEach(form => {
        // Add elegant focus states for form elements
        const formElements = form.querySelectorAll('input, textarea, select');
        formElements.forEach(element => {
            element.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            element.addEventListener('blur', function() {
                if (this.value === '') {
                    this.parentElement.classList.remove('focused');
                }
            });
            
            // If the field already has a value, add the focused class
            if (element.value !== '') {
                element.parentElement.classList.add('focused');
            }
        });
        
        // Add form submission animations
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Add ripple effect to submit button
            const submitBtn = this.querySelector('input[type="submit"]');
            if (submitBtn) {
                const ripple = document.createElement('span');
                ripple.classList.add('ripple');
                submitBtn.appendChild(ripple);
                
                // Position the ripple
                const rect = submitBtn.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                ripple.style.width = ripple.style.height = `${size}px`;
                ripple.style.left = `${event.clientX - rect.left - size/2}px`;
                ripple.style.top = `${event.clientY - rect.top - size/2}px`;
                
                // Remove ripple after animation
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            }
            
            // Find the corresponding result div
            let resultDivId = '';
            if (this.id === 'prediction-form') {
                resultDivId = 'prediction-result';
            } else if (this.id === 'weather-prediction-form') {
                resultDivId = 'weather-prediction-result';
            } else if (this.id === 'signup-form') {
                // Handle signup form
                showToast('Account created successfully!');
                this.reset();
                setTimeout(() => {
                    localStorage.setItem('isLoggedIn', 'true');
                    window.location.href = 'index.html';
                }, 1500);
                return;
            } else if (this.id === 'login-form') {
                // Handle login form
                showToast('Login successful!');
                this.reset();
                setTimeout(() => {
                    localStorage.setItem('isLoggedIn', 'true');
                    window.location.href = 'index.html';
                }, 1500);
                return;
            } else if (this.closest('section').id === 'contact') {
                // Handle contact form
                showToast('Your message has been sent successfully!');
                this.reset();
                return;
            }
            
            const resultDiv = document.getElementById(resultDivId);
            if (resultDiv) {
                // Show professional loading animation
                resultDiv.innerHTML = `
                    <div class="loading-container">
                        <div class="loading-spinner"></div>
                        <p>Processing your request...</p>
                    </div>
                `;
                
                // Simulate API call with animation
                setTimeout(() => {
                    // Call the original handlers
                    if (this.id === 'prediction-form') {
                        handlePredictionFormSubmit(event);
                    } else if (this.id === 'weather-prediction-form') {
                        handleWeatherPredictionFormSubmit(event);
                    }
                    
                    // Show the result with animation
                    resultDiv.classList.add('show');
                    
                    // Scroll to the result
                    setTimeout(() => {
                        resultDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }, 300);
                }, 1500);
            }
        });
    });
}

// Setup section animations function
function setupSectionAnimations() {
    // Section visibility animation on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Staggered animation for list items
                if (entry.target.querySelectorAll('li').length > 0) {
                    const items = entry.target.querySelectorAll('li');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('visible');
                        }, index * 100);
                    });
                }
                
                // Staggered animation for about items
                if (entry.target.querySelectorAll('.about-item').length > 0) {
                    const items = entry.target.querySelectorAll('.about-item');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('visible');
                        }, index * 150);
                    });
                }
                
                // Special animation for images in this section
                const images = entry.target.querySelectorAll('img');
                images.forEach((img, index) => {
                    setTimeout(() => {
                        img.classList.add('visible');
                    }, index * 200);
                });
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// Setup component animations function
function setupComponentAnimations() {
    // Irrigation control buttons with animation
    setupControlButtonAnimations('irrigation-control', 'irrigation-status');
    
    // Drone surveillance buttons with animations
    setupControlButtonAnimations('drone-surveillance', 'drone-status');
    
    // Pest control buttons with animations
    setupControlButtonAnimations('automated-pest-control', 'pest-control-status');
    
    // Add hover animations to all buttons
    document.querySelectorAll('button, .btn').forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.classList.add('hover');
        });
        
        button.addEventListener('mouseleave', function() {
            this.classList.remove('hover');
        });
    });
}

// Helper function for setting up control button animations
function setupControlButtonAnimations(sectionId, statusId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const buttons = section.querySelectorAll('button');
        const status = document.getElementById(statusId);
        
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                // Add ripple effect
                const ripple = document.createElement('span');
                ripple.classList.add('ripple');
                this.appendChild(ripple);
                
                // Position the ripple
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                ripple.style.width = ripple.style.height = `${size}px`;
                ripple.style.left = `${size/2}px`;
                ripple.style.top = `${size/2}px`;
                
                // Remove ripple after animation
                setTimeout(() => {
                    ripple.remove();
                }, 600);
                
                // Animate status change
                if (status) {
                    animateStatusChange(status, () => {
                        // Update active button state
                        buttons.forEach(btn => btn.classList.remove('active'));
                        this.classList.add('active');
                        
                        // Call the original function based on button text
                        if (this.textContent.includes('Start') || this.textContent.includes('Activate')) {
                            if (sectionId === 'irrigation-control') {
                                startIrrigation();
                            } else if (sectionId === 'drone-surveillance') {
                                startDroneSurveillance();
                            } else if (sectionId === 'automated-pest-control') {
                                activatePestControl();
                            }
                        } else {
                            if (sectionId === 'irrigation-control') {
                                stopIrrigation();
                            } else if (sectionId === 'drone-surveillance') {
                                stopDroneSurveillance();
                            } else if (sectionId === 'automated-pest-control') {
                                deactivatePestControl();
                            }
                        }
                    });
                }
            });
        });
    }
}

// Populate gallery with images
function populateGallery() {
    const gallery = document.getElementById('gallery-grid');
    if (gallery) {
        // Sample gallery images
        const images = [
            'https://via.placeholder.com/300x200?text=Smart+Farming+1',
            'https://via.placeholder.com/300x200?text=Crop+Analysis+2',
            'https://via.placeholder.com/300x200?text=IoT+Sensors+3',
            'https://via.placeholder.com/300x200?text=Drone+Monitoring+4',
            'https://via.placeholder.com/300x200?text=Automated+Systems+5',
            'https://via.placeholder.com/300x200?text=Data+Visualizations+6'
        ];
        
        // Clear existing content
        gallery.innerHTML = '';
        
        // Add images with staggered animation
        images.forEach((src, index) => {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.innerHTML = `<img src="${src}" alt="Gallery Image ${index + 1}">`;
            item.style.animationDelay = `${index * 0.1}s`;
            gallery.appendChild(item);
        });
    }
}

// Helper function for animated status changes
function animateStatusChange(element, callback) {
    if (!element) return;
    
    element.style.transition = 'all 0.5s ease';
    element.style.opacity = '0';
    element.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
        callback();
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }, 300);
}

// Show toast notification
function showToast(message) {
    // Remove existing toast if any
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create new toast element
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    // Show toast with animation
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // Hide and remove toast after delay
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// Original functionality preserved
function startIrrigation() {
    document.getElementById('irrigation-status').textContent = 'Irrigation is now active.';
}

function stopIrrigation() {
    document.getElementById('irrigation-status').textContent = 'Irrigation is now inactive.';
}

function startDroneSurveillance() {
    document.getElementById('drone-status').textContent = 'Drone surveillance is now active.';
}

function stopDroneSurveillance() {
    document.getElementById('drone-status').textContent = 'Drone surveillance is now inactive.';
}

function activatePestControl() {
    document.getElementById('pest-control-status').textContent = 'Pest control is now active.';
}

function deactivatePestControl() {
    document.getElementById('pest-control-status').textContent = 'Pest control is now inactive.';
}

// Extracted functionality from the prediction form handler
function handlePredictionFormSubmit(event) {
    const crop = document.getElementById('crop').value;
    const area = document.getElementById('area').value;
    const date = document.getElementById('date').value;
    const state = document.getElementById('state').value;
    const year = document.getElementById('year').value;

    if (!crop || !area || !date || !state || !year) {
        showToast('Please fill in all fields.');
        return;
    }

    // Simulate prediction calculation
    const basePrice = 1000;
    const stateFactor = getStateFactor(state);
    const yearFactor = getYearFactor(year);
    const areaFactor = getAreaFactor(area);
    const dateFactor = getDateFactor(date);
    const cropFactor = getCropFactor(crop);
    const economicFactor = getEconomicFactor(year);

    const predictedPrice = (basePrice + stateFactor + yearFactor + areaFactor + dateFactor + cropFactor + economicFactor + Math.random() * 100).toFixed(2);

    const resultDiv = document.getElementById('prediction-result');
    resultDiv.innerHTML = `
        <div class="result-card">
            <h3>Crop Price Prediction Results</h3>
            <div class="result-content">
                <div class="result-details">
                    <p><strong>Crop:</strong> ${crop}</p>
                    <p><strong>Area:</strong> ${area} acres</p>
                    <p><strong>Date:</strong> ${date}</p>
                    <p><strong>State:</strong> ${state}</p>
                    <p><strong>Year:</strong> ${year}</p>
                    <p class="price"><strong>Predicted Price:</strong> $${predictedPrice}</p>
                </div>
                <div class="result-image">
                    <img src="https://via.placeholder.com/600x400?text=${crop}" alt="${crop}" class="prediction-image">
                </div>
            </div>
        </div>
    `;
}

// Extracted functionality from the weather prediction form handler
function handleWeatherPredictionFormSubmit(event) {
    const location = document.getElementById('location').value;
    const state = document.getElementById('weather-state').value;
    const date = document.getElementById('weather-date').value;
    const year = document.getElementById('weather-year').value;

    if (!location || !state || !date || !year) {
        showToast('Please fill in all fields.');
        return;
    }

    // Simulate a weather prediction
    const baseTemperature = 25;
    const stateFactor = (state.charCodeAt(0) + state.charCodeAt(1)) % 10;
    const yearFactor = (year - 2000) % 5;
    const predictedTemperature = (baseTemperature + stateFactor + yearFactor).toFixed(2);
    const conditions = ["Sunny", "Partly Cloudy", "Cloudy", "Rainy", "Thunderstorm"];
    const predictedCondition = conditions[Math.floor(Math.random() * conditions.length)];

    const resultDiv = document.getElementById('weather-prediction-result');
    resultDiv.innerHTML = `
        <div class="result-card">
            <h3>Weather Prediction Results</h3>
            <div class="result-content">
                <div class="result-details">
                    <p><strong>Location:</strong> ${location}</p>
                    <p><strong>Date:</strong> ${date}</p>
                    <p><strong>State:</strong> ${state}</p>
                    <p><strong>Year:</strong> ${year}</p>
                    <p class="temperature"><strong>Temperature:</strong> ${predictedTemperature}°C</p>
                    <p class="condition"><strong>Condition:</strong> ${predictedCondition}</p>
                </div>
                <div class="result-image">
                    <img src="https://via.placeholder.com/600x400?text=${predictedCondition}" alt="${predictedCondition}" class="weather-image">
                </div>
            </div>
        </div>
    `;
}

// Helper calculation functions
function getStateFactor(state) {
    // Simplified calculation based on state name
    return (state.length * 5) % 200;
}

function getYearFactor(year) {
    // Simplified calculation based on year
    return ((year - 2000) * 10) % 300;
}

function getAreaFactor(area) {
    // Simplified calculation based on area
    return Math.sqrt(area) * 20;
}

function getDateFactor(date) {
    // Simplified calculation based on date
    const month = new Date(date).getMonth() + 1;
    return month * 15;
}

function getCropFactor(crop) {
    // Simplified calculation based on crop name
    const factors = {
        'Wheat': 50,
        'Rice': 80,
        'Maize': 60,
        'Soybean': 70,
        'Cotton': 90
    };
    return factors[crop] || 50;
}

function getEconomicFactor(year) {
    // Simplified economic factor calculation
    return ((year - 2000) * 5) % 150;
}