# Sexual Harassment Support Center Sentiment Analysis
## Project Overview
This project aims to harness the power of Natural Language Processing (NLP) to improve support services for survivors of violence against women and girls. By analyzing sentiment in text conversations from sexual harassment support centers, we develop a model to classify these interactions as urgent or non-urgent. This classification aids in prioritizing responses and tailoring support to the survivors' immediate needs.

## Database Setup

We use PostgreSQL as our database. In the DB folder of our GitHub repository, you will find two SQL files:

1. create.sql:
    This file contains the SQL commands to create the necessary database tables.
3. insert.sql:
    This file contains the SQL commands to insert initial data into the database tables.

Steps to Setup the Database:

1. Install PostgreSQL on your machine if it is not already installed.
2. Create a new database in PostgreSQL.
3. Execute the commands in create.sql to create the database schema.
4. Execute the commands in insert.sql to populate the database with initial data.


## Available Scripts

In the project directory, you can run:
### `npm start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
The page will reload when you make changes.\
You may also see any lint errors in the console.
### `node index`
Runs the backend - run this command with cmd inside the backend folder in project

### Running the NLP Model API
To run the NLP model API, navigate to the backend/model folder in your project directory and run the following command:
python main.py
This command starts the Flask server that hosts the NLP model API. The API handles incoming text data, preprocesses it, performs sentiment analysis using the trained model, and returns the predicted classification.


## Authors
The project was done by Liron Golan and Gal Druker.
