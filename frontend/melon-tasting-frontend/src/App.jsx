import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register.jsx';
import Login from './components/Login.jsx';
import Reservations from './components/Reservations.jsx';
import MyReservations from './components/MyReservations.jsx';

export default function App() {
  const [userId, setUserId] = useState(null);  // Store userId in state

  return (
    <Router>
      <div>
        {!userId ? (
          <Login setUserId={setUserId} />
        ) : (
          <Reservations userId={userId} />
        )}
      </div>
      <Routes>
       <Route path="/" element={<Register />} />
        <Route path="/my-reservations" element={<MyReservations userId={userId} />} />
      </Routes>
    </Router>
  );
}


