import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Homepage() {
  const navigate = useNavigate();

  // Function to navigate to the Register page
  const goToRegister = () => {
    navigate('/register');
  };

  // Function to navigate to the Login page
  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to the Melon Tasting Reservation Scheduler!</h1>
      <div>
        <button 
          onClick={goToRegister} 
          style={{ margin: '10px', padding: '10px 20px' }}
        >
          Register
        </button>
        <button 
          onClick={goToLogin} 
          style={{ margin: '10px', padding: '10px 20px' }}
        >
          Login
        </button>
      </div>
    </div>
  );
}