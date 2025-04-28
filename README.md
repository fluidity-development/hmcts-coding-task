# DTS Developer Technical Test Completion
Completion of the HMCTS DTS Developer Technical Test coding task

# Technical Specifications
### Backend API
The backend API has been developed using Java, to be run with Spring Boot.

### Frontend
The frontend has been developed using Node.js and React.

### Database
The database for this solution is a PostgreSQL database.

# Installation and Deployment
### Backend API
To install and deploy the backend API, please copy the contents of /backend to your target directory.
Ensure a PostgreSQL database has been set up, and that the below environment variables are configured prior to running the backend application:
- POSTGRESQL_DATASOURCE_URL:
  - JDBC URL pointing to the PostgreSQL database.
- POSTGRESQL_DATASOURCE_UNAME:
  - The username of the PostgreSQL service user for the database.
- POSTGRESQL_DATASOURCE_PWORD:
  - The password of the PostgreSQL service user for the database.
- SERVER_PORT:
  - The server port for the backend to run on.
- CORS_ALLOWED_ORIGINS:
  - The CORS authorised address origin for the backend.
