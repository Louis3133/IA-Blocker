document.addEventListener("DOMContentLoaded", () => {
  let shieldState = true;
  const shieldButton = document.getElementById("ShieldStateButton");
  const state = document.getElementById("displayState");

  const ext = typeof browser !== "undefined" ? browser : chrome;

  shieldButton.addEventListener("click", () => {
    shieldState = !shieldState;
    state.textContent = shieldState ? "Activé" : "Désactivé";
    ext.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0 && tabs[0].id) {
        ext.tabs.sendMessage(tabs[0].id, {
          action: "shieldStateChanged",
          state: shieldState,
        });
      }
    });
  });
});
