// Scroll Animation
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    }
  });
});

document.querySelectorAll(".reveal").forEach(el => {
  observer.observe(el);
});

// Search and Filter
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const noResults = document.getElementById("noResults");

function filterEvents() {
  const search = searchInput.value.toLowerCase();
  const category = categoryFilter.value;
  let count = 0;

  document.querySelectorAll("#eventList .event-card").forEach(card => {
    const match = card.dataset.title.includes(search) &&
      (category === "all" || card.dataset.category === category);

    card.classList.toggle("hidden", !match);

    if (match) count++;
  });

  noResults.classList.toggle("hidden", count > 0);
}

document.getElementById("searchBtn").onclick = filterEvents;
searchInput.oninput = filterEvents;
categoryFilter.onchange = filterEvents;

// Category Buttons
document.querySelectorAll(".category-card").forEach(card => {
  card.onclick = () => {
    categoryFilter.value = card.dataset.category;
    document.getElementById("explore").scrollIntoView();
    filterEvents();
  };
});

// Event Countdown
function countdown() {
  const time = Math.max(
    0,
    new Date("November 15, 2026 18:00:00").getTime() - Date.now()
  );

  const units = {
    days: 86400000,
    hours: 3600000,
    minutes: 60000,
    seconds: 1000
  };

  Object.entries(units).forEach(([id, size], i) => {
    const value = i === 0
      ? Math.floor(time / size)
      : Math.floor(time / size) % [1, 24, 60, 60][i];

    document.getElementById(id).textContent =
      String(value).padStart(2, "0");
  });
}

countdown();
setInterval(countdown, 1000);

// Gallery Image Preview
const imageModal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");

document.querySelectorAll(".gallery-img").forEach(img => {
  img.onclick = () => {
    modalImage.src = img.src;
    imageModal.classList.remove("hidden");
    imageModal.classList.add("flex");
  };
});

document.getElementById("closeModal").onclick = () => {
  imageModal.classList.add("hidden");
  imageModal.classList.remove("flex");
};

// Newsletter
document.getElementById("newsletterForm").onsubmit = e => {
  e.preventDefault();

  document.getElementById("newsletterMessage").textContent =
    "Thanks for subscribing!";

  e.target.reset();
};

// Desktop and Mobile Menus
const menu = document.getElementById("menu");
const mobileMenu = document.getElementById("mobileMenu");

function closeMenus() {
  menu.classList.add("hidden");
  menu.classList.remove("flex");

  mobileMenu.classList.add("hidden");
  mobileMenu.classList.remove("flex");
}

document.getElementById("menuBtn").onclick = () => {
  menu.classList.remove("hidden");
  menu.classList.add("flex");
};

document.getElementById("closeMenu").onclick = closeMenus;

document.getElementById("mobileMenuBtn").onclick = () => {
  mobileMenu.classList.remove("hidden");
  mobileMenu.classList.add("flex");
};

document.getElementById("closeMobileMenu").onclick = closeMenus;

document.querySelectorAll(".menuLink, .mobileLink").forEach(link => {
  link.addEventListener("click", closeMenus);
});

window.addEventListener("scroll", closeMenus);