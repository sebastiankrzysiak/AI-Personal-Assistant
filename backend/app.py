from flask import Flask, request, jsonify
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

N8N_URL = "Your n8n Production Webhook URL"

@app.route("/api/message", methods=["POST"])
def handle_message():
    data = request.get_json()
    user_text = data.get("text", "")

    r = requests.post(N8N_URL, json={"text": user_text})

    return jsonify(r.json())

if __name__ == "__main__":
    app.run(port=5000, debug=True)