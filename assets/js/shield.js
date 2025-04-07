(function () {
  let shieldState = true;

  const ext = typeof browser !== "undefined" ? browser : chrome;

  if (shieldState) {
    displayShield();
  }

  ext.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "shieldStateChanged") {
      shieldState = message.state;
      console.log("État du bouclier : ", shieldState);

      if (shieldState) {
        displayShield();
      } else {
        removeShield();
      }
    }
  });

  function displayShield() {
    if (document.querySelector(".shield")) return;

    const shield = document.createElement("div");
    shield.className = "shield";

    fetch(ext.runtime.getURL("shield.html"))
      .then((response) => response.text())
      .then((data) => {
        shield.innerHTML = data;
        document.body.appendChild(shield);
        document.documentElement.style.overflow = "hidden";

        const logoPlaceholder = shield.querySelector(".logo-placeholder");
        if (logoPlaceholder) {
          const img = document.createElement("img");
          img.src = ext.runtime.getURL("assets/images/logo-shield.svg");
          logoPlaceholder.appendChild(img);
        }

        setupTimerAndActions(shield);
      })
      .catch((error) =>
        console.error("Erreur de chargement du shield :", error)
      );
  }

  function setupTimerAndActions(shield) {
    const unlockButton = shield.querySelector("#unlockButton");
    const progressBar = shield.querySelector("#progressBar");
    const progressBarText = shield.querySelector("#progress-text");
    const secondsRemain = shield.querySelector("#seconds-remain");
    const seconds = shield.querySelector(".seconds");

    let timeElapsed = 0;
    const totalTime = 15000;
    const interval = 100;
    let count = totalTime / 1000;

    secondsRemain.textContent = count--;

    const countdown = setInterval(() => {
      secondsRemain.textContent = count--;
      if (count < 0) {
        clearInterval(countdown);
      }
      if (count == 0) {
        seconds.textContent = " seconde";
      }
    }, 1000);

    const timer = setInterval(() => {
      timeElapsed += interval;
      const progress = (timeElapsed / totalTime) * 100;
      progressBar.style.width = progress + "%";

      if (timeElapsed >= totalTime) {
        clearInterval(timer);
        unlockButton.disabled = false;
        unlockButton.classList.add("unlocked");
        progressBarText.innerHTML = "Continuer";
        secondsRemain.style.display = "none";
        seconds.style.display = "none";
      }
    }, interval);

    unlockButton.addEventListener("click", () => {
      shield.remove();
      document.documentElement.style.overflow = "";
    });

    shield.querySelector("#closePage").addEventListener("click", () => {
      ext.runtime.sendMessage({ action: "closeTab" });
    });
  }

  function removeShield() {
    const shield = document.querySelector(".shield");
    if (shield) {
      shield.remove();
      document.documentElement.style.overflow = "";
    }
  }
})();
