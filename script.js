// =========================================================================
// 📂 FULLY AUTOMATED TOUR DATA REPOSITORY
// No need to input image counts anymore! Just name your photos 1.jpg, 2.jpg...
// =========================================================================
const toursData = [
    {
        id: "downtown-tour",
        title: "Historic Downtown Exploration",
        price: "$450,000",
        shortDescription: "A full architectural walk-through highlighting historical landmarks.",
        longDescription: "Welcome to this beautifully preserved historic property located right in the heart of the downtown district. Featuring original brickwork, soaring 14-foot ceilings, and completely modernized utility systems.",
        folderName: "0001/output",           // Points to tours/0001/output/index.html for 360 viewer
        imageFolder: "tours/0001/assets",    // Looks for 1.jpg, 2.jpg, etc.
        contact: {
            heading: "Want to schedule a historic walk-through?",
            subheading: "Contact our commercial specialist.",
            email: "downtown@akari360.com",
            phone: "+1 (234) 567-890"
        }
    },
    {
        id: "luxury-villa",
        title: "Luxury Modern Villa",
        price: "$2,490,000",
        shortDescription: "High-end real estate presentation showcasing interior flow and views.",
        longDescription: "An architectural masterpiece overlooking the valley, this luxury villa features an open-concept minimalist design, smart home automation, and a zero-edge infinity pool.",
        folderName: "0002",           
        imageFolder: "tours/0002",    
        contact: {
            heading: "Inquire about this Luxury Estate",
            subheading: "Speak directly with our premium residential broker.",
            email: "luxuryvillas@akari360.com",
            phone: "+1 (987) 654-3210"
        }
    }
];

// Active Lightbox State Variables
let currentGalleryArray = [];
let activeImageIndex = 0;

// =========================================================================
// ⚙️ ENGINE: HOME PAGE PORTFOLIO GRID GENERATOR
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
    if (!gridContainer) return;
    
    toursData.forEach(tour => {
        const card = document.createElement('div');
        card.className = 'card';
        card.onclick = () => renderProjectPage(tour.id);

        const coverImage = `${tour.imageFolder}/1.jpg`;

        card.innerHTML = `
            <div class="card-preview-image">
                <img src="${coverImage}" alt="${tour.title}" loading="lazy">
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

// =========================================================================
// 🚀 HIGH-SPEED PARALLEL FILE DISCOVERY ENGINE
// Fires background verification pings simultaneously to remove latency bottlenecks
// =========================================================================
async function autoDiscoverImages(folderPath) {
    const maxSafetyLimit = 20; // Maximum images to look for in a folder
    const checkPromises = [];

    // Queue up check checks for numbers 1 through 20 all at the same time
    for (let i = 1; i <= maxSafetyLimit; i++) {
        const testPath = `${folderPath}/${i}.jpg`;
        checkPromises.push(
            checkImageExists(testPath).then(exists => ({ path: testPath, exists, index: i }))
        );
    }

    // Resolve all network requests in parallel
    const results = await Promise.all(checkPromises);

    // Sort results by index to ensure order is kept perfect (1, 2, 3...)
    results.sort((a, b) => a.index - b.index);

    // Build the gallery array until we find a missing image entry
    const validImages = [];
    for (const result of results) {
        if (result.exists) {
            validImages.push(result.path);
        } else {
            break; // Stop building sequence at the first 404 missing number gap
        }
    }
    return validImages;
}

// Network Ping Helper
function checkImageExists(url) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
    });
}

// =========================================================================
// ⚙️ OPTIMIZED PROJECT PAGE RENDERER
// =========================================================================
async function renderProjectPage(projectId) {
    const project = toursData.find(p => p.id === projectId);
    if (!project) return;

    window.location.hash = `project-${projectId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Instantly inject the structural template frame with layout skeletons
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
                        loading="lazy"
                        allow="xr-spatial-tracking; gyroscope; accelerometer">
                    </iframe>
                </div>
            </div>
        </section>

        <section class="carousel-section container">
            <h2>Photo Gallery</h2>
            <div class="line-decorator"></div>
            <div class="carousel-wrapper">
                <div class="carousel-track" id="dynamic-carousel-track">
                     <p style="color:var(--text-secondary); padding: 20px;">Scanning assets...</p>
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
                        <h3>${project.contact.heading}</h3>
                        <p>${project.contact.subheading}</p>
                    </div>
                    <div class="contact-details-list">
                        <div class="contact-item">
                            <span class="icon">✉️</span>
                            <a href="mailto:${project.contact.email}">${project.contact.email}</a>
                        </div>
                        <div class="contact-item">
                            <span class="icon">📞</span>
                            <a href="tel:${project.contact.phone}">${project.contact.phone}</a>
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
                <img id="lightbox-target-img" src="" alt="Enlarged viewport visualization">
            </div>
            <button class="lightbox-arrow arrow-right" onclick="changeLightboxImage(1)">&#10095;</button>
        </div>
    `;

    // Initialize Sticky Tracker scroll function logic
    window.onscroll = function() {
        const stickyNav = document.getElementById('detail-sticky-nav');
        if (stickyNav) {
            if (window.scrollY > 320) { stickyNav.classList.add('visible'); } 
            else { stickyNav.classList.remove('visible'); }
        }
    };

    // Run background image verification scan asynchronously
    autoDiscoverImages(project.imageFolder).then(discoveredImages => {
        currentGalleryArray = discoveredImages;
        const track = document.getElementById('dynamic-carousel-track');
        
        if (track && currentGalleryArray.length > 0) {
            track.innerHTML = currentGalleryArray.map((imgUrl, index) => `
                <div class="carousel-slide" onclick="openLightbox(${index})">
                    <img src="${imgUrl}" alt="Gallery