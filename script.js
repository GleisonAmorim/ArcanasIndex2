let cartas = [];
let mapaTeclas = {};
let pastaSelecionada = "";

function carregarCartas() {
    const jogo = document.getElementById('seletorJogo').value;
    pastaSelecionada = jogo;

    if (jogo === "" || jogo === "Jogo" || jogo === "Select") {
        cartas = [];
        mapaTeclas = {};
        return;
    }

    cartas = [];
    mapaTeclas = {};

    const nomesArquivos = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's'];

    nomesArquivos.forEach(nome => {
        cartas.push(`${jogo}/${nome}.jpeg`);
        mapaTeclas[nome] = `${jogo}/${nome}.jpeg`;
    });

    console.log("Cartas carregadas:", cartas);
}

function escolher() {
    if (cartas.length === 0) {
        alert("Por favor, selecione um jogo antes!");
        return;
    }

    const sorteada = cartas[Math.floor(Math.random() * cartas.length)];
    document.getElementById('card-image').src = sorteada;
    document.getElementById('somSorteio').play();
};

const tempoGiro = 1500; // Tempo da animação de virar a carta (ms)

function sortearCarta(cartaEspecifica = null) {
    const seletor = document.getElementById('seletorJogo');
    const jogoSelecionado = seletor.value;

    // Verificação se o usuário esqueceu de escolher um jogo
    if (jogoSelecionado === "" || jogoSelecionado === "Jogo" || jogoSelecionado === "Select") {
        alert("Por favor, selecione um jogo antes de sortear uma carta!");
        return;
    }

    const som = document.getElementById('somSorteio');
    som.currentTime = 0;
    som.play();

    const card = document.getElementById('card');
    const cardImage = document.getElementById('card-image');

    // Gira a carta para as costas
    card.classList.remove('is-flipped');

    // Sorteia a nova carta
    const carta = cartaEspecifica || cartas[Math.floor(Math.random() * cartas.length)];

    // Espera a animação terminar (tempo de virar para costas)
    setTimeout(() => {
        cardImage.src = carta;
        card.classList.add('is-flipped');

        // EXIBIR INFORMAÇÕES DA CARTA
        const partes = carta.split('/');  // Exemplo: ["1dogma", "q.jpeg"]
        const deck = partes[0];
        const arquivo = partes[1];
        const nomeCarta = arquivo.replace('.jpeg', '');

        document.getElementById('infoCarta').innerHTML = `
            <strong>Carta sorteada:</strong><br>
            Nome: ${nomeCarta.toUpperCase()}<br>
            Deck: ${deck}
        `;
    }, tempoGiro);
}


// Evento de teclado
document.addEventListener('keydown', function (event) {
    const tecla = event.key.toLowerCase();
    const seletor = document.getElementById('seletorJogo');
    const jogoSelecionado = seletor.value;

    if ((jogoSelecionado === "" || jogoSelecionado === "Jogo" || jogoSelecionado === "Select") && mapaTeclas[tecla]) {
        alert("Select a Game");
        return;
    }

    if (mapaTeclas[tecla]) {
        sortearCarta(mapaTeclas[tecla]);
    }

    if (event.altKey && tecla === 'b') {
        abrirCartaEmPopup();
    }
});

const cardContainer = document.querySelector('.card-container');
let isDragging = false;
let offsetX = 0;
let offsetY = 0;

cardContainer.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - cardContainer.offsetLeft;
    offsetY = e.clientY - cardContainer.offsetTop;
    cardContainer.style.cursor = 'grabbing';
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    cardContainer.style.cursor = 'grab';
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    let left = e.clientX - offsetX;
    let top = e.clientY - offsetY;

    const maxLeft = window.innerWidth - cardContainer.offsetWidth;
    const maxTop = window.innerHeight - cardContainer.offsetHeight;

    if (left < 0) left = 0;
    if (top < 0) top = 0;
    if (left > maxLeft) left = maxLeft;
    if (top > maxTop) top = maxTop;

    cardContainer.style.left = left + 'px';
    cardContainer.style.top = top + 'px';
});

function virarParaCostas() {
    const card = document.getElementById('card');
    card.classList.remove('is-flipped');
}

function voltarParaIndex() {
    window.location.href = "index.html";
}

function abrirCartaEmPopup() {
    const cartaAtual = document.getElementById('card-image').src;

    const largura = screen.width;
    const altura = screen.height;

    const popup = window.open('', '', `width=${largura},height=${altura},top=0,left=0`);

    if (popup) {
        popup.moveTo(0, 0);
        popup.resizeTo(largura, altura);

        popup.document.write(`
<html>
<head>
    <title>Carta Destacada</title>
    <style>
        html, body {
            margin: 0;
            padding: 0;
            height: 100%;
            width: 100%;
            background-color: black;
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            border-radius: 0;
            box-shadow: none;
        }
    </style>
</head>
<body>
    <img src="${cartaAtual}" alt="Carta Destacada">
</body>
</html>
        `);

        popup.document.close();
    } else {
        alert('Pop-up bloqueado. Por favor, permita pop-ups para este site.');
    }
}
