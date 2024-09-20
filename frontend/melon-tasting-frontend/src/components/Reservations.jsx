import React, { useState } from 'react';
import DatePicker from './DatePicker';
import TimeRangeInput from './TimeRangeInput'; 
import AvailableSlots from './AvailableSlots';
import ReservationMessage from './ReservationMessage'; 
import { useNavigate } from 'react-router-dom';

export default function Reservations({ userId }) {
    console.log("User ID:", userId);
    const [date, setDate] = useState(''); 
    const [startTime, setStartTime] = useState(''); 
    const [endTime, setEndTime] = useState(''); 
    const [availableSlots, setAvailableSlots] = useState([]); 
    const [message, setMessage] = useState(''); 
    const navigate = useNavigate();

    const searchReservations = () => {
        if (!date || !startTime || !endTime) {
            setMessage("Please provide date, start time, and end time."); 
            return;
        }

        // Fetch the available time slots from the backend
        fetch('http://localhost:6061/reservations', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'search',
                date,
                start_time: startTime,
                end_time: endTime,
            }),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to fetch reservations');
            }
            return response.json();
        })
        .then((data) => {
            setAvailableSlots(data); // Update available slots with the response data
            setMessage(''); // Clear any previous messages
        })
        .catch((error) => {
            console.error('Error:', error);
            setMessage('An error occurred while searching for reservations. Please try again.');
        });
    };

    // Function to book a reservation
    const bookReservation = (time) => {
        console.log("Booking data:", { action: 'book', date, time, user_id: userId });

        // Send the booking request to the /reservations 
        fetch('http://localhost:6061/reservations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'book',
                date,
                time,
                user_id: userId,
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.message === "You already have a reservation for this date, only one time slot per date is allowed.") {
                // If the user already has a reservation for the date, show an error message
                setMessage('You already have a reservation for this date. Please select another date.');
            } else if (data.message === "Reservation booked") {
                // If the reservation is successfully booked, show a success message
                setMessage('Reservation booked successfully!');
            } else {
                // Handle any other message returned from the server
                setMessage(data.message);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            setMessage('An error occurred while booking the reservation. Please try again.');
        });
    };

    return (
        <div>
            <h2>Search Reservations</h2>
            <p>Note: Time is displayed in 24-hour format</p>
            <DatePicker date={date} setDate={setDate} />
            <TimeRangeInput
                startTime={startTime}
                endTime={endTime}
                setStartTime={setStartTime}
                setEndTime={setEndTime}
            />
            <button onClick={searchReservations}>Search Reservations</button>
            <AvailableSlots
                availableSlots={availableSlots}
                bookReservation={bookReservation}
            />
            <ReservationMessage message={message} />

            <div>
                <button onClick={() => navigate('/my-reservations')}>View My Reservations</button>
            </div>
        </div>
    );
}
