

const ticketPrice = 499;
let quantity = 1;

const quantityText = document.getElementById("quantity");
const totalPriceText = document.getElementById("totalPrice");
const increaseBtn = document.getElementById("increaseBtn");
const decreaseBtn = document.getElementById("decreaseBtn");

const bookBtn = document.getElementById("bookBtn");
const bookingForm = document.getElementById("bookingForm");
const bookingTotal = document.getElementById("bookingTotal");

const bookingDetailsForm = document.getElementById("bookingDetailsForm");
const bookingMessage = document.getElementById("bookingMessage");

function updatePrice() {
    const total = ticketPrice * quantity;

    quantityText.textContent = quantity;
    totalPriceText.textContent = "₹" + total;
    bookingTotal.textContent = "₹" + total;
}

increaseBtn.addEventListener("click", function () {
    quantity = quantity + 1;
    updatePrice();
});

decreaseBtn.addEventListener("click", function () {
    if (quantity > 1) {
        quantity = quantity - 1;
        updatePrice();
    }
});

bookBtn.addEventListener("click", function () {
    updatePrice();

    bookingForm.classList.remove("hidden");

    bookingForm.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});

bookingDetailsForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();

    const bookingId = "EVT" + Date.now().toString().slice(-6);
    const total = ticketPrice * quantity;

    bookingMessage.innerHTML = `
        <h3 class="font-bold text-lg mb-2">🎉 Booking Confirmed!</h3>
        <p>Thank you, ${escapeHTML(fullName)}!</p>
        <p>Booking ID: <strong>${bookingId}</strong></p>
        <p>Tickets: ${quantity}</p>
        <p>Total Amount: ₹${total}</p>
        <p class="text-sm mt-2">Demo confirmation only. No payment was processed.</p>
    `;

    bookingMessage.classList.remove("hidden");
    bookingMessage.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
});

function escapeHTML(text) {
    const element = document.createElement("span");
    element.textContent = text;
    return element.innerHTML;
}

updatePrice();

