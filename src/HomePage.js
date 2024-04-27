import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faComment } from '@fortawesome/free-solid-svg-icons'; // Import the icons you want to use
import './HomePage.css'; // Import the CSS file for styling
import { faDoorOpen, faHandHoldingHeart } from '../node_modules/@fortawesome/free-solid-svg-icons/index';

const HomePage = () => {
    return (
        <div className="home-container">
            <h1><FontAwesomeIcon icon={faHandHoldingHeart} />Welcome to Our Website</h1>
            <p>
                In an era defined by digital interactions, this project analyzes calls from sexual harassment support centers. Through sentiment analysis, we explore the vital task of classifying these calls as urgent or non-urgent.
            </p>
            <div className="section">
                <h2><FontAwesomeIcon icon={faMapMarkerAlt} /> Addressing Urgency in Support Systems:</h2>
                <p>
                    Survivors increasingly turn to digital platforms, emphasizing the critical need to understand sentiments expressed in these conversations.
                    This project aims to enhance support systems for survivors of sexual assault.
                </p>
            </div>
            <div className="section">
                <h2><FontAwesomeIcon icon={faComment} /> Sentiment Analysis Unveiled:</h2>
                <p>
                    At the core of our project is sentiment analysis, a tool in natural language processing.
                    By dissecting sentiments in text conversations, we aim to revolutionize how sexual harassment support centers prioritize and respond to calls.
                </p>
            </div>
        </div>
    );
};

export default HomePage;

