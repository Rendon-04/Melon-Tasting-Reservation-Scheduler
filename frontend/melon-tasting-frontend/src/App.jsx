import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register.jsx';
import Login from './components/Login.jsx';
import Reservations from './components/Reservations.jsx';
import MyReservations from './components/MyReservations.jsx';
import Homepage from './components/Homepage.jsx';

export default function App() {
  const [userId, setUserId] = useState(null);  // Store userId in state

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login setUserId={setUserId} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reservations" element={userId ? <Reservations userId={userId} /> : <Login setUserId={setUserId} />} />
          <Route path="/my-reservations" element={userId ? <MyReservations userId={userId} /> : <Login setUserId={setUserId} />} />
        </Routes>
      </div>
    </Router>
  );
}


