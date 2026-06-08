README.md

# ♠️ Poker Game

Un jeu de poker **Texas Hold'em multijoueur en temps réel**, développé avec React, Vite et Firebase.

---

## 📸 Aperçu

> _À venir_

---

## 🚀 Stack technique

| Technologie | Utilisation |
|---|---|
| React 18 | Interface utilisateur |
| Vite | Bundler / Dev server |
| Tailwind CSS | Styles |
| Firebase Realtime Database | Multijoueur temps réel |

---

## 🎮 Fonctionnalités

- ♠️ Texas Hold'em complet (Preflop, Flop, Turn, River, Showdown)
- 🌐 Multijoueur en ligne — création de salle avec ID partageable
- 🃏 Cartes avec vraies images PNG
- 📋 Page de règles intégrée
- 🎴 Présentation des familles de cartes
- 💰 Gestion des blinds, mises, relances et tapis
- 🏆 Évaluation automatique des mains (paire, brelan, quinte flush...)

---

## 📁 Structure du projet



```
poker-game
├─ README.md
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ public
│  ├─ favicon.svg
│  └─ icons.svg
├─ src
│  ├─ App.css
│  ├─ App.jsx
│  ├─ assets
│  │  └─ cards
│  ├─ components
│  │  ├─ ActionBar.jsx
│  │  ├─ Board.jsx
│  │  ├─ Card.jsx
│  │  ├─ ChipDisplay.jsx
│  │  ├─ Game.jsx
│  │  ├─ Hand.jsx
│  │  ├─ Player.jsx
│  │  ├─ PlayerList.jsx
│  │  ├─ Pot.jsx
│  │  ├─ RaiseSlider.jsx
│  │  ├─ Table.jsx
│  │  └─ WinnerModal.jsx
│  ├─ firebase.js
│  ├─ hooks
│  │  ├─ useGameState.js
│  │  └─ usePokerLogic.js
│  ├─ index.css
│  ├─ main.jsx
│  └─ utils
│     ├─ constants.js
│     ├─ deck.js
│     └─ handEvaluator.js
├─ tailwind.config.js
└─ vite.config.js

```

---

## ⚙️ Installation

### 1. Clone le repo

```bash
git clone https://github.com/alnrfLO/poker.git
cd poker


2. Installe les dépendances

npm install



3. Configure les variables d’environnement

Crée un fichier .env à la racine du projet :

VITE_API_KEY=ta_valeur
VITE_AUTH_DOMAIN=ta_valeur
VITE_DATABASE_URL=ta_valeur
VITE_PROJECT_ID=ta_valeur
VITE_STORAGE_BUCKET=ta_valeur
VITE_MESSAGING_SENDER_ID=ta_valeur
VITE_APP_ID=ta_valeur


⚠️ Ne jamais commit le fichier .env — il est dans le .gitignore

4. Lance le projet

npm run dev


Ouvre http://localhost:5173 dans ton navigateur.

```
🃏 Règles du jeu

Le Texas Hold’em est la variante de poker la plus jouée au monde.

1. Chaque joueur reçoit 2 cartes privées
2. 5 cartes communes sont révélées progressivement (Flop, Turn, River)
3. Le but est de former la meilleure main de 5 cartes
4. Les joueurs peuvent Fold, Check, Call ou Raise à chaque tour

Hiérarchie des mains



|Main |Exemple |
|---------------------|-------------------------|
|🥇 Quinte flush royale|A K Q J 10 (même couleur)|
|🥈 Quinte flush |5 6 7 8 9 (même couleur) |
|🥉 Carré |4x le même rang |
|Full house |Brelan + Paire |
|Couleur |5 cartes même couleur |
|Suite |5 cartes consécutives |
|Brelan |3x le même rang |
|Double paire |2 paires différentes |
|Paire |2x le même rang |
|Carte haute |Aucune combinaison |

🌐 Multijoueur

1. Le premier joueur crée une salle → reçoit un ID unique
2. Il partage l’ID à ses amis
3. Les autres joueurs entrent l’ID pour rejoindre
4. La partie commence quand tout le monde est prêt

👤 Auteur

alnrfLO

• GitHub : @alnrfLO

📄 Licence

Tous droits réservés © 2026 alnrfLO
