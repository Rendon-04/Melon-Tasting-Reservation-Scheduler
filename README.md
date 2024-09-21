# Melon-Tasting-Reservation-Scheduler

## Overview
The Melon Tasting Reservation Scheduler is a web app that allows a user to book a 30 minute tasting session at a specific time. 

## Technologies Used
- **Backend**: Flask, SQLAlchemy, PostgreSQL
- **Frontend**: React, JavaScript
- **Styling**: CSS

### Models

1. **User**: Represents a user in the system.

2. **Reservation**: Represents a reservation made by a user. Each reservation has a date, time, and status (either "available" or "booked").

### Database Design Trade-offs

- **Date and Time as Separate Fields**: I made this choice because it would simplify the process and would allow for better query handling. It allows filtering by date and time independently.
- **Status Field**: To correctly check for reservation availability, a “status” field was used instead of deleting records, which reduces the potential for issues with deleted data. 
 
## Key Features

- **User Registration and Login**: Users can create an account and log in to book reservations.
- **Reservation Search**: Users can search for available reservations by date and time range.
- **Booking System**: Makes sure that each user can only book one reservation per day and prevents double booking of time slots.
- **View Reservations**: Users can view their reservations, making sure they have a clear overview of their scheduled tastings.

## Notable Implementation Details

- **Custom Time Slot Generation**: Implemented a function to generate 30-minute time slots between users start and end times. This allows for consistent booking intervals.
- **Handling Time in Frontend and Backend**: First-time using `datetime.time` to make sure that all reservation times are correctly managed, displayed, and queried.
- **Error Handling and Messaging**: Used error handling/messages to provide user feedback throughout the app, such as when a user tries to book a time they already have reserved, try to book more than one slot on a given date, or when no slots are available.

## Trade-offs and Decisions

1. **Frontend Routing with React Router**: Although this was not necessary for an MVP, it was used to provide a more organized and scalable structure for features.
2. **Backend vs Frontend Validation**: Chose to validate more complex booking logic on the backend to ensure data integrity, while the more simple forms were done on the frontend.

## Challenges and Learnings

- **State Management in React**: Handling the dynamic states for user inputs, available slots, and reservation statuses was a good learning experience in managing React state and component re-renders.
- **Working with datetime.time**: This was my first time working with the datetime.time module to handle time-specific data for reservations. Implementing time slots and making sure that the times were correctly formatted and validated was challenging. It taught me the importance of accuracy in time management and how to effectively use Python's datetime functions.
- **Building a Booking System**: Developing a complete booking system from scratch was a new challenge. It involved managing user inputs, validating booking rules, and ensuring data consistency. Implementing features like preventing double bookings and managing user-specific reservations helped me understand how fast it can get complicated when building systems like these.

