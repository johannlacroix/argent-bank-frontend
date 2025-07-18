# Argent Bank – Application React + Redux

Projet Front-End d’une application bancaire pour OpenClassrooms, développé avec **React**, **Redux** et **Vite**.

L'application permet aux utilisateurs de :
- Se connecter via une authentification sécurisée (JWT)
- Accéder à leur profil utilisateur (`/user`)
- Visualiser leurs comptes bancaires
- Consulter les transactions du mois en cours par compte
- Modifier leur nom d’utilisateur
- Afficher les détails d’une transaction
- Modifier ou supprimer les informations d’une transaction (note / catégorie)

---

## Technologies

- React + Vite
- Redux Toolkit
- React Router DOM
- Swagger pour la documentation d’API
- CSS personnalisé selon la maquette Figma

---

## Installation

1. Clonez ce dépôt :
https://github.com/johannlacroix/argent-bank-frontend.git

2. Installez les dépendances :

3. Démarrez l’application :

> Assurez-vous que le backend (fournit par OpenClassrooms ou simulé via une API mock) est bien lancé et accessible à `http://localhost:3001/api/v1`.

---

## Authentification

Le login nécessite un email et un mot de passe valide. Un token JWT est utilisé pour accéder aux routes protégées (profil, transactions, etc.).

---

## Documentation API – Transactions

La documentation Swagger (OpenAPI 3.0) des routes pour la gestion des transactions se trouve ici :  
=> [documentation/transactions.yaml](./documentation/transactions.yaml)

Elle couvre :
- La récupération des transactions mensuelles par compte
- Le détail d’une transaction
- La modification des champs `note` ou `category`
- La suppression de ces champs (mais pas de la transaction)

---

## Auteur

**Johann Lacroix**  
Projet 10 – Développeur Front-End React – OpenClassrooms

---

## Statut du projet

- [x] Authentification fonctionnelle
- [x] Navigation privée sécurisée
- [x] Affichage dynamique des comptes
- [x] Transactions et détails accessibles
- [x] Accordéon interactif
- [x] Interface respectant la maquette

---


## Conseils pour la soutenance

Prépare-toi à :
- Justifier la structure des endpoints Swagger
- Expliquer pourquoi certaines opérations (comme `DELETE /transactions`) ne sont pas implémentées
- Montrer comment fonctionne la protection des routes et le stockage du token

