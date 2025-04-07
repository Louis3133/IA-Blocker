function setupTimerAndActions(shield) { // cette fonction met en place le système de timer sur le bouton, elle gère le fonctionnel et l'affichage
  const unlockButton = shield.querySelector("#unlockButton");
  const progressBar = shield.querySelector("#progressBar");
  const progressBarText = shield.querySelector("#progress-text");
  const secondsRemain = shield.querySelector("#seconds-remain");
  const seconds = shield.querySelector(".seconds");

  // c'est ici qu'on définis le temps d'attente, il est actuellement à 30 secondes (30000 ms)

  let timeElapsed = 0;
  const totalTime = 30000;
  const interval = 100;
  let count = totalTime / 1000;

  secondsRemain.textContent = count--;

  const countdown = setInterval(() => { // Ici on gère l'affichage des secondes sur le bouton
    secondsRemain.textContent = count--;
    if (count < 0) {
      clearInterval(countdown);
    }
    if (count == 0) {
      seconds.textContent = " seconde";
    }
  }, 1000);

  const timer = setInterval(() => { // Ici on gère la progression du fond du bouton
    timeElapsed += interval;
    const progress = (timeElapsed / totalTime) * 100;
    progressBar.style.width = progress + "%";

    if (timeElapsed >= totalTime) { // une fois que le timer est finis
      clearInterval(timer);
      unlockButton.disabled = false;
      unlockButton.classList.add("unlocked");
      progressBarText.innerHTML = "Continuer";
      secondsRemain.style.display = "none";
      seconds.style.display = "none";
    }
  }, interval);

  unlockButton.addEventListener("click", () => { // on permet de scroller si on le désactive
    shield.remove();
    document.documentElement.style.overflow = "";
  });

  shield.querySelector("#closePage").addEventListener("click", () => { // On ferme la fenêtre si on clique sur "Quiter la page"
    ext.runtime.sendMessage({ action: "closeTab" });
  });
}
