import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link component
import './RegisterPage.css'; // Import CSS file for styling
import logo from './logo-haifa.jpg'; // Import the image file with the correct path

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        fullname:'',
        username: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform form validation
        if (!formData.username || !formData.fullname || !formData.email || !formData.password) {
            setError('All fields are required');
            setSuccessMessage('');
            return;
        }
        // Mock API call or backend operation
        // Here you can add the logic to register the user
        // For demonstration purposes, let's assume the registration is successful
        setSuccessMessage('Registration successful!');
        setError('');
        // Reset form fields
        setFormData({ fullname:'', username: '', email: '', password: '' });
        // Navigate to login page
        setTimeout(() => {
            window.location.href = '/login'; // This will navigate to the login page

        }, 1000);
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
                <input
                    type="text"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleChange}
                    placeholder="Full Name"
                />
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Username"
                />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                />
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                />
                <button type="submit">Register</button>
            </form>
            {/* Add Link component for back to login button */}
            <Link to="/login" className="back-to-login">Back to Login</Link>
        </div>
    );
};

export default RegisterPage;
