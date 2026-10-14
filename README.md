# Kasa

Ce projet a été réalisé dans le cadre d'une formation avec OpenClassrooms (Développeur Application Full-Stack) et porte sur la réalisation d'une plateforme de réservation avec React.

## Sommaire

1. [Prérequis](#prérequis)
2. [Installation et démarrage](#installation-et-démarrage)
3. [Frameworks et librairies utilisées](#frameworks-et-librairies-utilisées)

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
