fetch("reviews.json")
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