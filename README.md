# Kasa

Ce projet a été réalisé dans le cadre d'une formation avec OpenClassrooms (Développeur Application Full-Stack) et porte sur la réalisation d'une plateforme de réservation avec React.

## Sommaire

1. [Prérequis](#prérequis)
2. [Installation et démarrage](#installation-et-démarrage)
3. [Frameworks et librairies utilisées](#frameworks-et-librairies-utilisées)
4. [Arborescence](arborescence)

## Prérequis

Dans le dossier front-end, copier le fichier ".env.example" en ".env".

Le back-end doit tourner sur le port 3000.

```bash
cd back-end
npm install
npm start
```

## Installation et démarrage

1. Installation des dépendances :

```bash
cd front-end
npm install
```

2. Lancer le serveur de développement :

```bash
npm run dev
```

3. Lancer le serveur de production :

```bash
npm run build
npm run start
```

Le serveur se lance sur le port 3001, le back-end étant sur le port 3000.
L'adresse sur le serveur local est http://localhost:3001/

## Frameworks et librairies utilisées

| Nom        | Version | Utilité                                                |
| ---------- | ------- | ------------------------------------------------------ |
| Next.js    | 16.4.0  | Framework React                                        |
| React      | 19.3.0  | React incluant ReactDom                                |
| ESLint     | 9       | Vérification de la syntaxe du code                     |
| Prettier   | 3.9.10  | Formatage du code selon les normes et bonnes pratiques |
| TypeScript | 5       | Sur-ensemble JavaScript                                |
| Sass       | 1.105.1 | Préprocesseur CSS                                      |

## Arborescence

Kasa/
|_ back-end/ (Back-end, voir le fichier README.md du dossier back-end)
|_ front-end/ (Front-end du site et objet du projet Kasa)
| |_ app/ (Pages du site)
| | |_ layout.tsx (Layout du site)
| | |_ page.tsx (Page d'accueil du site)
| |_ components/ (Composants réutilisables)
| |_ lib/ (Liaison API)
| | |_ api.ts (Fonction de requête de l'API)
| | |_ users.ts (Calls de l'API pour les utilisateurs publics)
| |_ public/ (Icones et images du site)
| | |_ uploads/ (Ignoré par git pour stocker les images uploadées par les utilisateurs)
| |_ styles/ (Feuilles de styles du site)
| | |_ globals.scss (Styles partagés par l'ensemble des pages du site)
| | |_ _variables.scss (variables dédiées aux styles)
| | |_ _mixins.scss (mixins réutilisables dans les styles)
| |_ types/ (Typages de données)
| | |\_ User.ts (type utilisateur public)
