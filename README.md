# The-Pickle-Jar 🥒🫙🏓 

The Pickle Jar: Serving up brackets, ladders, partners, and courts ... just add paddles.

---

## Local Setup / Running the App


### Clone the Repository
```bash
git clone https://github.com/your-username/The-Pickle-Jar.git
cd The-Pickle-Jar/picklejar
```

### Build the Project
### 1. Build and Run the Containers
Run all services (frontend, backend, database) with one command:

```bash
docker-compose up --build
```

This will:
- Start PostgreSQL at port 5432
- Start the Spring Boot backend at port 8080
- Start the React frontend at port 3000

2. Access the App

Once everything builds successfully:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8080/api/players
- Database: localhost:5432 (credentials are in your docker-compose.yml or .env)

3. Stopping the App

Press Ctrl + C to stop containers, or:
```bash
docker-compose down
```

To remove volumes and wipe the database:
```bash
docker-compose down -v
```

4. Rebuilding After Code Changes

If you update code, rebuild the containers:
```bash
docker-compose up --build
```


## Core Features to Build

- **Bracket Maker** – Generate and manage tournament brackets (single, double elimination, round robin).  
- **Ladder System** – Track player rankings using Elo-based scoring and match history.  
- **Teammate Matching** – Smart recommendations to pair players based on skill, style, or availability.  
- **Random Team Name Generator** – AI-powered fun team names with a pickleball twist.  
- **Court Finder** – Locate nearby pickleball courts with map integration and community submissions.  
- **Player Management** – Create and manage player profiles, stats, and rankings.  
- **Match Recording** – Record scores, determine winners, and automatically update standings.  
- **Optional Seeded Brackets** – Allow tournaments to be seeded or randomized based on player ranking.  


