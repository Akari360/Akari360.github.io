// =========================================================================
// 📂 UPGRADED TOUR DATA REPOSITORY
// Add your pricing, description, 360 folder, and image gallery paths here.
// =========================================================================
const toursData = [
    {
        id: "downtown-tour",
        title: "Historic Downtown Exploration",
        price: "$450,000",
        shortDescription: "A full architectural walk-through highlighting historical landmarks.",
        longDescription: "Welcome to this beautifully preserved historic property located right in the heart of the downtown district. Featuring original brickwork, soaring 14-foot ceilings, and completely modernized utility systems, this space blends classic charm with contemporary convenience. Ideal for commercial boutique operations or a premium residential loft conversion.",
        folderName: "0001/output", 
        gallery: [
            "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200", 
            "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200",
            "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1200",
			"https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200",
            "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200"
        ]
    },
    {
        id: "luxury-villa",
        title: "Luxury Modern Villa",
        price: "$2,490,000",
        shortDescription: "High-end real estate presentation showcasing interior flow and views.",
        longDescription: "An architectural masterpiece overlooking the valley, this luxury villa features an open-concept minimalist design, smart home automation, a zero-edge infinity pool, and expansive floor-to-ceiling glass walls that frame panoramic sunset views. Every detail has been meticulously crafted for world-class luxury living.",
        folderName: "luxury-villa", 
        gallery: [
            "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200",
            "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200"
        ]
    }
];

// Active Lightbox State Variables
let currentGalleryArray = [];
let activeImageIndex = 0;

// =========================================================================
// ⚙️ ENGINE: HOME & DETAIL PAGE ROUTER
// =========================================================================

function renderHomepage() {
    window.location.hash = '';
    
    document.body.innerHTML = `
        <header>
            <div class="container animate-fade-in">
                <div class="logo">AKARI<span>360</span></div>
                <h1>Immersive Virtual Spaces</h1>
                <p>High-resolution, self-hosted interactive 360° tours optimized for web and mobile devices.</p>
            </div>
        </header>

        <section class="portfolio-controls container">
            <h2>Featured Projects</h2>
            <div class="line-decorator"></div>
        </section>

        <main class="container">
            <div class="gallery" id="portfolio-grid"></div>
        </main>

        <footer>
            <div class="container"><p>&copy; 2026 Akari360. All rights reserved.</p></div>
        </footer>
    `;

    const gridContainer = document.getElementById('portfolio-grid');
    
    toursData.forEach(tour => {
        const card = document.createElement('div');
        card.className = 'card';
        card.onclick = () => renderProjectPage(tour.id);

        card.innerHTML = `
            <div class="card-preview-image">
                <img src="${tour.gallery[0]}" alt="${tour.title}" loading="lazy">
                <div class="view-tour-overlay"><span>Explore Project ✨</span></div>
            </div>
            <div class="card-info">
                <div class="card-header-split">
                    <h3>${tour.title}</h3>
                    <span class="card-price">${tour.price}</span>
                </div>
                <p>${tour.shortDescription}</p>
            </div>
        `;
        gridContainer.appendChild(card);
    });
}

