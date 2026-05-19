

fetch("services.json")
  .then((res) => res.json())
  .then((data) => {
    const containers = {
      solo: document.getElementById("services-container-solo"),
      program: document.getElementById("services-container-program"),
    };

    data.services.forEach((service) => {
      const type = service.type.toLowerCase();
      const container = containers[type];

      // Skip if there's no matching container for this type
      if (!container) return;

      const col = document.createElement("div");
      col.className = "service-item";

      col.innerHTML = `
  <div class="service-card">

    <div class="service-image">
      <img src="${service.image}" alt="${service.name}" />
    </div>

    <div class="service-content">

      <div class="top-row">
        <h3>${service.name}</h3>
        <h5>${service.type}</h5>
      </div>

      <p>${service.description}</p>

      <div class="bottom-row">

        <div class="price-list">
          ${service.prices
            .map(
              (item) => `
                <div class="price-row">
                  <span>${item.duration}</span>
                  <span>${item.price}</span>
                </div>
              `,
            )
            .join("")}
        </div>

        <a href="book.html" class="btn">Book</a>

      </div>

    </div>

    <div class="service-spacer"></div>

  </div>
`;

      container.appendChild(col);
    });
  });

 