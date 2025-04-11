const sentences = [
  ["Oops ! Axi t’a évité d’axider à un site basé sur de l’IA", "Que cherchais-tu à faire ? Va voir ces alternatives qui vont t’aider. "],
  ["Axi a bloqué cette page !", "T'essayais d’aller sur ce site ? C’était Axidentel c’est ça ? ^^ Utilise plutôt ces alternatives"],
  ["Et hop une IA de bloquée !", "Sois pas trop Axité de rejoindre ce site, il utilise l'IA ! Utilise ces alternatives à la place !"],
  ["Utiliser autant l’IA ce n’est pas Axiptable.", "Malheureusement, la banquise ne se régénère pas comme moi, essaye une de ces alternatives !"],
  ["Ce n'est pas un Axident !", "Et non, j'ai bloqué cette IA pour te proposer quelques alternatives, tu m'en diras des nouvelles !"]
]

function displaySentence() {
  const sentencesTitleDisplay = document.getElementById("TitleSentence");
  const sentencesSuptitleDisplay = document.getElementById("SuptitleSentence");
  const index = Math.floor(Math.random() * sentences.length);
  const SentencesTitle = sentences[index][0];
  const SentencesSuptitle = sentences[index][1];
  sentencesTitleDisplay.textContent = SentencesTitle;
  sentencesSuptitleDisplay.textContent = SentencesSuptitle;
}

if (document.readyState === "complete" || document.readyState === "interactive") {
  setTimeout(displaySentence, 100);
} else {
  document.addEventListener("DOMContentLoaded", function () {
    displaySentence()
  });
}
