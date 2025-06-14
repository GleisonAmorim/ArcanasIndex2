const tempoGiro = 1500; // Tempo da animação de virar a carta (ms)
function sortearCarta(cartaEspecifica = null) {
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
        // Troca a imagem enquanto está de costas
        cardImage.src = carta;

        // Gira a carta para a frente (nova imagem)
        card.classList.add('is-flipped');
    }, tempoGiro);
}


// Evento de teclado
document.addEventListener('keydown', function (event) {
    const tecla = event.key.toLowerCase();
    if (mapaTeclas[tecla]) {
        sortearCarta(mapaTeclas[tecla]);
    }
});
const cardContainer = document.querySelector('.card-container');

let isDragging = false;
let offsetX = 0;
let offsetY = 0;

cardContainer.addEventListener('mousedown', (e) => {
    isDragging = true;
    // calcula a distância do clique para a borda superior/esquerda do container
    offsetX = e.clientX - cardContainer.offsetLeft;
    offsetY = e.clientY - cardContainer.offsetTop;
    cardContainer.style.cursor = 'grabbing';
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    cardContainer.style.cursor = 'grab';
});
function virarParaCostas() {
    const card = document.getElementById('card');
    card.classList.remove('is-flipped');
}
function voltarParaIndex() {
    window.location.href = "index.html";
}

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    // atualiza posição do container conforme o movimento do mouse
    let left = e.clientX - offsetX;
    let top = e.clientY - offsetY;

    // opcional: impede que o container saia da tela
    const maxLeft = window.innerWidth - cardContainer.offsetWidth;
    const maxTop = window.innerHeight - cardContainer.offsetHeight;

    if (left < 0) left = 0;
    if (top < 0) top = 0;
    if (left > maxLeft) left = maxLeft;
    if (top > maxTop) top = maxTop;

    cardContainer.style.left = left + 'px';
    cardContainer.style.top = top + 'px';
});
// Atalho ALT + B para abrir a carta atual em popup destacada
document.addEventListener('keydown', function (event) {
    if (event.altKey && event.key.toLowerCase() === 'b') {
        abrirCartaEmPopup();
    }
});

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

        popup.document.close(); // importante para renderizar o conteúdo
    } else {
        alert('Pop-up bloqueado. Por favor, permita pop-ups para este site.');
    }
}
