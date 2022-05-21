from app import app, db
from flask import render_template, flash, redirect, url_for
from flask_login import current_user, login_user, logout_user
from app.forms import LoginForm, SignUpForm, NewPuzzleForm
from app.models import User, Puzzle

@app.route('/')
@app.route('/index')
def index():
    return render_template("index.html", title="Play")

@app.route('/button')
def button():
    return render_template("button.html", title="Button!")

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
        user = User(username=form.username.data, gamesPlayed=0, gamesWon=0, totalGuesses=0, currentStreak=0, bestStreak=0)
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