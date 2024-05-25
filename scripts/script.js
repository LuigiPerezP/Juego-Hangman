const hangmanImage= document.querySelector(".Ahorcado-Grafica img");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".Keyboard");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = document.querySelector(".play-again");

let currentWord,correctLetters,wrongGuessCount;
const maxGuesses=6;


const resetGame = () => {
    //Se resetean variables internas y aspectos de la UI.
    correctLetters=[]
    wrongGuessCount =0;
    hangmanImage.src=`images/hangman-${wrongGuessCount}.svg`;
    guessesText.innerText = `${wrongGuessCount}/${maxGuesses}`;
    keyboardDiv.querySelectorAll("button").forEach(btn=>btn.disabled =false);
    wordDisplay.innerHTML = currentWord.split("").map(()=>`<li class="letter"></li>`).join("");
    gameModal.classList.remove("show");
}

const getRandomWord = () => {
    //para generar una nueva palabra y pista randomly.
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord=word;
  document.querySelector(".hint-text b").innerText = hint;
  resetGame();
}

const gameOver = (isVictory) =>{
    //Se muestran los resultados.
    setTimeout(()=>{
        const modalText = isVictory ?  `Encontraste la palabra:` : `La palabra correcta era:`;
        gameModal.querySelector("img").src = `images/${isVictory ? `victory` : `lost`}.gif`;
        gameModal.querySelector("h4").innerText = `${isVictory ? `FELICIDADES!` : `PERDISTE!`}`;
        gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
        gameModal.classList.add("show");
    },300);
}


const initGame = (button,clickedLetter) => {
    //Se chequea si esta en la palabra.
    if(currentWord.includes(clickedLetter)){
        //Se muestra en la rayita correspondiente la letra adivinada
        [... currentWord].forEach( (letter, index) => {
            if(letter === clickedLetter){
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText=letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        })

    }else{
        //Se actualiza intetos fallidos y la foto del ahorcado va avanzando.
        wrongGuessCount++;
        hangmanImage.src=`images/hangman-${wrongGuessCount}.svg`;
    }

    button.disabled = true;
    guessesText.innerText = `${wrongGuessCount}/${maxGuesses}`
    if(wrongGuessCount===maxGuesses) return gameOver(false);
    if(correctLetters.length===currentWord.length) return gameOver(true);
}

//Para crear los botones desde consola y los event listener es la accion que realizan.
for (let i = 97; i < 122; i++) {
    const button = document.createElement("button");
    button.innerText = String. fromCharCode (i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click",e=>initGame(e.target,String.fromCharCode(i)));

}

getRandomWord();
playAgainBtn.addEventListener("click",getRandomWord);