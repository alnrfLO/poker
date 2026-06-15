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
poker
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ public
│  ├─ favicon.svg
│  └─ icons.svg
├─ README.md
├─ src
│  ├─ App.css
│  ├─ App.jsx
│  ├─ assets
│  │  └─ cards
│  │     ├─ 10_of_clubs.png
│  │     ├─ 10_of_diamonds.png
│  │     ├─ 10_of_hearts.png
│  │     ├─ 10_of_spades.png
│  │     ├─ 2_of_clubs.png
│  │     ├─ 2_of_diamonds.png
│  │     ├─ 2_of_hearts.png
│  │     ├─ 2_of_spades.png
│  │     ├─ 3_of_clubs.png
│  │     ├─ 3_of_diamonds.png
│  │     ├─ 3_of_hearts.png
│  │     ├─ 3_of_spades.png
│  │     ├─ 4_of_clubs.png
│  │     ├─ 4_of_diamonds.png
│  │     ├─ 4_of_hearts.png
│  │     ├─ 4_of_spades.png
│  │     ├─ 5_of_clubs.png
│  │     ├─ 5_of_diamonds.png
│  │     ├─ 5_of_hearts.png
│  │     ├─ 5_of_spades.png
│  │     ├─ 6_of_clubs.png
│  │     ├─ 6_of_diamonds.png
│  │     ├─ 6_of_hearts.png
│  │     ├─ 6_of_spades.png
│  │     ├─ 7_of_clubs.png
│  │     ├─ 7_of_diamonds.png
│  │     ├─ 7_of_hearts.png
│  │     ├─ 7_of_spades.png
│  │     ├─ 8_of_clubs.png
│  │     ├─ 8_of_diamonds.png
│  │     ├─ 8_of_hearts.png
│  │     ├─ 8_of_spades.png
│  │     ├─ 9_of_clubs.png
│  │     ├─ 9_of_diamonds.png
│  │     ├─ 9_of_hearts.png
│  │     ├─ 9_of_spades.png
│  │     ├─ ace_of_clubs.png
│  │     ├─ ace_of_diamonds.png
│  │     ├─ ace_of_hearts.png
│  │     ├─ ace_of_spades.png
│  │     ├─ back.png
│  │     ├─ back@2x.png
│  │     ├─ black_joker.png
│  │     ├─ jack_of_clubs.png
│  │     ├─ jack_of_diamonds.png
│  │     ├─ jack_of_hearts.png
│  │     ├─ jack_of_spades.png
│  │     ├─ king_of_clubs.png
│  │     ├─ king_of_diamonds.png
│  │     ├─ king_of_hearts.png
│  │     ├─ king_of_spades.png
│  │     ├─ queen_of_clubs.png
│  │     ├─ queen_of_diamonds.png
│  │     ├─ queen_of_hearts.png
│  │     ├─ queen_of_spades.png
│  │     └─ red_joker.png
│  ├─ components
│  │  ├─ ActionBar.jsx
│  │  ├─ Board.jsx
│  │  ├─ Card.jsx
│  │  ├─ Chat.jsx
│  │  ├─ ChipDisplay.jsx
│  │  ├─ ChipStack.jsx
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
│  │  ├─ useChat.js
│  │  ├─ useGameState.js
│  │  ├─ usePokerLogic.js
│  │  └─ useRoom.js
│  ├─ index.css
│  ├─ main.jsx
│  ├─ pages
│  │  ├─ GamePage.jsx
│  │  ├─ LobbyPage.jsx
│  │  ├─ MenuPage.jsx
│  │  ├─ RulesPage.jsx
│  │  └─ SuitsPage.jsx
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

