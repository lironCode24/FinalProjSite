import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './LoginPage.js';
import RegisterPage from './RegisterPage.js';
import AnalysisPage from './AnalysisPage.js';
import UserProfilePage from './UserProfilePage.js';
import ApprovePage from './ApprovePage.js';
import AboutPage from './AboutPage.js';
import Header from './Header';  // Import the Header component
import HomePage from './HomePage.js';  // Import the HomePage component

import './App.css';

const App = () => {
    // State to manage the access token and admin status
    const [accessToken, setAccessToken] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        // Check if access token exists in localStorage
        const storedToken = localStorage.getItem('accessToken');
        if (storedToken) {
            setAccessToken(storedToken);
            // Fetch user profile to determine admin status
            fetchUserProfile(storedToken);
        }
    }, []);

    const fetchUserProfile = async (token) => {
        try {
            const response = await fetch(`http://localhost:3001/userProfile?accessToken=${token}`, {
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

    const isLoggedIn = !!accessToken;  // Convert accessToken to a boolean to indicate logged in status

    return (
        <Router>
            <Header isLoggedIn={isLoggedIn} isAdmin={isAdmin} />
            <div className="container">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    {isAdmin ? (
                        <Route path="/approveUsers" element={<ApprovePage />} />
                    ): (
                            <Route path="/approveUsers" element={<Navigate to="/analysis" />} />

                    )}
                    {accessToken ? (
                        <>
                            <Route path="/analysis" element={<AnalysisPage />} />
                            <Route path="/profile" element={<UserProfilePage />} />
                            <Route path="/about" element={<AboutPage />} />  {/* Accessible whether logged in or not */}
                            <Route path="/login" element={<Navigate to="/analysis" />} />
                        </>
                    ) : (
                        <>
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/register" element={<RegisterPage />} />
                            <Route path="/about" element={<AboutPage />} />  {/* Accessible whether logged in or not */}
                            <Route path="/analysis" element={<Navigate to="/login" />} />
                            <Route path="/profile" element={<Navigate to="/login" />} />
                        </>
                    )}
                </Routes>
            </div>
        </Router>
    );
};

export default App;
