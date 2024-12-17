const signUpURL = "../otp/";
function handleReset(event) {
  event.preventDefault();
  // Get the value from the email field
  const email = document.getElementById("email").value;

  // Send a request to the server to send the OTP code to the email
  fetch("/resetpass", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }), // Ensure the email is sent as an object
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.msg) {
        console.error(data.msg);
        showElement(); // Call showElement if there's an error message
      } else {
        // Redirect to OTP page
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      showElement(); // Call showElement if there's a fetch error
    });

  // Clear the input fields
  document.getElementById("email").value = "";
}
function checkEmail() {
  const emailInput = document.getElementById("email");
  const email = emailInput.value;
  const isValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    email
  );

  // Change outline color based on validity
  if (isValid || email === "") {
    emailInput.style.borderColor = "rgb(0, 123, 255)";
  } else {
    console.log("Incorrect");
    emailInput.style.borderColor = "red";
  }
  return isValid;
}
function showElement() {
  // Select the element by its ID
  const element = document.getElementById("email-incorrect");
  // Set the display property to 'block'
  element.style.display = "block";
}
