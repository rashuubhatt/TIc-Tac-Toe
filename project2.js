let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let msgContainer = document.querySelector(".msg-container");
let newGameBtn = document.querySelector("#new-btn");
let msg = document.querySelector("#msg");
let body = document.querySelector("body");

let turnO = true; // Player 1
let gameOver = false;

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];
const resetGame = () => {
    turnO = true;
    gameOver = false;
    enableBoxes();
    msg.innerText = "";
    msgContainer.classList.add("hide");
    body.style.backgroundColor = "rgb(73, 112, 183)";

//RESET SOUND
 const resetBtn = new Audio("clickSound (mp3cut.net).mp3");
 resetBtn.currentTime = 0;
 resetBtn.play();

};

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) => {
    if (winner) {
        msg.innerText = `Congratulations! winner is ${winner}`;
        body.style.backgroundColor = "chartreuse";
        msg.style.color = "white";
        const winSound = new Audio("GameWinSound (mp3cut.net).mp3");   //sound
        winSound.currentTime = 0;
        winSound.play();
    } else {
        msg.innerText = "It's a tie!";
        body.style.backgroundColor = "brown" ;
        msg.style.color ="white" ;
        //SOUND...
        const tieSound = new Audio("drawGameSound (mp3cut.net).mp3");       //sound
        tieSound.currentTime = 0;
        tieSound.play();

    }
    msgContainer.classList.remove("hide");
    disableBoxes();
    gameOver = true;

};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val) {
            showWinner(pos1Val);
            return pos1Val;
        }
    }

    let isBoardFull = Array.from(boxes).every((box) => box.innerText !== "");
    if (isBoardFull) {
        showWinner("");
    }
};

boxes.forEach((box) => {

    box.addEventListener("click", () => {
        const clickSound = new Audio("mouseClickSound (mp3cut.net).mp3");       //sound
        clickSound.currentTime = 0;
        clickSound.play();

        if (gameOver || box.innerText !== "") {
            return;
        }

        box.innerText = turnO ? "O" : "X";
        box.disabled = true;
        turnO = !turnO;
        checkWinner();
    });
});

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);


