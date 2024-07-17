// Toggle account details
document.addEventListener("DOMContentLoaded", function () {
  const accountButton = document.getElementById("account-button");
  const accountDetails = document.getElementById("account-details");

  accountButton.addEventListener("click", function () {
    accountDetails.classList.toggle("visible");
  });

  // Optional: Hide the account details when clicking outside of it
  document.addEventListener("click", function (event) {
    if (
      !accountButton.contains(event.target) &&
      !accountDetails.contains(event.target)
    ) {
      accountDetails.classList.remove("visible");
    }
  });
});
