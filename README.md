# Kasa

Ce projet a été réalisé dans le cadre d'une formation avec OpenClassrooms (Développeur Application Full-Stack) et porte sur la réalisation d'une plateforme de réservation avec React.

## Sommaire

1. [Description et fonctionnalités](#description-et-fonctionnalités)
2. [Fonctionnalités supplémentaires](#fonctionnalités-supplémentaires)
3. [Prérequis](#prérequis)
4. [Comptes utilisateurs](#comptes-utilisateurs)
5. [Installation et démarrage](#installation-et-démarrage)
6. [Frameworks et librairies utilisées](#frameworks-et-librairies-utilisées)
7. [Mises à jour de sécurité - oct 2026](#mises-à-jour-de-sécurité---oct-2026)
8. [Arborescence](#arborescence)
9. [Tests](#tests)
10. [Accessibilité](#accessibilité)
11. [Utilisation de l'IA](#utilisation-de-lia)

## Description et fonctionnalités

Le projet prévoit 2 sprints, l'un obligatoire, l'autre facultatif.

Sprint 1 (obligatoire) :

- Afficher la liste des logements (sur la page d'accueil mais également sur une page dédiée, plus épurée),
- Afficher la page individuelle de chacun des logements,
- Ajouter ou retirer des logements des favoris (stockés dans le localStorage),
- Afficher une page de connexion utilisateur,
- Prévoir un bouton de contact renvoyant l'utilisateur vers la messagerie.

Sprint 2 :

- Envoyer un message à l'hôte (a nécessité une modification du back-end, aucune table messagerie n'étant présente dans le back-end fourni) - En cours de réalisation,
- Afficher une page d'inscription d'un nouvel utilisateur,
- Afficher la liste des favoris stockés dans le localStorage,
- Permettre l'ajout, le retrait et l'affichage de photos,
- Ajouter un nouveau logement,
- Sélectionner les équipements d'un nouveau logement.

## Fonctionnalités supplémentaires

Pour faciliter les tests manuels du site et la cohérence du projet, plusieurs fonctionnalités ont été ajoutées :

- Ajout et consultation des avis utilisateurs (afin de permettre d'alimenter la base de données des avis et des notes),
- Page de profil de l'utilisateur connecté (afin de permettre de changer l'utilisateur du statut "client" à celui de "owner").

## Prérequis

- **Node.js 24.22.1** (ou une version 24.x récente) et **npm**
- Le **back-end** se lance sur le port 3000 :

```bash
cd back-end
npm install
npm start
```

> Au premier démarrage, le back-end crée la base SQLite et la remplit avec des logements de démonstration. Pendant quelques secondes, l'API peut répondre `503 Database not ready` : il suffit de patienter.

- Un fichier **`.env`** dans `front-end`, copié depuis `.env.example` :

```text
API_URL=http://localhost:3000
```

## Comptes utilisateurs

Les hôtes présents dans les données de démonstration n'ont pas de mot de passe et ne peuvent pas se connecter. Pour tester la connexion, créez un compte depuis la page `http://localhost:3001/register`. Pour accéder à l'ajout de logement, passez ensuite votre rôle à "propriétaire" (owner) depuis votre profil.

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

| Nom                   | Version | Utilité                                                |
| --------------------- | ------- | ------------------------------------------------------ |
| Next.js               | 16.4.5  | Framework React                                        |
| Node.js               | 24.22.1 | Environnement d'exécution JavaScript                   |
| React                 | 19.3.0  | React incluant ReactDom                                |
| ESLint                | 9.39    | Vérification de la syntaxe du code                     |
| Prettier              | 3.9.10  | Formatage du code selon les normes et bonnes pratiques |
| TypeScript            | 5.9.3   | Sur-ensemble JavaScript                                |
| Sass                  | 1.105.1 | Préprocesseur CSS                                      |
| Vitest                | 5.0.5   | Tests unitaires                                        |
| React Testing Library | 16      | Tests unitaires (avec user-event et jest-dom)          |
| jsdom                 | 31      | Tests unitaires                                        |

## Mises à jour de sécurité - oct 2026

Suite à la découverte de failles de sécurité importantes sur PHP et Node.js en octobre 2026, une mise à jour de Node a été nécessaire alors que l'élaboration était en cours.
Le projet a donc démarré sur la version Node.js 24.19.0 et continue sur la version Node.js 24.22.1.

## Arborescence

```text
Kasa/
├── back-end/                   Back-end fourni - API Express et SQLite, voir son fichier README.md
└── front-end/
    ├── app/                    Routes Next.js (App Router)
    │   ├── (app)/              Pages du site (logements, favoris, profil...)
    │   ├── (auth)/             Pages de connexion et d'inscription
    │   ├── actions/            Server actions (formulaires)
    │   ├── page.tsx            Page d'accueil du site
    │   └── layout.tsx          Layout global (header, footer et provider des favoris)
    ├── components/
    │   ├── Templates/          Contenu des pages
    │   └── UI/                 Composants réutilisables (boutons, inputs, cartes...)
    ├── context/                Context et Provider des favoris
    ├── data/                   Listes fixes des équipements et catégories, non gérées par le back-end
    ├── lib/                    Appels à l'API, un fichier par ressource
    ├── public/                 Icônes et images statiques du site
    ├── styles/                 Variables, mixins et styles globaux SASS
    ├── test/                   Configuration des tests (setup.ts)
    ├── types/                  Typages de données TypeScript
    ├── utils/                  Fonctions utilitaires (dates, cookies, URL, favoris...)
    ├── proxy.ts                Protection des routes (redirection vers la page de connexion)
    └── vitest.config.mts       Configuration de Vitest
```

## Tests

Les tests unitaires sont réalisés via Vitest.
La gestion des favoris et le fonctionnement du carrousel font l'objet de tests unitaires comme exigé par la mission.
12 composants supplémentaires sont testés (affichage, appel de fonctions et passage de props).
Chaque fichier test se termine par `*.test.tsx` et se trouve dans le même dossier que le composant testé.
Les composants serveur asynchrones ne font pas l'objet de tests unitaires (Header, Server Actions, etc.). Ils nécessiteraient des tests de bout en bout pour que ceux-ci soient réellement utiles.

```bash
cd front-end # se positionne dans le dossier front-end
npm test # lance Vitest en mode watch
npx vitest run # une seule exécution
npm run test:coverage # rapport de couverture
npm run test:ui # interface graphique de Vitest
```

## Accessibilité

Chaque image précise un texte alternatif, les images décoratives ont un texte vide (alt=""). Les tests unitaires recherchent les éléments par leur rôle et leur nom accessible.
Des rôles sont spécifiés pour les messages d'information (alert et status).
L'ensemble du site est utilisable au clavier. L'affichage est responsive sur smartphone (modèle utilisé iPhone SE) et sur tablette (modèle utilisé iPad Mini).
Le layout global précise la langue française du site et intègre un lien d'évitement pour "Aller au contenu principal".

L'outil Wave ne lève pas d'erreur :

- hiérarchie des titres respectée,
- pas d'erreur de contraste,
- 2 alertes liées au lien renvoyant vers l'accueil du site (une pour le lien "Accueil" du menu et une pour le lien "Accueil" du logo Kasa),
- les attributs ARIA sont identifiés, y compris aria-expanded pour l'ouverture et la fermeture du menu mobile.

Scores Lighthouse (navigation privée en local) :

| Page                | Version | Performance | Accessibilité | Bonnes pratiques | SEO |
| ------------------- | ------- | ----------- | ------------- | ---------------- | --- |
| Accueil             | Mobile  | 94          | 100           | 100              | 100 |
| Accueil             | Bureau  | 100         | 100           | 100              | 100 |
| À propos            | Mobile  | 97          | 100           | 100              | 100 |
| À propos            | Bureau  | 100         | 100           | 100              | 100 |
| Inscription         | Mobile  | 98          | 100           | 100              | 100 |
| Inscription         | Bureau  | 100         | 100           | 100              | 100 |
| Connexion           | Mobile  | 98          | 100           | 96               | 100 |
| Connexion           | Bureau  | 100         | 100           | 96               | 100 |
| Favoris             | Mobile  | 95          | 100           | 100              | 100 |
| Favoris             | Bureau  | 100         | 100           | 100              | 100 |
| Logements           | Mobile  | 96          | 100           | 100              | 100 |
| Logements           | Bureau  | 100         | 100           | 100              | 100 |
| Logement individuel | Mobile  | 97          | 100           | 100              | 100 |
| Logement individuel | Bureau  | 100         | 100           | 100              | 100 |
| Ajout d'un logement | Mobile  | 98          | 100           | 100              | 100 |
| Ajout d'un logement | Bureau  | 100         | 100           | 100              | 100 |
| Profil              | Mobile  | 98          | 100           | 100              | 100 |
| Profil              | Bureau  | 100         | 100           | 100              | 100 |
| Page 404            | Mobile  | 100         | 100           | 96               | 54  |
| Page 404            | Bureau  | 100         | 100           | 96               | 54  |

- Le faible score (54) du SEO sur la page 404 est attendu, s'agissant d'une page qui n'a pas vocation à être indexée sur un moteur de recherche, elle renvoie un statut 404. Le score des bonnes pratiques (96) s'explique par l'erreur 404 de la console, statut attendu de la page.
- Les scores de performances les moins élevés sont principalement impactés par le chargement des images.
- Le score des bonnes pratiques de la page de connexion (96) s'explique par le lien "Mot de passe oublié" qui pointe vers une page inexistante. Elle est en cours de réalisation.

## Utilisation de l'IA

L'interface IA utilisée est celle de Claude (Anthropic) via Claude Code.

Règles données à l'agent IA :

- Ne **JAMAIS** modifier le projet Kasa directement,
- Ne donner un bloc de code complet que sur sollicitation explicite (pistes et extraits de code),
- Expliquer chaque ligne de code proposée,
- Repérer les défauts d'accessibilité et erreurs TypeScript, ESLint, Prettier ou Vitest,
- Lister les tests unitaires utiles à ne pas oublier.

Utilisation générale :

- L'humain code d'abord, l'IA relit ensuite (lecture du code et vérification des erreurs en lecture seule),
- Vérification des pistes proposées et recentrage sur les attentes du projet,
- Choix fonctionnels laissés à l'appréciation humaine : gestion des redirections, ajout d'une page de profil, gestion des fonctionnalités selon les routes de l'API fournie (seule la messagerie précise que le back-end peut être modifié).