function renderProjectPage(projectId) {
    const project = toursData.find(p => p.id === projectId);
    if (!project) return;

    window.location.hash = `project-${projectId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    currentGalleryArray = project.gallery;

    document.body.innerHTML = `
        <div id="detail-sticky-nav" class="sticky-nav-bar">
            <div class="container sticky-nav-content">
                <button onclick="renderHomepage()" class="btn-back-sticky">← Back</button>
                <div class="sticky-title">${project.title}</div>
                <div class="sticky-price">${project.price}</div>
            </div>
        </div>

        <header class="detail-header">
            <div class="container detail-top-bar">
                <div class="nav-back-wrapper">
                    <button onclick="renderHomepage()" class="btn-back">← Back to Portfolio</button>
                </div>
                <div class="logo-centered-wrapper">
                    <div class="logo">AKARI<span>360</span></div>
                </div>
                <div class="nav-spacer"></div>
            </div>
            
            <div class="container header-main-hero text-center">
                <h1>${project.title}</h1>
                <div class="project-hero-price">${project.price}</div>
            </div>
        </header>

        <section class="main-360-viewer">
            <div class="container">
                <div class="iframe-container large-viewer">
                    <div class="loading-spinner"></div>
                    <iframe 
                        src="tours/${project.folderName}/index.html" 
                        allowfullscreen 
                        allow="xr-spatial-tracking; gyroscope; accelerometer">
                    </iframe>
                </div>
            </div>
        </section>

        <section class="carousel-section container">
            <h2>Photo Gallery</h2>
            <div class="line-decorator"></div>
            <div class="carousel-wrapper">
                <div class="carousel-track">
                    ${project.gallery.map((imgUrl, index) => `
                        <div class="carousel-slide" onclick="openLightbox(${index})">
                            <img src="${imgUrl}" alt="Gallery view room ${index + 1}">
                        </div>
                    `).join('')}
                </div>
                <div class="carousel-hint">Click to enlarge • Swipe horizontally →</div>
            </div>
        </section>

        <main class="container project-text-section">
            <div class="details-content-card">
                <h2>Project Overview</h2>
                <div class="line-decorator"></div>
                <p class="long-description">${project.longDescription}</p>
            </div>
        </main>

        <section class="container contact-section">
            <div class="contact-card">
                <div class="contact-accent-bar"></div>
                <div class="contact-grid">
                    <div class="contact-info-text">
                        <h3>Interested in this property?</h3>
                        <p>Schedule a private walk-through or request premium raw resolution assets.</p>
                    </div>
                    <div class="contact-details-list">
                        <div class="contact-item">
                            <span class="icon">✉️</span>
                            <a href="mailto:info@akari360.com">info@akari360.com</a>
                        </div>
                        <div class="contact-item">
                            <span class="icon">📞</span>
                            <a href="tel:+1234567890">+1 (234) 567-890</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <footer>
            <div class="container"><p>&copy; 2026 Akari360. All rights reserved.</p></div>
        </footer>

        <div id="lightbox-modal" class="lightbox">
            <span class="lightbox-close" onclick="closeLightbox()">&times;</span>
            <button class="lightbox-arrow arrow-left" onclick="changeLightboxImage(-1)">&#10094;</button>
            <div class="lightbox-content-wrapper">
                <img id="lightbox-target-img" src="" alt="Enlarged visualization viewport">
            </div>
            <button class="lightbox-arrow arrow-right" onclick="changeLightboxImage(1)">&#10095;</button>
        </div>
    `;

    // 🔄 SCROLL LISTENER ENGINE: Detects when user scrolls past the main header
    window.onscroll = function() {
        const stickyNav = document.getElementById('detail-sticky-nav');
        // If the stickyNav element exists on the current layout page
        if (stickyNav) {
            // 320px is roughly where the main hero title and price end
            if (window.scrollY > 320) {
                stickyNav.classList.add('visible');
            } else {
                stickyNav.classList.remove('visible');
            }
        }
    };
}

// =========================================================================
// 🖼️ LIGHTBOX MODAL NAVIGATION LOGIC INTERFACE
// =========================================================================

function openLightbox(index) {
    activeImageIndex = index;
    const modal = document.getElementById('lightbox-modal');
    const modalImg = document.getElementById('lightbox-target-img');
    
    modalImg.src = currentGalleryArray[activeImageIndex];
    modal.classList.add('lightbox-active');
    document.body.style.overflow = 'hidden'; // Lock background scrolling
}

function closeLightbox() {
    const modal = document.getElementById('lightbox-modal');
    modal.classList.remove('lightbox-active');
    document.body.style.overflow = 'auto'; // Restore background scrolling
}

function changeLightboxImage(direction) {
    activeImageIndex += direction;
    
    // Looping behaviors tracking array boundaries
    if (activeImageIndex >= currentGalleryArray.length) {
        activeImageIndex = 0;
    } else if (activeImageIndex < 0) {
        activeImageIndex = currentGalleryArray.length - 1;
    }
    
    document.getElementById('lightbox-target-img').src = currentGalleryArray[activeImageIndex];
}

// Handle initializing the correct page on load
document.addEventListener('DOMContentLoaded', () => {
    const currentHash = window.location.hash;
    if (currentHash.startsWith('#project-')) {
        const pId = currentHash.replace('#project-', '');
        renderProjectPage(pId);
    } else {
        renderHomepage();
    }
});

// Handle browser Back / Forward navigation events smoothly
window.addEventListener('popstate', () => {
    const currentHash = window.location.hash;
    if (currentHash.startsWith('#project-')) {
        const pId = currentHash.replace('#project-', '');
        renderProjectPage(pId);
    } else {
        renderHomepage();
    }
});