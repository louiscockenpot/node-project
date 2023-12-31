# Project Build Guide

This guide provides instructions for building and setting up the project, which consists of a Node.js backend and an Angular frontend.

## Prerequisites

Make sure you have the following software installed on your machine:

- Node.js: [Download and Install Node.js](https://nodejs.org/)
- npm (Node Package Manager): This is included with Node.js installation.
- Angular CLI: Install globally using `npm install -g @angular/cli`

## Backend Setup

1. Navigate to the `backend` directory:

    ```bash
    cd backend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the Node.js server:

    ```bash
    npx tsc && node out/app.js
    ```

    The server will be running at `http://localhost:3000`.

## Frontend Setup

1. Navigate to the `frontend` directory:

    ```bash
    cd frontend
    ```

2. Install Angular dependencies:

    ```bash
    npm install
    ```

3. Start the Angular development server:

    ```bash
    npm start
    ```

    The frontend will be accessible at `http://localhost:4200`.

4. Open your web browser and go to `http://localhost:4200` to view the Angular application.

That's it! You have successfully set up and built the Node.js backend with Angular frontend project.
