import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AnalysisPage.css';

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

    const handleSubmit = async () => {
        try {
            setIsLoading(true); // Set loading state to true while waiting for the response
            // Simulate processing for 1 second
            setTimeout(() => {
                setAnalysisResult('Your result is blah blah'); // Set analysis result to 'Your result is blah blah'
                setIsLoading(false); // Reset loading state after setting the result
            }, 1000);
        } catch (error) {
            console.error('Error analyzing text:', error);
            setIsLoading(false); // Reset loading state in case of error
        }
    };

    return (
        <div className="analysis-container">
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
            <Link to="/profile" className="profile-link">View Profile</Link>
        </div>
    );
};

export default AnalysisPage;
