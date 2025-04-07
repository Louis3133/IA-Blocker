const stopSentences = [
  "Tu as bloqué les IA ^^",
  "Il me semble que tu es bloqué",
  "Non pas cette fois !"
];

function generStopSentences() {
  const stopTitleElement = document.getElementById("stop-title");
  const index = Math.floor(Math.random() * stopSentences.length);
  const sentence = stopSentences[index];
  stopTitleElement.textContent = sentence;
}

if (document.readyState === "complete" || document.readyState === "interactive") {
  setTimeout(generStopSentences, 100);
} else {
  document.addEventListener("DOMContentLoaded", function () {
    generStopSentences();
  });
}
