const request = require('supertest');
const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = require('../app'); // Assicurati che app.js esporti l'istanza dell'app

describe('API di gestione libri', () => {
    let codiceLibro;

    beforeEach(async () => {
        // Resetta l'array libri prima di ogni test
        await request(app).delete(`/api/libri/${codiceLibro}`);
    });

    it('GET /api/libri - Restituisce tutti i libri', async () => {
        const response = await request(app).get('/api/libri');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('POST /api/libri - Inserisce un libro', async () => {
        const libro = {
            nome: 'Il Signore degli Anelli',
            descrizione: 'Un romanzo di fantasia',
            quantita: 5,
            prezzo: 29.99,
            autore: 'J.R.R. Tolkien'
        };

        const response = await request(app)
            .post('/api/libri')
            .send(libro);

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('codice');
        expect(response.body.nome).toBe(libro.nome);
        codiceLibro = response.body.codice; // Salva il codice per i test successivi
    });

    it('GET /api/libri/:codice - Restituisce un libro specifico', async () => {
        const response = await request(app).get(`/api/libri/${codiceLibro}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('codice', codiceLibro);
    });

    it('DELETE /api/libri/:codice - Elimina un libro', async () => {
        await request(app).post('/api/libri').send({
            nome: '1984',
            descrizione: 'Un romanzo distopico',
            quantita: 3,
            prezzo: 15.99,
            autore: 'George Orwell'
        });

        const responseDelete = await request(app).delete(`/api/libri/${codiceLibro}`);
        expect(responseDelete.statusCode).toBe(204);

        const checkResponse = await request(app).get(`/api/libri/${codiceLibro}`);
        expect(checkResponse.statusCode).toBe(200);
        expect(checkResponse.body).toEqual({});
    });

    it('GET /api/libri/:codice/incrementa - Incrementa la quantità di un libro', async () => {
        await request(app).post('/api/libri').send({
            nome: '1984',
            descrizione: 'Un romanzo distopico',
            quantita: 3,
            prezzo: 15.99,
            autore: 'George Orwell'
        });

        const responseBefore = await request(app).get(`/api/libri/${codiceLibro}`);
        const quantitaPrima = responseBefore.body.quantita;

        const responseIncrementa = await request(app).get(`/api/libri/${codiceLibro}/incrementa`);
        
        expect(responseIncrementa.statusCode).toBe(200);
        expect(responseIncrementa.body.quantita).toBe(quantitaPrima + 1);
    });

    it('GET /api/libri/:codice/decrementa - Decrementa la quantità di un libro', async () => {
        await request(app).post('/api/libri').send({
            nome: '1984',
            descrizione: 'Un romanzo distopico',
            quantita: 3,
            prezzo: 15.99,
            autore: 'George Orwell'
        });

        const responseBefore = await request(app).get(`/api/libri/${codiceLibro}`);
        const quantitaPrima = responseBefore.body.quantita;

        const responseDecrementa = await request(app).get(`/api/libri/${codiceLibro}/decrementa`);
        
        expect(responseDecrementa.statusCode).toBe(200);
        expect(responseDecrementa.body.quantita).toBe(quantitaPrima - 1);
    });
});