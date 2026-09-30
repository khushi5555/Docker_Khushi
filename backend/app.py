from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/")
def home():
    return "Flask Backend is Running!"


@app.route("/submit", methods=["POST"])
def submit_form():
    data = request.get_json()

    name = data.get("name")
    email = data.get("email")
    course = data.get("course")
    message = data.get("message")

    print("Received Data:")
    print("Name:", name)
    print("Email:", email)
    print("Course:", course)
    print("Message:", message)

    return jsonify({
        "message": "Form data processed successfully",
        "name": name,
        "email": email,
        "course": course,
        "message": message
    })


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)