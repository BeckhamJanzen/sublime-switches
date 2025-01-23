// game.js

// Initialize variables
let score = 0;
let juicePerClick = 1;
let autoJuicePerSecond = 0;
let togglePressCount = 0; // Track the number of times a toggle is pressed

// Function to handle toggle presses
function handleTogglePress() {
  togglePressCount++; // Increment toggle press count
}

// Initialize the game
function initializeGame() {
  setInterval(() => {
    let multiplier = 1;

    // Apply "Environment Subsidies" multiplier
    if (upgrades.find(u => u.id === "environment-subsidies")?.enabled) {
      const switchedOffUpgrades = upgrades.filter(u => u.active && !u.enabled).length;
      multiplier *= switchedOffUpgrades;
    }

    // Apply "Symmetrical Citrus" multiplier
    if (upgrades.find(u => u.id === "symmetrical-citrus")?.enabled) {
      const togglesOn = upgrades.filter(u => u.active && u.enabled).length;
      if (togglesOn % 2 === 0) {
        multiplier *= 2;
      }
    }

    // Apply "Exponential Expansion" multiplier
    if (upgrades.find(u => u.id === "exponential-expansion")?.enabled) {
      const digits = String(score).length; // Get the number of digits in the score
      multiplier *= digits;
    }

    // Apply "Crank Juicer" bonus
    if (upgrades.find(u => u.id === "crank-juicer")?.enabled) {
      autoJuicePerSecond += togglePressCount; // Add 1 lime juice per second for each toggle press
      togglePressCount = 0; // Reset the toggle press count
    }

    score += autoJuicePerSecond * multiplier;
    updateScore();
  }, 1000);

  // Initial render
  renderShop();
  renderOwnedUpgrades();
}