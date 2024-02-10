#!/usr/bin/env python3
"""
this is a flask app module
"""
from flask import Flask, render_template


app = Flask(__name__)


@app.route('/')
def index():
    """
    index route
    """
    return render_template('index.html', title='Welcome to Holberton', header='Hello world')


if __name__ == '__main__':
    app.run(debug=True)
