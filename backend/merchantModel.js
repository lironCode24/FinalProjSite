const bcrypt = require('bcrypt');
const Pool = require('pg').Pool;
const { randomBytes } = require('crypto');


const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'TextAnalysisDB',
    password: 'd12lg1rd',
    port: 5432,
});

// Function to encrypt the password
const encryptPassword = async (password) => {
    try {
        // Generate a salt
        const salt = await bcrypt.genSalt(10);
        // Hash the password with the salt
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        console.error('Error encrypting password:', error);
        throw new Error('Error encrypting password');
    }
};

// Function to compare passwords
const comparePassword = async (password, hashedPassword) => {
    try {
        return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
        console.error('Error comparing passwords:', error);
        throw new Error('Error comparing passwords');
    }
};

//get all predictions from the database
const getPredictions = async () => {
    try {
        return await new Promise(function (resolve, reject) {
            pool.query("SELECT * FROM predictions", (error, results) => {
                if (error) {
                    reject(error);
                }
                if (results && results.rows) {
                    resolve(results.rows);
                } else {
                    reject(new Error("No results found"));
                }
            });
        });
    } catch (error_1) {
        console.error(error_1);
        throw new Error("Internal server error");
    }
};

const getUsersByEmail = async (email) => {
    try {
        // Define the query to select users by email
        const query = 'SELECT * FROM users WHERE email = $1';

        // Execute the query with the provided email parameter
        const result = await pool.query(query, [email]);

        // Return the result rows
        return result.rows;
    } catch (error) {
        console.error('Error getting users by email:', error);
        throw new Error('Error getting users by email');
    }
};

const getUsersByUsername = async (username) => {
    try {
        // Define the query to select users by username
        const query = 'SELECT * FROM users WHERE username = $1';

        // Execute the query with the provided username parameter
        const result = await pool.query(query, [username]);

        // Return the result rows
        return result.rows;
    } catch (error) {
        console.error('Error getting users by username:', error);
        throw new Error('Error getting users by username');
    }
};


//create a new user record in the database
const createUser = async (body) => {
    try {
        const { username, fullname, email, role, password } = body;

        // Generate a random userid between 1 and 9999
        const userid = Math.floor(Math.random() * 9999) + 1;

        // Encrypt the password before storing it in the database
        const passwordHash = await encryptPassword(password);

        // Insert the new user into the database
        const result = await pool.query(
            "INSERT INTO public.users(userid, username, fullname, email, role, passwordhash) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
            [userid, username, fullname, email, role, passwordHash]
        );

        return `A new user has been added: ${JSON.stringify(result.rows[0])}`;
    } catch (error) {
        console.error(error);
        throw new Error("Error creating user");
    }
};


// Function to generate a random access token
const generateAccessToken = () => {
    // Generate a random buffer of 32 bytes
    const buffer = randomBytes(32);
    // Convert the buffer to a hexadecimal string
    const accessToken = buffer.toString('hex');
    return accessToken;
};

const loginUser = async (username, password, res) => {
    try {
        // Query the database to fetch the user's hashed password
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        const user = result.rows[0];

        // Check if the user exists
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await comparePassword(password, user.passwordhash);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // If the credentials are valid, generate a new access token
        const accessToken = generateAccessToken(user);

        // Update the access token in the database
        await pool.query('UPDATE users SET access_token = $1 WHERE userid = $2', [accessToken, user.userid]);

        // Return the user's information along with the access token
        res.json({
            id: user.userid,
            username: user.username,
            accessToken: accessToken
        });
    } catch (error) {
        console.error('Error authenticating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteUserToken = async (accessToken, res) => {
    try {

        // Update the access token in the database to an empty string
        await pool.query('UPDATE users SET access_token = $1 WHERE access_token = $2', ["", accessToken]);

        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error('Error during logout:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const getUserProfile = async (accessToken, res) => {
    try {
        // Query the database to fetch the user's profile based on the access token
        const result = await pool.query('SELECT * FROM users WHERE access_token = $1', [accessToken]);
        const userProfile = result.rows[0];

        // Check if the user profile exists
        if (!userProfile) {
            return res.status(404).json({ error: 'User profile not found' });
        }

        // Return the user profile data
        res.json({
            username: userProfile.username,
            fullname: userProfile.fullname,
            email: userProfile.email,
            role: userProfile.role
        });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports = {
    getPredictions,
    createUser,
    loginUser,
    getUsersByUsername,
    getUsersByEmail,
    getUserProfile,
    deleteUserToken
};

