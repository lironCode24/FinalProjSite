// UserProfilePage.js
import React from 'react';

const UserProfilePage = () => {
    // Static user details (replace with dynamic data from state or props if available)
    const user = {
        name: 'John Doe',
        email: 'john@example.com',
        role: 'admin',
    };

    return (
        <div className="user-profile-container">
            <h2>User Profile</h2>
            <div className="user-details">
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role:</strong> {user.role}</p>
            </div>
        </div>
    );
};

export default UserProfilePage;
