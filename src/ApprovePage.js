import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import './ApprovePage.css';

const UserApprovalsPage = () => {
    const [unapprovedUsers, setUnapprovedUsers] = useState([]);

    useEffect(() => {
        const fetchUnapprovedUsers = async () => {
            try {
                const response = await fetch('http://localhost:3001/getAllUsersToApprove');
                if (response.ok) {
                    const data = await response.json();

                    // Fetch role names for each user concurrently
                    const updatedUsers = await Promise.all(data.map(user => getRole(user)));
                    setUnapprovedUsers(updatedUsers);
                } else {
                    console.error('Failed to fetch unapproved users');
                }
            } catch (error) {
                console.error('Error fetching unapproved users:', error);
            }
        };

        fetchUnapprovedUsers();
    }, []);

    const getRole = async (user) => {
        try {
            const roleResponse = await fetch(`http://localhost:3001/getRole?roleId=${user.roleid}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (roleResponse.ok) {
                const roleData = await roleResponse.json();
                return { ...user, roleName: roleData.roleName }; // Update user object with roleName
            } else {
                console.error('Failed to fetch role data');
                return user; // Return original user object if role data fetch fails
            }
        } catch (error) {
            console.error('Error fetching role data:', error);
            return user; // Return original user object on error
        }
    };

    const handleApproveUser = async (userID) => {
        try {
            const response = await fetch('http://localhost:3001/approveUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userID }),
            });

            if (response.ok) {
                const updatedUsers = unapprovedUsers.filter(user => user.userid !== userID);
                setUnapprovedUsers(updatedUsers);
            } else {
                console.error('Failed to approve user');
            }
        } catch (error) {
            console.error('Error approving user:', error);
        }
    };

    return (
        <div className="user-approvals-container">
            <h2 className="page-title">User Approvals</h2>
            <div className="unapproved-users-list">
                {unapprovedUsers.length === 0 ? (
                    <p className="user-item">No user to approve</p>
                ) : (
                    unapprovedUsers.map(user => (
                        <div key={user.userid} className="user-item">
                            <div className="user-details">
                                <p><strong>Username:</strong> {user.username}</p>
                                <p><strong>Full Name:</strong> {user.fullname}</p>
                                <p><strong>Email:</strong> {user.email}</p>
                                <p><strong>Role:</strong> {user.roleName}</p>
                            </div>
                            <button
                                className="approve-button"
                                onClick={() => handleApproveUser(user.userid)}
                            >
                                <FontAwesomeIcon icon={faCheck} />
                                Approve
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default UserApprovalsPage;
