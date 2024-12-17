function updateClock() {
  const now = new Date();

  // Get hours, minutes, and seconds
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  `/otp/e=${encodeURIComponent(email)}`;

  // Determine AM or PM
  const period = hours >= 12 ? "PM" : "AM";

  // Convert to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // The hour '0' should be '12'

  // Format minutes and seconds to always show two digits
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  // Display the time
  const timeString = `${hours}:${minutes}:${seconds} ${period}`;
  document.getElementById("clock").textContent = timeString;
}

// Update the clock every second
setInterval(updateClock, 1000);

// Initialize clock immediately on page load
updateClock();

//calendar_Main
function generateCalendar() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); // 0 is January, 11 is December
  const firstDay = new Date(year, month, 1); // First day of the month
  const lastDay = new Date(year, month + 1, 0); // Last day of the month

  const firstDayOfWeek = firstDay.getDay(); // Day of the week (0-6, Sunday-Saturday)
  const lastDate = lastDay.getDate(); // Last date of the month

  let calendarHtml = "";
  let day = 1;

  // Fill the calendar grid
  for (let row = 0; row < 6; row++) {
    calendarHtml += "<tr>";

    // Create 7 cells for each row
    for (let col = 0; col < 7; col++) {
      if (row === 0 && col < firstDayOfWeek) {
        // Empty cells before the start of the month
        calendarHtml += "<td></td>";
      } else if (day <= lastDate) {
        // Fill in the actual dates
        const isToday = day === now.getDate();
        calendarHtml += `<td class="${isToday ? "highlight" : ""}">${day}</td>`;
        day++;
      } else {
        // Empty cells after the end of the month
        calendarHtml += "<td></td>";
      }
    }

    calendarHtml += "</tr>";
    if (day > lastDate) break; // Stop when the month is complete
  }

  // Insert the generated calendar HTML into the table body
  document.getElementById("calendarBody").innerHTML = calendarHtml;
}

// Generate the calendar section
generateCalendar();

//
// Get today's date
const today = new Date();

// Get year, month (name), and day
const year = today.getFullYear();
const month = today.toLocaleString("default", { month: "long" }); // Month name
const day = today.getDate();

// Format the date and display it
const formattedDate = `${year}, ${month}`;
document.getElementById("dateMain").textContent = formattedDate;

//...............................
const upcomingEvents = [
  { date: 8, title: "Event 1" },
  { date: 14, title: "Event 2" },
];

const datesContainer = document.getElementById("calendar-dates");
const monthYearDisplay = document.getElementById("month-year");
const previousButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

let selectedMonth = new Date().getMonth(); // Current month (0-11)
let selectedYear = new Date().getFullYear(); // Current year (e.g., 2024)

function renderCalendar(month, year) {
  // Set the month-year header
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  monthYearDisplay.textContent = `${monthNames[month]} ${year}`;

  // Clear existing dates
  datesContainer.innerHTML = "";

  // Get the first day of the month and the number of days in the month
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const totalDaysInMonth = new Date(year, month + 1, 0).getDate();

  // Add empty divs for the days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    const emptyCell = document.createElement("div");
    emptyCell.classList.add("calendar-date");
    datesContainer.appendChild(emptyCell);
  }

  // Add the actual days of the month
  for (let day = 1; day <= totalDaysInMonth; day++) {
    const dayCell = document.createElement("div");
    dayCell.classList.add("calendar-date");
    dayCell.textContent = day;

    // Check if there's an event on this day
    if (upcomingEvents.some((event) => event.date === day)) {
      dayCell.classList.add("event");
    }

    datesContainer.appendChild(dayCell);
  }
}

// Event listeners for the previous and next month buttons
previousButton.addEventListener("click", () => {
  selectedMonth--;
  if (selectedMonth < 0) {
    selectedMonth = 11;
    selectedYear--;
  }
  renderCalendar(selectedMonth, selectedYear);
});

nextButton.addEventListener("click", () => {
  selectedMonth++;
  if (selectedMonth > 11) {
    selectedMonth = 0;
    selectedYear++;
  }
  renderCalendar(selectedMonth, selectedYear);
});

// Initialize the calendar
renderCalendar(selectedMonth, selectedYear);

document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".nav-button");
  const sections = document.querySelectorAll(".content-section");

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      // Hide all sections
      sections.forEach((section) => (section.style.display = "none"));

      // Show the selected section
      const targetSection = button.getAttribute("data-section");
      document.getElementById(targetSection).style.display = "flex";

      // Remove active class from all buttons and add to the clicked one
      buttons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
    });
  });
});

