(function () {
  console.log("Extension activée : vérification du site...");

  function displayShield() {
    if (document.querySelector(".shield")) return;

    const shield = document.createElement("div");
    shield.className = "shield";

    shield.innerHTML = `
      <h1>Je pense que tu as Missclick ^^</h1>
      <p>Se tromper de bouton ça arrive, mais cette fois tu vas devoir attendre 15 secondes...</p>

      <div class="progress-container">
        <div class="progress-bar" id="progressBar"></div>
      </div>

      <button id="unlockButton" disabled>Débloquer l'accès</button>
      <button id="closePage">Quitter la page</button>
    `;

    document.body.appendChild(shield);
    document.documentElement.style.overflow = "hidden";

    const unlockButton = document.getElementById("unlockButton");
    const progressBar = document.getElementById("progressBar");

    let timeElapsed = 0;
    const totalTime = 15000;
    const interval = 100; 

    const timer = setInterval(() => {
      timeElapsed += interval;
      const progress = (timeElapsed / totalTime) * 100;
      progressBar.style.width = progress + "%";

      if (timeElapsed >= totalTime) {
        clearInterval(timer);
        unlockButton.disabled = false;
        unlockButton.innerText = "Accéder au site";
      }
    }, interval);

    unlockButton.addEventListener("click", () => {
      shield.remove();
      document.documentElement.style.overflow = "";
    });

    document.getElementById("closePage").addEventListener("click", () => {
      chrome.runtime.sendMessage({ action: "closeTab" });
    });
  }

  displayShield();
})();
