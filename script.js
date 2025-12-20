// Function to set the active nav link
function setActiveNav() {
  const currentPage = location.pathname.split("/").pop().toLowerCase() || "index.html";
  document.querySelectorAll('.nav-link').forEach(link => {
    const linkPage = link.getAttribute('href').toLowerCase();
    link.classList.toggle('active', linkPage === currentPage);
  });
}

// Function to load a file into a container
function loadHTML(containerId, url, callback) {
  fetch(url)
    .then(res => res.text())
    .then(html => {
      document.getElementById(containerId).innerHTML = html;
      if (callback) callback();
    })
    .catch(err => console.error(`Failed to load ${url}:`, err));
}

// Load header and footer
loadHTML("header", "headers.html", setActiveNav); // header + highlight nav
loadHTML("footer", "footers.html"); // footer