//requestForm........................
// Generalized template for form submission
async function handleFormSubmit(event) {
  event.preventDefault();

  // Extract form field values
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const whatsappNumber = document.getElementById("whatsappNumber").value;
  const service = document.getElementById("service").value;
  const date = document.getElementById("date")?.value || "";
  const time = document.getElementById("time")?.value || "";
  const platform = document.getElementById("platform")?.value || "";
  const usernamePlatform =
    document.getElementById("usernamePlatform")?.value || "";
  const user = document.querySelector("select[name='user']").value;
  const message = document.getElementById("message").value;
  const url = document.getElementById("url").value;
  const status = document.getElementById("status").value;

  // Create a data object for submission
  const formData = {
    name,
    email,
    whatsappNumber,
    service,
    date,
    time,
    platform,
    usernamePlatform,
    user,
    message,
    url,
    status,
  };

  try {
    const response = await fetch("/jobseeker", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    // log the response for debugging purposes
    const data = await response.json();
    if (response.status === 200) {
      alert("Form submitted successfully!");
      toggleForm();
    } else {
      alert("An error occurred. Please try again later...");
    }
  } catch (error) {
    alert(
      "An error occurred while fetching or convert response to josn. Please try again."
    );
  }

  // Clear the form fields only after handling errors
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("whatsappNumber").value = "";
  document.getElementById("service").value = "";
  document.getElementById("date").value = "";
  document.getElementById("time").value = "";
  document.getElementById("platform").value = "";
  document.getElementById("usernamePlatform").value = "";
  document.querySelector("select[name='user']").value = "";
  document.getElementById("message").value = "";
  document.getElementById("url").value = "";
}

function showElement(elementId) {
  // Select the element by its ID
  const element = document.getElementById(elementId);

  // Set the display property to 'block' to show the error message
  if (element) {
    element.style.display = "block";
  }
}

function redirectToPage(url) {
  // Redirect the user to the specified URL
  window.location.href = url;
}

// Dynamic control of buttons based on service selection
document.getElementById("service").addEventListener("change", function () {
  const service = this.value;
  document.getElementById("nextButton").style.display =
    service === "meeting" ? "inline-block" : "none";
  document.getElementById("submitButton").style.display =
    service !== "meeting" ? "inline-block" : "none";
});

//form request
function openForm() {
  var form1 = document.getElementById("page1");
  var form2 = document.getElementById("page2");
  var newButton = document.getElementById("formButton");
  var closeButton = document.getElementById("closeBtn");

  if (form1.style.display === "none" && form2.style.display === "none") {
    newButton.style.display = "none";
    form1.style.display = "block";
    closeButton.style.display = "block";
  } else {
    form1.style.display = "none";
    form2.style.display = "none";
    newButton.style.display = "block";
    closeButton.style.display = "block";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const messageButton = document.getElementById("messageButton");
  const messageDropdown = document.getElementById("messageDropdown");

  const notificationButton = document.getElementById("notificationButton");
  const notificationDropdown = document.getElementById("notificationDropdown");

  // Toggle message dropdown
  messageButton.addEventListener("click", function (event) {
    event.stopPropagation();
    messageDropdown.style.display =
      messageDropdown.style.display === "none" ? "block" : "none";
    notificationDropdown.style.display = "none"; // Close notification dropdown if open
  });

  // Toggle notification dropdown
  notificationButton.addEventListener("click", function (event) {
    event.stopPropagation();
    notificationDropdown.style.display =
      notificationDropdown.style.display === "none" ? "block" : "none";
    messageDropdown.style.display = "none"; // Close message dropdown if open
  });

  // Close dropdowns when clicking outside
  document.addEventListener("click", function () {
    messageDropdown.style.display = "none";
    notificationDropdown.style.display = "none";
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const logoutButton = document.querySelector(".logout-button");
  const logoutConfirmation = document.getElementById("logoutConfirmation");

  // Show the logout confirmation when the logout button is clicked
  logoutButton.addEventListener("click", function () {
    logoutConfirmation.style.display = "flex";

    // Optionally, redirect to login page after a delay
    setTimeout(function () {
      window.location.href = "login.html"; // Replace with login or homepage
    }, 2000); // Adjust time in milliseconds (2000ms = 2 seconds)
  });
});

// Availability Section
function setStatus(status) {
  document.getElementById("status").innerText = `Status: ${status}`;
}

// Change profile image
function triggerFileInput() {
  document.getElementById("fileInput").click();
}

document
  .getElementById("fileInput")
  .addEventListener("change", function (event) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const img = document.querySelector(".profile-picture");
      img.src = event.target.result;
    };
    reader.readAsDataURL(event.target.files[0]);
  });

// Change name
document.getElementById("changeName").addEventListener("click", function () {
  const userName = document.getElementById("userName");
  const newNameInput = document.getElementById("newNameInput");
  const changeNameButton = document.getElementById("changeNameButton");
  const cancelNameButton = document.getElementById("cancelNameButton");
  const nameLabel = document.getElementById("nameLabel");

  // Toggle visibility of name and input fields
  newNameInput.style.display =
    newNameInput.style.display === "none" ? "block" : "none";
  newNameInput.value = userName.textContent;
  changeNameButton.style.display =
    changeNameButton.style.display === "none" ? "block" : "none";
  cancelNameButton.style.display =
    cancelNameButton.style.display === "none" ? "block" : "none";
  nameLabel.style.display =
    nameLabel.style.display === "none" ? "block" : "none";

  // Update name on "Change" button click
  changeNameButton.addEventListener("click", function () {
    userName.textContent = newNameInput.value;
    userName.style.display = "block";
  });

  // Cancel changes on "Cancel" button click
  cancelNameButton.addEventListener("click", function () {
    newNameInput.value = userName.textContent;
    userName.style.display = "block";
  });
});

// Change job title
document.getElementById("changeJob").addEventListener("click", function () {
  const jobTitle = document.getElementById("jobTitle");
  const newJobInput = document.getElementById("newJobInput");
  const changeJobButton = document.getElementById("changeJobButton");
  const cancelJobButton = document.getElementById("cancelJobButton");
  const jobLabel = document.getElementById("jobLabel");

  // Toggle visibility of job title and input fields
  newJobInput.style.display =
    newJobInput.style.display === "none" ? "block" : "none";
  newJobInput.value = jobTitle.textContent;
  changeJobButton.style.display =
    changeJobButton.style.display === "none" ? "block" : "none";
  cancelJobButton.style.display =
    cancelJobButton.style.display === "none" ? "block" : "none";
  jobLabel.style.display = jobLabel.style.display === "none" ? "block" : "none";

  // Update job title on "Change" button click
  changeJobButton.addEventListener("click", function () {
    jobTitle.textContent = newJobInput.value;
    jobTitle.style.display = "block";
  });

  // Cancel changes on "Cancel" button click
  cancelJobButton.addEventListener("click", function () {
    newJobInput.value = jobTitle.textContent;
    jobTitle.style.display = "block";
  });
});

// Change availability status
function setStatus(status) {
  document.getElementById("status").innerText = `Status: ${status}`;
}

// Change notifications status
function setNotifications(notificationsStatus) {
  document.getElementById(
    "notificationsStatus"
  ).innerText = `Notifications: ${notificationsStatus}`;
}

document.getElementById("notifications").addEventListener("click", function () {
  const notifications = document.getElementById("notifications");
  const notificationsStatus = document.getElementById("notificationsStatus");
  const notificationsOn = document.getElementById("notificationsOn");
  const notificationsOff = document.getElementById("notificationsOff");

  // Toggle visibility of notification field and buttons
  notificationsStatus.style.display =
    notificationsStatus.style.display === "none" ? "block" : "none";
  notificationsOn.style.display =
    notificationsOn.style.display === "none" ? "block" : "none";
  notificationsOff.style.display =
    notificationsOff.style.display === "none" ? "block" : "none";
});

// Change Location
document
  .getElementById("changeLocation")
  .addEventListener("click", function () {
    const currentLocation = document.getElementById("location");
    const newLocationInput = document.getElementById("newLocationInput");
    const changeLocationButton = document.getElementById(
      "changeLocationButton"
    );
    const cancelLocationButton = document.getElementById(
      "cancelLocationButton"
    );
    const locationLabel = document.getElementById("locationLabel");

    // Toggle visibility of location and input fields
    newLocationInput.style.display =
      newLocationInput.style.display === "none" ? "block" : "none";
    newLocationInput.value = currentLocation.textContent;
    changeLocationButton.style.display =
      changeLocationButton.style.display === "none" ? "block" : "none";
    cancelLocationButton.style.display =
      cancelLocationButton.style.display === "none" ? "block" : "none";
    locationLabel.style.display =
      locationLabel.style.display === "none" ? "block" : "none";

    // Update location on "Change" button click
    changeLocationButton.addEventListener("click", function () {
      currentLocation.textContent = newLocationInput.value;
      currentLocation.style.display = "block";
    });

    // Cancel changes on "Cancel" button click
    cancelLocationButton.addEventListener("click", function () {
      newLocationInput.value = currentLocation.textContent;
      currentLocation.style.display = "block";
    });
  });

// Change contact
document.getElementById("changeContact").addEventListener("click", function () {
  const currentEmail = document.getElementById("email");
  const newEmailInput = document.getElementById("newEmailInput");
  const currentPhone = document.getElementById("phone");
  const newPhoneInput = document.getElementById("newPhoneInput");
  const changeContactButton = document.getElementById("changeContactButton");
  const cancelContactButton = document.getElementById("cancelContactButton");
  const emailLabel = document.getElementById("emailLabel");
  const phoneLabel = document.getElementById("phoneLabel");

  // Toggle visibility of elements
  newEmailInput.style.display =
    newEmailInput.style.display === "none" ? "block" : "none";
  newEmailInput.value = currentEmail.textContent;
  newPhoneInput.style.display =
    newPhoneInput.style.display === "none" ? "block" : "none";
  newPhoneInput.value = currentPhone.textContent;
  changeContactButton.style.display =
    changeContactButton.style.display === "none" ? "block" : "none";
  cancelContactButton.style.display =
    cancelContactButton.style.display === "none" ? "block" : "none";
  emailLabel.style.display =
    emailLabel.style.display === "none" ? "block" : "none";
  phoneLabel.style.display =
    phoneLabel.style.display === "none" ? "block" : "none";
});

document
  .getElementById("changeContactButton")
  .addEventListener("click", function () {
    const currentEmail = document.getElementById("email");
    const newEmailInput = document.getElementById("newEmailInput");
    const currentPhone = document.getElementById("phone");
    const newPhoneInput = document.getElementById("newPhoneInput");

    // Update values and hide input fields
    currentEmail.textContent = newEmailInput.value;
    currentEmail.style.display = "block";
    currentPhone.textContent = newPhoneInput.value;
    currentPhone.style.display = "block";
  });

document
  .getElementById("cancelContactButton")
  .addEventListener("click", function () {
    const currentEmail = document.getElementById("email");
    const newEmailInput = document.getElementById("newEmailInput");
    const currentPhone = document.getElementById("phone");
    const newPhoneInput = document.getElementById("newPhoneInput");

    // Restore original values and hide input fields
    currentEmail.style.display = "block";
    newEmailInput.value = currentEmail.textContent;
    currentPhone.style.display = "block";
    newPhoneInput.value = currentPhone.textContent;
  });

// Change Password
document
  .getElementById("changePassword")
  .addEventListener("click", function () {
    const oldPasswordInput = document.getElementById("oldPasswordInput");
    const newPasswordInput = document.getElementById("newPasswordInput");
    const changePasswordButton = document.getElementById(
      "changePasswordButton"
    );
    const cancelPasswordButton = document.getElementById(
      "cancelPasswordButton"
    );
    const oldPasswordLabel = document.getElementById("oldPasswordLabel");
    const newPasswordLabel = document.getElementById("newPasswordLabel");

    // Toggle visibility of elements
    oldPasswordInput.style.display =
      oldPasswordInput.style.display === "none" ? "block" : "none";
    newPasswordInput.style.display =
      newPasswordInput.style.display === "none" ? "block" : "none";
    changePasswordButton.style.display =
      changePasswordButton.style.display === "none" ? "block" : "none";
    cancelPasswordButton.style.display =
      cancelPasswordButton.style.display === "none" ? "block" : "none";
    oldPasswordLabel.style.display =
      oldPasswordLabel.style.display === "none" ? "block" : "none";
    newPasswordLabel.style.display =
      newPasswordLabel.style.display === "none" ? "block" : "none";
  });

document
  .getElementById("changePasswordButton")
  .addEventListener("click", function () {
    // Clear the input fields
    oldPasswordInput.value = "";
    newPasswordInput.value = "";
  });

document
  .getElementById("cancelPasswordButton")
  .addEventListener("click", function () {
    // Clear the input fields
    oldPasswordInput.value = "";
    newPasswordInput.value = "";
  });

// Logout
const logOut = document.getElementById("logout-button");
logOut.addEventListener("click", () => {
  redirectToPage("/signin");
});
function redirectToPage(url) {
  window.location.href = url;
}

// Mock request data with types (same data used for client)

// Show or hide the form
function toggleForm() {
  const formWrapper = document.getElementById("formWrapper");
  formWrapper.style.display =
    formWrapper.style.display === "none" ? "block" : "none";
}

// Dynamically handle service changes
function handleServiceChange() {
  const service = document.getElementById("service").value;
  const meetingDetails = document.getElementById("meetingDetails");
  const dateField = document.getElementById("date");
  const timeField = document.getElementById("time");
  const platformField = document.getElementById("platform");

  if (service === "meeting") {
    // Show meeting details and make fields required
    meetingDetails.style.display = "block";
    dateField.required = true;
    timeField.required = true;
    platformField.required = true;

    // Add validation for time and date
    dateField.addEventListener("change", validateDate);
    timeField.addEventListener("input", validateTime);
  } else {
    // Hide meeting details and remove 'required' attribute
    meetingDetails.style.display = "none";
    dateField.required = false;
    timeField.required = false;
    platformField.required = false;

    // Remove event listeners
    dateField.removeEventListener("change", validateDate);
    timeField.removeEventListener("input", validateTime);
  }
}

// Validate time to ensure it's between 12 PM and 8 PM
function validateTime() {
  const timeField = document.getElementById("time");
  const selectedTime = timeField.value;

  if (selectedTime) {
    const [hour, minute] = selectedTime.split(":").map(Number);

    // Check if time is between 12:00 (12 PM) and 20:00 (8 PM)
    if (hour < 12 || hour > 20) {
      alert("Time must be between 12:00 PM and 8:00 PM.");
      timeField.value = ""; // Clear the invalid time
    }
  }
}

// Validate date to ensure it's not Friday or Saturday
function validateDate() {
  const dateField = document.getElementById("date");
  const selectedDate = new Date(dateField.value);

  if (selectedDate) {
    const day = selectedDate.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

    // Check if the day is Friday (5) or Saturday (6)
    if (day === 5 || day === 6) {
      alert("Meetings cannot be scheduled on Fridays or Saturdays.");
      dateField.value = ""; // Clear the invalid date
    }
  }
}

// Attach the service change handler
document
  .getElementById("service")
  .addEventListener("change", handleServiceChange);

function displayRequestsByType() {
  // Generate sections dynamically for the client
  const clientRequestContainer = document.getElementById(
    "clientRequestContainer"
  );
  const requests = [
    {
      id: 1,
      name: "Create a CV",
      type: "CV", //service
      status: "Pending", // status
      details: "Design a professional CV.", //
    },
    {
      id: 2,
      name: "Write a Cover Letter",
      type: "Cover Letter",
      status: "Pending",
      details: "Draft a cover letter for a job application.",
    },
    {
      id: 3,
      name: "Schedule Meeting",
      type: "Meeting",
      status: "Pending",
      details: "Arrange a team meeting for next Monday.",
    },
    {
      id: 4,
      name: "Update CV",
      type: "CV",
      status: "Pending",
      details: "Update existing CV with recent job experience.",
    },
    {
      id: 5,
      name: "Follow-Up Email",
      type: "Meeting",
      status: "Pending",
      details: "Write a follow-up email after a meeting.",
    },
  ];
  // Group requests by type
  const groupedRequests = requests.reduce((groups, request) => {
    groups[request.type] = groups[request.type] || [];
    groups[request.type].push(request);
    return groups;
  }, {});
  Object.keys(groupedRequests).forEach((type) => {
    // Create a section for each request type
    const section = document.createElement("div");
    section.classList.add("request-section");

    // Add the heading for the request type
    const heading = document.createElement("h3");
    heading.textContent = type;
    section.appendChild(heading);

    // Create the list for the requests
    const requestList = document.createElement("ul");
    requestList.id = `${type.toLowerCase()}List`;

    // Add requests under this type
    groupedRequests[type].forEach((request) => {
      const listItem = document.createElement("li");
      listItem.setAttribute("data-id", request.id);

      listItem.innerHTML = `
      <span style="font-size: 90%;  cursor: pointer;" class="request-name" onclick="showDetails(${
        request.id
      })">${request.name}</span>
      <span style="font-size: 60%; postion:center" class="status ${request.status.toLowerCase()}">${
        request.status
      }</span>
    `;
      requestList.appendChild(listItem);
    });

    section.appendChild(requestList);
    clientRequestContainer.appendChild(section);
  });
}
document.addEventListener("DOMContentLoaded", displayRequestsByType);
// Show details in the modal for client
function showDetails(id) {
  const request = requests.find((req) => req.id === id);
  if (request) {
    document.getElementById("modalHeader").textContent = request.name;
    document.getElementById("modalDescription").textContent = request.details;
    document.getElementById("infoModal").style.display = "block";
  }
}

// Close the modal
function closeInfoModal() {
  document.getElementById("infoModal").style.display = "none";
}

function submitForm() {
  document.getElementById("mainForm");
}