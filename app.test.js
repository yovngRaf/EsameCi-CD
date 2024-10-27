const request = require('supertest');
const { app, server } = require('./app');

beforeAll((done) => {
    
    done();
});

afterAll((done) => {
    server.close(() => {
        console.log("Server chiuso dopo i test");
        done();
    });
});

describe('Test degli endpoint dell\'API libri', () => {
    it('La GET /api/libri dovrebbe restituire tutti i libri', async () => {
        const response = await request(app).get('/api/libri');
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBeGreaterThan(0); 
    });

    it('La POST /api/libri dovrebbe aggiungere un nuovo libro', async () => {
        const nuovoLibro = {
            nome: 'Il Conte di Montecristo',
            descrizione: 'Un romanzo di Alexandre Dumas',
            quantita: 2,
            prezzo: 18.99,
            autore: 'Alexandre Dumas'
        };
        const response = await request(app).post('/api/libri').send(nuovoLibro);
        expect(response.statusCode).toBe(201);
        expect(response.body).toMatchObject(nuovoLibro);
    });

    it('La GET /api/libri/:codice dovrebbe restituire un libro specifico', async () => {
        const responsePost = await request(app).post('/api/libri').send({
            nome: 'Don Chisciotte',
            descrizione: 'Un romanzo di Miguel de Cervantes',
            quantita: 1,
            prezzo: 16.99,
            autore: 'Miguel de Cervantes'
        });
        const codice = responsePost.body.codice;

        const response = await request(app).get(`/api/libri/${codice}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject({
            nome: 'Don Chisciotte',
            descrizione: 'Un romanzo di Miguel de Cervantes',
            quantita: 1,
            prezzo: 16.99,
            autore: 'Miguel de Cervantes'
        });
    });

    it('La DELETE /api/libri/:codice dovrebbe eliminare un libro specifico', async () => {
        const responsePost = await request(app).post('/api/libri').send({
            nome: 'Il Nome della Rosa',
            descrizione: 'Un romanzo di Umberto Eco',
            quantita: 1,
            prezzo: 15.99,
            autore: 'Umberto Eco'
        });
        const codice = responsePost.body.codice;

        const deleteResponse = await request(app).delete(`/api/libri/${codice}`);
        expect(deleteResponse.statusCode).toBe(204);

        const getResponse = await request(app).get(`/api/libri/${codice}`);
        expect(getResponse.statusCode).toBe(404);
    });

    it('La GET /api/libri/:codice/incrementa dovrebbe incrementare la quantità del libro', async () => {
        const responsePost = await request(app).post('/api/libri').send({
            nome: 'Il Gattopardo',
            descrizione: 'Un romanzo di Giuseppe Tomasi di Lampedusa',
            quantita: 2,
            prezzo: 14.99,
            autore: 'Giuseppe Tomasi di Lampedusa'
        });
        const codice = responsePost.body.codice;

        const incrementResponse = await request(app).get(`/api/libri/${codice}/incrementa`);
        expect(incrementResponse.statusCode).toBe(200);
        expect(incrementResponse.body.quantita).toBe(3); 
    });

    it('La GET /api/libri/:codice/decrementa dovrebbe decrementare la quantità del libro', async () => {
        const responsePost = await request(app).post('/api/libri').send({
            nome: 'La Coscienza di Zeno',
            descrizione: 'Un romanzo di Italo Svevo',
            quantita: 2,
            prezzo: 11.99,
            autore: 'Italo Svevo'
        });
        const codice = responsePost.body.codice;

        const decrementResponse = await request(app).get(`/api/libri/${codice}/decrementa`);
        expect(decrementResponse.statusCode).toBe(200);
        expect(decrementResponse.body.quantita).toBe(1); 
    });
});