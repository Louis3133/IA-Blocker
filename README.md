# Axi

Bienvenue ! Voici Axi, une extension permettant de bloquer les IA pour encourager les utilisateurs à les utiliser avec parcimonie.

Pourquoi ? Pour des raisons écologiques et éthiques, s'éduquer à ce qu'est l'IA et comment bien l'utiliser est un sujet important. De plus en plus de personnes ont tendance à utiliser les assistants IA tels que ChatGPT ou perplexity comme un navigateur, tandis que des outils plus respectueux de l'éthique et de l'environnement sont déjà disponibles. C'est pour cela que nous souhaitons les mettre en avant et proposer des solutions plus adaptées et responsables.

Comment ? Pour répondre à cette problématique, autant s'attaquer à la racine du problème et bloquer les IA, nous les répertorions sous forme de liste, une fois l'URL détecté alors nous affichons un layout au-dessus du body qui bloque alors toute possibilité à l'utilisateur d'utiliser l'IA. Nous n'excluons pas les cas d'urgences, ainsi, on permet après un certain temps de réflexion de supprimer le layout et d'accéder à l'IA, nous ne sommes pas dans une optique de frustration de l'utilisateur, mais de prise de conscience. On propose par ailleurs des outils alternatifs pour effectuer des tâches sans IA, ou alors avec des IA spécialisées.

