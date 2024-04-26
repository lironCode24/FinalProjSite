import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './UserProfilePage.css';
import profileIcon from './profileIcon.jpg';

const UserProfilePage = () => {
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                console.error('Access token not found');
                return;
            }

            const response = await fetch(`http://localhost:3001/userProfile?accessToken=${accessToken}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                const userData = await response.json();
                setUserProfile(userData);
            } else {
                console.error('Failed to fetch user profile data');
            }
        };

        fetchUserProfile();
    }, []);

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
                <div className="user-detail-card"><strong>Full Name:</strong> {userProfile.fullname}</div>
                <div className="user-detail-card"><strong>Email:</strong> {userProfile.email}</div>
                <div className="user-detail-card"><strong>Role:</strong> {userProfile.role}</div>
            </div>
            <Link to="/analysis" className="back-to-analyze-btn">Back to Analyze</Link>
        </div>
    );
};

export default UserProfilePage;
