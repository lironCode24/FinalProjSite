import React from 'react';
import { Link } from 'react-router-dom';
import './UserProfilePage.css';
import profileIcon from './profileIcon.jpg';

const UserProfilePage = () => {
    // Static user details (replace with dynamic data from state or props if available)
    const user = {
        name: 'John Doe',
        email: 'john@example.com',
        role: 'admin',
    };

    return (
        <div className="user-profile-container">
            <div className="profile-header">
                <img src={profileIcon} alt="Profile" className="profile-image" />
                <h2 className="profile-name">{user.name}</h2>
            </div>
            <div className="user-details">
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role:</strong> {user.role}</p>
            </div>
            <Link to="/analysis" className="back-to-analyze-btn">Back to Analyze</Link>
        </div>
    );
};

export default UserProfilePage;
