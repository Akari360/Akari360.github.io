// =========================================================================
// 📂 AUTOMATED TOUR DATA REPOSITORY (WITH ADVANCED METRICS)
// =========================================================================
const toursData = [
    {
        id: "AlHail twin Villa",
        refCode: "AK-0001",                 // Unique Reference Code
        title: "AlHail twin Villa",
        price: "OMR 120,000",
        beds: 4,                            // Number of Beds
        baths: 5,                           // Number of Baths
        plotSize: 300,                      // Plot Size (Optional: null if not applicable)
        aptSize: 331.86,                    // Apartment Size in sqm
        balcony: false,                     // Balcony: true or false
        shortDescription: "A full architectural walk-through highlighting historical landmarks.",
        longDescription: `
            <p>Welcome to this beautifully preserved 4 bedroom twin villa located in a very quite decent neighborhood. Featuring completely modernized utility systems.</p>
            <p><strong>Property Highlights:</strong></p>
            <ul>
                <li>Number of Bedrooms: 4</li>
                <li>Number of Bathrooms: 5</li>
                <li>Building Area: 331.86 square meter</li>
                <li>land size: 300 square meter</li>
            </ul>
        `,
        folderName: "0001/output",           
        imageFolder: "tours/0001/assets",    
        contact: {
            heading: "Want to schedule a walk-through?",
            subheading: "Contact our commercial specialist.",
            email: "Not available",
            phone: "Not available"
        }
    }
];

// Global session control states
let currentGalleryArray = [];
let activeImageIndex = 0;

// =========================================================================
// ⚙️ ENGINE: HOME PAGE PORTFOLIO GRID & SEARCH RADAR GENERATOR
// =========================================================================
function renderHomepage() {
    window.location.hash = '';
    
    document.body.innerHTML = `
        <div id="search-filter-panel" class="floating-drawer-panel">
            <div class="filter-panel-header">
                <h3>Search Parameters</h3>
                <span class="close-panel-btn" onclick="toggleSearchPanel()">&times;</span>
            </div>
            <div class="filter-panel-body">
                <div class="filter-group">
                    <label>Ref Code / Title Keyword</label>
                    <input type="text" id="filter-keyword" placeholder="e.g., AK-0001 or Villa..." oninput="executeSearchFilter()">
                </div>
                <div class="filter-row-split">
                    <div class="filter-group">
                        <label>Beds (Min)</label>
                        <input type="number" id="filter-beds" min="0" placeholder="Any" oninput="executeSearchFilter()">
                    </div>
                    <div class="filter-group">
                        <label>Baths (Min)</label>
                        <input type="number" id="filter-baths" min="0" placeholder="Any" oninput="executeSearchFilter()">
                    </div>
                </div>
                <div class="filter-row-split">
                    <div class="filter-group">
                        <label>Min Size (Apt sqm)</label>
                        <input type="number" id="filter-apt-size" min="0" placeholder="e.g. 300" oninput="executeSearchFilter()">
                    </div>
                    <div class="filter-group">
                        <label>Min Plot Size (sqm)</label>
                        <input type="number" id="filter-plot-size" min="0" placeholder="e.g. 800" oninput="executeSearchFilter()">
                    </div>
                </div>
                <div class="filter-group checkbox-group">
                    <input type="checkbox" id="filter-balcony" onchange="executeSearchFilter()">
                    <label for="filter-balcony"> Balcony / Terrace</label>
                </div>
                <button class="btn-clear-filters" onclick="resetSearchFilters()">Reset Parameters</button>
            </div>
        </div>

        <header>
            <div class="container animate-fade-in">
                <div class="logo-container">
                    <img src="logo.jpg" alt="AKARI 360 Logo" class="site-logo">
                </div>
                <h1>Luxury Homes, Fully Immersive</h1>
                <p>Step into exceptional properties from anywhere in the world.</p>
            </div>
        </header>
        
        <section class="portfolio-controls container">
            <div class="portfolio-heading-wrapper">
                <h2>Featured Projects</h2>
                <div class="line-decorator"></div>
            </div>
            <button class="btn-open-search" id="open-filter-btn" onclick="toggleSearchPanel()">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 8px; display: inline-block; vertical-align: middle;"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                Filter Archive Parameters
            </button>
        </section>
        
        <main class="container">
            <div class="gallery" id="portfolio-grid"></div>
            <div id="no-results-msg" class="hidden-search-msg">No properties match your current search coordinates.</div>
        </main>
        
        <footer>
            <div class="container"><p>&copy; 2026 Akari360. All rights reserved.</p></div>
        </footer>
    `;

    // Render dataset on initial load
    populateGridCards(toursData);
}

