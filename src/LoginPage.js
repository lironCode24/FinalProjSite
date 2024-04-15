import React, { useState } from 'react';
import './LoginPage.css'; // Import CSS file for styling
import logo from './logo-haifa.jpg'; // Import the image file with the correct path

const LoginPage = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        // Validate username and password (you can add more robust validation)
        if (username === 'liron' && password === 'liron123') {
            onLogin(); // Call the onLogin function passed from the parent component
        } else {
            setError('Invalid username or password');
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
        </div>
    );
};

export default LoginPage;
