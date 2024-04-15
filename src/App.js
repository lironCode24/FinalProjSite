import React, { useState } from 'react';
import LoginPage from './LoginPage'; // Import the LoginPage component
import RegisterPage from './RegisterPage'; // Import the RegisterPage component
import UserProfilePage from './UserProfilePage'; // Import the UserProfilePage component
import './App.css'; // Import CSS file for styling

const App = () => {
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [analysisResult, setAnalysisResult] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
    const [isRegistering, setIsRegistering] = useState(false); // State to track registration mode
    const [showProfilePage, setShowProfilePage] = useState(false); // State to track if profile page should be shown
    const [userData, setUserData] = useState(null); // State to store user data

    const handleLogin = (userData) => {
        setIsLoggedIn(true); // Set isLoggedIn to true when login is successful
        setUserData(userData); // Set user data
    };

    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };

    const handleSubmit = async () => {
        try {
            setIsLoading(true); // Set loading state to true while waiting for the response
            // Simulate processing for 1 second
            setTimeout(() => {
                setAnalysisResult('liron and gal'); // Set analysis result to 'liron and gal'
                setIsLoading(false); // Reset loading state after setting the result
            }, 1000);
        } catch (error) {
            console.error('Error analyzing text:', error);
            setIsLoading(false); // Reset loading state in case of error
        }
    };

    const getCurrentDateTime = () => {
        const now = new Date();
        const day = now.getDate().toString().padStart(2, '0');
        const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
        const year = now.getFullYear().toString().slice(-2); // Get last two digits of the year
        const hour = now.getHours().toString().padStart(2, '0'); // Get hours in 24-hour format
        const minute = now.getMinutes().toString().padStart(2, '0'); // Get minutes
        const second = now.getSeconds().toString().padStart(2, '0'); // Get seconds
        return `${day}-${month}-${year} ${hour}:${minute}:${second}`;
    };

    const handleToggleRegistration = () => {
        setIsRegistering(!isRegistering); // Toggle registration mode
    };

    const handleViewProfile = () => {
        // Show profile page
        setShowProfilePage(true);
        // Clear analysis result when navigating to profile page
        setAnalysisResult('');
    };

    const handleBackToLogin = () => {
        setShowProfilePage(false); // Hide profile page
    };

    return (
        <div className="container">
            {isLoggedIn ? (
                <>
                    <h1>NLP Analysis Tool</h1>
                    <button className="analyze-btn" onClick={handleViewProfile}>
                        View Profile
                    </button>
                    <textarea
                        className="text-area"
                        value={inputText}
                        onChange={handleInputChange}
                        placeholder="Enter text to analyze..."
                        rows={10}
                        cols={50}
                    />
                    <button className="analyze-btn" onClick={handleSubmit} disabled={isLoading}>
                        {isLoading ? 'Analyzing...' : 'Analyze'}
                    </button>
                    {analysisResult && (
                        <div className="result-container">
                            <p>{getCurrentDateTime()}</p>
                            <h2>Analysis Result</h2>
                            <p>{analysisResult}</p>
                        </div>
                    )}
                    {showProfilePage && (
                        <UserProfilePage userData={userData} onBackToLogin={handleBackToLogin} />
                    )}
                </>
            ) : (
                <>
                    {isRegistering ? (
                        <RegisterPage />
                    ) : (
                        <LoginPage onLogin={handleLogin} />
                    )}
                    <button className="analyze-btn" onClick={handleToggleRegistration}>
                        {isRegistering ? 'Back to Login' : 'Register'}
                    </button>
                </>
            )}
        </div>
    );
};

export default App;
