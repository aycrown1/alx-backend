#!/usr/bin/env python3
"""                  
flask app module
"""
from flask import Flask, render_template, request
from flask_babel import Babel

app = Flask(__name__)
babel = Babel(app)

class Config:
    """
    babel class envs
    """
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = 'en'
    BABEL_DEFAULT_TIMEZONE = 'UTC'

app.config.from_object(Config)

@babel.localeselector
def get_locale():
    """
    babel language locale selector
    """
    return request.accept_languages.best_match(app.config['LANGUAGES'])

@app.route('/')
def index():
    """
    index route
    """
    return render_template('index.html', title='Welcome to Holberton', header='Hello world')

if __name__ == '__main__':
    app.run(debug=True)
