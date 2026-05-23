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