// Sub-Worker to parse grid system allocations safely without identifier duplications
function populateGridCards(filteredDataset) {
    const targetGrid = document.getElementById('portfolio-grid');
    const noResultsMsg = document.getElementById('no-results-msg');
    if (!targetGrid) return;
    
    targetGrid.innerHTML = "";
    
    if (filteredDataset.length === 0) {
        if (noResultsMsg) noResultsMsg.classList.add('visible');
        return;
    } else {
        if (noResultsMsg) noResultsMsg.classList.remove('visible');
    }

    filteredDataset.forEach(tour => {
        const card = document.createElement('div');
        card.className = 'card animate-fade-in';
        card.onclick = () => renderProjectPage(tour.id);

        const coverImage = `${tour.imageFolder}/1-thumb.jpg`;

        // 🧮 Dual unit conversion layout engines
        const aptSqFt = Math.round(tour.aptSize * 10.764).toLocaleString();
        let specString = `🛏️ ${tour.beds} | 🛁 ${tour.baths} | 📐 ${tour.aptSize} sqm (${aptSqFt} sq ft)`;
        
        if (tour.plotSize) {
            const plotSqFt = Math.round(tour.plotSize * 10.764).toLocaleString();
            specString += ` | 🌳 Plot: ${tour.plotSize} sqm (${plotSqFt} sq ft)`;
        }
        if (tour.balcony) specString += ` | 🌅 Balcony`;

        card.innerHTML = `
            <div class="card-preview-image">
                <img src="${coverImage}" alt="${tour.title}" loading="lazy" onerror="this.src='${tour.imageFolder}/1.jpg'">
                <span class="card-ref-badge">${tour.refCode}</span>
                <div class="view-tour-overlay"><span>Explore Project ✨</span></div>
            </div>
            <div class="card-info">
                <div class="card-header-split">
                    <h3>${tour.title}</h3>
                    <span class="card-price">${tour.price}</span>
                </div>
                <div class="card-specs-strip">${specString}</div>
                <p>${tour.shortDescription}</p>
            </div>
        `;
        targetGrid.appendChild(card);
    });
}

// Toggle operations for filter drawer panel
function toggleSearchPanel() {
    const panel = document.getElementById('search-filter-panel');
    if (panel) panel.classList.toggle('panel-open');
}

// Search Filter Execution Worker
function executeSearchFilter() {
    const keyword = document.getElementById('filter-keyword').value.toLowerCase().trim();
    const minBeds = parseInt(document.getElementById('filter-beds').value) || 0;
    const minBaths = parseInt(document.getElementById('filter-baths').value) || 0;
    const minApt = parseInt(document.getElementById('filter-apt-size').value) || 0;
    const minPlot = parseInt(document.getElementById('filter-plot-size').value) || 0;
    const requireBalcony = document.getElementById('filter-balcony').checked;

    const filtered = toursData.filter(tour => {
        const matchesKeyword = tour.refCode.toLowerCase().includes(keyword) || tour.title.toLowerCase().includes(keyword);
        const matchesBeds = tour.beds >= minBeds;
        const matchesBaths = tour.baths >= minBaths;
        const matchesApt = tour.aptSize >= minApt;
        const matchesPlot = minPlot === 0 || (tour.plotSize && tour.plotSize >= minPlot);
        const matchesBalcony = !requireBalcony || tour.balcony === true;

        return matchesKeyword && matchesBeds && matchesBaths && matchesApt && matchesPlot && matchesBalcony;
    });

    populateGridCards(filtered);
}

