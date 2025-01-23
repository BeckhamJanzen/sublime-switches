// main.js

// Initialize click counter
let clickCount = 0;

// Function to handle lime clicks
function handleLimeClick() {
  clickCount++; // Increment click counter
  score += juicePerClick; // Increase score
  updateScore();

  // Fade out the "Click me!" text after 10 clicks
  if (clickCount >= 10) {
    const clickMeText = document.getElementById('click-me-text');
    clickMeText.classList.add('fade-out'); // Add fade-out class
  }
}

// Set up the click button
const clickButton = document.getElementById('click-button');
clickButton.addEventListener('click', handleLimeClick);

// Initialize the game
initializeGame();