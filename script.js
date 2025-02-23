const residencies = [
    {
        id: 1,
        name: "Royal PG - A",
        address: "Chattrapati Shivaji Marg, Block D, JJ Colony, Uttam Nagar, New Delhi, Delhi-110059",
        mapUrl: "https://www.google.com/maps?q=28.62335968017578,77.06591033935547&z=17&hl=en",
        thumbnail: "static/location_1.png",
        images: [
            "static/location_1.png",
            "static/location_1_room.jpeg"
        ],
    },
    {
        id: 2,
        name: "Royal PG - B",
        address: "J Block, near Uttam Nagar East metro station gate no 3, New Delhi, Delhi-110059",
        mapUrl: "https://maps.google.com?q=456+Lunar+Lane,+Los+Angeles,+CA",
        thumbnail: "static/location_2_building_front.jpeg",
        images: [
            "static/location_2_building_front.jpeg",
            "static/location_2_building_2.jpeg",
            "static/location_2_bedroom.jpeg",
            "static/location_2_washroom.jpeg",
            "static/location_2_kitchen.jpeg"
        ],
    },
    {
        id: 3,
        name: "Royal PG - C",
        address: "Chattrapati Shivaji Marg, Block D, JJ Colony, Uttam Nagar, New Delhi, Delhi-110059",
        mapUrl: "https://www.google.com/maps?q=28.62335968017578,77.06591033935547&z=17&hl=en",
        thumbnail: "static/location_3.jpeg",
        images: [
            "static/location_3.jpeg",
            "static/location_3_bedroom.jpeg",
            "static/location_3_bedroom_wall.jpeg",
            "static/location_3_washroom.jpeg"
        ],
    }
];

const cardsContainer = document.getElementById("cards");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalImage = document.getElementById("modal-image");
const closeModalButton = document.getElementById("close-modal");
const prevImageButton = document.getElementById("prev-image");
const nextImageButton = document.getElementById("next-image");

let currentResidency = null;
let currentImageIndex = 0;

function renderCards() {
    residencies.forEach((residency) => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <img src="${residency.thumbnail}" alt="${residency.name}" class="residency-image" />
            <div class="card-content">
                <h2>${residency.name}</h2>
                <p>${residency.address}</p>
                <a href="${residency.mapUrl}" target="_blank">View on Google Maps</a>
            </div>
        `;

        card.addEventListener("click", () => {
            currentResidency = residency;
            currentImageIndex = 0;
            openModal();
        });

        cardsContainer.appendChild(card);
    });
}

function openModal() {
    document.body.classList.add("no-scroll");
    if (currentResidency) {
        modalTitle.textContent = currentResidency.name;

        // Preload the image first
        const img = new Image();
        img.src = currentResidency.images[currentImageIndex];
        img.onload = function() {
            // Once the image is loaded, set it as the modal's image
            modalImage.src = img.src;
            modal.classList.remove("hidden");
        };
    }
}

function closeModal() {
    modal.classList.add("hidden");
    currentResidency = null;
    currentImageIndex = 0;
    document.body.classList.remove("no-scroll");
}


closeModalButton.addEventListener("click", closeModal);
nextImageButton.addEventListener("click", showNextImage);
prevImageButton.addEventListener("click", showPreviousImage);


// Show Image with Slide Animation
function showImage(index, direction) {
    if (!currentResidency || currentResidency.images.length === 0) return;

    let newIndex = (index + currentResidency.images.length) % currentResidency.images.length;
    
    // Determine slide direction
    let exitClass = direction === "next" ? "slide-out-left" : "slide-out-right";
    let enterClass = direction === "next" ? "slide-in-right" : "slide-in-left";

    // Animate old image out
    modalImage.classList.add(exitClass);

    setTimeout(() => {
        // Change image source only after animation completes
        modalImage.src = currentResidency.images[newIndex];

        // Reset classes
        modalImage.classList.remove(exitClass);
        modalImage.classList.add(enterClass);

        // After the new image enters, remove animation class
        setTimeout(() => {
            modalImage.classList.remove(enterClass);
        }, 300);
        
        // Update index
        currentImageIndex = newIndex;
    }, 300); // This should match the CSS animation duration
}


// Next & Previous Image Functions
function showNextImage() {
    showImage(currentImageIndex + 1, "next");
}

function showPreviousImage() {
    showImage(currentImageIndex - 1, "prev");
}

// Swipe Gesture Support
let startX = 0;

modal.addEventListener("touchstart", function (event) {
    startX = event.touches[0].clientX;
});

modal.addEventListener("touchend", function (event) {
    let endX = event.changedTouches[0].clientX;
    let diff = startX - endX;

    if (diff > 50) {
        showNextImage(); // Swipe left
    } else if (diff < -50) {
        showPreviousImage(); // Swipe right
    }
});

// Initialize cards on page load
renderCards();

document.getElementById('navbar-toggle').addEventListener('click', function () {
    const navbarLinks = document.getElementById('navbar-links');
    navbarLinks.classList.toggle('show');
});

// Keyboard Navigation
document.addEventListener("keydown", function (event) {
    if (!modal.classList.contains("hidden")) {
        if (event.key === "ArrowRight") showNextImage();
        if (event.key === "ArrowLeft") showPreviousImage();
        if (event.key === "Escape") closeModal();
    }
});