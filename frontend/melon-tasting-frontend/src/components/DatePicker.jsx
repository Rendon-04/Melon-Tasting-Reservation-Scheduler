import React from 'react';

export default function DatePicker ({ date, setDate }) {
    return (
        <div>
            <label htmlFor='date'>Select Date:</label>
            <input
            type="date"
            id="date"
            value={date}
            onChange={(evt) => setDate(evt.target.value)}
            />
        </div>
    );
}