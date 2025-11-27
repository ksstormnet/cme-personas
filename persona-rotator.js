/**
 * CME Persona Rotator - Elementor Component
 * 
 * A lightweight JavaScript component that loads persona data from R2 bucket
 * and displays a rotating persona showcase for Elementor HTML/Code widgets.
 */
class CMEPersonaRotator {
    constructor(containerId, options = {}) {
        this.containerId = containerId;
        this.container = document.getElementById(containerId);
        
        // Configuration options
        this.options = {
            jsonUrl: options.jsonUrl || 'https://cdn.cruisemadeeasy.com/personas.json',
            inlineData: options.inlineData || null, // Inline data to bypass CORS
            rotationSpeed: options.rotationSpeed || 5000, // milliseconds
            limit: options.limit || 3,
            autoRotate: options.autoRotate !== false,
            showNavigation: options.showNavigation || false,
            fadeTransition: options.fadeTransition !== false,
            clickUrl: options.clickUrl || null, // URL to navigate to on click
            openInNewTab: options.openInNewTab !== false, // Open link in new tab (default: true)
            captionPosition: options.captionPosition || 'overlay', // 'overlay', 'below', 'none'
            showTitle: options.showTitle !== false // Show persona name (default: true)
        };
        
        this.personas = [];
        this.currentIndex = 0;
        this.rotationTimer = null;
        
        this.init();
    }
    
    async init() {
        if (!this.container) {
            console.error(`CME Persona Rotator: Container with ID '${this.containerId}' not found`);
            return;
        }
        
        try {
            await this.loadPersonas();
            await this.preloadImages();
            this.render();
            this.startRotation();
        } catch (error) {
            console.error('CME Persona Rotator: Failed to initialize:', error);
            this.renderError();
        }
    }
    
