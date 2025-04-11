function setupTimerAndActions(shield) {

  const unlockButton = shield.querySelector("#unlockButton");
  const progressBar = shield.querySelector("#progressBar");
  const progressBarText = shield.querySelector("#progress-text");
  const secondsRemain = shield.querySelector("#seconds-remain");
  const seconds = shield.querySelector(".seconds");


  const totalTime = 30000;
  const interval = 100;
  let timeElapsed = 0;

  let countdownInterval;
  let timerInterval;
  let isTimerRunning = false;


  unlockButton.addEventListener("click", () => {
    if (isTimerRunning) {

      if (unlockButton.classList.contains("unlocked")) {
        shield.remove();
        document.documentElement.style.overflow = "";
      }
      return;
    }

    isTimerRunning = true;
    unlockButton.disabled = true;
    progressBarText.innerHTML = "Avant de débloquer l'IA il va falloir attendre ";
    secondsRemain.style.display = "inline";
    seconds.style.display = "inline";


    let count = totalTime / 1000;
    secondsRemain.textContent = count--;

    countdownInterval = setInterval(() => {
      secondsRemain.textContent = count--;
      if (count < 0) {
        clearInterval(countdownInterval);
      }
      if (count === 0) {
        seconds.textContent = " seconde";
      }
    }, 1000);

    timerInterval = setInterval(() => {
      timeElapsed += interval;
      const progress = (timeElapsed / totalTime) * 100;
      progressBar.style.width = `${progress}%`;
            if (timeElapsed >= totalTime) {
        clearInterval(timerInterval);
        unlockButton.disabled = false;
        unlockButton.classList.add("unlocked");
        progressBarText.innerHTML = "Continuer";
        secondsRemain.style.display = "none";
        seconds.style.display = "none";
      }
    }, interval);
  });
}
