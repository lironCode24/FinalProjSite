import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AnalysisPage.css';
import logo from './logo-haifa.jpg'; // Import the image file with the correct path

const AnalysisPage = () => {
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [analysisResult, setAnalysisResult] = useState('');

    const handleInputChange = (event) => {
        setInputText(event.target.value);
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

    const createText = (text, maxLength) => {
        let word = ' blah';
        for (var i = 0; i < maxLength; i++) {
            text += word;
        }
        return text;
    };

    const handleSubmit = async () => {
        try {
            setIsLoading(true); // Set loading state to true while waiting for the response
            // Simulate processing for 1 second
            setTimeout(() => {
                setAnalysisResult(createText('Your result is ', 50)); // Set analysis result to truncated text
                setIsLoading(false); // Reset loading state after setting the result
            }, 1000);
        } catch (error) {
            console.error('Error analyzing text:', error);
            setIsLoading(false); // Reset loading state in case of error
        }
    };

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
        <div className="main-container"> {/* Changed class name to main-container */}
            <div className="logo-container">
                <img src={logo} alt="Logo" className="logo" />
            </div>
            <Link to="/profile" className="profile-link">View Profile</Link>
            <h1>NLP Analysis Tool</h1>
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
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default AnalysisPage;
