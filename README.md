# MSS Command Center 0.9.1 Stable

**Transport • Distribution • Supply • Fleet**

Cette version repart de la V3.3 déjà lancée avec succès sur ton Mac.

## Correction principale

La version 0.9.0 utilisait les `npm workspaces`, ce qui créait l’erreur :

`EEXIST: file already exists, symlink ../frontend`

La version 0.9.1 ne contient aucun workspace npm. Le frontend et le backend sont installés séparément.

## Méthode simple sur Mac

1. Décompresse le ZIP.
2. Double-clique sur `00_INSTALL.command`.
3. Double-clique sur `01_START_FRONTEND.command`.
4. Double-clique sur `02_START_BACKEND.command`.
5. Ouvre `http://localhost:5173`.

Si macOS bloque un script :
- clic droit sur le fichier `.command`;
- choisir **Ouvrir**;
- confirmer **Ouvrir**.

## Méthode Terminal

Frontend :

```bash
cd ~/Downloads/MSS_Command_Center_0_9_1_Stable/frontend
npm install
npm run dev
```

Backend :

```bash
cd ~/Downloads/MSS_Command_Center_0_9_1_Stable/backend
npm install
npm install -D typescript@5.9.2
npm run start:dev
```

## Connexion

- Email : `admin@mssdrc.com`
- Mot de passe : `admin123`

## Adresses

- Application : `http://localhost:5173`
- API : `http://localhost:3000/api/health`

## Modules présents

- Dashboard
- CRM Clients
- Missions
- Flotte
- Chauffeurs
- Maintenance
- Carburant
- Notifications
- Données persistantes dans `backend/data/db.json`
