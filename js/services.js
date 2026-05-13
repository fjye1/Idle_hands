fetch("services.json")
  .then((res) => res.json())
  .then((data) => {
    const services = data.services;
    const container = document.getElementById("services-container");

    services.forEach((service) => {
      const col = document.createElement("div");
      col.className = "col-12 col-md-6";

      col.innerHTML = `
        <div class="card h-100 shadow-sm border-0">

          <div class="row g-0 align-items-stretch">

            <!-- IMAGE LEFT -->
            <div class="col-4">
              <img
                src="${service.image}"
                class="img-fluid h-100 service-img"
                alt="${service.name}"
              />
            </div>

            <!-- CONTENT RIGHT -->
            <div class="col-8">
              <div class="card-body d-flex flex-column h-100">

                <div class="d-flex justify-content-between align-items-start mb-2">
                  <h5 class="card-title mb-0 fw-bold">${service.name}</h5>
                  <span class="badge bg-dark text-white">${service.duration}</span>
                </div>

                <p class="card-text text-muted small mb-3">
                  ${service.description}
                </p>

                <div class="mt-auto d-flex justify-content-between align-items-center">
                  <span class="fw-bold fs-5">${service.price}</span>

                  <a href="book.html" class="btn btn-sm btn-outline-dark">
                    Book
                  </a>
                </div>

              </div>
            </div>

          </div>
        </div>
      `;

      container.appendChild(col);
    });
  });
