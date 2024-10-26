// app.js
const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let libri = [
    {
        codice: uuidv4(),
        nome: 'Il Grande Gatsby',
        descrizione: 'Un romanzo di F. Scott Fitzgerald',
        quantita: 5,
        prezzo: 10.99,
        autore: 'F. Scott Fitzgerald'
    },
    {
        codice: uuidv4(),
        nome: 'Il Grande Paolo',
        descrizione: 'Un romanzo di Gino',
        quantita: 12,
        prezzo: 163,
        autore: 'F. Scott Fitzgerald'
    },
    {
        codice: uuidv4(),
        nome: 'Le Storie di Arnautovic',
        descrizione: 'S. Inzaghi',
        quantita: 10,
        prezzo: 104,
        autore: 'F. Scott Fitzgerald'
    },
    {
        codice: uuidv4(),
        nome: 'Gennarino e le storielle di Pulcinella',
        descrizione: 'Storia triste',
        quantita: 4,
        prezzo: 19.99,
        autore: 'Sebastiano'
    },
    {
        codice: uuidv4(),
        nome: '1984',
        descrizione: 'Un romanzo di George Orwell',
        quantita: 3,
        prezzo: 8.99,
        autore: 'George Orwell'
    },
    {
        codice: uuidv4(),
        nome: 'Fahrenheit 451',
        descrizione: 'Un romanzo di Ray Bradbury',
        quantita: 4,
        prezzo: 12.99,
        autore: 'Ray Bradbury'
    },
    {
        codice: uuidv4(),
        nome: 'Il Nome della Rosa',
        descrizione: 'Un romanzo di Umberto Eco',
        quantita: 1,
        prezzo: 15.99,
        autore: 'Umberto Eco'
    },
    {
        codice: uuidv4(),
        nome: 'Il Signore degli Anelli',
        descrizione: 'Un romanzo di J.R.R. Tolkien',
        quantita: 3,
        prezzo: 20.99,
        autore: 'J.R.R. Tolkien'
    },
    {
        codice: uuidv4(),
        nome: 'Orgoglio e Pregiudizio',
        descrizione: 'Un romanzo di Jane Austen',
        quantita: 2,
        prezzo: 9.99,
        autore: 'Jane Austen'
    },
    {
        codice: uuidv4(),
        nome: 'Moby Dick',
        descrizione: 'Un romanzo di Herman Melville',
        quantita: 0,
        prezzo: 11.50,
        autore: 'Herman Melville'
    },
    {
        codice: uuidv4(),
        nome: 'Il Processo',
        descrizione: 'Un romanzo di Franz Kafka',
        quantita: 6,
        prezzo: 14.99,
        autore: 'Franz Kafka'
    },
    {
        codice: uuidv4(),
        nome: 'Il ritratto di Dorian Gray',
        descrizione: 'Un romanzo di Oscar Wilde',
        quantita: 4,
        prezzo: 10.50,
        autore: 'Oscar Wilde'
    },
    {
        codice: uuidv4(),
        nome: 'Cecità',
        descrizione: 'Un romanzo di José Saramago',
        quantita: 2,
        prezzo: 13.99,
        autore: 'José Saramago'
    }
];


app.get('/api/libri', (req, res) => {
    res.json(libri);
});

app.get('/api/libri/:codice', (req, res) => {
    const libro = libri.find(l => l.codice === req.params.codice);
    libro ? res.json(libro) : res.status(404).json({ error: 'Libro non trovato' });
});


app.post('/api/libri', (req, res) => {
    const { nome, descrizione, quantita, prezzo, autore } = req.body;
    const nuovoLibro = { codice: uuidv4(), nome, descrizione, quantita, prezzo, autore };
    libri.push(nuovoLibro);
    res.status(201).json(nuovoLibro);
});


app.delete('/api/libri/:codice', (req, res) => {
    const index = libri.findIndex(l => l.codice === req.params.codice);
    if (index !== -1) {
        libri.splice(index, 1);
        res.status(204).end();
    } else {
        res.status(404).json({ error: 'Libro non trovato' });
    }
});


app.get('/api/libri/:codice/incrementa', (req, res) => {
    const libro = libri.find(l => l.codice === req.params.codice);
    if (libro) {
        libro.quantita += 1;
        res.json(libro);
    } else {
        res.status(404).json({ error: 'Libro non trovato' });
    }
});

// Endpoint per decrementare la quantità di un libro
app.get('/api/libri/:codice/decrementa', (req, res) => {
    const libro = libri.find(l => l.codice === req.params.codice);
    if (libro) {
        libro.quantita = Math.max(libro.quantita - 1, 0);
        res.json(libro);
    } else {
        res.status(404).json({ error: 'Libro non trovato' });
    }
});


const server = app.listen(PORT, () => {
    console.log(`Server avviato sulla porta ${PORT}`);
});


module.exports = { app, server };