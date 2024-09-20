import React from "react";

export default function AvailableSlots({ availableSlots, bookReservation }) {
    return (
        <div>
            <h3>Available Slots</h3>
            {availableSlots.length > 0 ? (
                availableSlots.map((slot) => (  
                    <div key={slot.time}>
                        <p>{slot.time}</p>
                        <button onClick={() => bookReservation(slot.time)}>Book</button>
                    </div>
                ))
            ) : (
                <p>No slots available</p>
            )}
        </div>
    );
}
