// upgrades.js

// Define the upgrades array in the global scope
const upgrades = [
  {
    id: "juicer-limes",
    name: "1. Juicer Limes",
    description: "Increases lime juice per click by 1.",
    cost: Math.pow(5, 1), // 5^1 = 5
    effect: () => { juicePerClick += 1; },
    active: false,
    enabled: false,
  },
  {
    id: "juicer",
    name: "2. Juicer",
    description: "Generates 1 lime juice per second.",
    cost: Math.pow(5, 2), // 5^2 = 25
    effect: () => { autoJuicePerSecond += 1; },
    active: false,
    enabled: false,
  },
  {
    id: "mega-juicer",
    name: "3. Mega Juicer",
    description: "Generates 5 lime juice per second.",
    cost: Math.pow(5, 3), // 5^3 = 125
    effect: () => { autoJuicePerSecond += 5; },
    active: false,
    enabled: false,
  },
  {
    id: "environment-subsidies",
    name: "4. Environment Subsidies",
    description: "Auto-generation is multiplied by the number of upgrades switched off.",
    cost: Math.pow(5, 4), // 5^4 = 625
    effect: () => {}, // No direct effect, handled in auto-generation logic
    active: false,
    enabled: false,
  },
  {
    id: "symmetrical-citrus",
    name: "5. Symmetrical Citrus",
    description: "Auto-generation is multiplied by 2 if the number of toggles switched on is even.",
    cost: Math.pow(5, 5), // 5^5 = 3125
    effect: () => {}, // No direct effect, handled in auto-generation logic
    active: false,
    enabled: false,
  },
  {
    id: "exponential-expansion",
    name: "6. Exponential Expansion",
    description: "Auto-generation is multiplied by the number of digits in your lime juice.",
    cost: Math.pow(5, 6), // 5^6 = 15625
    effect: () => {}, // No direct effect, handled in auto-generation logic
    active: false,
    enabled: false,
  },
  {
    id: "crank-juicer",
    name: "7. Crank Juicer",
    description: "Generates 1 lime juice per second for each time a toggle is pressed.",
    cost: Math.pow(5, 7), // 5^7 = 78125
    effect: () => {}, // No direct effect, handled in auto-generation logic
    active: false,
    enabled: false,
  },
];

// Buy an upgrade
function buyUpgrade(upgradeId) {
  const upgrade = upgrades.find(u => u.id === upgradeId);
  if (score >= upgrade.cost) {
    score -= upgrade.cost;
    upgrade.active = true;
    updateScore();
    renderShop();
    renderOwnedUpgrades();
  } else {
    alert("Not enough lime juice!");
  }
}

// Toggle an upgrade
function toggleUpgrade(upgradeId, isChecked) {
  const upgrade = upgrades.find(u => u.id === upgradeId);
  if (isChecked) {
    upgrade.enabled = true;
    upgrade.effect();
  } else {
    upgrade.enabled = false;
    // Reverse the effect (if needed)
    if (upgrade.id === "juicer-limes") {
      juicePerClick -= 1;
    } else if (upgrade.id === "juicer") {
      autoJuicePerSecond -= 1;
    } else if (upgrade.id === "mega-juicer") {
      autoJuicePerSecond -= 5;
    }
  }
}

// Set up the click button
function setupClickButton() {
  const clickButton = document.getElementById('click-button');
  clickButton.addEventListener('click', () => {
    score += juicePerClick;
    updateScore();
  });
}