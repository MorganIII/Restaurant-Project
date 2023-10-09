# This a Restaurant project built with spring boot and MySql at the backend and angular at the frontend

The Restaurant Management System is a web-based application that facilitates the management of a restaurant's daily operations. 
This system provides a user-friendly interface for restaurant staff to handle tasks such as menu management and order processing. 

## Features

* Menu Management: Easily add, edit, and remove menu items, including their prices and descriptions.

* Order Processing: Efficiently manage customer orders, including order placement, modification, and tracking.

* Authentication: Secure access to the system with user authentication and authorization.


## Technologies Used

### Backend:

* Spring Boot: Java-based framework for building RESTful APIs.

* MySQL: Relational database for storing restaurant data.
* Spring Security: For authentication and authorization.
* Spring Data JPA: Simplifies database interactions.

### Frontend:
* Angular: Frontend framework for building a responsive and interactive user interface.

* Angular CLI: Command-line tool for Angular development.

* Angular Material: UI component library for a polished look and feel.

## Getting Started

### Prerequisites
* Java Development Kit (JDK)
* MySQL
* Node.js
* Angular CLI

### Installation
1. Clone the repository:
```
https://github.com/MorganIII/Restaurant-Project.git
cd Restaurant-Project
```
2. Configure the backend:

* Create a MySQL restaurant database and update the database configuration in `backend/src/main/resources/application.properties`.

* Run the backend application to build the schema for the restaurant database.

* Run the SQL queries that are in the `\backend\Restaurant-Project\src\main\resources` directory.

3. Configure the frontend:
* Navigate to the frontend directory and install dependencies:
```
cd frontend
npm install
```
4. Build the frontend:
* `ng build`

## Project Structure
The project is organized into two main directories:

* **Backend**: Contains the Spring Boot backend code.
* **frontend**: Contains the Angular frontend code.

## Backend
### Running the Backend
1. Navigate to the **backend** directory:
`cd backend`

2. Run the Spring Boot application:
`./mvnw spring-boot:run`

The backend should now be running at `http://localhost:8080`.

## Frontend
### Running the Frontend
1. Navigate to the **frontend** directory:
`cd frontend`

2. Start the Angular development server:
`ng serve`

The frontend should now be accessible at `http://localhost:4200`.


















