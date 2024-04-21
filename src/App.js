import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './LoginPage.js';
import RegisterPage from './RegisterPage.js';
import AnalysisPage from './AnalysisPage.js';
import UserProfilePage from './UserProfilePage.js';

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

    return (
        <Router>
            <div className="container">
                <Routes>
                    {accessToken ? (
                        <>
                            <Route path="/analysis" element={<AnalysisPage />} />
                            <Route path="/profile" element={<UserProfilePage />} />
                            <Route path="/" element={<Navigate to="/analysis" />} />
                            <Route path="/login" element={<Navigate to="/analysis" />} />
                        </>
                    ) : (
                        <>
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/register" element={<RegisterPage />} />
                            <Route path="/" element={<Navigate to="/login" />} />
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
