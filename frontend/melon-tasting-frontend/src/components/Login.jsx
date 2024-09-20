import React from "react";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login ({ setUserId }) {
    const [username, setUsername ] = useState(''); 
    const [message, setMessage ] = useState('');
    const [userNotFound, setUserNotFound] = useState(false); 
    const navigate = useNavigate(); 

    const handleLogin = () => {
        fetch('http://localhost:6061/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username }), 
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.user_id) {
                setUserId(data.user_id);
                navigate('/reservations');
            } else {
                setMessage(data.message);
                if (data.message === "User was not found") {
                    setUserNotFound(true);  
                navigate('/reservations');
            }
         }
        });
    };

    return (
        <div>
            <h2>Login</h2>
            <input
            type="text"
            placeholder='Enter Username'
            value={username}
            onChange={(evt) => setUsername(evt.target.value)}
            />
            <button onClick = {handleLogin}>Login</button>
            {message && <p>{message}</p>}
            {userNotFound && (
                <button onClick={() => navigate('/')}>Register</button>
            )}
        </div>
        
    )
}