import React from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink instead of Link
import './Header.css';

const Header = ({ isLoggedIn }) => {
    const handleLogout = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                console.error('Access token not found');
                return;
            }

            const response = await fetch('http://localhost:3001/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ accessToken }),
            });

            if (response.ok) {
                localStorage.removeItem('accessToken');
                window.location.href = '/login';
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <div className="header">
            <NavLink exact to="/" className="header-link" activeClassName="active-link">
                Home
            </NavLink>
            {isLoggedIn ? (
                <>
                    <NavLink to="/analysis" className="header-link" activeClassName="active-link">
                        Analysis
                    </NavLink>
                    <NavLink to="/profile" className="header-link" activeClassName="active-link">
                        Profile
                    </NavLink>
                    <button onClick={handleLogout} className="header-link">Logout</button>
                </>
            ) : (
                <NavLink to="/login" className="header-link" activeClassName="active-link">
                    Login
                </NavLink>
            )}
            <NavLink to="/about" className="header-link" activeClassName="active-link">
                About
            </NavLink>
        </div>
    );
};

export default Header;
