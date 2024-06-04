import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AnalysisPage.css';
import logo from './images/logo-haifa.jpg'; // Import the image file with the correct path

const AnalysisPage = () => {
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [analysisResult, setAnalysisResult] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

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

            setAnalysisResult("");
            // Check if input text is empty
            if (inputText.trim() === '') {
                setErrorMessage('Input text cannot be empty');
                return;
            }
            else if (inputText.trim().length < 20) {
                setErrorMessage('Enter full conversation');
                return;
            } else {
                setErrorMessage('');
            }

            setIsLoading(true);

            const response = await fetch('http://127.0.0.1:5000/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: inputText }),
            });

            if (response.ok) {
                const result = await response.json();
                setAnalysisResult(result.prediction);

                // Insert the analyzed text into the TextData table
                const textID = await insertTextData(inputText);

                // Insert prediction data into the Predictions table
                await insertPredictionData(textID, result.prediction);

            } else {

                setErrorMessage('Failed to analyze text. Please try again later');
                console.error('Failed to analyze text');
            }

            setIsLoading(false);
        } catch (error) {
            setErrorMessage('Failed to analyze text. Please try again later');
            console.error('Error analyzing text:', error);
            setIsLoading(false);
        }
    };


    const insertTextData = async (text) => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            console.error('Access token not found');
            return;
        }
        try {
            const response = await fetch('http://localhost:3001/insertTextData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text, accessToken }),
            });

            if (!response.ok) {
                console.error('Failed to insert text data');
                return null;
            }

            const data = await response.json();
            return data.textID; // Return the inserted TextID
        } catch (error) {
            console.error('Error inserting text data:', error);
            return null;
        }
    };

    const insertPredictionData = async (textID, predictionResult) => {
        try {

            const response = await fetch('http://localhost:3001/insertPredictionData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ textID, predictionResult }),
            });

            if (!response.ok) {
                console.error('Failed to insert prediction data');
            }
        } catch (error) {
            console.error('Error inserting prediction data:', error);
        }
    };

    return (
        <div className="main-container"> {}
            <div className="logo-container">
                <img src={logo} alt="Logo" className="logo" />
            </div>
            <h2>NLP Analysis Tool</h2>
            <p className="instructions-En">
                Enter text into the field below and click 'Analyze' to see the analysis results.
                Make sure your entries are detailed enough for accurate predictions.
            </p>
            <p className="instructions-He">
                הזן טקסט בשדה למטה ולחץ על 'ניתוח' כדי לראות את תוצאות הניתוח. ודא שהערכים שלך מפורטים מספיק בשביל תחזיות מדויקות.
            </p>


            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <textarea
                className="text-area"
                value={inputText}
                onChange={handleInputChange}
                placeholder="הזן טקסט לניתוח..."
                rows={10}
                cols={50}
                dir="rtl" // Set text direction to right-to-left (RTL)
                lang="he" // Specify language as Hebrew
            />

            <button className="analyze-btn" onClick={handleSubmit} disabled={isLoading}>
                {isLoading ? <div className="spinner"></div> : 'Analyze'}
            </button>

            {analysisResult && (
                <div className="result-container">
                    <p>{getCurrentDateTime()}</p>
                    <h2>Analysis Result</h2>
                    <p >{analysisResult}</p> {}
                </div>
            )}
        </div>
    );
};

export default AnalysisPage;
