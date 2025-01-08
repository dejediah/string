// Debug Mode (set to true for testing)
const debugMode = new URLSearchParams(window.location.search).has('debug');

// Set the target date for the countdown
const targetDate = debugMode
  ? new Date().getTime() + 3 * 1000 // 3 seconds from now
  : new Date("2025-01-17T20:00:00").getTime(); // Replace with your desired date

const countdownElement = document.getElementById("countdown");
const lockedContent = document.getElementById("locked-content");

// Update the countdown every second
const interval = setInterval(() => {
  const now = new Date().getTime();
  const timeLeft = targetDate - now;

  if (timeLeft > 0) {
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  } else {
    clearInterval(interval);
    countdownElement.style.display = "none";
    lockedContent.style.display = "block";
  }
}, 1000);
document.addEventListener("DOMContentLoaded", () => {
    const nameDisplay = document.getElementById("name-display");
    const lockedContent = document.getElementById("locked-content");
  
    // Listen for keypresses and display the text
    document.addEventListener("keydown", (event) => {
      if (event.key.length === 1) {
        // Append the pressed key to the display
        nameDisplay.textContent += event.key;
      } else if (event.key === "Backspace") {
        // Remove the last character if Backspace is pressed
        nameDisplay.textContent = nameDisplay.textContent.slice(0, -1);
      } else if (event.key === "Enter") {
        // Display a message when Enter is pressed
        const name = nameDisplay.textContent.trim();
        if (name) {
          const message = document.createElement("p");
          message.textContent = `Welcome, ${name}. You have entered the forest.`;
          message.style.fontWeight = "bold";
          message.style.color = "green";
          lockedContent.appendChild(message);
  
          // Optionally clear the name display or disable further input
          nameDisplay.textContent = "";
          document.removeEventListener("keydown", arguments.callee);
        } else {
          alert("Please type your name before pressing Enter.");
        }
      }
    });
  });


// Debug information
if (debugMode) {
  console.log("Debug mode is ON. Target date is simulated for 3 seconds from now.");
}
