let words = ['Amor', 'céu', 'vento', 'livro', 'sonho', 'azul', 'noite', 'sol', 'praia', 'mesa', 'solta', 'verde',
    'ponte', 'fruta', 'vento', 'lume', 'canto', 'gosto', 'livro', 'vaga', 'pista', 'luz', 'tinta', 'escada', 'campo',
    'sorriso', 'cena', 'fogo', 'folha', 'espaço', 'ouro', 'festa', 'selo', 'faca', 'molho', 'janta', 'ponto', 'farol',
    'chuva', 'tela', 'ciclo', 'nota', 'chave', 'peixe', 'dia', 'prato', 'canto', 'nuvem', 'muro'];

let chosenWord;
let correctWord = "";
let letters = [];
let tries = 5;
let triesNeeded = 0;
let correctTries = 0;
let wrongTries = 0;
let gameOver = false;

function pickRandomWord() {
    chosenWord = words[Math.floor(Math.random() * words.length)].toUpperCase();
    drawLines();
    return chosenWord;
}

function checkLetter(letter) {
    if (!gameOver) {
        if (!letters.includes(letter)) {
            letters.push(letter);
            triesNeeded++;
            if (chosenWord.includes(letter)) {
                for (let i = 0; i < chosenWord.length; i++) {
                    if (chosenWord[i] === letter) {
                        correctTries++;
                        drawCorrectLetter(i);
                        addCorrectLetter(i);
                    }
                }
                checkGameOver();
                disableKey(letter, "correct");
            } else {
                tries--;
                wrongTries++;
                drawHangman();
                checkGameOver();
                disableKey(letter, "incorrect");
            }
        }
    }   
}

function checkGameOver() {
    if (tries == 0) {
        // gameover
        playAgain();
        showEndGameText("lose", "☠️ Fim de Jogo! Você perdeu! ☠️");
        gameOver = true;
    }

    if (correctWord.length === chosenWord.length) {
        // gamewin
        playAgain();
        poof();
        showEndGameText("win", " 🏆 Parabéns! Você venceu! 🏆");
        gameOver = true;
    }
}

function addCorrectLetter(i) {
    correctWord += chosenWord[i].toUpperCase();
}

function disableKey(key, status) {
    //Add respective class to visually disable key
    const keysButtons = document.querySelectorAll('.letter');
    for (let i = 0; i < keysButtons.length; i++) {
        if (keysButtons[i].textContent === key) {
            keysButtons[i].classList.add(status);
            break;
        }
    }
}

function addListeners() {
    //Adds event listeners to keyboard
    window.addEventListener('keydown', (e) => {
        let letter = e.key.toUpperCase();
        // validation if it's a letter
        if (keys.toString().includes(letter)) {
            checkLetter(letter);
        }
    });

    //Adds events listeners to virtual keyboard
    const keysButtons = document.querySelectorAll('.letter');
    keysButtons.forEach(key => key.addEventListener('click', () => {
        let letter = key.textContent;
        checkLetter(letter);
    }));
}