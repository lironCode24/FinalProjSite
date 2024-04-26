import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ isLoggedIn }) => {
    const handleLogout = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                console.error('Access token not found');
                return;
            }

            // Send a request to update the access token to null in the backend
            const response = await fetch('http://localhost:3001/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ accessToken }),
            });

            if (response.ok) {
                // Update the access token in the local storage
                localStorage.removeItem('accessToken');
                window.location.href = '/login'; // Navigate to the login page
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <div className="header">
            <Link to="/" className="header-link">Home</Link>
            <Link to="/about" className="header-link">About</Link>
            <Link to="/analysis" className="header-link">Analysis</Link>
            <Link to="/profile" className="header-link">Profile</Link>
            {isLoggedIn ? (
                <>
                    <button onClick={handleLogout} className="header-link">Logout</button>
                </>
            ) : (
                <Link to="/login" className="header-link">Login</Link>
            )}
        </div>
    );
};

export default Header;
