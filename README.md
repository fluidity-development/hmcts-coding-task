# Task Management System

A full-stack application for managing tasks with a Spring Boot backend and React frontend.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Configuration](#configuration)
  - [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
  - [Endpoints](#endpoints)
- [Usage](#usage)
- [Development](#development)
- [License](#license)

## Overview

This Task Management System allows users to create, view, update, and delete tasks. Each task has a title, optional description, status, and due date/time.

## Features

- Create and manage tasks
- Track task status (Pending, In Progress, Completed)
- Set due dates for tasks
- Responsive user interface
- RESTful API for task operations

## Technology Stack

### Backend
- Java 11
- Spring Boot 2.7
- Spring Data JPA
- PostgreSQL
- Gradle

### Frontend
- React
- Material-UI
- Axios

## Installation

### Prerequisites

- Java 11 or higher
- Node.js 14 or higher
- PostgreSQL 10 or higher
- Gradle

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/task-management.git
   cd task-management
   ```

2. Create a PostgreSQL database:
   ```sql
   CREATE DATABASE taskdb;
   ```

3. Configure environment variables (see [Configuration](#configuration) section)

4. Build and run the backend:
   ```bash
   cd backend
   ./gradlew bootRun
   ```
   
   The backend server will start on http://localhost:8080

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root of the frontend directory:
   ```
   REACT_APP_API_URL=http://localhost:8080/api
   ```

4. Start the frontend development server:
   ```bash
   npm start
   ```

   The frontend will be available at http://localhost:3000

## Configuration

### Environment Variables

The application uses environment variables for configuration. Set these before running the backend:

#### Backend Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| SPRING_DATASOURCE_URL | PostgreSQL database URL | jdbc:postgresql://localhost:5432/taskdb |
| SPRING_DATASOURCE_USERNAME | Database username | postgres |
| SPRING_DATASOURCE_PASSWORD | Database password | password |
| SERVER_PORT | Port for backend server | 8080 |
| SPRING_JPA_HIBERNATE_DDL_AUTO | Database schema strategy | update |
| CORS_ALLOWED_ORIGINS | CORS allowed origins | http://localhost:3000 |

#### Example for setting environment variables

**Linux/macOS:**
```bash
export SPRING_DATASOURCE_PASSWORD=your_secure_password
```

**Windows:**
```cmd
set SPRING_DATASOURCE_PASSWORD=your_secure_password
```

## API Documentation

### Endpoints

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|-------------|----------|
| GET | `/api/tasks` | Get all tasks | - | Array of Task objects |
| GET | `/api/tasks/{id}` | Get task by ID | - | Task object |
| POST | `/api/tasks` | Create a new task | Task object | Created Task object |
| PUT | `/api/tasks/{id}` | Update a task | Task object | Updated Task object |
| PATCH | `/api/tasks/{id}/status` | Update task status | String (status) | Updated Task object |
| DELETE | `/api/tasks/{id}` | Delete a task | - | HTTP 204 No Content |

#### Task Object Structure

```json
{
  "id": 1,
  "title": "Complete project documentation",
  "description": "Write README and API docs",
  "status": "IN_PROGRESS",
  "dueDateTime": "2023-12-31T23:59:59",
  "createdDate": "2023-11-15T10:30:00"
}
```

## Usage

1. Open your browser and navigate to http://localhost:3000
2. Use the form at the top to create new tasks
3. View your tasks in the list below
4. Change task status using the status buttons
5. Edit or delete tasks using the respective buttons

## Development

### Running Tests

**Backend:**
```bash
./gradlew test
```

**Frontend:**
```bash
npm test
```

### Building for Production

**Backend:**
```bash
./gradlew build
```

**Frontend:**
```bash
npm run build
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
