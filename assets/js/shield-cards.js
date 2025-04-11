function initializeCards() {
  const cardPairs = [
    {
      button: document.getElementById("card-inspiration-category"),
      content: document.getElementById("card-inspiration-category-display")
    },
    {
      button: document.getElementById("card-sources-category"),
      content: document.getElementById("card-sources-category-display")
    },
    {
      button: document.getElementById("card-development-category"),
      content: document.getElementById("card-development-category-display")
    },
    {
      button: document.getElementById("card-definition-category"),
      content: document.getElementById("card-definition-category-display")
    },
    {
      button: document.getElementById("card-traduction-category"),
      content: document.getElementById("card-traduction-category-display")
    },
    {
      button: document.getElementById("card-correction-category"),
      content: document.getElementById("card-correction-category-display")
    },
    {
      button: document.getElementById("card-pictures-category"),
      content: document.getElementById("card-pictures-category-display")
    },
    {
      button: document.getElementById("card-song-category"),
      content: document.getElementById("card-song-category-display")
    }
  ];

  function closeAllCards() {
    cardPairs.forEach(pair => {
      if (pair.content) {
        pair.content.classList.add("card-content-hidden");
        pair.button.style.border = "none";
      }
    });
  }

  function scrollToTestSection() {
    const shieldcontentcardclickSection = document.getElementById('shield-content-card-click');
    if (shieldcontentcardclickSection) {
      shieldcontentcardclickSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  cardPairs.forEach(pair => {
    if (pair.button && !pair.button.hasAttribute("data-initialized")) {
      pair.button.setAttribute("data-initialized", "true");

      pair.button.addEventListener('click', function() {
        if (pair.content) {
          if (!pair.content.classList.contains("card-content-hidden")) {
            pair.content.classList.add("card-content-hidden");
          }
          else {
            closeAllCards();
            pair.content.classList.remove("card-content-hidden");
            pair.button.style.border = "solid 2px #B225B0";

            // Ajout du défilement vers l'ancre #test après l'ouverture de la carte
            scrollToTestSection();
          }
        }
      });
    }
  });

  const observer = new MutationObserver((mutations) => {
    let needsInit = false;

    cardPairs.forEach(pair => {
      if (pair.button && !pair.button.hasAttribute("data-initialized")) {
        needsInit = true;
      }
    });

    if (needsInit) {
      observer.disconnect();
      initializeCards();
    }
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });
}

(function() {
  initializeCards();

  window.addEventListener('load', function() {
    initializeCards();
  });

  document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
      initializeCards();
    }
  });
})();
