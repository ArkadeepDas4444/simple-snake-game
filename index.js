let inputDir = {x: 0, y: 0};
let lastPaintTime = 0;
let snakeArr = [{x: 13, y: 15}];
let food = {x: 6, y: 7};
const eatSound = new Audio("sounds/eat-323883.mp3");
const gameOverSound = new Audio("sounds/game-over-arcade-6435.mp3");

function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if ((ctime - lastPaintTime)/1000 < 0.2)
        return;
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(sarr) {
    //If you bump into yourself
    for (let i = 1; i < snakeArr.length; i++) {
        if (sarr[i].x === sarr[0].x && sarr[i].y === sarr[0].y)
            return true;
    }

    //If you bump into the wall
    if (sarr[0].x <= 0 || sarr[0].x > 18 || sarr[0].y <= 0 || sarr[0].y > 18)
        return true;
}

function gameEngine() {
    // 1. UPDATE SNAKE ARRAY & FOOD
    //Game Over condition
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        alert("Game Over!!! Press any key to play again!");
        inputDir = {x: 0, y: 0};
        snakeArr = [{x: 13, y: 15}];
        score.textContent = "Score: 0";
    }

    //If you eat the food
    if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
        eatSound.play();
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});  //Snake grows
        score.textContent = "Score: " + (snakeArr.length-1);
        food = {x: Math.round(2 + 14*Math.random()), y: Math.round(2 + 14*Math.random())};  //Regenerate the food
    }

    //Moving the Snake
    for (let i = snakeArr.length-2; i >= 0; i--) {
        snakeArr[i+1] = {...snakeArr[i]};
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // 2. DISPLAY THE SNAKE & FOOD
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        const snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0)
            snakeElement.classList.add("head");
        else
            snakeElement.classList.add("snake-body");
        board.appendChild(snakeElement);
    });
    foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);
}

//Main Logic Starts Here
window.requestAnimationFrame(main);
window.addEventListener("keydown", e => {
    switch (e.key) {
        case "ArrowUp":
            if (!(inputDir.x === 0 && inputDir.y === 1)) {
                inputDir.x = 0;
                inputDir.y = -1;
            }
            break;
    
        case "ArrowDown":
            if (!(inputDir.x === 0 && inputDir.y === -1)) {
                inputDir.x = 0;
                inputDir.y = 1;
            }
            break;
    
        case "ArrowLeft":
            if (!(inputDir.x === 1 && inputDir.y === 0)) {
                inputDir.x = -1;
                inputDir.y = 0;
            }
            break;
    
        case "ArrowRight":
            if (!(inputDir.x === -1 && inputDir.y === 0)) {
                inputDir.x = 1;
                inputDir.y = 0;
            }
            break;
    
        default:
            break;
    }
})