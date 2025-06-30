const containerMentorIA = document.querySelector('div[role="region"].d2l-widget.d2l-tile.d2l-widget-padding-full.d2l-custom-widget');

async function PegarTextoMentoria(contextoTexto, userMessage = null) {
    const divTexto = document.getElementById("mentoria_texto");
    try {
        const r = await fetch("http://127.0.0.1:5050/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                message: userMessage ?? "Tire dúvidas sobre essa matéria, me explicando de forma dependente da minha nota, se maior, mais específico seja, se menor, mais simples e com mais analogias faça. Agora, apenas responda: 'Olá, sou seu Mentor IA dessa matéria, como posso ajudar?', além disso, não fale mais que 15 palavras nessa primeira mensagem.",
                context: contextoTexto
            })
        });

        const j = await r.json();
        divTexto.textContent = j.answer;
    } catch (err) {
        console.error(err);
        divTexto.textContent = "⚠️ erro: não consegui responder.";
    }
}

async function iniciarMentoria() {
    try {
        const contextoResp = await fetch("http://localhost/api/getMentorIA.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ra: "12345" })
        });

        const contextoJson = await contextoResp.json();
        const contextoTexto = JSON.stringify(contextoJson, null, 2);

        if (containerMentorIA) {
            // Título <h2>
            const titulo = document.createElement('h2');
            titulo.textContent = 'Mentoria do Aluno';
            titulo.style.marginTop = '12px';
            titulo.style.marginBottom = '10px';
            titulo.style.fontSize = '22px';
            titulo.style.color = '#000';
            containerMentorIA.appendChild(titulo);

            // Div principal
            const redDiv = document.createElement('div');
            redDiv.id = "mentoria_texto";
            redDiv.style.width = '100%';
            redDiv.style.minHeight = '150px';
            redDiv.style.backgroundColor = '#f2f2f2';
            redDiv.style.marginTop = '10px';
            redDiv.style.padding = '15px';
            redDiv.style.color = '#333';
            redDiv.style.fontSize = '20px';
            redDiv.style.fontWeight = 'normal';
            redDiv.style.border = 'solid 2px black';
            redDiv.style.borderRadius = '8px';
            redDiv.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)';
            redDiv.textContent = "...";
            containerMentorIA.appendChild(redDiv);

            // Área de entrada
            const inputContainer = document.createElement('div');
            inputContainer.style.marginTop = '10px';
            inputContainer.style.display = 'flex';
            inputContainer.style.gap = '10px';
            inputContainer.style.flexWrap = 'wrap';

            const input = document.createElement('input');
            input.type = 'text';
            input.placeholder = 'Digite sua dúvida...';
            input.style.flex = '1';
            input.style.padding = '10px';
            input.style.fontSize = '16px';
            input.style.border = '1px solid #ccc';
            input.style.borderRadius = '5px';

            const button = document.createElement('button');
            button.textContent = 'Enviar';
            button.style.padding = '10px 20px';
            button.style.backgroundColor = '#007BFF';
            button.style.color = '#fff';
            button.style.border = 'none';
            button.style.borderRadius = '5px';
            button.style.cursor = 'pointer';
            button.style.fontSize = '16px';

            button.onclick = () => {
                const mensagem = input.value.trim();
                if (mensagem !== '') {
                    redDiv.textContent = 'Carregando resposta...';
                    PegarTextoMentoria(contextoTexto, mensagem);
                    input.value = '';
                }
            };

            inputContainer.appendChild(input);
            inputContainer.appendChild(button);
            
            containerMentorIA.appendChild(inputContainer);

            // Primeira mensagem automática
            PegarTextoMentoria(contextoTexto);
        } else {
            console.log('Div de destino não encontrada.');
        }
    } catch (err) {
        console.error('Erro ao buscar contexto:', err);
    }
}

iniciarMentoria();
