import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css'
import process from 'process';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const apiURL = process.env.REACT_APP_API_BASE_URL;

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            // await axios.post('http://localhost:5000/register', { username, password });
            // alert(`${apiURL}register`)
            await axios.post(`${apiURL}register`, { username, password });
            alert('Registration successful! Please login.');
            navigate('/');
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrorMessage('Username already exists. Try a different one.');
            } else {
                setErrorMessage('An error occurred. Please try again.');
            }
        }
    };

    return (
        <div className="register-container">
            <h1>Register</h1>
            <form onSubmit={handleRegister} className="register-form">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="input-field"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="input-field"
                />
                <button type="submit" className="submit-button">Register</button>
            </form>
            <p>
                Already have an account? <Link to="/">Login</Link>
            </p>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
    );
}

export default Register;
