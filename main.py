from flask import Flask, render_template

app = Flask(__name__, template_folder="./", static_folder="/")

@app.route("/")
def index():
    return render_template("index.html")

# app.run(port=5000, host="192.168.1.61", debug=True)
app.run(port=5000, host="127.0.0.1", debug=True)
