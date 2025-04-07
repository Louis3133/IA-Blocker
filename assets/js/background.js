const ext = typeof browser !== "undefined" ? browser : chrome;

ext.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "closeTab" && sender.tab) {
    ext.tabs.remove(sender.tab.id);
  }
});