    async loadPersonas() {
        try {
            let data;
            
            // Use inline data if provided (bypasses CORS)
            if (this.options.inlineData) {
                data = this.options.inlineData;
            } else {
                // Fetch from URL
                const response = await fetch(this.options.jsonUrl);
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }
                data = await response.json();
            }
            
            const rawPersonas = data.personas || [];
            
            if (rawPersonas.length === 0) {
                throw new Error('No personas found in data');
            }
            
            // Select one exemplar from each persona, ensuring no gender duplication
            this.personas = this.selectUniqueGenderExemplars(rawPersonas);
            
            // Limit the number of personas if specified
            if (this.options.limit > 0) {
                this.personas = this.personas.slice(0, this.options.limit);
            }
            
        } catch (error) {
            throw new Error(`Failed to load personas: ${error.message}`);
        }
    }
    
    selectUniqueGenderExemplars(rawPersonas) {
        const genders = ['male', 'female', 'indeterminate'];
        const usedGenders = [];
        const selectedExemplars = [];
        
        // Shuffle personas to randomize selection order
        const shuffledPersonas = [...rawPersonas].sort(() => Math.random() - 0.5);
        
        for (const persona of shuffledPersonas) {
            if (!persona.exemplars) continue;
            
            // Find available genders for this persona
            const availableGenders = genders.filter(gender => 
                persona.exemplars[gender] && !usedGenders.includes(gender)
            );
            
            if (availableGenders.length === 0) {
                // If no unique genders available, skip this persona
                continue;
            }
            
            // Randomly select from available genders
            const selectedGender = availableGenders[Math.floor(Math.random() * availableGenders.length)];
            const exemplar = persona.exemplars[selectedGender];
            
            // Create persona object with selected exemplar data
            selectedExemplars.push({
                id: persona.id,
                title: exemplar.name,
                caption: exemplar.caption,
                image: exemplar.image,
                gender: selectedGender,
                personaType: persona.title
            });
            
            usedGenders.push(selectedGender);
            
            // Stop if we have one of each gender
            if (usedGenders.length >= 3) break;
        }
        
        return selectedExemplars;
    }
    
    async preloadImages() {
        const imagePromises = this.personas.map(persona => {
            return new Promise((resolve, reject) => {
                if (!persona.image) {
                    resolve();
                    return;
                }
                
                const img = new Image();
                img.onload = () => {
                    // Store image dimensions for layout calculation
                    persona.imageWidth = img.naturalWidth;
                    persona.imageHeight = img.naturalHeight;
                    resolve(img);
                };
                img.onerror = () => {
                    console.warn(`Failed to preload image: ${persona.image}`);
                    resolve(); // Don't fail the entire rotator for one bad image
                };
                img.src = persona.image;
            });
        });
        
        await Promise.all(imagePromises);
        console.log('CME Persona Rotator: All images preloaded');
    }
    
    render() {
        this.container.innerHTML = '';
        this.container.className = 'cme-persona-rotator';
        
        // Add CSS styles
        this.injectStyles();
        
        // Calculate and set fixed container dimensions
        this.setContainerDimensions();
        
        // Create slides container
        const slidesContainer = document.createElement('div');
        slidesContainer.className = 'cme-slides-container';
        
        // Create slides
        this.personas.forEach((persona, index) => {
            const slide = this.createSlide(persona, index);
            slidesContainer.appendChild(slide);
        });
        
        this.container.appendChild(slidesContainer);
        
        // Add navigation if enabled
        if (this.options.showNavigation && this.personas.length > 1) {
            this.createNavigation();
        }
        
        // Show first slide
        this.showSlide(0);
        
        // Add click handler if URL is provided
        if (this.options.clickUrl) {
            this.addClickHandler();
        }
    }
    
    setContainerDimensions() {
        // Calculate the optimal container height based on preloaded images
        const containerWidth = this.container.offsetWidth || 800; // fallback width
        let maxHeight = 0;
        
        this.personas.forEach(persona => {
            if (persona.imageWidth && persona.imageHeight) {
                // Calculate height for this image at container width
                const aspectRatio = persona.imageHeight / persona.imageWidth;
                const scaledHeight = Math.min(containerWidth * aspectRatio, 500); // max 500px
                maxHeight = Math.max(maxHeight, scaledHeight);
            }
        });
        
        // Set a minimum height if we couldn't calculate from images
        if (maxHeight === 0) {
            maxHeight = 400; // default height
        }
        
        // Add space for overlay (approximately 100-150px)
        const overlayHeight = 120;
        const totalHeight = maxHeight + (this.options.showNavigation ? 60 : 0); // nav height
        
        // Set fixed dimensions to prevent repainting
        this.container.style.height = `${totalHeight}px`;
        this.container.style.minHeight = `${totalHeight}px`;
        
        // Store for use in CSS
        this.containerHeight = totalHeight;
        this.imageHeight = maxHeight;
    }
    
    createSlide(persona, index) {
        const slide = document.createElement('div');
        slide.className = 'cme-persona-slide';
        slide.style.display = index === 0 ? 'block' : 'none';
        
        const captionHtml = this.generateCaptionHtml(persona);
        
        slide.innerHTML = `
            <div class="cme-persona-image-container ${this.options.clickUrl ? 'cme-clickable' : ''}">
                ${persona.image ? `<img src="${persona.image}" alt="${persona.caption || persona.title}" loading="lazy" />` : ''}
                ${this.options.captionPosition === 'overlay' ? captionHtml : ''}
            </div>
            ${this.options.captionPosition === 'below' ? captionHtml : ''}
        `;
        
        return slide;
    }
    
    generateCaptionHtml(persona) {
        if (this.options.captionPosition === 'none') {
            return '';
        }
        
        const overlayClass = this.options.captionPosition === 'overlay' ? 'cme-persona-overlay' : 'cme-persona-caption-below';
        const titleHtml = this.options.showTitle ? `<h3 class="cme-persona-title">${persona.title}</h3>` : '';
        const captionHtml = persona.caption ? `<div class="cme-persona-caption">${persona.caption}</div>` : '';
        
        return `
            <div class="${overlayClass}">
                ${titleHtml}
                ${captionHtml}
            </div>
        `;
    }
    
    createNavigation() {
        const nav = document.createElement('div');
        nav.className = 'cme-persona-nav';
        
        // Previous button
        const prevBtn = document.createElement('button');
        prevBtn.className = 'cme-nav-btn cme-nav-prev';
        prevBtn.innerHTML = '❮';
        prevBtn.addEventListener('click', () => this.previousSlide());
        
        // Next button
        const nextBtn = document.createElement('button');
        nextBtn.className = 'cme-nav-btn cme-nav-next';
        nextBtn.innerHTML = '❯';
        nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Dots indicator
        const dots = document.createElement('div');
        dots.className = 'cme-nav-dots';
        
        this.personas.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.className = `cme-nav-dot ${index === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => this.goToSlide(index));
            dots.appendChild(dot);
        });
        
        nav.appendChild(prevBtn);
        nav.appendChild(dots);
        nav.appendChild(nextBtn);
        
        this.container.appendChild(nav);
    }
    
    showSlide(index) {
        const slides = this.container.querySelectorAll('.cme-persona-slide');
        const dots = this.container.querySelectorAll('.cme-nav-dot');
        
        // Hide all slides
        slides.forEach(slide => {
            if (this.options.fadeTransition) {
                slide.style.opacity = '0';
                setTimeout(() => {
                    slide.style.display = 'none';
                }, 300);
            } else {
                slide.style.display = 'none';
            }
        });
        
        // Show current slide
        if (slides[index]) {
            if (this.options.fadeTransition) {
                slides[index].style.display = 'block';
                setTimeout(() => {
                    slides[index].style.opacity = '1';
                }, 10);
            } else {
                slides[index].style.display = 'block';
            }
        }
        
        // Update navigation dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        this.currentIndex = index;
    }
    
    nextSlide() {
        const nextIndex = (this.currentIndex + 1) % this.personas.length;
        this.showSlide(nextIndex);
    }
    
    previousSlide() {
        const prevIndex = (this.currentIndex - 1 + this.personas.length) % this.personas.length;
        this.showSlide(prevIndex);
    }
    
    goToSlide(index) {
        this.showSlide(index);
    }
    
    startRotation() {
        if (!this.options.autoRotate || this.personas.length <= 1) return;
        
        this.rotationTimer = setInterval(() => {
            this.nextSlide();
        }, this.options.rotationSpeed);
    }
    
    stopRotation() {
        if (this.rotationTimer) {
            clearInterval(this.rotationTimer);
            this.rotationTimer = null;
        }
    }
    
    addClickHandler() {
        // Add click event to the entire rotator
        this.container.addEventListener('click', (e) => {
            // Don't trigger if user clicked on navigation
            if (e.target.closest('.cme-persona-nav')) return;
            
            this.handleRotatorClick();
        });
    }
    
    handleRotatorClick() {
        if (!this.options.clickUrl) return;
        
        // Build the final URL with preserved parameters
        const finalUrl = this.buildUrlWithParameters(this.options.clickUrl);
        
        // Navigate to the URL
        if (this.options.openInNewTab) {
            window.open(finalUrl, '_blank', 'noopener,noreferrer');
        } else {
            window.location.href = finalUrl;
        }
    }
    
    buildUrlWithParameters(baseUrl) {
        try {
            const url = new URL(baseUrl);
            const currentParams = new URLSearchParams(window.location.search);
            
            // Preserve UTM parameters and referrer info
            const paramsToPreserve = [
                'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
                'gclid', 'fbclid', 'msclkid', 'ref', 'referrer'
            ];
            
            // Add current URL parameters that should be preserved
            paramsToPreserve.forEach(param => {
                if (currentParams.has(param)) {
                    url.searchParams.set(param, currentParams.get(param));
                }
            });
            
            // Add referrer if not already present
            if (!url.searchParams.has('ref') && !url.searchParams.has('referrer')) {
                if (document.referrer) {
                    url.searchParams.set('ref', document.referrer);
                }
            }
            
            // Add current page as source if no UTM source
            if (!url.searchParams.has('utm_source')) {
                url.searchParams.set('utm_source', 'persona_rotator');
            }
            
            return url.toString();
        } catch (error) {
            console.warn('CME Persona Rotator: Invalid URL format:', error);
            return baseUrl; // Fallback to original URL
        }
    }
    
    pauseOnHover() {
        this.container.addEventListener('mouseenter', () => this.stopRotation());
        this.container.addEventListener('mouseleave', () => this.startRotation());
    }
    
    renderError() {
        this.container.innerHTML = `
            <div class="cme-persona-error">
                <p>Unable to load personas. Please try again later.</p>
            </div>
        `;
    }
    
    injectStyles() {
        if (document.getElementById('cme-persona-rotator-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'cme-persona-rotator-styles';
        style.textContent = `
            .cme-persona-rotator {
                position: relative;
                overflow: hidden;
                margin: 0 auto;
                max-width: 100%;
                width: 100%;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            
            .cme-slides-container {
                position: relative;
            }
            
            .cme-persona-slide {
                width: 100%;
                transition: opacity 0.3s ease-in-out;
            }
            
            .cme-persona-image-container {
                position: relative;
                width: 100%;
                height: 100%;
                overflow: hidden;
            }
            
            .cme-persona-image-container img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                object-position: center;
                display: block;
                border-radius: 8px 8px 0 0;
            }
            
            .cme-persona-image-container.cme-clickable {
                cursor: pointer;
                transition: transform 0.2s ease, box-shadow 0.2s ease;
            }
            
            .cme-persona-image-container.cme-clickable:hover {
                transform: scale(1.02);
                box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
            }
            
            .cme-persona-overlay {
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
                color: white;
                padding: 15px 20px 20px;
                border-radius: 0 0 8px 8px;
            }
            
            .cme-persona-title {
                margin: 0 0 10px;
                color: white;
                font-size: 1.5em;
                font-weight: bold;
            }
            
            .cme-persona-caption {
                font-size: 15px;
                line-height: 1.4;
                opacity: 0.95;
                font-weight: 400;
                margin: 0;
            }
            
            .cme-persona-caption-below {
                padding: 15px 20px;
                background: #f8f9fa;
                border-radius: 0 0 8px 8px;
            }
            
            .cme-persona-caption-below .cme-persona-title {
                color: #333;
                margin-bottom: 8px;
            }
            
            .cme-persona-caption-below .cme-persona-caption {
                color: #666;
                opacity: 1;
            }
            
            .cme-persona-nav {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 15px 20px;
                background: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(10px);
            }
            
            .cme-nav-btn {
                background: rgba(255, 255, 255, 0.2);
                border: none;
                color: white;
                padding: 10px 15px;
                border-radius: 50%;
                cursor: pointer;
                font-size: 18px;
                transition: background 0.3s ease;
            }
            
            .cme-nav-btn:hover {
                background: rgba(255, 255, 255, 0.3);
            }
            
            .cme-nav-dots {
                display: flex;
                gap: 8px;
            }
            
            .cme-nav-dot {
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.4);
                cursor: pointer;
                transition: background 0.3s ease;
            }
            
            .cme-nav-dot.active {
                background: white;
            }
            
            .cme-persona-error {
                text-align: center;
                padding: 40px 20px;
                color: #666;
                font-style: italic;
            }
            
            @media (max-width: 768px) {
                .cme-persona-rotator {
                    border-radius: 4px;
                }
                
                .cme-persona-image-container img {
                    max-height: 350px;
                    border-radius: 4px 4px 0 0;
                }
                
                .cme-persona-overlay {
                    padding: 10px 15px 15px;
                    border-radius: 0 0 4px 4px;
                }
                
                .cme-persona-title {
                    font-size: 1.2em;
                    margin-bottom: 8px;
                }
                
                .cme-persona-caption {
                    font-size: 14px;
                }
                
                .cme-nav-btn {
                    padding: 8px 12px;
                    font-size: 16px;
                }
                
                .cme-nav-dots {
                    gap: 6px;
                }
                
                .cme-nav-dot {
                    width: 10px;
                    height: 10px;
                }
            }
            
            @media (max-width: 480px) {
                .cme-persona-image-container img {
                    max-height: 300px;
                }
                
                .cme-persona-overlay {
                    padding: 8px 12px 12px;
                }
                
                .cme-persona-title {
                    font-size: 1.1em;
                    margin-bottom: 6px;
                }
                
                .cme-persona-caption {
                    font-size: 13px;
                    line-height: 1.3;
                }
                
                .cme-nav-btn {
                    padding: 6px 10px;
                    font-size: 14px;
                }
            }
        `;
        
        document.head.appendChild(style);
    }
    
    // Public API methods
    destroy() {
        this.stopRotation();
        if (this.container) {
            this.container.innerHTML = '';
        }
    }
    
    updateOptions(newOptions) {
        this.options = { ...this.options, ...newOptions };
        this.stopRotation();
        this.render();
        this.startRotation();
    }
}

// Usage example and initialization
document.addEventListener('DOMContentLoaded', function() {
    // Auto-initialize any elements with data-cme-persona-rotator attribute
    document.querySelectorAll('[data-cme-persona-rotator]').forEach(element => {
        const options = {
            jsonUrl: element.dataset.jsonUrl,
            rotationSpeed: parseInt(element.dataset.rotationSpeed) || 5000,
            limit: parseInt(element.dataset.limit) || 3,
            autoRotate: element.dataset.autoRotate !== 'false',
            showNavigation: element.dataset.showNavigation === 'true',
            fadeTransition: element.dataset.fadeTransition === 'true',
            clickUrl: element.dataset.clickUrl || null,
            openInNewTab: element.dataset.openInNewTab !== 'false',
            captionPosition: element.dataset.captionPosition || 'overlay',
            showTitle: element.dataset.showTitle !== 'false'
        };
        
        new CMEPersonaRotator(element.id, options);
    });
});

// Export for manual initialization
window.CMEPersonaRotator = CMEPersonaRotator;