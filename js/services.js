fetch("services.json")
  .then((res) => res.json())
  .then((data) => {
    const services = data.services;
    const container = document.getElementById("services-container");

    services.forEach((service) => {
      const col = document.createElement("div");
      col.className = "service-item";

      col.innerHTML = `
  <div class="service-card">

    <div class="service-image">
      <img src="${service.image}" alt="${service.name}" />
    </div>

    <div class="service-content">
      <div class="top-row">
        <h5>${service.name}</h5>
        <span class="badge">${service.duration}</span>
      </div>
      <p>${service.description}</p>
      <div class="bottom-row">
        <span class="price">${service.price}</span>
        <a href="book.html" class="btn">Book</a>
      </div>
    </div>

    <div class="service-spacer"></div>

  </div>
`;

      container.appendChild(col);
    });
  });
