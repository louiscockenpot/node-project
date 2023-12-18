// Importation des modules nécessaires
import express from 'express';

// Création d'une instance d'Express
const app = express();

// Configuration du port
const PORT = 3000;

// Définition d'une route de base
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Démarrage du serveur sur le port spécifié
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
