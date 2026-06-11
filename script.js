// =========================================================================
// 📂 AUTOMATED TOUR DATA REPOSITORY
// When you create a new folder (like 0003), just add a new block {} here!
// The website automatically generates everything else.
// =========================================================================
const toursData = [
    {
        id: "downtown-tour",
        title: "AlHail Twin Villa",
        price: "OMR 120,000",
        shortDescription: "A wonderful twin villa.",
        longDescription: '<p> Welcome to this beautifully preserved 4 bedroom twin villa located in a very quite decent neighborhood. Featuring completely modernized utility systems.</p>
		<p><strong>Property Highlights:</strong></p>
		<ul>
		<li>Number of Bedrooms: 4</li>
		<li>Number of Bathrooms: 5</li>
		<li>Building Area: 331.86 square meter</li>
		<li>land size: 300 square meter</li>
		</ul>',
        folderName: "0001/output",           // Points to tours/0001/output/index.html for 360 viewer
        imageFolder: "tours/0001/assets",    // Scans for your newly generated thumbnails here
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

        // ⚡ INSTANT SPEED: The home grid cover loads your tiny thumbnail file instantly!
        const coverImage = `${tour.imageFolder}/1-thumb.jpg`;

        card.innerHTML = `
            <div class="card-preview-image">
                <img src="${coverImage}" alt="${tour.title}" loading="lazy" onerror="this.src='${tour.imageFolder}/1.jpg'">
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
// 🚀 BACKGROUND DISCOVERY ENGINE
// Searches exclusively for lightweight thumbnails to maximize network performance
// =========================================================================
async function autoDiscoverImages(folderPath) {
    const maxSafetyLimit = 20; 
    const checkPromises = [];

    for (let i = 1; i <= maxSafetyLimit; i++) {
        const testPath = `${folderPath}/${i}-thumb.jpg`;
        checkPromises.push(
            checkImageExists(testPath).then(exists => ({ path: testPath, exists, index: i }))
        );
    }

    const results = await Promise.all(checkPromises);
    results.sort((a, b) => a.index - b.index);

    const validImages = [];
    for (const result of results) {
        if (result.exists) {
            validImages.push(result.path);
        } else {
            // Safety Fallback: If you haven't run your Node generator yet, show the original image
            const fallbackPath = `${folderPath}/${result.index}.jpg`;
            const fallbackExists = await checkImageExists(fallbackPath);
            if (fallbackExists) {
                validImages.push(fallbackPath);
            } else {
                break; 
            }
        }
    }
    return validImages;
}

// Network Checker Helper
function checkImageExists(url) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
    });
}

// =========================================================================
// ⚙️ PROJECT DETAIL PAGE RENDERER (FULLY ASYNCHRONOUS DECOUPLED LOADING)
// =========================================================================
function renderProjectPage(projectId) {
    const project = toursData.find(p => p.id === projectId);
    if (!project) return;

    window.location.hash = `project-${projectId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // ⚡ ZERO-LAG: Paints layout templates and interactive 360 view immediately
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
                     <p style="color: var(--text-secondary); padding: 20px; font-style: italic;">Optimizing display view...</p>
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
                <img id="lightbox-target-img" src="" alt="Crystal clear high-res viewport visualization">
            </div>
            <button class="lightbox-arrow arrow-right" onclick="changeLightboxImage(1)">&#10095;</button>
        </div>
    `;

    // Sticky navigation management
    window.onscroll = function() {
        const stickyNav = document.getElementById('detail-sticky-nav');
        if (stickyNav) {
            if (window.scrollY > 320) { stickyNav.classList.add('visible'); } 
            else { stickyNav.classList.remove('visible'); }
        }
    };

    // 🏃‍♂️ Background assets populate instantly using the lightweight thumbnails
    autoDiscoverImages(project.imageFolder).then(discoveredImages => {
        currentGalleryArray = discoveredImages;
        const track = document.getElementById('dynamic-carousel-track');
        
        if (track && currentGalleryArray.length > 0) {
            track.innerHTML = currentGalleryArray.map((imgUrl, index) => `
                <div class="carousel-slide" onclick="openLightbox(${index})">
                    <img src="${imgUrl}" alt="Gallery room view ${index + 1}" loading="lazy">
                </div>
            `).join('');
        } else if (track) {
            track.innerHTML = `<p style="color:var(--text-secondary); padding:20px;">No additional gallery images found.</p>`;
        }
    });
}

// =========================================================================
// 🖼️ LIGHTBOX MODAL LOGIC (UPGRADES THUMBNAILS TO HIGH-RES ON CLICK)
// =========================================================================
function openLightbox(index) {
    activeImageIndex = index;
    const modal = document.getElementById('lightbox-modal');
    const modalImg = document.getElementById('lightbox-target-img');
    
    // Smooth swap: strip '-thumb.jpg' to dynamically point to your huge crystal clear '1.jpg' file!
    const thumbnailPath = currentGalleryArray[activeImageIndex];
    const highResPath = thumbnailPath.replace('-thumb.jpg', '.jpg');
    
    modalImg.src = highResPath; 
    modal.classList.add('lightbox-active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const modal = document.getElementById('lightbox-modal');
    modal.classList.remove('lightbox-active');
    document.body.style.overflow = 'auto';
}

function changeLightboxImage(direction) {
    activeImageIndex += direction;
    if (activeImageIndex >= currentGalleryArray.length) { activeImageIndex = 0; } 
    else if (activeImageIndex < 0) { activeImageIndex = currentGalleryArray.length - 1; }
    
    const thumbnailPath = currentGalleryArray[activeImageIndex];
    const highResPath = thumbnailPath.replace('-thumb.jpg', '.jpg');
    
    document.getElementById('lightbox-target-img').src = highResPath;
}

// =========================================================================
// 🚦 NAVIGATION AND HYDRATION WORKERS
// =========================================================================
document.addEventListener('DOMContentLoaded', () => {
    const currentHash = window.location.hash;
    if (currentHash.startsWith('#project-')) {
        const pId = currentHash.replace('#project-', '');
        renderProjectPage(pId);
    } else { 
        renderHomepage(); 
    }
});

window.addEventListener('popstate', () => {
    const currentHash = window.location.hash;
    if (currentHash.startsWith('#project-')) {
        const pId = currentHash.replace('#project-', '');
        renderProjectPage(pId);
    } else { 
        renderHomepage(); 
    }
});