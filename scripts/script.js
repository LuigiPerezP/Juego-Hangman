/**
 * Representa la imagen del ahorcado en el juego.
 */
const hangmanImage = document.querySelector(".Ahorcado-Grafica img");

/**
 * Representa la palabra a adivinar en el juego.
 */
const wordDisplay = document.querySelector(".word-display");

/**
 * Representa el contador de intentos fallidos en el juego.
 */
const guessesText = document.querySelector(".guesses-text b");

/**
 * Representa el teclado del juego.
 */
const keyboardDiv = document.querySelector(".Keyboard");

/**
 * Representa el modal del juego.
 */
const gameModal = document.querySelector(".game-modal");

/**
 * Representa el botón de jugar de nuevo.
 */
const playAgainBtn = document.querySelector(".play-again");

/**
 * Representa el resumen del jugador en el juego.
 */
const playerSummary = document.querySelector(".player-summary b");

/**
 * Representa la palabra actual en el juego.
 */
let currentWord;

/**
 * Representa las letras correctas adivinadas en el juego.
 */
let correctLetters;

/**
 * Representa el contador de intentos fallidos en el juego.
 */
let wrongGuessCount;

/**
 * Representa el contador de victorias en el juego.
 */
let wins = 0;

/**
 * Representa el contador de derrotas en el juego.
 */
let losses = 0;

/**
 * Representa el número máximo de intentos permitidos en el juego.
 */
const maxGuesses = 6;

/**
 * Reinicia el juego, restableciendo las variables y la interfaz de usuario.
 */
const resetGame = () => {
correctLetters = [];
wrongGuessCount = 0;
hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
guessesText.innerText = `${wrongGuessCount}/${maxGuesses}`;
playerSummary.innerText = `${wins} Ganadas / ${losses} Perdidas.`;
keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
gameModal.classList.remove("show");
}

/**
 * Obtiene una palabra aleatoria del juego.
 */
const getRandomWord = () => {
const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
currentWord = word;
document.querySelector(".hint-text b").innerText = hint;
resetGame();
}

/**
 * Muestra el resultado del juego (victoria o derrota).
 * @param {boolean} isVictory - Indica si el juego fue una victoria o no.
 */
const gameOver = (isVictory) => {
setTimeout(() => {
    const modalText = isVictory ? `Encontraste la palabra:` : `La palabra correcta era:`;
    gameModal.querySelector("img").src = `images/${isVictory ? `victory` : `lost`}.gif`;
    gameModal.querySelector("h4").innerText = `${isVictory ? `FELICIDADES!` : `PERDISTE!`}`;
    gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
    gameModal.classList.add("show");
}, 300);
}

/**
 * Inicializa el juego al hacer clic en una letra del teclado.
 * @param {HTMLElement} button - El botón que se ha clicado.
 * @param {string} clickedLetter - La letra que se ha clicado.
 */
const initGame = (button, clickedLetter) => {
if (currentWord.includes(clickedLetter)) {
    [...currentWord].forEach((letter, index) => {
        if (letter === clickedLetter) {
            correctLetters.push(letter);
            wordDisplay.querySelectorAll("li")[index].innerText = letter;
            wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
        }
    })
} else {
    wrongGuessCount++;
    hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
}

button.disabled = true;
guessesText.innerText = `${wrongGuessCount}/${maxGuesses}`
if (wrongGuessCount === maxGuesses) {
    losses++;
    return gameOver(false);
}
if (correctLetters.length === currentWord.length) {
    wins++;
    return gameOver(true);
}
}

// Crea los botones del teclado y agrega los event listeners.
for (let i = 97; i < 123; i++) {
const button = document.createElement("button");
button.innerText = String.fromCharCode(i);
keyboardDiv.appendChild(button);
button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)));
}

// Inicia el juego al cargar la página.
getRandomWord();

// Agrega el event listener para jugar de nuevo.
playAgainBtn.addEventListener("click", getRandomWord);