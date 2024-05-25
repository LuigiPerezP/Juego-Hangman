const wordDisplay = document.querySelector(".word-display");
const keyboardDiv = document.querySelector(".Keyboard");

const getRandomWord = () => {
    //para generar una nueva palbra y pista randomly
    const { word , hint } = wordList [Math.floor (Math. random() * wordList.length)];
    console.log(word,hint);
}

//Para crear los botones desde consola.
for (let i = 97; i < 122; i++) {
    const button = document.createElement("button");
    button.innerText = String. fromCharCode (i);
    keyboardDiv.appendChild(button)
}
getRandomWord();