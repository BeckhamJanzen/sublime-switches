// game.js

// Initialize game state (shared variables)
let score = 0;
let juicePerClick = 1;
let autoJuicePerSecond = 0;

// Initialize the game
function initializeGame() {
  setInterval(() => {
    let multiplier = 1;

    // Apply "Strategic Off" multiplier
    if (upgrades.find(u => u.id === "tart-toggle")?.enabled) {
      const switchedOffUpgrades = upgrades.filter(u => u.active && !u.enabled).length;
      multiplier *= switchedOffUpgrades;
    }

    // Apply "Even Toggles" multiplier
    if (upgrades.find(u => u.id === "pucker-power")?.enabled) {
      const togglesOn = upgrades.filter(u => u.active && u.enabled).length;
      if (togglesOn % 2 === 0) {
        multiplier *= 2;
      }
    }

    score += autoJuicePerSecond * multiplier;
    updateScore();
  }, 1000);

  // Initial render
  renderShop();
  renderOwnedUpgrades();
}