"""Models for melon_tasting reservations"""

from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    """A user"""

    __tablename__ = "users"

    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False) 

    reservations = db.relationship("Reservation", back_populates="user")

    def __repr__(self):
        return f"<User id={self.id} username={self.username}>"

class Reservation(db.Model):
    """A reservation"""

    __tablename__ = "reservations"

    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    date = db.Column(db.Date, nullable=False)
    time = db.Column(db.Time, nullable=False)
    status = db.Column(db.String(20), nullable=False, default="available")
    
    user = db.relationship("User", back_populates="reservations") 

    def __repr__(self):
        return f"<Reservation id={self.id} date={self.date} time={self.time} user_id={self.user_id}>"

def connect_to_db(flask_app, db_uri="postgresql:///reservations", echo=True):
    flask_app.config["SQLALCHEMY_DATABASE_URI"] = db_uri
    flask_app.config["SQLALCHEMY_ECHO"] = echo
    flask_app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.app = flask_app
    db.init_app(flask_app)


    print("Connected to the db!")


if __name__ == "__main__":
    from server import app 
    
    from flask import Flask
    app = Flask(__name__)

    connect_to_db(app, echo=False)
    app.app_context().push()