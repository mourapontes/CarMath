// Arquivo JS: script.js

let currentAnswer;
let difficulty;
let carPosition = 90;
const minPosition = 0;

function startGame(level) {
    difficulty = level;
    document.querySelector('.game-area').style.display = 'block';
    document.getElementById('congratulations').style.display = 'none';
    document.getElementById('falling-messages').style.display = 'none';
    document.getElementById('falling-messages').innerHTML = ''; // Limpa mensagens antigas
    document.getElementById('result').textContent = '';
    carPosition = 90;
    document.getElementById('car').style.right = `${100 - carPosition}%`;
    generateQuestion();
    document.getElementById('answer').focus();
}

function generateQuestion() {
    const operations = ['+', '-', '*', '/'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    let num1, num2;

    switch (difficulty) {
        case 'facil':
            num1 = getRandomNumber(1, 10);
            num2 = getRandomNumber(1, 10);
            break;
        case 'medio':
            num1 = getRandomNumber(1, 50);
            num2 = getRandomNumber(1, 50);
            break;
        case 'dificil':
            num1 = getRandomNumber(1, 100);
            num2 = getRandomNumber(1, 100);
            break;
        default:
            throw new Error('Nível de dificuldade desconhecido');
    }

    if (operation === '/') {
        num1 = num1 * num2; // Garante divisões inteiras
    }

    currentAnswer = calculateAnswer(num1, num2, operation);

    // Substitui * por x na exibição
    const displayOperation = operation === '*' ? 'x' : operation;
    document.getElementById('question').textContent = `Quanto é ${num1} ${displayOperation} ${num2}?`;
}

function calculateAnswer(num1, num2, operation) {
    switch (operation) {
        case '+': return num1 + num2;
        case '-': return num1 - num2;
        case '*': return num1 * num2;
        case '/': return num1 / num2;
        default: throw new Error('Operação desconhecida');
    }
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

document.getElementById('submit-btn').addEventListener('click', () => {
    const userAnswer = parseFloat(document.getElementById('answer').value);
    const resultElement = document.getElementById('result');

    if (isNaN(userAnswer)) {
        resultElement.textContent = 'Por favor, insira um número válido!';
        resultElement.style.color = 'red';
        return;
    }

    if (userAnswer === currentAnswer) {
        resultElement.textContent = 'Correto! O carro avança!';
        resultElement.style.color = 'green';
        carPosition -= 15;
        document.getElementById('car').style.right = `${100 - carPosition}%`;

        if (carPosition <= minPosition) {
            endGame();
        } else {
            generateQuestion();
        }
    } else {
        resultElement.textContent = `Errado! A resposta correta era ${currentAnswer}.`;
        resultElement.style.color = 'red';
    }

    document.getElementById('answer').value = '';
    document.getElementById('answer').focus();
});

function endGame() {
    document.getElementById('result').textContent = '';
    document.querySelector('.game-area').style.display = 'none';
    document.getElementById('congratulations').style.display = 'block';
    document.getElementById('falling-messages').style.display = 'block';
    startFallingMessages();
}

function resetGame() {
    document.querySelector('.game-area').style.display = 'none';
    document.getElementById('congratulations').style.display = 'none';
    document.getElementById('falling-messages').style.display = 'none';
    document.getElementById('falling-messages').innerHTML = ''; // Limpa mensagens antigas
    document.getElementById('result').textContent = '';
    carPosition = 90;
    document.getElementById('car').style.right = `${100 - carPosition}%`;
    difficulty = null;
}

function startFallingMessages() {
    const messages = ["Parabéns!", "Você conseguiu!", "Boa!", "Continue assim!", "Fantástico!"];
    const container = document.getElementById('falling-messages');

    // Adiciona mensagens de forma aleatória com intervalo fixo
    const intervalId = setInterval(() => {
        const messageElement = document.createElement('div');
        messageElement.textContent = messages[Math.floor(Math.random() * messages.length)];
        messageElement.className = 'falling-message';

        // Posicionamento inicial aleatório
        messageElement.style.left = `${Math.random() * 90}%`;
        messageElement.style.top = '-50px'; // Inicia acima da tela

        container.appendChild(messageElement);

        // Animação para fazer a mensagem cair
        const duration = 4000; // Duração da queda em milissegundos
        messageElement.animate([
            { transform: 'translateY(0)' },
            { transform: `translateY(${window.innerHeight}px)` }
        ], {
            duration: duration,
            easing: 'linear'
        });

        // Remove mensagem ao final da animação
        setTimeout(() => {
            container.removeChild(messageElement);
        }, duration);
    }, 800); // Intervalo entre novas mensagens

    // Para mensagens após o jogo finalizar completamente
    setTimeout(() => {
        clearInterval(intervalId);
    }, 10000); // Ajuste este tempo conforme necessário
}
