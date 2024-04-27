import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './UserProfilePage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import profileIcon1 from './images/profileIcon1.jpg';
import profileIcon2 from './images/profileIcon2.jpg';
import profileIcon3 from './images/profileIcon3.jpg';
import profileIcon4 from './images/profileIcon4.jpg';
import profileIcon5 from './images/profileIcon5.jpg';
import profileIcon6 from './images/profileIcon6.jpg';

const UserProfilePage = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [selectedProfileImage, setSelectedProfileImage] = useState(null); // Default profile image
    const [showImageSelectionModal, setShowImageSelectionModal] = useState(false);
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
                    const profileImagePath = userData.profileImg;

                    let imageUrl = "";
                    switch (profileImagePath) {
                        case './images/profileIcon1.jpg':
                            imageUrl = profileIcon1;
                            break;
                        case './images/profileIcon2.jpg':
                            imageUrl = profileIcon2;
                            break;
                        case './images/profileIcon3.jpg':
                            imageUrl = profileIcon3;
                            break;
                        case './images/profileIcon4.jpg':
                            imageUrl = profileIcon4;
                            break;
                        case './images/profileIcon5.jpg':
                            imageUrl = profileIcon5;
                            break;
                        case './images/profileIcon6.jpg':
                            imageUrl = profileIcon6;
                            break;
                        default:
                            imageUrl = null;
                            console.error('Failed to load profile image');
                            break
                    }

                    setSelectedProfileImage(imageUrl); // Set the image URL

                    if (userData && userData.roleId) {
                        // Fetch role data based on roleId
                        const roleResponse = await fetch(`http://localhost:3001/getRole?roleId=${userData.roleId}`, {
                            method: 'GET',
                            headers: { 'Content-Type': 'application/json' },
                        });

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
    const profileImages = [profileIcon1, profileIcon2, profileIcon3, profileIcon4, profileIcon5, profileIcon6];

    const handleImageSelection = async (selectedImage) => {
        setShowImageSelectionModal(false); // Close the modal after selecting an image
        // Define an array of predefined file names
        const fileNames = ['profileIcon1', 'profileIcon2', 'profileIcon3', 'profileIcon4', 'profileIcon5', 'profileIcon6'];

        // Check if the selected image URL includes any of the predefined file names
        const matchingFileName = fileNames.find(fileName => selectedImage.includes(fileName));

        if (!matchingFileName) {
            console.error('Invalid profile image selection');
            return; // Exit early if the selected image is invalid
        }

        // If a matching file name is found, use it to construct the corresponding image path
        const imageUrl = `./images/${matchingFileName}.jpg`;

        const accessToken = localStorage.getItem('accessToken');
        try {
            // Update the user's profile image on the server
            const response = await fetch('http://localhost:3001/updateProfileImage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ imageUrl, accessToken }),
            });

            if (response.ok) {
                // If update is successful, update the selectedProfileImage state
                setSelectedProfileImage(selectedImage);
            } else {
                console.error('Failed to update profile image');
            }
        } catch (error) {
            console.error('Error updating profile image:', error);
        }
    };



    if (!userProfile) {
        return <p>Loading...</p>;
    }

    return (
        <div className="user-profile-container">
            <div className="profile-header">
                <div className="profile-image-container">
                    <div className="profile-image-wrapper">
                        <img src={selectedProfileImage} alt="Profile" className="profile-image" />
                        <button className="change-image-button" onClick={() => setShowImageSelectionModal(true)}>
                            <FontAwesomeIcon icon={faPencilAlt} className="pencil-icon" />
                        </button>
                    </div>
                </div>
                <h2 className="profile-name">{userProfile.username}</h2>
            </div>
            <div className="user-details">
                <div className="user-detail-card"><strong>Full Name:</strong> {userProfile.fullname}</div>
                <div className="user-detail-card"><strong>Email:</strong> {userProfile.email}</div>
                <div className="user-detail-card"><strong>Role:</strong> {roleName}</div>
            </div>

            {/* Profile Image Selection Modal */}
            {showImageSelectionModal && (
                <div className="image-selection-modal">
                    <div className="image-selection-modal-content">
                        <button className="close-modal-button" onClick={() => setShowImageSelectionModal(false)}>
                            &times;
                        </button>
                        <h2>Select Profile Image</h2>
                        <div className="profile-images">
                            {profileImages.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`Profile Option ${index + 1}`}
                                    className="profile-option-image"
                                    onClick={() => handleImageSelection(image)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <Link to="/analysis" className="back-to-analyze-btn">Back to Analyze</Link>
        </div>
    );
};

export default UserProfilePage;
