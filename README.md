# Movie-tracker

## Overview
Movie Picks is a web application designed for movie enthusiasts, allowing users to search for movies they have watched and add them to their personal profiles.

## Features

* Search and Add Movies: Users can search for movies and add them to their personal collection.
* User Profiles: Each user has a profile that stores their selected movies.
* User Authentication: Secure login and registration functionality are implemented.
* Dynamic Web Pages: Built using EJS for generating dynamic content.

## Tech stack

* Backend: Express.js - A web application framework for Node.js.
* Frontend: JavaScript with EJS for dynamic templating.
* Database: SQL for handling movie data and user information.
* Deployment: The app is deployed using Render.

## Installation
To run this application locally, follow these steps:
1. Clone the repository:
```bash
git clone https://github.com/henrfos/movie-tracker
```
2. Navigate to the project directory:
```bash
cd movie-picks
```
3. Install dependencies:
```bash
npm install
```
4. Set up your SQL database and configure the connection in the .env file with the following fields:
```bash
ADMIN_USERNAME = your-database-username
ADMIN_PASSWORD = your-database-password
DATABASE_NAME = your-database-name
DIALECT = "mysql"
DIALECTMODEL = "mysql2"
PORT = "3000"
HOST = your-database-host

API = your-API-key from https://www.omdbapi.com/apikey.aspx
```



Happy movie browsing!
