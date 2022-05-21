from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField, SubmitField
from wtforms.validators import DataRequired, ValidationError, EqualTo
from app.models import User

class LoginForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])
    remember_me = BooleanField('Remember Me')
    submit = SubmitField('Sign In')

class SignUpForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])
    password2 = PasswordField('Repeat Password', validators=[DataRequired(), EqualTo('password')])
    submit = SubmitField('Register')

    def unique_username(self, username):
        user = User.query.filter_by(username=username.data).first()
        if user is not None:
            raise ValidationError('This username is already taken')

class NewPuzzleForm(FlaskForm):
    word = StringField('Hidden Word', validators=[DataRequired()])
    wordType = StringField('Part of Speech (noun, verb, etc)', validators=[DataRequired()])
    definition = StringField('Definition', validators=[DataRequired()])
    sentence = StringField('Used in a Sentence', validators=[DataRequired()])
    similarWords = StringField('Synonyms')
    submit = SubmitField('Add Puzzle')