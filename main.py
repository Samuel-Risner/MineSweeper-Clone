from flask import Flask, render_template, send_file

app = Flask(__name__, template_folder="./minesweeper-clone/", static_folder="minesweeper-clone/static/")

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/favicon.ico")
def favicon():
    return send_file("minesweeper-clone/favicon.ico", mimetype="image/ico")

app.run(port=5000, host="127.0.0.1", debug=True)
