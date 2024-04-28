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
    // State to manage the access token
    const [accessToken, setAccessToken] = useState(null);

    useEffect(() => {
        // Check if access token exists in localStorage
        const storedToken = localStorage.getItem('accessToken');
        if (storedToken) {
            setAccessToken(storedToken);
        }
    }, []);
    const isLoggedIn = !!accessToken;  // Convert accessToken to a boolean to indicate logged in status

    return (
        <Router>
            <Header isLoggedIn={isLoggedIn} />
            <div className="container">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/approveUsers" element={<ApprovePage />} />
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
