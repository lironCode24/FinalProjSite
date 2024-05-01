import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link component
import './LoginPage.css'; // Import CSS file for styling
import logo from './images/logo-haifa.jpg'; // Import the image file with the correct path

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            // Send a request to your backend server to authenticate the user
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                // User authenticated successfully
                const data = await response.json();
                const accessToken = data.accessToken;
                localStorage.setItem('accessToken', accessToken); // Store the access token in local storage

                window.location.href = '/analysis'; // Navigate to the analysis page
            } else {
                // Handle different error cases based on status code
                const errorData = await response.json(); // Parse error message from response
                setError(errorData.error);
            }
        } catch (error) {
            console.error('Error during login:', error);
            setError('Failed to login. Please try again later.');
        }
    };

    return (
        <div className="login-container">
            <div className="logo-container">
                <img src={logo} alt="Logo" className="logo" />
            </div>
            <h2>Login</h2>
            {error && <p className="error-message">{error}</p>}
            <div className="input-container">
                <input
                    className="input-field"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    className="input-field"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button className="login-btn" onClick={handleLogin}>Login</button>
            {/* Add Link component for register button */}
            <Link to="/register" className="register-link">Sign up</Link>
        </div>
    );
};

export default LoginPage;
