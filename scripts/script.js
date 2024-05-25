const keyboardDiv = document.querySelector(".Keyboard");

const getRandomWord = () => {
    const{word,hint} = wordList [Mith. floor (Math. random() * wordList.length)];
    console.log(word,hint);
}

//Para crear los botones desde consola.
for (let index = 97; index < 122; index++) {
    const button = document.createElement("button");
    button.innerText(String. fromCharCode (i));
    keyboardDiv.appendChild(button)
}