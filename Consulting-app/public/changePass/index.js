const signUpURL = "../otp/";
function handleReset(event) {
  event.preventDefault();
  // Get the value from the email and password fields
  const newPassword = document.getElementById("new-password").value;
  const confirmPassword = document.getElementById("confirm-password").value;
  /**
   * * Api call goes here,
   *  *     Send OTP code to the email, if email exists && Redirect to OTP page
   * *      Otherwise, display:
   *  *           "Incorrect email"
   */
  const isExists = false;
  if (!isExists) {
    showElement();
  } else {
    // todo: Send OTP code && Redirect to OTP page
    redirectToPage();
  }
  //   ! THIS FOR TESTING PURPOSES ONLY!
  console.log(`Email: ${email}`);
  console.log(`Password: ${password}`);
  // ** Clear the input fields
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
}

function showElement() {
  // Select the element by its ID
  const element = document.getElementById("email-incorrect");
  // Set the display property to 'block'
  element.style.display = "block";
}

function redirectToPage() {
  window.location.href = signUpURL;
}

function checkPassword() {
  const password = document.getElementById("new-password").value;
  const confirmPassword = document.getElementById("confirm-password").value;
  const lengthRequirement = document.getElementById("length");
  const uppercaseRequirement = document.getElementById("uppercase");
  const numberRequirement = document.getElementById("number");
  const specialRequirement = document.getElementById("special");
  const lowercaseRequirement = document.getElementById("lowercase");
  const equalRequirement = document.getElementById("equal");

  // Check length
  if (password.length >= 8) {
    lengthRequirement.classList.add("valid");
    lengthRequirement.classList.remove("invalid");
  } else {
    lengthRequirement.classList.add("invalid");
    lengthRequirement.classList.remove("valid");
  }

  // Check for uppercase letter
  if (/[A-Z]/.test(password)) {
    uppercaseRequirement.classList.add("valid");
    uppercaseRequirement.classList.remove("invalid");
  } else {
    uppercaseRequirement.classList.add("invalid");
    uppercaseRequirement.classList.remove("valid");
  }

  // Check for number
  if (/\d/.test(password)) {
    numberRequirement.classList.add("valid");
    numberRequirement.classList.remove("invalid");
  } else {
    numberRequirement.classList.add("invalid");
    numberRequirement.classList.remove("valid");
  }

  // Check for special character
  if (/[!@#$%^&*]/.test(password)) {
    specialRequirement.classList.add("valid");
    specialRequirement.classList.remove("invalid");
  } else {
    specialRequirement.classList.add("invalid");
    specialRequirement.classList.remove("valid");
  }

  // Check for lowercase letter
  if (/[a-z]/.test(password)) {
    lowercaseRequirement.classList.add("valid");
    lowercaseRequirement.classList.remove("invalid");
  } else {
    lowercaseRequirement.classList.add("invalid");
    lowercaseRequirement.classList.remove("valid");
  }
  // Check if they are equal
  if (confirmPassword == password) {
    equalRequirement.classList.add("valid");
    equalRequirement.classList.remove("invalid");
  } else {
    equalRequirement.classList.add("invalid");
    equalRequirement.classList.remove("valid");
  }
}
