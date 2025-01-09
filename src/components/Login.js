import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './login.css'

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const apiURL = process.env.REACT_APP_API_BASE_URL;

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${apiURL}login`, { username, password });
            console.log('Login response:', response.data)
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username', response.data.username);
            // console.log(localStorage.setItem('username', response.data.username))
            alert('Login Successful');
            navigate('/tasks');
        } catch (error) {
            alert('Invalid username or password');
        }
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            <form onSubmit={handleLogin} className="login-form">
                <input
                    type="text"
                    className="input-field"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    className="input-field"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className="submit-button">Login</button>
            </form>
            <p>
                Don't have an account? <Link to="/register">Register here</Link>.
            </p>
        </div>
    );
}

export default Login;
