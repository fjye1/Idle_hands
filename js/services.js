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

      if (!container) return;

      const col = document.createElement("div");
      col.className = "service-item";

      col.innerHTML = `
  <div class="service-card">

    

    <div class="service-content">

      <div class="top-row">
        <h3>${service.name}</h3>
        <h5>${service.type}</h5>
      </div>

      <p>${service.description}</p>

      

      <div class="bottom-row">

        

        <a id="book-link" href="#" class="btn book-link">book here</a>

      </div>

    </div>

    <div class="service-spacer"></div>

  </div>
`;

      container.appendChild(col);
    });
  });
