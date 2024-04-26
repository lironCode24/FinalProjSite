import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './UserProfilePage.css';
import profileIcon from './profileIcon.jpg';

const UserProfilePage = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [roleName, setRoleName] = useState('');

    useEffect(() => {
        const fetchUserProfile = async () => {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                console.error('Access token not found');
                return;
            }

            try {
                // Fetch user profile data
                const response = await fetch(`http://localhost:3001/userProfile?accessToken=${accessToken}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });

                if (response.ok) {
                    const userData = await response.json();
                    setUserProfile(userData);

                    if (userData && userData.roleId) {
                        // Fetch role data based on roleId
                        const roleResponse = await fetch(`http://localhost:3001/getRole?roleId=${userData.roleId}`, {
                            method: 'GET',
                            headers: { 'Content-Type': 'application/json' },
                        });

                        console.log(roleResponse);
                        if (roleResponse.ok) {
                            const roleData = await roleResponse.json();
                            setRoleName(roleData.roleName);
                        } else {
                            console.error('Failed to fetch role data');
                        }
                    }
                } else {
                    console.error('Failed to fetch user profile data');
                }
            } catch (error) {
                console.error('Error fetching user profile or role data:', error);
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
                <div className="user-detail-card"><strong>Role:</strong> {roleName}</div>
            </div>
            <Link to="/analysis" className="back-to-analyze-btn">Back to Analyze</Link>
        </div>
    );
};

export default UserProfilePage;
