from flask import Flask, jsonify, request, flash, send_from_directory
from datetime import datetime, timedelta
from flask_cors import CORS
from backend.model import Reservation, connect_to_db, db
import backend.crud

app = Flask(__name__, static_folder='build', static_url_path='')
app.secret_key = "dev"
CORS(app)

# Serve the React frontend
@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')

# Serve other static files from the build folder
@app.route('/<path:path>')
def static_proxy(path):
    return send_from_directory(app.static_folder, path)



@app.route('/')
def home():
    return "Welcome to the Melon Tasting Reservation Scheduler!"

@app.route("/register", methods=["POST"])
def register():
    """Register a new user."""
    username = request.json.get("username")
    
    # Check if a user already exists
    existing_user = crud.get_user_by_username(username)
    if existing_user:
        return jsonify({"message": "Username already exists"})
    
    # Create a new user
    new_user = crud.create_user(username)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully", "user_id": new_user.id})

@app.route("/login", methods=["POST"])
def login():
    """Login a user with their username"""
    username = request.json.get("username")
    user = crud.get_user_by_username(username)
    if user:
        flash("Login succesful")
        return jsonify ({"message": "Login successful", "user_id": user.id})
    else:
        flash("User does not exist")
        return jsonify({"message":"User was not found"})
    
@app.route("/reservations", methods=["POST"])
def user_handles_reservations():
    data = request.get_json()
    action = data.get("action")

    def generate_time_slots(start_time, end_time, interval=30):
        """
        Generate time slots between the start and end time with a 30 minute interval.
        """
        slots = []
        current_time = datetime.combine(datetime.today(), start_time)
        end_time = datetime.combine(datetime.today(), end_time)

        while current_time <= end_time:
            slots.append(current_time.time())
            current_time += timedelta(minutes=interval)

        return slots

    if action == "search":
        # Handle the search for reservations
        date = data.get("date")
        start_time_str = data.get("start_time")
        end_time_str = data.get("end_time")

        # Convert time strings to datetime.time objects
        start_time = datetime.strptime(start_time_str, '%H:%M').time()
        end_time = datetime.strptime(end_time_str, '%H:%M').time()

        # Generate all possible time slots between the given start and end times
        all_slots = generate_time_slots(start_time, end_time)

        # Query the database for any booked slots on a given date
        booked_slots = db.session.query(Reservation).filter(
            Reservation.date == date,
            Reservation.time.in_(all_slots),
            Reservation.status == 'booked'
        ).all()

        # Get a list of booked times
        booked_times = {reservation.time for reservation in booked_slots}

        # Filter out the slots that already have been from the generated slots
        available_slots = [slot for slot in all_slots if slot not in booked_times]

        return jsonify([{
            'time': str(slot),
            'status': 'available'
        } for slot in available_slots]), 200

    elif action == "book":
        # Handle the booking of a reservation
        date = data.get("date")
        time = data.get("time")
        user_id = data.get("user_id")

        if not date or not time or not user_id:
            return jsonify({"message": "Missing data"}), 400
        
        # Check if a user already has a reservation on a given date
        existing_reservation = db.session.query(Reservation).filter(
            Reservation.date == date,
            Reservation.user_id == user_id,
            Reservation.status == 'booked'
        ).first()

        if existing_reservation:
            return jsonify({"message": "You already have a reservation for this date, only one time per date is allowed."}), 400

        # Create the reservation
        reservation = Reservation(date=date, time=time, status="booked", user_id=user_id)
        db.session.add(reservation)
        db.session.commit()

        return jsonify({"message": "Reservation booked", "reservation_id": reservation.id}), 200
    return jsonify({"message": "Invalid action"}), 400

@app.route("/my-reservations", methods=["POST"])
def get_my_reservations():
    data = request.get_json()
    user_id = data.get("user_id")

    if not user_id:
        return jsonify({"message": "Missing user ID"}), 400

    # Query reservations for a user
    reservations = Reservation.query.filter_by(user_id=user_id).all()

    if not reservations:
        return jsonify({"message": "No reservations found"}), 404

    return jsonify([{
    "id": reservation.id,
    "date": str(reservation.date),
    "time": str(reservation.time),
    "status": reservation.status
} for reservation in reservations]), 200

                        
if __name__ == "__main__":
    connect_to_db(app)
    app.run(host="0.0.0.0", debug=True, port=6061)


