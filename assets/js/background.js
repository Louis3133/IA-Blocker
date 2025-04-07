// ici on permet à l'utilisateur de fermet l'onglet sur lequel il se trouve en cliquant sur le bouton "quiter la page"

const ext = typeof browser !== "undefined" ? browser : chrome;

ext.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "closeTab" && sender.tab) {
    ext.tabs.remove(sender.tab.id);
  }
});
