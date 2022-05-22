from app import app, db
from flask import jsonify, render_template, flash, redirect, url_for, request
from flask_login import current_user, login_required, login_user, logout_user
from app.forms import LoginForm, SignUpForm, NewPuzzleForm
from app.models import User, Puzzle

@app.route('/')
@app.route('/index', methods=['GET', 'POST'])
def index():
    # userID = current_user.get_id()
    # user = User.query.filter_by(id=userID).first()
    if request.method == 'POST':
        requestTypeJSON = request.get_json() 
        requestType = requestTypeJSON["requestType"]

        if requestType == "firstGuess":
            current_user.gamesPlayed += 1
            current_user.totalGuesses += 1
            current_user.todayGuesses = 1
            current_user.todayCorrect = 0

        elif requestType == "middleGuess":
            current_user.totalGuesses += 1
            current_user.todayGuesses += 1

        elif requestType == "finalGuess":
            current_user.totalGuesses += 1
            current_user.currentStreak = 0
            current_user.todayGuesses += 1

        elif requestType == "correctGuess":
            current_user.gamesWon += 1
            if current_user.currentStreak == current_user.bestStreak:
                current_user.bestStreak += 1
            current_user.currentStreak += 1
            current_user.todayCorrect = 1

        elif requestType == "initialisePuzzle":
            todayPuzzleID = requestTypeJSON["puzzleID"]
            todayPuzzle = Puzzle.query.get(todayPuzzleID)
            puzzleData = {"guesses": current_user.todayGuesses, "correct": current_user.todayCorrect, "word": todayPuzzle.word, "wordType": todayPuzzle.wordType, "definition": todayPuzzle.definition, "sentence": todayPuzzle.sentence}
            return jsonify(puzzleData)

        db.session.commit()
    return render_template("index.html", title="Play")

@app.route('/stats')
@login_required
def stats():
    return render_template("stats.html", title="Stats")

@app.route('/introduction')
def introduction():
    return render_template("introduction.html", title="Welcome")

@app.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first()
        if user is None or not user.check_password(form.password.data):
            flash('Invalid username or password')
            return redirect(url_for('login'))
        login_user(user, remember=form.remember_me.data)
        return redirect(url_for('index'))
    return render_template('login.html', title='Sign In', form=form)

@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('index'))

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    form = SignUpForm()
    if form.validate_on_submit():
        user = User(username=form.username.data, gamesPlayed=0, gamesWon=0, totalGuesses=0, currentStreak=0, bestStreak=0, todayGuesses=0, todayCorrect=0)
        user.create_hash(form.password.data)
        db.session.add(user)
        db.session.commit()
        flash('Your account has been created!')
        return redirect(url_for('login'))
    return render_template('signup.html', title='Sign Up', form=form)

@app.route('/dev', methods=['GET', 'POST'])
def dev():
    form = NewPuzzleForm()
    if form.validate_on_submit():
        puzzle = Puzzle(word=form.word.data, wordType=form.wordType.data, definition=form.definition.data, sentence=form.sentence.data, similarWords=form.similarWords.data)
        db.session.add(puzzle)
        db.session.commit()
        flash('Your new puzzle has been added')
    return render_template('dev.html', title="Dev Tools", form=form)