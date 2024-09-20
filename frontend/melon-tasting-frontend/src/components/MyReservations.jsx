import React, { useEffect, useState } from 'react';

export default function MyReservations({ userId }) {
    const [reservations, setReservations] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('http://localhost:6061/my-reservations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: userId,
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.message) {
                setMessage(data.message);  
            } else {
                setReservations(data);    
            }
        })
        .catch((error) => {
            console.error('Error fetching reservations:', error);
            setMessage('Error fetching reservations');
        });
    }, [userId]);

    
    return (
      <div>
          <h2>My Reservations</h2>
          {message && <p>{message}</p>}

          {reservations.length > 0 ? (
              <ul>
                  {reservations.map((reservation) => (
                      <li key={reservation.id}>
                          {reservation.date} at {reservation.time} - {reservation.status}
                      </li>
                  ))}
              </ul>
          ) : (
              !message && <p>No reservations found</p>
          )}
      </div>
  );
}