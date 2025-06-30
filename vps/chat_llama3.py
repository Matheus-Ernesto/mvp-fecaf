from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI

app = Flask(__name__)

# Habilita CORS para todos os endpoints, aceitando qualquer origem
CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True)

# Cliente do modelo local (como Ollama)
client = OpenAI(
    base_url="http://localhost:11434/v1",
    api_key="ollama"  # qualquer string
)

@app.route("/api/chat", methods=["POST", "OPTIONS"])
def chat():
    # Responde à requisição OPTIONS (preflight) com sucesso
    if request.method == "OPTIONS":
        return '', 204

    # Lê o JSON recebido
    data = request.json
    user_msg = data.get("message", "")
    context = data.get("context", "")

    # Envia para o modelo
    response = client.chat.completions.create(
        model="llama3.2",
        messages=[
            {"role": "system", "content": context},
            {"role": "user", "content": user_msg}
        ]
    )

    # Retorna a resposta do modelo
    return jsonify({"answer": response.choices[0].message.content})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050, debug=False)
