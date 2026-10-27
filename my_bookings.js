  // booking filters
    const filterButtons = document.querySelectorAll(".booking-filter")
    const bookingCards = document.querySelectorAll(".booking-card")
    const bookingCount = document.getElementById("booking-count")
    const emptyBookings = document.getElementById("emptyBookings")

    function updateBookings(filter = "All") {
      let visibleCount = 0
      bookingCards.forEach(card => {
        const matches = filter === "All" ||
          card.dataset.status === filter

        card.classList.toggle("hidden", !matches)
        if (matches) visibleCount++ 
      })

      bookingCount.textContent = `${visibleCount} Booking${visibleCount === 1 ? "" : "s"}`

      emptyBookings.classList.toggle("hidden", visibleCount !== 0)
      filterButtons.forEach(button => {
        const active = button.dataset.filter === filter

        button.classList.toggle("bg-purple-600", active)
        button.classList.toggle("text-white", active)
        button.classList.toggle("bg-white/5", !active)
        button.classList.toggle("text-gray-300", !active)
      })
    }

    filterButtons.forEach(button => {
      button.addEventListener("click", () => {
        updateBookings(button.dataset.filter)
      })
    })
    
 // booking details 
const detailsModal = document.getElementById("bookingDetailsModal")

document.querySelectorAll(".view-booking").forEach(button => {
  button.addEventListener("click", () => {
    // Find the booking card for the clicked button
    const card = button.closest(".booking-card")
    const eventName = card.querySelector("h3").textContent.trim()
    const eventDate = card.querySelector(".text-purple-300").textContent.trim()
    const venue = card.querySelector(".text-gray-400.text-sm.mt-3").textContent.trim()
    const infoSections = card.querySelectorAll(
      ".border-t > div"
    )

    const bookingId = infoSections[0].querySelectorAll("p")[1].textContent.trim()
    const tickets = infoSections[1].querySelectorAll("p")[1].textContent.trim()
    const total = infoSections[2].querySelectorAll("p")[1].textContent.trim()

    // Display card values in modal
    document.getElementById("detailEvent").textContent = eventName
    document.getElementById("detailId").textContent = bookingId
    document.getElementById("detailDate").textContent = eventDate
    document.getElementById("detailVenue").textContent = venue
    document.getElementById("detailTickets").textContent = tickets
    document.getElementById("detailTotal").textContent = total

    // Open modal
    detailsModal.classList.remove("hidden")
    detailsModal.classList.add("flex")
    document.body.style.overflow = "hidden"
  })
})

    function closeDetails() {
      detailsModal.classList.add("hidden")
      detailsModal.classList.remove("flex")
      document.body.style.overflow = ""
    }

    document.getElementById("closeBookingModal")
      .addEventListener("click", closeDetails)

    document.getElementById("closeBookingModalBottom")
      .addEventListener("click", closeDetails)

    detailsModal.addEventListener("click", event => {
      if (event.target === detailsModal) closeDetails()
    })


    // Cancel booking
    document.querySelectorAll(".cancel-booking").forEach(button => {
      button.addEventListener("click", () => {
        const card = button.closest(".booking-card")

        if (card.dataset.status === "Cancelled") {
          alert("This booking has already been cancelled.")
          return
        }

        const eventName = card.querySelector("h3").textContent.trim()

        if (!confirm(`Are you sure you want to cancel "${eventName}"?`)) {
          return
        }

        card.dataset.status = "Cancelled"

        const badge = card.querySelector(".status-badge")
        badge.textContent = "Cancelled"
        badge.className = "status-badge shrink-0 text-xs font-semibold text-red-400 " + "bg-red-400/10 px-3 py-1.5 rounded-full"

        button.textContent = "Cancelled"
        button.disabled = true
        button.classList.add("opacity-50", "cursor-not-allowed")

        updateBookings(
          document.querySelector(".booking-filter.bg-purple-600")
            ?.dataset.filter || "All"
        )
      })
    })

    // Close modal
    document.addEventListener("keydown", event => {
      if (event.key === "Escape") closeDetails()
    })

    updateBookings()