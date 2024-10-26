# Usa l'immagine base di Node.js
FROM node:16

# Imposta la directory di lavoro
WORKDIR /usr/src/app

# Copia il package.json e installa le dipendenze
COPY package*.json ./
RUN npm install

# Copia il resto dell'applicazione
COPY . .

# Espone la porta dell'applicazione
EXPOSE 3000

# Comando per avviare l'applicazione
CMD ["node", "app.js"]