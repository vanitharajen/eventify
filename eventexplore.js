const searchInput = document.getElementById("searchinput");
const searchBtn = document.getElementById("searchBtn");
const eventCards = document.querySelectorAll(".event-item");
const noEventsMessage = document.getElementById("noEventsMessage");
let found=false;

searchBtn.addEventListener("click", function () {
    const searchText = searchInput.value.trim().toLowerCase();

    eventCards.forEach(function (card) {
        const eventText = card.innerText.toLowerCase();

        if (eventText.includes(searchText)) {
            card.style.display = "";
            found=true;
        } else {
            card.style.display = "none";
        }
    });
        if (found) {
        noEventsMessage.style.display = "none";
    } else {
        noEventsMessage.style.display = "block";
    }

   });
searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        searchBtn.click();
    }
});

// button clicks
const categoryButtons = document.querySelectorAll(".category-btn");
const eventItems = document.querySelectorAll(".event-item");

categoryButtons.forEach(function (button) {
    button.addEventListener("click", function () {

        // Remove active class from all buttons
        categoryButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        // Highlight the selected button
        button.classList.add("active");

        const selectedCategory = button.innerText.trim().toLowerCase();

        eventItems.forEach(function (item) {
            const eventCategory = item
                .querySelector(".event-category")
                .innerText.trim().toLowerCase();

            if (
                selectedCategory === "all events" ||
                eventCategory === selectedCategory
            ) {
                item.style.display = "";
            } else {
                item.style.display = "none";
            }
        });
    });
});

// sort coding

const sortSelect = document.getElementById("sortSelect");
const eventContainer = document.querySelector(".event-card");

// Recommended
const originalOrder = Array.from(
    eventContainer.querySelectorAll(".event-item")
);

sortSelect.addEventListener("change", function () {
    const sortValue = sortSelect.value;

    const eventCards = Array.from(
        eventContainer.querySelectorAll(".event-item")
    );

    eventCards.sort(function (a, b) {

        // Price: Low to High
        if (sortValue === "price") {
            const priceA = Number(
                a.querySelector(".price-row span")
                    .innerText.replace(/[^\d.]/g, "")
            );

            const priceB = Number(
                b.querySelector(".price-row span")
                    .innerText.replace(/[^\d.]/g, "")
            );

            return priceA - priceB;
        }

        // Date: Earliest First
        if (sortValue === "date") {
            const dateA = new Date(
                a.querySelector(".event-date").dataset.date
            );

            const dateB = new Date(
                b.querySelector(".event-date").dataset.date
            );

            return dateA - dateB;
        }

        // Recommended: Original order
        return originalOrder.indexOf(a) -
            originalOrder.indexOf(b);
    });

    eventCards.forEach(function (card) {
        eventContainer.appendChild(card);
    });
});
// Favourite select
const hearts = document.querySelectorAll(".price-row .fa-heart");

hearts.forEach(function (heart) {
    heart.addEventListener("click", function () {
        heart.classList.toggle("fa-regular");
        heart.classList.toggle("fa-solid");
        heart.classList.toggle("active");
    });
});

// side nav bar



function toggleMenu() {
    const menu = document.getElementById("sidenavbar");
    const button = document.querySelector(".menu-btn");

    menu.classList.toggle("active");

    if (menu.classList.contains("active")) {
        button.style.visibility = "hidden";
    } else {
        button.style.visibility = "visible";
    }
}
// menu scroll

window.addEventListener("scroll", function () {
    const menuButton = document.querySelector(".menu-btn");
    const sideMenu = document.getElementById("sidenavbar");

    if (!menuButton || !sideMenu) return;

    if (sideMenu.classList.contains("active")) return;

    if (window.scrollY > 100) {
        menuButton.style.opacity = "0";
        menuButton.style.pointerEvents = "none";
    } else {
        menuButton.style.opacity = "1";
        menuButton.style.pointerEvents = "auto";
    }
});
