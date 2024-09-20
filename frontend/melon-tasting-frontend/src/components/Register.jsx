import React from "react";
import { useState } from 'react';
import { Navigate, useNavigate } from "react-router-dom";

export default function Register() {
    const [username, setUsername ] = useState('');
    const [message, setMessage ] = useState('');
    const navigate = useNavigate();

    const handleRegister = () => {
        fetch('http://localhost:6061/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }, 
            body: JSON.stringify({ username }),
        })
        .then((response) => response.json())
        .then((data) => {
            setMessage(data.message);
            navigate('/login')
        })
        
    };
    return(
        <div>
            <h2>Register</h2>
            <input 
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(evt) => setUsername(evt.target.value)}
            />
            <button onClick={handleRegister}>Register</button>
            {message && <p>{message}</p>}
        </div>
    )
}