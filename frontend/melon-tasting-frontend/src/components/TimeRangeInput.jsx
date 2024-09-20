import React from 'react';

const generateTimeOptions = () => {
  const times = []; 
  let currentTime = new Date(); 
  currentTime.setHours(0, 0, 0, 0); // Set the current time to start at (00:00)

  // Loop to create 30-minute time frames 
  for (let i = 0; i < 48; i++) {
    // format time to be two digits 
    const hours = currentTime.getHours().toString().padStart(2, '0');
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');

    // format for the time 
    times.push(`${hours}:${minutes}`);

    // Increase the current time by 30 minutes
    currentTime.setMinutes(currentTime.getMinutes() + 30);
  }
  return times; 
}
export default function TimeRangeInput({ startTime, endTime, setStartTime, setEndTime }) {
  const timeOptions = generateTimeOptions(); 

  return (
    <div>
      <label htmlFor="start-time">Start Time:</label>
      <select
        id="start-time"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}>
        <option value="">Select Start Time</option>
        {timeOptions.map((time, index) => (
          <option key={index} value={time}>{time}</option>
        ))}
      </select>
      <label htmlFor="end-time">End Time:</label>
      <select
        id="end-time"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)} 
      >
        <option value="">Select End Time</option>
        {timeOptions.map((time, index) => (
          <option key={index} value={time}>{time}</option>
        ))}
      </select>
    </div>
  );
}


