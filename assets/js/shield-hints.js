const hints = [ // Ici on fait un tableau de tableaux avec dans chacuns d'eux, la phrase de l'astuce et le lien de redirection
  ["Si tu veux corriger tes fautes, utilise plutôt Bonpatron, ici pas d'IA, et tu apprendras à corriger tes erreurs !", "https://bonpatron.com"],
  ["Tu cherches des informations sur quelqu'un ou quelque chose ? Wikipédia reste ton amis le plus fidèle", "https://wikipedia.com"],
  ["Au lieu de voler le travail d'artiste et de poluer, tu peux trouver des images gratuites sur Pexel ! ", "https://pexel.com"],
  ["Traduire sans IA c'est pas facile, mais utilise plutot deepl, une IA spécialisé et plus respectueuse de l'environement", "https://deepl.com"],
  ["Tu ne comprend pas ce qu'un mot veux dire ? Les dictionnaires en lignes restent une valeur sure", "https://lerobert.com"],
  ["En manque d'idées ? Tu n'est pas le seul, les forums sont trufés d'idée à développer, sert t'en !", "https://reddit.com"]
]

function displayHint() { // comme pour la phrase aléatoire, on rend cela aléatoire
  const hintTextDisplay = document.getElementById("hintText");
  const hintLinkDisplay = document.getElementById("hintLink");
  const index = Math.floor(Math.random() * hints.length);
  const hintText = hints[index][0];
  const hintLink = hints[index][1];
  hintTextDisplay.textContent = hintText;
  hintLinkDisplay.href = hintLink;
}

if (document.readyState === "complete" || document.readyState === "interactive") { // on l'affiche après le chargement du DOM poiur éviter des bugs
  setTimeout(displayHint, 100);
} else {
  document.addEventListener("DOMContentLoaded", function () {
    displayHint()
  });
}
