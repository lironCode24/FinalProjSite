import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './UserProfilePage.css';
import profileIcon from './profileIcon.jpg';

const UserProfilePage = () => {
    // State to store user profile data
    const [userProfile, setUserProfile] = useState(null);

    // Effect to fetch user profile data when the component mounts
    useEffect(() => {
        // Function to fetch user profile data
        const fetchUserProfile = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');
                if (!accessToken) {
                    console.error('Access token not found');
                    return;
                }

                // Make a request to your backend server to fetch user profile data
                const response = await fetch(`http://localhost:3001/userProfile?accessToken=${accessToken}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });


                if (response.ok) {
                    const userData = await response.json();
                    setUserProfile(userData);
                } else {
                    console.error('Failed to fetch user profile data');
                }
            } catch (error) {
                console.error('Error fetching user profile data:', error);
            }
        };

        // Call the fetchUserProfile function
        fetchUserProfile();
    }, []);

    // If userProfile is still null, display a loading message
    if (!userProfile) {
        return <p>Loading...</p>;
    }

    return (
        <div className="user-profile-container">
            <div className="profile-header">
                <img src={profileIcon} alt="Profile" className="profile-image" />
                <h2 className="profile-name">{userProfile.username}</h2>
            </div>
            <div className="user-details">
                <p><strong>Full Name:</strong> {userProfile.fullname}</p>
                <p><strong>Email:</strong> {userProfile.email}</p>
                <p><strong>Role:</strong> {userProfile.role}</p>
            </div>
            <Link to="/analysis" className="back-to-analyze-btn">Back to Analyze</Link>
        </div>
    );
};

export default UserProfilePage;
