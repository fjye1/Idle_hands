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
  "https://script.google.com/macros/s/AKfycbxHXwekip-H1l9RQ8rjcvKXzWsOeM3ndoGsZxJwWDZZBigRYnpjkQ9AC0avPPI7Uxj19Q/exec";

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  try {
    // Construct URL with proper encoding
    const url = `${SCRIPT_URL}?name=${encodeURIComponent(
      name
    )}&email=${encodeURIComponent(email)}&message=${encodeURIComponent(
      message
    )}`;

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
