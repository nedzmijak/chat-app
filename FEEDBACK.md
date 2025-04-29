# Povratne informacije

## Susretnuti izazovi
1. **Razdvajanje globalnog i privatnog kanala**  
   Bilo je potrebno omogućiti slanje poruka u globalni kanal i zasebne privatne razgovore, bez osvježavanja stranice i bez miješanja tokova poruka.

2. **Očuvanje historije poruka**  
   Novi i postojeći korisnici trebaju vidjeti prethodne poruke iz globalnog i privatnog chata.

## Primijenjena rješenja
1. **Emitovanje događaja **  
   - Globalni kanal: `io.emit('receive_message', …)` šalje poruku svima.  
   - Privatni kanal: inicijatoru se šalje `socket.emit('user_joined_private', …)`, a ciljanom korisniku `io.to(targetSocketId).emit('user_joined_private', …)`.

2. **Učitavanje historije**  
   Klijent pri spajanju emituje `load_history`. Server izvršava `SELECT * FROM messages WHERE recipient IS NULL` (globalne poruke) ili odgovarajući WHERE za privatne, i vraća niz poruka jednom klijentu.

3. **Automatsko izvršavanje SQL migracija u Dockeru**  
   SQL fajl `migrations/001_messages.sql` montiran je na `/docker-entrypoint-initdb.d`, pa PostgreSQL kontejner pri prvom startu kreira tabelu `messages`.

## Stečeno znanje
- Kako emitovati različite Socket.IO evente za globalni i privatni chat  
- Mehanizam „load_history“ za inicijalno punjenje chat-prostorija  
- Korištenje Docker Compose volumena i `/docker-entrypoint-initdb.d` za migracije  
 
