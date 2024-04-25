const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();
const port = 3001;

const merchant_model = require('./merchantModel');

app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// POST endpoint to authenticate user
app.post('/login', async (req, res) => {
    try {
        // Extract username and password from the request body
        const { username, password } = req.body;

        // Call the loginUser function from the merchant_model module
        await merchant_model.loginUser(username, password, res);
    } catch (error) {
        console.error('Error authenticating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Route for fetching predictions
app.get('/', (req, res) => {
    merchant_model.getPredictions()
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        });
});

// Route for fetching users by username
app.get('/users/username', async (req, res) => {
    try {
        const { username } = req.query;
        const users = await merchant_model.getUsersByUsername(username);
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users by username:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route for fetching users by email
app.get('/users/email', async (req, res) => {
    try {
        const { email } = req.query;
        const users = await merchant_model.getUsersByEmail(email);
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users by email:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route for creating a new user
app.post('/createUser', (req, res) => {
    merchant_model.createUser(req.body)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            console.log(error);
            res.status(500).send(error);
        });
});

// Route for fetching user profile
app.get('/userProfile', async (req, res) => {
    try {
        const accessToken = req.query.accessToken;
        await merchant_model.getUserProfile(accessToken, res);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route for user logout
app.post('/logout', async (req, res) => {
    try {
        const { accessToken } = req.body;
        await merchant_model.deleteUserToken(accessToken, res);

    } catch (error) {
        console.error('Error during logout:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route for inserting text data into TextData table
app.post('/insertTextData', async (req, res) => {
    try {
        const { text } = req.body;
        const textID = await merchant_model.insertTextData(text);
        res.status(200).json({ textID });
    } catch (error) {
        console.error('Error inserting text data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route for inserting prediction data into Predictions table
app.post('/insertPredictionData', async (req, res) => {
    try {
        const { textID, predictionResult } = req.body;
        await merchant_model.insertPredictionData(textID, predictionResult);
        res.status(200).send('Prediction data inserted successfully');
    } catch (error) {
        console.error('Error inserting prediction data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});
