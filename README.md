# Revolus

Revolus is a platform designed to facilitate communication between doctors and biologists for malady diagnosis and bioinformatics treatments.

## Technologies Used

- **Frontend**: Next.js (TypeScript, Tailwind)
- **Backend**: Django
- **Database**: PostgreSQL
- **Containerization**: Docker Compose
- **Build Automation**: Makefile

## Getting Started

To run the project locally, make sure you have Docker and Docker Compose installed.

1. Clone the repository:

```bash
git clone https://github.com/Mealiclay01/REVOLUS.git
cd revolus
```

2. Run the following command to start the application:

```bash
make
```

This command will build and start the containers, and you can access the frontend from port 80.

## Notes
 
- **.env**: MODE=dev to start project as development or MODE=deploy to build and deploy the project, see `.env.example`

- **Database**: in `dev` used in backend/db.sqlite3, in `deploy` project use PostgreSQL container, for start pgAdmin `make debug` or stop `make clean_debug`

