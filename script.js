// =========================================================================
// 📂 TOUR DATA REPOSITORY
// To add a new tour, simply copy a block below, paste it, and edit the info.
// =========================================================================
const toursData = [
    {
        title: "Historic Downtown Exploration",
        description: "A full architectural walk-through highlighting historical landmarks, points of interest, and custom interactive hotspots.",
        folderName: "downtown-tour" // Points to tours/downtown-tour/index.html
    },
    {
        title: "Luxury Modern Villa",
        description: "High-end real estate presentation showcasing interior flow, ultra-wide resolution depth, and fully customized navigation skins.",
        folderName: "0001/output" // Points to tours/luxury-villa/index.html
    }
    // ✨ FUTURE TOURS GO RIGHT HERE:
    // ,{
    //     title: "My New Awesome Tour",
    //     description: "A brief description describing the project spaces.",
    //     folderName: "new-tour-folder"
    // }
];

// =========================================================================
// ⚙️ AUTOMATIC GENERATION ENGINE
// Do not modify this unless changing the website structure.
// =========================================================================
function renderPortfolio() {
    const gridContainer = document.getElementById('portfolio-grid');
    gridContainer.innerHTML = ""; // Clear existing elements

    toursData.forEach(tour => {
        // Construct the card element
        const card = document.createElement('div');
        card.className = 'card';

        card.innerHTML = `
            <div class="iframe-container">
                <div class="loading-spinner"></div>
                <iframe 
                    src="tours/${tour.folderName}/index.html" 
                    loading="lazy"
                    allowfullscreen 
                    allow="xr-spatial-tracking; gyroscope; accelerometer; magnifying-glass">
                </iframe>
            </div>
            <div class="card-info">
                <h3>${tour.title}</h3>
                <p>${tour.description}</p>
            </div>
        `;

        gridContainer.appendChild(card);
    });
}

// Fire up the portfolio generation once the webpage loads
document.addEventListener('DOMContentLoaded', renderPortfolio);