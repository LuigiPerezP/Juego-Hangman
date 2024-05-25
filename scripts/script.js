const wordDisplay = document.querySelector(".word-display");
const keyboardDiv = document.querySelector(".Keyboard");

let currentWord;

const getRandomWord = () => {
    //para generar una nueva paalbra y pista randomly
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord=word;
  console.log(word);
  document.querySelector(".hint-text b").innerText = hint;
  wordDisplay.innerHTML = word.split("").map(()=>`<li class="letter"></li>`).join("");
}

const initGame = (button,clickedLetter) => {
    //Se chequea si esta en la palabra
    if(currentWord.includes(clickedLetter)){
        console.log(clickedLetter, " is exist on the word");
    }else{
        console.log(clickedLetter, " is not on the word");
    }
}

//Para crear los botones desde consola.
for (let i = 97; i < 122; i++) {
    const button = document.createElement("button");
    button.innerText = String. fromCharCode (i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click",e=>initGame(e.target,String.fromCharCode(i)));

}

getRandomWord();