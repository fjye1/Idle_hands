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
loadHTML("header", "partials/headers.html", () => {
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



loadHTML("footer", "partials/footers.html", () => {
  document.getElementById("year").textContent = new Date().getFullYear();
});


const fadeElements = document.querySelectorAll(".fade-text");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    } else {
      entry.target.classList.remove("visible");
    }
  });
}, {
  threshold: 0.2
});

fadeElements.forEach(el => observer.observe(el));

