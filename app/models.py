from app import db, login
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash

@login.user_loader
def load_user(id):
    return User.query.get(int(id))

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    password_hash = db.Column(db.String(128))
    gamesPlayed = db.Column(db.Integer)
    gamesWon = db.Column(db.Integer)
    totalGuesses = db.Column(db.Integer)
    currentStreak = db.Column(db.Integer)
    bestStreak = db.Column(db.Integer)

    def create_hash(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return '<User {}>'.format(self.username)

class Puzzle(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    word = db.Column(db.String(32), index=True, unique=True)
    wordType = db.Column(db.String(32))
    definition = db.Column(db.String(256))
    sentence = db.Column(db.String(256))
    similarWords = db.Column(db.String(256))

    def __repr__(self):
        return '<Word {}>'.format(self.word)