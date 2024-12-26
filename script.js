let currentAnswer, difficulty, carPosition = 90, minPosition = 0;

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
            num1 = Math.floor(Math.random() * 10) + 1;
            num2 = Math.floor(Math.random() * 10) + 1;
            break;
        case 'medio':
            num1 = Math.floor(Math.random() * 50) + 1;
            num2 = Math.floor(Math.random() * 50) + 1;
            break;
        case 'dificil':
            num1 = Math.floor(Math.random() * 100) + 1;
            num2 = Math.floor(Math.random() * 100) + 1;
            break;
    }

    if (operation === '/') {
        num1 = num1 * num2; // Garantir divisões inteiras
    }

    currentAnswer = eval(`${num1} ${operation} ${num2}`);
    document.getElementById('question').textContent = `Quanto é ${num1} ${operation} ${num2}?`;
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
            resultElement.textContent = '';
            document.querySelector('.game-area').style.display = 'none';
            document.getElementById('congratulations').style.display = 'block';
            document.getElementById('falling-messages').style.display = 'block';
            startFallingMessages();
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

function resetGame() {
    document.getElementById('congratulations').style.display = 'none';
    document.getElementById('falling-messages').style.display = 'none';
    document.querySelector('.game-area').style.display = 'none';
    document.querySelector('.level-buttons').style.display = 'block';
}

function startFallingMessages() {
    const messages = ['Parabéns!', 'Você é incrível!', 'Desafio completo!', 'Muito bem!'];
    setInterval(() => {
        const message = document.createElement('div');
        message.textContent = messages[Math.floor(Math.random() * messages.length)];
        message.style.left = `${Math.random() * 100}%`;
        document.getElementById('falling-messages').appendChild(message);
        setTimeout(() => message.remove(), 3000);
    }, 500);
}
