const board = document.querySelector('.board');
const startButton = document.querySelector('.btn-start');
const modal = document.querySelector('.modal');
const startGameModal = document.querySelector('.start-game');
const gameOverModal = document.querySelector('.game-over');
const restartButton = document.querySelector('.btn-restart');
const highScoreElement = document.querySelector('#high-score');
const scorElement = document.querySelector('#score');
const timeElement = document.querySelector('#time');
const upKey = document.querySelector('#up-key');
const downKey = document.querySelector('#down-key');
const leftKey = document.querySelector('#left-key');
const rightKey = document.querySelector('#right-key');

const blockHeight = 50;
const blockWidth = 50;

const cols = Math.floor(board.clientWidth / blockWidth);
const rows = Math.floor(board.clientHeight / blockHeight);


const blocks = [];

let snake = [{
    x: 0,
    y: 3
}];

let direction = 'right';

function highlightKey(keyElement){

    keyElement.classList.add('active');

    setTimeout(() => {
        keyElement.classList.remove('active');
    }, 300);

}

function generateFood(){

    let newFood;

    do{
        newFood = {
            x: Math.floor(Math.random() * rows),
            y: Math.floor(Math.random() * cols)
        };
    } while(
        snake.some(segment =>
            segment.x === newFood.x &&
            segment.y === newFood.y
        )
    );

    return newFood;
}

let highScore = localStorage.getItem("highscore") || 0;
let score = 0;
let time = '00:00';
let intervalId = null;
let timerIntervalId = null;

highScoreElement.innerText = highScore;

let food = generateFood();

for(let row = 0; row < rows; row++){
    for(let col = 0; col < cols; col++){

        const block = document.createElement('div');

        block.classList.add('block');

        board.appendChild(block);

        blocks[`${row}-${col}`] = block;
    }
}

function startTimer(){

    timerIntervalId = setInterval(() => {

        let [min, sec] = time.split(":").map(Number);

        if(sec == 59){
            min++;
            sec = 0;
        }else{
            sec++;
        }

        time =
        `${String(min).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;

        timeElement.innerText = time;

    }, 1000);

}

function render(){

    blocks[`${food.x}-${food.y}`].classList.add("food");

    let head = null;

    if(direction === "left"){
        head = {x: snake[0].x, y: snake[0].y - 1};
    }
    else if(direction === "right"){
        head = {x: snake[0].x, y: snake[0].y + 1};
    }
    else if(direction === "up"){
        head = {x: snake[0].x - 1, y: snake[0].y};
    }
    else if(direction === "down"){
        head = {x: snake[0].x + 1, y: snake[0].y};
    }

    if(
    head.x < 0 ||
    head.y < 0 ||
    head.x >= rows ||
    head.y >= cols
    ){
        clearInterval(intervalId);
        clearInterval(timerIntervalId);

        modal.style.display = "flex";
        startGameModal.style.display = "none";
        gameOverModal.style.display = "flex";

        return;
    }

    snake.forEach(segment => {
        blocks[`${segment.x}-${segment.y}`].classList.remove("fill");
    });
    
    for(let segment of snake){
        if(
            segment.x === head.x &&
            segment.y === head.y
        ){
            clearInterval(intervalId);
            clearInterval(timerIntervalId);

            modal.style.display = "flex";
            startGameModal.style.display = "none";
            gameOverModal.style.display = "flex";

return;
        }
    }

    if(head.x === food.x && head.y === food.y){

        blocks[`${food.x}-${food.y}`].classList.remove("food");

        food = generateFood();

        snake.unshift(head);

        score += 1;

        scorElement.innerText = score;

        if(score > highScore){

            highScore = score;

            localStorage.setItem(
                "highscore",
                highScore.toString()
            );

            highScoreElement.innerText = highScore;
        }

        }else{
            snake.unshift(head);
            snake.pop();
        }

        snake.forEach(segment => {
            if(blocks[`${segment.x}-${segment.y}`]){
                blocks[`${segment.x}-${segment.y}`].classList.add("fill");
            }
        });
}


addEventListener("keydown", (event) => {

    if(event.key === "ArrowUp" && direction != "down"){
        direction = "up";
        highlightKey(upKey);

    }

    else if(event.key === "ArrowRight" && direction != "left"){
        direction = "right";
        highlightKey(rightKey);
    }

    else if(event.key === "ArrowLeft" && direction != "right"){
        direction = "left";
        highlightKey(leftKey);
    }

    else if(event.key === "ArrowDown" && direction != "up"){
        direction = "down";
        highlightKey(downKey);
    }

});

startButton.addEventListener("click", () => {

    modal.style.display = "none";

    intervalId = setInterval(() => {
        render();
    }, 300);

    startTimer();

});


restartButton.addEventListener("click", restartGame);

function restartGame(){

    location.reload();

}