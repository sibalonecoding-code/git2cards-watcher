# Gil2Cards Watcher

**Gil2Cards Watcher** est une extension web légère, open-source et passive conçue pour **Firefox** et **Chrome**. Elle surveille en arrière-plan la disponibilité de vos packs sur le site [Gil2 Cards](https://www.gil2-cards.com) et vous alerte dès que vos 10 packs sont prêts à être ouverts.

## 🚀 Fonctionnalités

- **Vérification en arrière-plan :** Interroge périodiquement le site via les alarmes du navigateur.
- **Protection Anti-Spam :** Intègre une sécurité empêchant les vérifications trop rapprochées (fréquence minimale de 15 minutes).
- **Notifications de bureau :** Vous avertit instantanément dès que le compteur atteint `10/10`.
- **Ouverture automatique (optionnelle) :** Ouvre directement un onglet vers la page de récupération des packs.
- **Léger et respectueux de la vie privée :** Aucun traqueur, aucun script lourd dans le DOM.

## 📂 Structure du projet

Le projet est divisé en deux dossiers distincts pour s'adapter aux spécificités des différents moteurs de navigateurs :

```text
.
├── chrome/
│   ├── background.js
│   ├── icon.png
│   └── manifest.json
└── firefox/
    ├── background.js
    ├── icon.png
    └── manifest.json
```

## 🛠️ Installation

🦊 Sur Mozilla Firefox:
- Téléchargez ou clonez ce dépôt sur votre machine.
- Ouvrez Firefox et accédez à l'adresse : `about:debugging#/runtime/this-firefox`.
- Cliquez sur le bouton "Charger un module complémentaire temporaire...".
- Naviguez jusqu'au dossier `firefox/` du projet et sélectionnez le fichier manifest.json.

🌐 Sur Google Chrome / Microsoft Edge:
- Téléchargez ou clonez ce dépôt sur votre machine.
- Ouvrez votre navigateur et accédez à l'adresse : `chrome://extensions/`.
- Activez le Mode développeur à l'aide de l'interrupteur situé en haut à droite.
- Cliquez sur le bouton "Charger l'extension non empaquetée".
- Sélectionnez le dossier `chrome/` du projet.

## ⚙️ Configuration

Vous pouvez personnaliser le comportement de l'extension en modifiant les variables situées tout en haut du fichier background.js du navigateur de votre choix :

```js
const FREQUENCE_DU_TIMER = 30 // Intervalle de vérification en minutes
const ANTI_SPAM = 15          // Fréquence minimale de sécurité (en minutes)
const NOTIFICATIONS = true    // Activer/désactiver les notifications (true/false)
const ONGLETS_AUTO = true     // Ouvrir l'onglet automatiquement quand les packs sont prêts (true/false)
```
