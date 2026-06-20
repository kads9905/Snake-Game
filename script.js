const board = document.querySelector('.board');

const blockHeight = 50;
const blockWidth = 50;

const cols = Math.floor(board.clientWidth / blockWidth);
const rows = Math.floor(board.clientHeight / blockHeight);

console.log(rows, cols);
console.log(board.clientHeight, board.clientWidth);

const blocks = [];

let snake = [
    {
        x: 0,
        y: 3
    }
];

for(let row = 0; row < rows; row++){
    for(let col = 0; col < cols; col++){

        const block = document.createElement('div');

        block.classList.add('block');

        board.appendChild(block);

        blocks[`${row}-${col}`] = block;
    }
}

snake.forEach(segment => {
    blocks[`${segment.x}-${segment.y}`]
        .classList.add('fill');
});


