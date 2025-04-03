const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const startButton = document.querySelector('#start-pause');
const iniciarOuPausarbutton = document.querySelector('#start-pause span');
const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
const audioPlay = new Audio('/sons/play.wav');
const audioPausa = new Audio('/sons/pause.mp3');
const audioTempoFinalizado = new Audio('./sons/beep.mp3');
const iniciarOuPausarBtIcone = document.querySelector(".app__card-primary-butto-icon");
const tempoNaTela = document.querySelector('#timer');

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

musica.loop = true;

musicaFocoInput.addEventListener('change', () => {
    musica.paused ? musica.play() : musica.pause();
});

focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco');
    focoBt.classList.add('active');
});

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');
});

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo');
    longoBt.classList.add('active');
});

function alterarContexto(contexto) {
    mostrarTempo();
    botoes.forEach(botao => botao.classList.remove('active'));
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);
    
    const titulos = {
        'foco': `Otimize sua produtividade,<br><strong class="app__title-strong">mergulhe no que importa.</strong>`,
        'descanso-curto': `Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>`,
        'descanso-longo': `Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>`
    };
    
    titulo.innerHTML = titulos[contexto] || '';
}

function contagemRegressiva() {
    if (tempoDecorridoEmSegundos <= 0) {
        audioTempoFinalizado.play();
        alert('Tempo Finalizado');
        zerar();
        return;
    }
    tempoDecorridoEmSegundos--;
    mostrarTempo();
}

startButton.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
    if (intervaloId) {
        audioPausa.play();
        zerar();
        return;
    }
    audioPlay.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    iniciarOuPausarbutton.textContent = "Pausar";
    iniciarOuPausarBtIcone.setAttribute('src', `/imagens/pause.png`);
}

function zerar() {
    clearInterval(intervaloId);
    iniciarOuPausarbutton.textContent = "Começar";
    iniciarOuPausarBtIcone.setAttribute('src', `/imagens/play_arrow.png`);
    intervaloId = null;
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'});
    tempoNaTela.textContent = tempoFormatado;
}

mostrarTempo();