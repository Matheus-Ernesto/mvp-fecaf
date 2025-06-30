const containerTrilha = document.querySelector('div[role="region"].d2l-widget.d2l-tile.d2l-widget-padding-full.d2l-custom-widget');

async function PegarTextoTrilha(contextoTexto, userMessage = null) {
    const divTexto = document.getElementById("Trilha_texto");
    try {
        const r = await fetch("http://127.0.0.1:5050/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                message: userMessage ?? "Faça uma lista para trillha de estudos para mim, de acordo com minha nota, além disso, não fale mais que 30 palavras nessa mensagem. Também fala em forma de lista.",
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

async function iniciarTrilha() {
    try {
        const contextoResp = await fetch("http://localhost/api/getMentorIA.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ra: "12345" })
        });

        const contextoJson = await contextoResp.json();
        const contextoTexto = JSON.stringify(contextoJson, null, 2);

        if (containerTrilha) {
            // Título <h2>
            const titulo = document.createElement('h2');
            titulo.textContent = 'Trilha de estudos';
            titulo.style.marginTop = '12px';
            titulo.style.marginBottom = '10px';
            titulo.style.fontSize = '22px';
            titulo.style.color = '#000';
            container.appendChild(titulo);
                
            // Div principal
            const redDiv = document.createElement('div');
            redDiv.id = "Trilha_texto";
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
            containerTrilha.appendChild(redDiv);

            // Primeira mensagem automática
            PegarTextoTrilha(contextoTexto);
        } else {
            console.log('Div de destino não encontrada.');
        }
    } catch (err) {
        console.error('Erro ao buscar contexto:', err);
    }
}

iniciarTrilha();
