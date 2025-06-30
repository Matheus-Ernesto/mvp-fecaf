// Procura pela div com o atributo role="region" e os identificadores específicos
const container = document.querySelector('div[role="region"].d2l-widget.d2l-tile.d2l-widget-padding-full.d2l-custom-widget');

// Função assíncrona para pegar o texto
async function PegarTexto() {
    const divTexto = document.getElementById("resumo_prox_content_texto");
    try {
        // Pega o contexto da API PHP local
        const contextoResp = await fetch("http://localhost/api/getMateria.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ra: "12345" }) // ajuste o RA se necessário
        });

        const contextoJson = await contextoResp.json();
        //console.log(contextoJson);
        const contextoTexto = JSON.stringify(contextoJson, null, 2); // transforma o objeto em texto legível

        // Envia a pergunta com o contexto para o Llama
        const r = await fetch("http://127.0.0.1:5050/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                message: "Fale qual meu próximo módulo de estudo (PrimeiroModuloNãoFeito), no formato de parágrafo único, com menos de 50 palavras, com '...' no final, e iniciando-se com algo como 'No seu próximo módulo, você '. Não alucine e escreva apenas o que tiver no Json, sem criar algo.",
                context: contextoTexto
            })
        });

        const j = await r.json();
        
        // Cria um parágrafo para o texto
        const paragrafoTexto = document.createElement('p');
        paragrafoTexto.textContent = j.answer;
        paragrafoTexto.style.margin = '0 0 20px 0';
        paragrafoTexto.style.fontSize = '16px';
        paragrafoTexto.style.lineHeight = '1.6';
        
        // Limpa o conteúdo da div e adiciona o parágrafo
        divTexto.innerHTML = '';
        divTexto.appendChild(paragrafoTexto);
        
        // Cria o botão com estilo idêntico ao HTML
        const botaoProximo = document.createElement('button');
        botaoProximo.textContent = 'Ir para o módulo';
        botaoProximo.style.backgroundColor = '#005baa';
        botaoProximo.style.color = 'white';
        botaoProximo.style.border = 'none';
        botaoProximo.style.padding = '10px 20px';
        botaoProximo.style.borderRadius = '8px';
        botaoProximo.style.fontSize = '15px';
        botaoProximo.style.cursor = 'pointer';
        botaoProximo.style.fontFamily = "'Segoe UI', sans-serif";
        
        // Adiciona efeito hover
        botaoProximo.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#004080';
        });
        botaoProximo.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '#005baa';
        });
        
        // Adiciona evento de clique para redirecionar
        botaoProximo.addEventListener('click', function() {
            // Assume que o link está em contextoJson.link ou similar
            const link = contextoJson.materia.link;
            if (link) {
                window.open(link, '_blank'); // Abre em nova aba
            } else {
                console.error('Link não encontrado no JSON');
            }
        });
        
        // Adiciona o botão à div
        divTexto.appendChild(botaoProximo);
    } catch (err) {
        console.error(err);
        divTexto.innerHTML = '';
        
        const paragrafoErro = document.createElement('p');
        paragrafoErro.textContent = "⚠️ Erro: não foi possível carregar o próximo módulo.";
        paragrafoErro.style.margin = '0';
        paragrafoErro.style.color = '#d32f2f';
        
        divTexto.appendChild(paragrafoErro);
    }
}

// Verifica se encontrou a div
if (container) {
    // Cria uma nova div com estilo consistente com o HTML
    const moduloDiv = document.createElement('div');

    // Atribui o ID
    moduloDiv.id = "resumo_prox_content_texto";

    // Título <h2>
    const titulo = document.createElement('h2');
    titulo.textContent = 'Resumo do próx. Módulo';
    titulo.style.marginTop = '12px';
    titulo.style.marginBottom = '10px';
    titulo.style.fontSize = '22px';
    titulo.style.color = '#000';
    container.appendChild(titulo);

    // Aplica estilos consistentes com o design do HTML
    moduloDiv.style.backgroundColor = '#fff';
    moduloDiv.style.padding = '30px';
    moduloDiv.style.borderRadius = '12px';
    moduloDiv.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    moduloDiv.style.fontFamily = "'Segoe UI', sans-serif";
    moduloDiv.style.fontSize = '16px';
    moduloDiv.style.lineHeight = '1.6';
    moduloDiv.style.color = '#333';
    moduloDiv.style.textAlign = 'center';
    
    // Layout flexível para conteúdo
    moduloDiv.style.minHeight = '100px';
    moduloDiv.style.display = 'flex';
    moduloDiv.style.flexDirection = 'column';
    moduloDiv.style.justifyContent = 'center';
    moduloDiv.style.alignItems = 'center';
    moduloDiv.style.border = 'solid 2px black';

    // Texto de carregamento inicial com cor mais suave
    moduloDiv.style.fontStyle = 'italic';
    moduloDiv.style.opacity = '0.7';
    moduloDiv.textContent = "Gerando introdução ao próximo módulo...";

    // Adiciona a nova div dentro da div existente
    container.appendChild(moduloDiv);

    // Chama a função após adicionar a div
    PegarTexto().then(() => {
        // Remove estilos de carregamento após carregar o conteúdo
        moduloDiv.style.fontStyle = 'normal';
        moduloDiv.style.opacity = '1';
    });
} else {
    console.log('Div de destino não encontrada.');
}