## Pokretanje

1. `docker-compose up --build -d`  
2. Otvori front-end: http://localhost:3000  
3. Back-end health: http://localhost:5001  
4. Baza: spoji se na localhost:5432 (pgAdmin ili psql)

## Struktura

- `client/` – React front-end  
- `server/` – Node.js + Express + Socket.IO back-end  
- `migrations/001_messages.sql` – SQL skripta za kreiranje tabele `messages`  
- `docker-compose.yml` – orkestracija servisa  
- `client/Dockerfile`, `server/Dockerfile` – Docker build konfiguracije  