Pour consulter nos articles et nos catégories. Nous vous invitons à visiter le site suivant : [Lien de notre site](https://axi.mmibordeaux.com/)

Ce projet est entièrement open-source, tout le monde peut y contribuer, pour faciliter un peu la tâche, voici une documentation de ce qui est présent sur le repo, quelques explications, ainsi que nos objectifs.

# Sommaire

0. Installation de l'extension.
1. Manifest.json
2. Shield
3. Le CSS
4. Multi-navigateurs
5. Objectifs futurs
6. À propos de nous

# 0 - Installation de l'extension.

Pour installer l'extension, en attendant que celle-ci soit validée par les différents stores, il est toujours possible de passer par un moyen un peu moins conventionnel.

Pour les deux navigateurs, téléchargez d'abord ce zip et dézippez le sur votre machine :

Pour Chrome :

Allez sur votre onglet de gestion des extensions, pour cela accéder à Chrome://extensions une fois dessus, activez en haut à droite le mode développeur. Une fois activé, vous devriez voir apparaître trois boutons "Charger l'extension non empaquetée", "empaqueter l'extension" et "mettre à jour". Nous nous allons nous concentrer sur "Charger l'extension non empaquetée". Glissez le dossier que vous avez précédemment dézippé, une fois fait, si ce n'est pas le cas, activez l'extension, et le tour est joué !

Pour Firefox :

Allez sur about:debugging#/setup, une fois ici, aller sur l'onglet "Ce firefox", puis cliquer le bouton "charger le module complémentaire temporaire". Aller dans le dossier dézippé précédemment et importer le manifest.json. Et voilà le tour est joué !

# 1. Manifest.json

Le fichier manifest.json est le fichier central de toute l’extension, sans lui rien ne peut fonctionner. Il contient toutes les informations concernant l’extension : son nom, sa description, ses permissions, les actions qu’elle réalise.

Pour citer la doc MDN : “Avec manifest.json, on fournit les différentes métadonnées simples de l'extension, comme le nom et la version. On peut également y définir certains aspects des fonctionnalités de l'extension (tels que les scripts d'arrière-plan, les scripts de contenu et les actions du navigateur).” Pour plus d’informations, la doc MDN est complète : [Lien de la doc MDN](https://developer.mozilla.org/fr/docs/Mozilla/Add-ons/WebExtensions/manifest.json)

Ici, il y a une autre chose d’intéressante, c’est la longue liste d’URL présente dans le “content_scripts” dans “matches”, ici, on détecte automatiquement quand on se trouve sur une de ces URL, on remarque notamment le schéma suivant sur celles-ci :

“_://nomDeLaPage.extensionDeDomaine/_’

Ici, on encadre de nom de la page ainsi que son extension de domaine avec des \* pour détecter la page même s'il y a quelque chose d’autre avant ou après l’url. Il est important de changer cela pour des cas particuliers, quand un site qui n’est pas un outil IA à une page spécifique étant l’outil, il se peut qu’il faille alors préciser plus que le nom de la page ainsi que son extension de domaine. Par exemple :

“_://nomDeLaPage.extensionDeDomaine/nomDeLaPagePrécise/_’

# 2. Shield

On appelle le “Shield” le layout que nous utilisons, c’est l’interface qui se superpose à celle de l’outil d’IA pour bloquer son accès. Pour travailler sur le fonctionnement en lui-même du shield, ce sont les fichiers suivant qui nous intéressent (en plus du manifest.json) :

shield.js
shield-title.js
shield-timer.js
shield-card.js
shield.html

Le shield.js :

Ce fichier permet l’affichage du layout, grâce à la fonction displayshield()

Cette fonction est appelée automatiquement quand l’url est détecté, on peut le voir dans le manifest.json dans “js”: [ "/assets/js/shield.js"]

“js” prend un tableau avec les chemins des fichiers js à appeler lorsque l’une des URL de “matches” est détectée.

Pour afficher le layout, la fonction displayshield() crée donc la div et lui injecte le html présent dans shield.html, cette div étant placé au-dessus de tous les éléments, c’est elle qui est donc vue en priorité. La fonction désactive également le scroll de la page.

Le shield-timer.js :

La fonction setupTimerAndAction() qui prend comme enfant shield permet le fonctionnement du bouton pour désactiver le shield après un certain temps, et ce, si le shield est bien activé.

Le shield-card.js :

Ici la fonction initializeCards() permet le fonctionnement de la navigation par cards. Ça permet de détecter lorsque l'on clique sur une card, d'afficher alors son contenu associé, et changer le contenu en fonction des cards cliquées. Si on reclique sur la card sur laquelle est déjà, alors le contenu disparaît.

Le shield-title.js :

Ce fichier permet grâce à la fonction displaySentence() de prendre un titre et un sous-titre et de l'afficher aléatoirement, les titres et sous-titres sont dans un tableau de tableaux dans la variable sentences, les tableaux sont donc composé en premier du titre, ainsi que du sous-titre associé.

# 3 - Le CSS

Pour afficher une UI propre, on utilise donc les fichiers CSS suivants :

shield.css
shield-button.css
shield-cards.css
shield-title.css

Ce qui est très important sur cette extension, c’est de bien cibler correctement tous les éléments, pour ne pas impacter l’UI de l’IA dans le cas où l’utilisateur désactive le shield, mais également pour éviter que notre UI soit impacté par des css d’une autre IA.

Pour cela, il faut essayer de cibler au maximum avec des successions de classes nos éléments, on n’applique pas du css sur des balises directement et dans des cas extrêmes, on cible avec les ID directement (Dans les derniers recours, on utilise !important, mais il vaut mieux essayer de rester le plus propre possible.).

Le fichier shield.css correspond à tous les styles généraux en rapport avec le shield.

Le fichier shield-button.css, correspond aux styles du bouton pour faire disparaître le shield.

Le fichier shield-cards.css correspond aux styles des cards d'alternative ainsi que leur contenu.

Le fichier shield-title.css correspond aux styles des titres et sous-titres du shield.

# 4 - Multi-navigateurs


Afin d’assurer une compatibilité maximale entre différents navigateurs (Firefox, Chrome, Edge…), nous utilisons la librairie webextension-polyfill de Mozilla.

Référence : [Lien du github](https://github.com/mozilla/webextension-polyfill)

Les extensions Web fonctionnent différemment selon les navigateurs, et certaines API spécifiques comme chrome.runtime ne sont pas directement compatibles avec Firefox.

Grâce à webextension-polyfill, nous utilisons une interface unifiée, ce qui nous permet d’assurer que notre extension fonctionne correctement sans avoir à modifier le code pour chaque navigateur.

# 5. Objectifs futurs
Si vous contribuez à ce projet, vous devez installer cette dépendance avant de commencer :

```
npm install --save-dev webextension-polyfill
```
(Assurez-vous d’avoir Node.js et npm installés sur votre machine avant d’exécuter cette commande.)

Nous aimerions à l’avenir pouvoir bloquer les intégrations d’IA sur les sites, nous n’avons pas encore de solution adaptée, nous essayerons d’y répondre mais si vous souhaitez vous joindre à nous dans ces recherches, nous en serions ravis !

Évidemment, nous sommes également constamment à la recherche d’alternatives dans IA à suggérer aux utilisateurs, alors ajouter des astuces est également un de nos objectifs.

# 6 - À propos de nous

Enfin, pour vous parler de nous : nous sommes un groupe d'étudiants de première, deuxièmes et troisièmes années au BUT MMI de l'université bordeaux Montaigne, nous réalisons ce projet dans le cadre d'un Workshop. Nous avions deux semaines pour produire tout ce que vous pouvez constater ici, mais également toute la communication autour.
