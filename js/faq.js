fetch("faq.json")
  .then((res) => res.json())
  .then((data) => {
    const container = document.getElementById("faq-container");

    data.faq.forEach((category) => {
      const section = document.createElement("div");
      section.className = "faq-category";

      section.innerHTML = `
        <h2>${category.category}</h2>
      `;

      category.questions.forEach((item) => {
        const faqItem = document.createElement("div");
        faqItem.className = "faq-item";

        faqItem.innerHTML = `
          <button class="faq-question">
            ${item.question}
          </button>

          <div class="faq-answer">
            <p>${item.answer}</p>
          </div>
        `;

        section.appendChild(faqItem);
      });

      container.appendChild(section);
    });

    const questions = document.querySelectorAll(".faq-question");

    questions.forEach((question) => {
      question.addEventListener("click", () => {
        const answer = question.nextElementSibling;

        answer.classList.toggle("active");
      });
    });
  });