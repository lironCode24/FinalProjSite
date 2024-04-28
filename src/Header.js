import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

const Header = ({ isLoggedIn }) => {
    const [isAdmin, setIsAdmin] = useState(false);

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

    useEffect(() => {
        const fetchUserProfile = async () => {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                console.error('Access token not found');
                return;
            }

            try {
                // Fetch user profile data
                const response = await fetch(`http://localhost:3001/userProfile?accessToken=${accessToken}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });

                if (response.ok) {
                    const userData = await response.json();
                    if (userData && userData.roleId) {
                        // Fetch role data based on roleId
                        const roleResponse = await fetch(`http://localhost:3001/getRole?roleId=${userData.roleId}`, {
                            method: 'GET',
                            headers: { 'Content-Type': 'application/json' },
                        });

                        if (roleResponse.ok) {
                            const roleData = await roleResponse.json();
                            // Check if the role is 'Admin'
                            if (roleData.roleName === 'Admin') {
                                setIsAdmin(true);
                            }
                        } else {
                            console.error('Failed to fetch role data');
                        }
                    }
                } else {
                    console.error('Failed to fetch user profile data');
                }
            } catch (error) {
                console.error('Error fetching user profile or role data:', error);
            }
        };

        fetchUserProfile();
    }, []); // Run once on component mount

    return (
        <div className="header">
            <NavLink exact to="/" className="header-link" activeClassName="active-link">
                Home
            </NavLink>
            {isLoggedIn && isAdmin && (
                <NavLink exact to="/approveUsers" className="header-link" activeClassName="active-link">
                    Approve Users
                </NavLink>
            )}
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
