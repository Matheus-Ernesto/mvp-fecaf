(function () {
  // ------- estilos adaptados do A.css -------
  const style = document.createElement("style");
  style.textContent = `
    #llamaBtn{
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 9999;
      background: #2b2b2b;
      color: #fff;
      border: none;
      border-radius: 50%;
      width: 60px;
      height: 60px;
      font-size: 24px;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0,0,0,.4);
      font-family: 'Segoe UI', sans-serif;
      transition: all 0.3s ease;
    }
    #llamaBtn:hover {
      background: #3b3b3b;
      transform: scale(1.05);
    }
    #llamaModal{
      position: fixed;
      bottom: 100px;
      right: 24px;
      z-index: 9999;
      width: 400px;
      max-height: 500px;
      background: #1e1e1e;
      border-radius: 25px;
      box-shadow: 0 4px 24px rgba(0,0,0,.5);
      display: none;
      flex-direction: column;
      font-family: 'Segoe UI', sans-serif;
      color: white;
      border: 1px solid #2b2b2b;
    }
    #llamaHeader{
      background: #2b2b2b;
      color: #fff;
      padding: 20px;
      border-radius: 25px 25px 0 0;
      text-align: center;
      font-size: 18px;
      font-weight: bold;
      border-bottom: 1px solid #3b3b3b;
    }
    #llamaMessages{
      flex: 1;
      overflow-y: auto;
      padding: 20px;
      font-size: 14px;
      background: #1e1e1e;
      min-height: 200px;
      max-height: 300px;
    }
    #llamaMessages::-webkit-scrollbar {
      width: 6px;
    }
    #llamaMessages::-webkit-scrollbar-track {
      background: #2b2b2b;
      border-radius: 3px;
    }
    #llamaMessages::-webkit-scrollbar-thumb {
      background: #4b4b4b;
      border-radius: 3px;
    }
    .message {
      margin-bottom: 15px;
      padding: 10px 15px;
      border-radius: 15px;
      max-width: 85%;
      word-wrap: break-word;
    }
    .user-message {
      background: #2b2b2b;
      color: white;
      margin-left: auto;
      text-align: right;
    }
    .bot-message {
      background: #3b3b3b;
      color: #ccc;
      margin-right: auto;
    }
    #llamaInputRow{
      display: flex;
      align-items: center;
      background-color: #2b2b2b;
      border-radius: 0 0 25px 25px;
      padding: 12px 20px;
      border-top: 1px solid #3b3b3b;
    }
    #llamaInputRow input{
      flex: 1;
      background: transparent;
      border: none;
      outline: none;
      color: #ccc;
      font-size: 16px;
      font-family: 'Segoe UI', sans-serif;
      padding: 8px 0;
    }
    #llamaInputRow input::placeholder {
      color: #666;
    }
    #llamaInputRow button{
      background: none;
      border: none;
      font-size: 20px;
      color: #aaa;
      cursor: pointer;
      padding-left: 15px;
      transition: color 0.3s ease;
    }
    #llamaInputRow button:hover {
      color: white;
    }
    .typing-indicator {
      background: #3b3b3b;
      color: #ccc;
      margin-right: auto;
      padding: 10px 15px;
      border-radius: 15px;
      max-width: 85%;
      margin-bottom: 15px;
    }
    .typing-dots {
      display: inline-block;
    }
    .typing-dots::after {
      content: '...';
      animation: typing 1.5s infinite;
    }
    @keyframes typing {
      0%, 20% { content: '.'; }
      40% { content: '..'; }
      60%, 100% { content: '...'; }
    }
  `;
  document.head.appendChild(style);

  // ------- botão flutuante -------
  const btn = document.createElement("button");
  btn.id = "llamaBtn";
  btn.title = "Chat Feroz";
  btn.innerText = "💬";
  document.body.appendChild(btn);

  // ------- modal -------
  const modal = document.createElement("div");
  modal.id = "llamaModal";
  modal.innerHTML = `
    <div id="llamaHeader">Olá, eu sou o Feroz 🐺</div>
    <div id="llamaMessages"></div>
    <div id="llamaInputRow">
      <input id="llamaInput" placeholder="Digite sua mensagem aqui..." />
      <button id="llamaSend">&#10148;</button>
    </div>
  `;
  document.body.appendChild(modal);

  // ------- lógica -------
  btn.onclick = () => {
    const isVisible = modal.style.display === "flex";
    modal.style.display = isVisible ? "none" : "flex";
    if (!isVisible) {
      document.getElementById("llamaInput").focus();
    }
  };

  async function send() {
    const input = document.getElementById("llamaInput");
    const text = input.value.trim();
    if (!text) return;
    
    append("user", text);
    input.value = "";
    
    // Mostra indicador de digitação
    showTyping();

    try {
      // Pega o contexto base
      const resposta = await fetch("http://localhost/api/getDadosAluno.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ra: '43202'
        })
      });

      const baseContext = "Você é um chatbot educacional exclusivo para alunos da Unifecaf, integrado ao sistema EAD. Seu papel é fornecer assistência educacional, responder dúvidas com base nos dados disponíveis do aluno e manter um comportamento ético, focado e acolhedor. Comportamento Esperado: Forneça ajuda e explicações apenas relacionadas ao aluno, às matérias, notas, cursos ou à instituição Unifecaf/Fecaf. Use exclusivamente o “Contexto 2” como fonte de dados sobre o aluno. Se a variável mediaTotal for menor que 8, pergunte rapidamente e de forma neutra se o aluno deseja ajuda ou apoio adicional. Se o aluno estiver reprovado em alguma matéria (DP), trate o tema com calma, empatia e cuidado, e só aprofunde se o aluno tocar no assunto. Se ele falar de temas relacionados, foque em assuntos próximos à matéria reprovada. Comportamentos Proibidos: Não fale sobre assuntos fora da Unifecaf/Fecaf, como outras instituições, temas aleatórios ou não educacionais. Nunca use linguagem ofensiva, preconceituosa ou inadequada. Não mencione outras faculdades, universidades ou cursos externos à Unifecaf. Mantenha o foco na experiência do aluno e promova um ambiente respeitoso e educacional.";
      const dadosAluno = await resposta.text();
      const fullContext = baseContext + "\n\n" + dadosAluno;

      // Envia a requisição ao backend
      const r = await fetch("http://127.0.0.1:5050/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          context: fullContext
        })
      });

      const j = await r.json();
      hideTyping();
      append("bot", j.answer);
    } catch (err) {
      console.error(err);
      hideTyping();
      append("bot", "⚠️ Erro: não consegui responder no momento.");
    }
  }

  function append(role, text) {
    const messagesContainer = document.getElementById("llamaMessages");
    const divMsg = document.createElement("div");
    divMsg.className = `message ${role}-message`;
    
    if (role === "bot") {
      divMsg.innerHTML = `🤖 ${text}`;
    } else {
      divMsg.innerHTML = `${text}`;
    }
    
    messagesContainer.appendChild(divMsg);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function showTyping() {
    const messagesContainer = document.getElementById("llamaMessages");
    const typingDiv = document.createElement("div");
    typingDiv.id = "typingIndicator";
    typingDiv.className = "typing-indicator";
    typingDiv.innerHTML = `🤖 <span class="typing-dots">Digitando</span>`;
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function hideTyping() {
    const typingIndicator = document.getElementById("typingIndicator");
    if (typingIndicator) {
      typingIndicator.remove();
    }
  }

  document.getElementById("llamaSend").onclick = send;
  document.getElementById("llamaInput").addEventListener("keyup", e => {
    if (e.key === "Enter") send();
  });

  // Adiciona mensagem de boas-vindas
  setTimeout(() => {
    append("bot", "Como posso te ajudar hoje?");
  }, 500);
})();