"""CRUD Operations"""
from model import User, Reservation, db

def get_user_by_username(username):
    """Get a user by their username.
    - Query the User model to find the first user with the matching username.
    - Return the user object if it is found, or None if no user is found.
    """
    
    return User.query.filter(User.username == username).first()

def create_user(username):
    """Create a new user.
    - Initialize a new User object with the given username.
    """
    user = User(username=username)
    return user

def get_available_reservations(date, time_range):
    """Get available reservations for a given date and time range.
    - Query the Reservation model for reservations that are available. 
    - Time range with start and end times.
    """
    start_time, end_time = time_range
    return Reservation.query.filter(
        Reservation.date == date,
        Reservation.time.between(start_time, end_time),
        Reservation.status == 'available'
    ).all()

def create_reservation(date, time, status, user_id):
    """Create a new reservation.
    - Initializes a new Reservation object with the provided details.
    - Save the reservation to the database.
    """
    reservation = Reservation(date=date, time=time, status=status, user_id=user_id)
    db.session.add(reservation)
    db.session.commit()  
    return reservation