const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());

let libri = [];

// GET: Restituisce tutti i libri
app.get('/api/libri', (req, res) => {
    res.json(libri);
});

// GET: Restituisce singolo libro
app.get('/api/libri/:codice', (req, res) => {
    const libro = libri.find(l => l.codice === req.params.codice);
    res.json(libro || {});
});

// POST: Inserisce un libro
app.post('/api/libri', (req, res) => {
    const { nome, descrizione, quantita, prezzo, autore } = req.body;
    const nuovoLibro = { codice: uuidv4(), nome, descrizione, quantita, prezzo, autore };
    libri.push(nuovoLibro);
    res.status(201).json(nuovoLibro);
});

// DELETE: Elimina singolo libro
app.delete('/api/libri/:codice', (req, res) => {
    libri = libri.filter(l => l.codice !== req.params.codice);
    res.status(204).send();
});

// GET: Incrementa la quantità di un libro
app.get('/api/libri/:codice/incrementa', (req, res) => {
    const libro = libri.find(l => l.codice === req.params.codice);
    if (libro) {
        libro.quantita += 1;
        res.json(libro);
    } else {
        res.status(404).send();
    }
});

// GET: Decrementa la quantità di un libro
app.get('/api/libri/:codice/decrementa', (req, res) => {
    const libro = libri.find(l => l.codice === req.params.codice);
    if (libro && libro.quantita > 0) {
        libro.quantita -= 1;
        res.json(libro);
    } else {
        res.status(404).send();
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server in ascolto sulla porta ${PORT}`);
});