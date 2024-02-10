#!/usr/bin/env python3
"""                  
flask app module
"""

from flask import Flask, render_template, request
from flask_babel import Babel, _  # Import the _ function for translations

app = Flask(__name__)
babel = Babel(app)


class Config:
    """
    babel config envs
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
    flask app route
    """
    return render_template('index.html', title=_('home_title'), header=_('home_header'))

if __name__ == '__main__':
    app.run(debug=True)
