'''Script to seed database'''
from flask import Flask
from model import connect_to_db, db

app = Flask(__name__)

connect_to_db(app)

# Create all tables
with app.app_context(): 
    db.create_all()
    print("Tables created!")