const stopSentences = [  // ici on ajoute les phrases de bloquages aléatoires
  "Tu as bloqué les IA ^^",
  "Il me semble que tu es bloqué",
  "Non pas cette fois !"
];

function generStopSentences() { // Cette fonction permet de rendre aléatoire l'aparition des phrases
  const stopTitleElement = document.getElementById("stop-title");
  const index = Math.floor(Math.random() * stopSentences.length);
  const sentence = stopSentences[index];
  stopTitleElement.textContent = sentence;
}

if (document.readyState === "complete" || document.readyState === "interactive") {  // on active la fonction si le dome est bien chargé pour éviter des erreurs
  setTimeout(generStopSentences, 100);
} else {
  document.addEventListener("DOMContentLoaded", function () {
    generStopSentences();
  });
}
