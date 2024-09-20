import React from 'react';

export default function ReservationMessage({ message }) {
  return (
    <div>
      {message && <p>{message}</p>}
    </div>
  );
}
