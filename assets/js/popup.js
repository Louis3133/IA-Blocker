document.addEventListener('DOMContentLoaded', () => {
  let shieldState = true;
  const shieldButton = document.getElementById("ShieldStateButton");
  const state = document.getElementById("displayState");

  shieldButton.addEventListener("click", () => {
    if (shieldState) {
      state.textContent = "Désactivé";
      shieldState = false;
    } else {
      state.textContent = "Activé";
      shieldState = true;
    }

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "shieldStateChanged", state: shieldState });
    });
  });
});
