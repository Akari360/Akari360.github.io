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
        folderName: "0001/output", // Your Pano2VR folder name
        gallery: [
            "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800", // Replace with your image paths
            "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800",
            "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800"
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
            "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
            "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800"
        ]
    }
];

// =========================================================================
// ⚙️ ENGINE: HOME & DETAIL PAGE ROUTER
// =========================================================================

function renderHomepage() {
    // Reset URL hash if returning home
    window.location.hash = '';
    
    // Change page layout back to standard portfolio body
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
        // Make the entire card clickable
        card.onclick = () => renderProjectPage(tour.id);

        card.innerHTML = `
            <div class="card-preview-image">
                <!-- Displays the first image from your gallery as a beautiful thumbnail cover -->
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

    // Push state to browser history so users can use the browser "Back" button
    window.location.hash = `project-${projectId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Build the detail template
    document.body.innerHTML = `
        <!-- Custom Detail Page Navigation Header -->
        <header class="detail-header">
            <div class="container detail-nav-container">
                <button onclick="renderHomepage()" class="btn-back">← Back to Portfolio</button>
                <div class="logo">AKARI<span>360</span></div>
            </div>
            <div class="container header-title-row">
                <h1>${project.title}</h1>
                <div class="project-price-tag">${project.price}</div>
            </div>
        </header>

        <!-- 360 Panoramic Main View Frame -->
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

        <!-- Project Details & Photo Gallery -->
        <main class="container project-details-layout">
            <section class="details-text-block">
                <h2>Project Overview</h2>
                <div class="line-decorator"></div>
                <p class="long-description">${project.longDescription}</p>
            </section>

            <section class="details-gallery-block">
                <h2>Photo Gallery</h2>
                <div class="line-decorator"></div>
                <div class="static-photo-grid">
                    ${project.gallery.map(imgUrl => `
                        <div class="gallery-photo-wrapper">
                            <img src="${imgUrl}" alt="Gallery image for ${project.title}" onclick="window.open(this.src, '_blank')">
                        </div>
                    `).join('')}
                </div>
            </section>
        </main>

        <footer>
            <div class="container"><p>&copy; 2026 Akari360. All rights reserved.</p></div>
        </footer>
    `;
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