#!/usr/bin/env python3
"""
flask app module
"""

from flask import Flask, render_template
from flask_babel import Babel

app = Flask(__name__)
babel = Babel(app)


class Config:
    """
    babel language locale selector
    """
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = 'en'
    BABEL_DEFAULT_TIMEZONE = 'UTC'


app.config.from_object(Config)


@app.route('/')
def index():
    """
    Flask index pag
    """
    return render_template('index.html',
                           title='Welcome to Holberton', header='Hello world')


if __name__ == '__main__':
    app.run(debug=True)
