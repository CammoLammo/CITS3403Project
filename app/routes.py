from app import app
from flask import render_template

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