const signUpURL = "../changePass";
function handleFormSubmit(event) {
  event.preventDefault();
  // Get the value from the email and password fields
  const n1 = document.getElementById("n1").value;
  const n2 = document.getElementById("n2").value;
  const n3 = document.getElementById("n3").value;
  const n4 = document.getElementById("n4").value;
  /**
   * * Api call goes here,
   *  *     Check if OTP, if correct? redirect the user to create new password page.
   * *      Otherwise, display:
   *  *           "Incorrect OTP"
   */
  const correctOTP = true;
  if (!correctOTP) {
    showElement();
  } else {
    // todo: Send OTP code && Redirect to OTP page
    redirectToPage();
  }
  //   ! THIS FOR TESTING PURPOSES ONLY!
  console.log(n1);
  console.log(n2);
  console.log(n3);
  console.log(n4);
  // ** Clear the input fields
  document.getElementById("n1").value = "";
  document.getElementById("n2").value = "";
  document.getElementById("n3").value = "";
  document.getElementById("n4").value = "";
}

function showElement() {
  // Select the element by its ID
  const element = document.getElementById("otp-incorrect");
  // Set the display property to 'block'
  element.style.display = "block";
}

function redirectToPage() {
  window.location.href = signUpURL;
}