// Reset operations back to clean baseline state
function resetSearchFilters() {
    document.getElementById('filter-keyword').value = "";
    document.getElementById('filter-beds').value = "";
    document.getElementById('filter-baths').value = "";
    document.getElementById('filter-apt-size').value = "";
    document.getElementById('filter-plot-size').value = "";
    document.getElementById('filter-balcony').checked = false;
    populateGridCards(toursData);
}

// =========================================================================
// ⚙️ PROJECT DETAIL PAGE RENDERER
// =========================================================================
function renderProjectPage(projectId) {
    const project = toursData.find(p => p.id === projectId);
    if (!project) return;

    window.location.hash = `project-${projectId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });

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
                <div class="logo-centered-wrapper" onclick="renderHomepage()">
                    <img src="logo.jpg" alt="AKARI 360 Logo" class="site-logo-small">
                </div>
                <div class="nav-spacer"></div>
            </div>
            <div class="container header-main-hero text-center" style="text-align: center; margin-top: 40px;">
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
                     stream
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
                <div class="long-description">${project.longDescription}</div>
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
                <img id="lightbox-target-img" src="" alt="High-res visualization">
            </div>
            <button class="lightbox-arrow arrow-right" onclick="changeLightboxImage(1)">&#10095;</button>
        </div>
    `;

    window.onscroll = function() {
        const stickyNav = document.getElementById('detail-sticky-nav');
        if (stickyNav) {
            if (window.scrollY > 320) { stickyNav.classList.add('visible'); } 
            else { stickyNav.classList.remove('visible'); }
        }
    };

    autoDiscoverImages(project.imageFolder).then(discoveredImages => {
        currentGalleryArray = discoveredImages;
        const track = document.getElementById('dynamic-carousel-track');
        
        if (track && currentGalleryArray.length > 0) {
            track.innerHTML = currentGalleryArray.map((imgUrl, index) => `
                <div class="carousel-slide" onclick="openLightbox(${index})">
                    <img src="${imgUrl}" alt="Gallery view ${index + 1}" loading="lazy">
                </div>
            `).join('');
        } else if (track) {
            track.innerHTML = `<p style="color:var(--text-secondary); padding:20px;">No additional gallery images found.</p>`;
        }
    });
}

// =========================================================================
// 🚀 BACKGROUND DISCOVERY ENGINE
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

function checkImageExists(url) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
    });
}

// =========================================================================
// 🖼️ LIGHTBOX MODAL LOGIC
// =========================================================================
function openLightbox(index) {
    activeImageIndex = index;
    const modal = document.getElementById('lightbox-modal');
    const modalImg = document.getElementById('lightbox-target-img');
    
    const thumbnailPath = currentGalleryArray[activeImageIndex];
    const highResPath = thumbnailPath.replace('-thumb.jpg', '.jpg');
    
    if (modalImg) modalImg.src = highResPath; 
    if (modal) modal.classList.add('lightbox-active');
    document.body.style.overflow = 'hidden';
}

// Fixed clear layer control function bound directly to viewport configurations
function closeLightbox() {
    const modal = document.getElementById('lightbox-modal');
    if (modal) modal.classList.remove('lightbox-active');
    document.body.style.overflow = 'auto';
}

function changeLightboxImage(direction) {
    activeImageIndex += direction;
    if (activeImageIndex >= currentGalleryArray.length) { activeImageIndex = 0; } 
    else if (activeImageIndex < 0) { activeImageIndex = currentGalleryArray.length - 1; }
    
    const thumbnailPath = currentGalleryArray[activeImageIndex];
    const highResPath = thumbnailPath.replace('-thumb.jpg', '.jpg');
    const modalImg = document.getElementById('lightbox-target-img');
    if (modalImg) modalImg.src = highResPath;
}

// Routing URL state tracking hooks
document.addEventListener('DOMContentLoaded', () => {
    const currentHash = window.location.hash;
    if (currentHash.startsWith('#project-')) {
        const pId = currentHash.replace('#project-', '');
        renderProjectPage(pId);
    } else { renderHomepage(); }
});

window.addEventListener('popstate', () => {
    const currentHash = window.location.hash;
    if (currentHash.startsWith('#project-')) {
        const pId = currentHash.replace('#project-', '');
        renderProjectPage(pId);
    } else { renderHomepage(); }
});