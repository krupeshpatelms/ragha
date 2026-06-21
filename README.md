# FoodieExpress

FoodieExpress is a full-stack food ordering and management application built with React and Spring Boot. Customers can browse food items and place orders, while owners can manage the menu, monitor orders, and view sales analytics.

## Features

### Customer

- Register and log in
- Browse available food items
- Search and filter food by category
- Add items to checkout and place orders
- View current and previous orders
- Check delivery details and estimated delivery time

### Owner

- Add and delete food items
- Manage customer orders
- Assign delivery information
- View total revenue and sales trends
- View top-selling and least-selling items
- View category-wise sales analytics

## Technology Stack

### Frontend

- **React**: Builds the user interface using reusable components.
- **Vite**: Provides a fast development server and frontend build process.
- **Axios**: Sends HTTP requests from the frontend to the backend APIs.
- **Framer Motion**: Adds animations and transitions.
- **Recharts**: Displays revenue, category, and sales charts.

### Backend

- **Java 17**: Programming language used to develop the backend.
- **Spring Boot 3.2.3**: Main framework used to build and run the backend application.
- **Spring Web**: Creates REST APIs and handles HTTP requests such as GET, POST, PUT, and DELETE.
- **Apache Tomcat**: Embedded web server included with Spring Boot.
- **Spring Data JPA**: Simplifies database operations through Java repository interfaces.
- **Hibernate**: Maps Java objects to relational database tables.
- **Maven**: Manages dependencies and builds the backend application using `pom.xml`.

### Database

- **SQLite**: Stores application data locally in the `foodieexpress.db` file.
- **SQLite JDBC Driver**: Connects the Java backend to SQLite.
- **Hibernate Community Dialects**: Adds SQLite SQL support for Hibernate.

### Testing

- **Spring Boot Starter Test**: Provides JUnit, Mockito, and Spring Test for unit and integration testing.

## Project Structure

```text
ragha/
|-- frontend/          # React frontend application
|-- backend/           # Spring Boot REST API
|   |-- src/
|   |-- pom.xml        # Maven configuration
|   `-- foodieexpress.db
`-- README.md
```

## Prerequisites

Install the following tools before running the project:

- Java Development Kit 17
- Maven 3.8 or later
- Node.js and npm
- Git

## Run the Project

### 1. Clone the repository

```bash
git clone https://github.com/krupeshpatelms/ragha.git
cd ragha
```

### 2. Start the backend

Open a terminal in the project folder and run:

```bash
cd backend
mvn spring-boot:run
```

The backend runs at:

```text
http://localhost:8081
```

On Windows, if the project contains Maven Wrapper files, you can use:

```powershell
.\mvnw.cmd spring-boot:run
```

### 3. Start the frontend

Open another terminal and run:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed by Vite, usually:

```text
http://localhost:5173
```

## API Overview

The React frontend communicates with the Spring Boot backend through REST APIs.

| Method | Purpose |
|---|---|
| `GET` | Retrieve food, orders, or dashboard data |
| `POST` | Create users, food items, or orders |
| `PUT` | Update existing records or delivery details |
| `DELETE` | Remove food items or other records |

## Database

SQLite does not require a separate database server. The application connects directly to the local database file using the configuration in `application.properties`.

Do not delete `foodieexpress.db` if it contains data you want to keep.

## Build the Backend

```bash
cd backend
mvn clean package
```

The generated JAR file will be available inside the `backend/target` directory.

## Build the Frontend

```bash
cd frontend
npm run build
```

The production frontend files will be generated inside the `frontend/dist` directory.

## Author

**Krupesh Patel M S**

- GitHub: [krupeshpatelms](https://github.com/krupeshpatelms)

## Repository

[https://github.com/krupeshpatelms/ragha](https://github.com/krupeshpatelms/ragha)
