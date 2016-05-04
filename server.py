from flask import Flask
from flask import render_template
import matrix

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/lights_on/<hex_str>')
def lights_on(hex_str=None):
    matrix.write(str(hex_str))
    return hex_str

if __name__ == "__main__":
    app.run()
