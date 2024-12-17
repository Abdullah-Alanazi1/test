async function handleFormSubmit(event) {
  event.preventDefault();

  // Get the value from the email and password fields
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    // Send sign-in request to the server
    const response = await fetch("/signIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Save JWT token to localStorage
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      // Redirect to the appropriate page based on the user's position
      if (data.position === "jobSeeker") {
        redirectToPage(`/jobseeker?token=${data.token}`);
      } else if (data.position === "hr") {
        redirectToPage(`/dashboard?token=${data.token}`);
      } else {
        console.error("Invalid user position");
      }
    } else {
      // Show error message if server responds with an error
      console.error(data.error || "Error during sign-in");
      showElement();
    }
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    showElement();
  }

  // Clear the input fields only after handling errors
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
}

function showElement() {
  // Select the element by its ID
  const element = document.getElementById("password-incorrect");

  // Set the display property to 'block' to show the error message
  element.style.display = "block";
}

function redirectToPage(url) {
  // Redirect the user to the specified URL
  window.location.href = url;
}
