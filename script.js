// Function to set the active nav link
function setActiveNav() {
  const currentPage =
    location.pathname.split("/").pop().toLowerCase() || "index.html";
  document.querySelectorAll(".nav-link").forEach((link) => {
    const linkPage = link.getAttribute("href").toLowerCase();
    link.classList.toggle("active", linkPage === currentPage);
  });
}

// Function to load a file into a container
function loadHTML(containerId, url, callback) {
  fetch(url)
    .then((res) => res.text())
    .then((html) => {
      document.getElementById(containerId).innerHTML = html;
      if (callback) callback();
    })
    .catch((err) => console.error(`Failed to load ${url}:`, err));
}

// Load header and footer
loadHTML("header", "headers.html", () => {
  setActiveNav();

  // Initialize phone toggle after header is loaded
  const togglePhone = document.getElementById("togglePhone");
  const phonePanel = document.getElementById("phonePanel");

  if (togglePhone && phonePanel) {
    togglePhone.addEventListener("click", () => {
      phonePanel.classList.toggle("show");
    });
  }

  // Set booking URLs (MOVED HERE - in header callback)
  const booking_url =
    "https://www.fresha.com/book-now/idle-hands-massage-therapy-b85279f0/all-offer?share=true&pId=2722338";
  // This will match any anchor with book-link class OR inside book-link elements
  document.querySelectorAll("a.book-link, .book-link a").forEach((button) => {
    button.href = booking_url;
  });
});

loadHTML("footer", "footers.html", () => {
  document.getElementById("year").textContent = new Date().getFullYear();
});

const form = document.getElementById("contactForm");
const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyPjirrTOJAm3w0jT6uM8jYexIQfciE74wi1YRAidB8SxoiujZKwet0RxHOAhxOidiF7g/exec";

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  const name = formData.get("name");
  const phone = formData.get("phone");
  const email = formData.get("email");
  const message = formData.get("message");

  if (!email || !phone) {
    alert("Please enter both your email and phone number.");
    return; // stop submission
  }

  try {
    // Construct URL with proper encoding
    const url = `${SCRIPT_URL}?name=${encodeURIComponent(name)}
    &email=${encodeURIComponent(email)}
    &phone=${encodeURIComponent(phone)}
    &message=${encodeURIComponent(message)}`;

    await fetch(url, {
      method: "GET",
      redirect: "follow",
    });

    alert("Submitted!");
    form.reset();
  } catch (error) {
    alert("Submission successful");
    form.reset();
  }
});

fetch("/reviews.json")
  .then((res) => res.json())
  .then((data) => {
    const reviews = data.reviews;
    const container = document.getElementById("review-container");

    reviews.slice(0, 4).forEach((review) => {
      const col = document.createElement("div");
      col.className = "col"; // This tells Bootstrap to follow the row-cols rules above

      const starIcons =
        "★".repeat(review.rating) + "☆".repeat(5 - review.rating);

      col.innerHTML = `
    <div class="card h-100 shadow-sm border-0">
      <div class="card-body">
        <div class="d-flex align-items-center mb-3">
          <img src="${review.authorAttribution.photoUri}" 
     onerror="this.src='https://ui-avatars.com/api/?name=${review.authorAttribution.displayName}&background=random'"
     class="rounded-circle me-2" 
     style="width: 40px; height: 40px;" alt="Author">
          <strong class="card-title mb-0">${review.authorAttribution.displayName}</strong>
        </div>
        <div class="text-warning mb-2 small">${starIcons}</div>
        <p class="card-text small text-muted">
          "${review.text.text.substring(0, 150)}..."
        </p>
      </div>
      <div class="card-footer bg-transparent border-0">
        <small class="text-uppercase fw-bold" style="font-size: 0.7rem; color: #bbb;">
          ${review.relativePublishTimeDescription}
        </small>
      </div>
    </div>
  `;

      container.appendChild(col);
    });
  });


