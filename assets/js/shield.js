  let shieldState = true;

  const ext = typeof browser !== "undefined" ? browser : chrome;

  if (shieldState) {
    displayShield();
  }

  function displayShield() { // fonction qui permet l'affichage du shield en fonction de son état
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
  }

  function removeShield() { // fonction permettant de supprimer le shield
    const shield = document.querySelector(".shield");
    if (shield) {
      shield.remove();
      document.documentElement.style.overflow = "";
    }
  }
