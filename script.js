const board = document.querySelector('.board');

const blockHeight = 50;
const blockWidth = 50;

const cols = Math.floor(board.clientWidth / blockWidth);
const rows = Math.floor(board.clientHeight / blockHeight);

const blocks = [];

let snake = [{
    x: 1,
    y: 3
}];

let direction = 'down';

for(let row = 0; row < rows; row++){
    for(let col = 0; col < cols; col++){

        const block = document.createElement('div');

        block.classList.add('block');

        board.appendChild(block);

        blocks[`${row}-${col}`] = block;
    }
}

function render(){

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

    snake.forEach(segment => {
        blocks[`${segment.x}-${segment.y}`].classList.remove("fill");
    });

    snake[0] = head;

    snake.forEach(segment => {
        if(blocks[`${segment.x}-${segment.y}`]){
            blocks[`${segment.x}-${segment.y}`].classList.add("fill");
        }
    });
}

setInterval(() => {
    render();
}, 300);

addEventListener("keydown", (event) => {

    if(event.key === "ArrowUp"){
        direction = "up";
    }

    else if(event.key === "ArrowRight"){
        direction = "right";
    }

    else if(event.key === "ArrowLeft"){
        direction = "left";
    }

    else if(event.key === "ArrowDown"){
        direction = "down";
    }

});