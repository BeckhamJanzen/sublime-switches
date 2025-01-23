// render.js

// Render upgrades in the shop
function renderShop() {
  const shopColumn = document.getElementById('shop');
  shopColumn.innerHTML = "<h2>The Lime Market</h2>";
  upgrades.forEach(upgrade => {
    if (!upgrade.active) {
      const upgradeElement = document.createElement('div');
      upgradeElement.className = 'upgrade';
      upgradeElement.innerHTML = `
        <div>
          <strong>${upgrade.name}</strong><br>
          <span>${upgrade.description}</span><br>
          <span>Cost: ${upgrade.cost} ml</span>
        </div>
        <button class="buy-button" data-id="${upgrade.id}" ${score >= upgrade.cost ? '' : 'disabled'}>
          Buy!
        </button>
      `;
      shopColumn.appendChild(upgradeElement);
    }
  });

  // Add buy button event listeners
  document.querySelectorAll('.buy-button').forEach(button => {
    button.addEventListener('click', () => {
      const upgradeId = button.getAttribute('data-id');
      buyUpgrade(upgradeId);
    });
  });
}

// Update buy button states without re-rendering the entire shop
function updateBuyButtons() {
  document.querySelectorAll('.buy-button').forEach(button => {
    const upgradeId = button.getAttribute('data-id');
    const upgrade = upgrades.find(u => u.id === upgradeId);
    if (upgrade) {
      button.disabled = score < upgrade.cost;
    }
  });
}

// Render owned upgrades
function renderOwnedUpgrades() {
  const ownedUpgradesColumn = document.getElementById('owned-upgrades');
  ownedUpgradesColumn.innerHTML = "<h2>Your Lime Arsenal</h2>";
  upgrades.forEach(upgrade => {
    if (upgrade.active) {
      const upgradeElement = document.createElement('div');
      upgradeElement.className = 'upgrade';
      upgradeElement.innerHTML = `
        <div>
          <strong>${upgrade.name}</strong><br>
          <span>${upgrade.description}</span>
        </div>
        <label class="toggle-switch">
          <input type="checkbox" data-id="${upgrade.id}" ${upgrade.enabled ? 'checked' : ''}>
          <span class="toggle-slider"></span>
        </label>
      `;
      ownedUpgradesColumn.appendChild(upgradeElement);
    }
  });

  // Add toggle switch event listeners
  document.querySelectorAll('.toggle-switch input').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      const upgradeId = checkbox.getAttribute('data-id');
      toggleUpgrade(upgradeId, checkbox.checked);
    });
  });
}

// Update score display
function updateScore() {
  const scoreElement = document.getElementById('score');
  scoreElement.textContent = score;
  updateBuyButtons(); // Update buy button states without re-rendering the entire shop
}