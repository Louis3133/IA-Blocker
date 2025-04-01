(function() {
  console.log("Extension activée : vérification du site...");

  function displayShield() {
    if (document.querySelector('.shield')) return;

    const shield = document.createElement('div');
    shield.className = 'shield';

    shield.innerHTML = `
      <h1>Je pense que tu as Missclick ^^</h1>
      <p>Se tromper de bouton ça arrive, ça ira pour cette fois, clique sur ce bouton (essaie de pas te tromper cette fois ^^)</p>
      <button id="closePage">Quitter la page</button>
    `;

    document.body.appendChild(shield);
    document.documentElement.style.overflow = "hidden";

    document.getElementById("closePage").addEventListener("click", () => {
      window.close();
    });
  }

  displayShield();
})();
