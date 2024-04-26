import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link component
import './RegisterPage.css'; // Import CSS file for styling
import logo from './logo-haifa.jpg'; // Import the image file with the correct path

const RegisterPage = () => {
    const [merchants, setMerchants] = useState(false);
    function getMerchant() {
        fetch('http://localhost:3001')
            .then(response => {
                return response.text();
            })
            .then(data => {
                setMerchants(data);
            });
    }
    function createUser(username, fullname, email, role, password) {
        return fetch('http://localhost:3001/createUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, fullname, email, role, password }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => {
                return true; // Return true if user creation is successful
            })
            .catch(error => {
                console.error('Error during fetch:', error);
                return false; // Return false if user creation fails
            });
    }


    const [formData, setFormData] = useState({
        fullname:'',
        username: '',
        email: '',
        role: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    async function formValidation(formData) {
        setError('');
        try {
            // Validate if all fields are provided
            if (!formData.username || !formData.fullname || !formData.email || !formData.password || !formData.role) {
                setError('All fields are required');
                setSuccessMessage('');
                return false;
            }

            // Check if the username already exists
            const usernameExistsResponse = await fetch('http://localhost:3001/users/username?username=' + formData.username);
            if (!usernameExistsResponse.ok) {
                throw new Error('Failed to check if username exists');
            }
            const usernameExistsData = await usernameExistsResponse.json();
            if (usernameExistsData.length > 0) {
                setError('Username already exists');
                setSuccessMessage('');
                console.error('usernameExistsData.length:', usernameExistsData.length);
                return false;
            }

            console.log('http://localhost:3001/users/email?email=' + formData.email);
            // Check if the email already exists
            const emailExistsResponse = await fetch('http://localhost:3001/users/email?email=' + formData.email);
            if (!emailExistsResponse.ok) {
                throw new Error('Failed to check if email exists');
            }
            const emailExistsData = await emailExistsResponse.json();
            if (emailExistsData.length > 0) {
                setError('Email already exists');
                setSuccessMessage('');
                return false;
            }


            // Validate username format (optional)
            const usernameRegex = /^[a-zA-Z0-9_]{4,16}$/; // Example regex for username (alphanumeric and underscores, 4-16 characters)
            if (!usernameRegex.test(formData.username)) {
                setError('Invalid username format');
                setSuccessMessage('');
                return false;
            }

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Example regex for email format
            if (!emailRegex.test(formData.email)) {
                setError('Invalid email format');
                setSuccessMessage('');
                return false;
            }

            // Validate email format
            const passRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/; // Example regex for email format
            if (!passRegex.test(formData.password)) {
                setError('Invalid password format');
                setSuccessMessage('');
                return false;
            }

            return true;
        } catch (error) {
            // If any validation fails, throw an error with the specific message
            throw new Error(error.message);
            return false;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const isValid = await formValidation(formData);
            if (isValid) {
                const userCreated = await createUser(formData.username, formData.fullname, formData.email, formData.role, formData.password);
                if (userCreated) {
                    // For demonstration purposes, let's assume the registration is successful
                    setSuccessMessage('Registration successful!');
                    setError('');
                    // Reset form fields
                    setFormData({ fullname: '', username: '', email: '', role: '', password: '' });
                    // Navigate to login page
                    setTimeout(() => {
                        window.location.href = '/login'; // This will navigate to the login page
                    }, 1000);
                } else {
                    setError("Problem with creating user. Please try again later");
                }
            }
        } catch (error) {
            setError(error.message);
        }
    };


    return (
        <div className="register-container">
            <div className="logo-container">
                <img src={logo} alt="Logo" className="logo" />
            </div>
            <h2>Register</h2>
            {error && <p className="error-message">{error}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="fullname">Full Name:</label>
                <input
                    type="text"
                    id="fullname"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                />
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter your username"
                />
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                />
                <label htmlFor="role">Role:</label>
                <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                >
                    <option value="">Select Role</option>
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                </select>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                />
                <i className="passwordFormat">Password must include at least one uppercase, one lowercase, one digit, and be 8+ characters long.</i>
                <button type="submit">Register</button>
            </form>

            {/* Add Link component for back to login button */}
            <Link to="/login" className="back-to-login">Already have an account? Log in</Link>
        </div>
    );
};

export default RegisterPage;
