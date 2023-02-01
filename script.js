const canvas = document.getElementById("game");
const context = canvas.getContext("2d");
const tileSize = 25;
const boardBackground = "white";
const numOfRows = canvas.width/tileSize;
const numOfColumns = canvas.height/tileSize;
let running = false;
let snake = {
    components: [{row: numOfRows/2, column: numOfColumns/2},
        {row: (numOfRows/2)-1, column: numOfColumns/2},
        {row: (numOfRows/2)-2, column: numOfColumns/2},
        {row: (numOfRows/2)-3, column: numOfColumns/2}],
    dx: 1,
    dy: 0
};
let food = {
   row: 0,
   column: 0 
};
let availableTiles = [];

init();

function init(){
    drawSnake();
    populateAvailableTiles();
    createFood();
    drawFood();
}

function startGame(){
    if(running){
        return;
    }
    running = true;
    window.requestAnimationFrame(gameLoop);
}

function gameLoop(){
    setTimeout(()=>{
        clearBoard();
        drawFood();
        moveSnake();
        drawSnake();
        gameLoop();
    }, 200)
}

function populateAvailableTiles(){
    for(let i = 0;i<numOfRows;i++){
        for(let j = 0;j<numOfColumns;j++){
            let flag = false;
            for(let k = 0; k<snake.components.length;k++){
                let component = snake.components[k];
                if(component.row == i && component.column == j){
                    flag = true;
                    break;
                }
            }
            if(flag == false){
                availableTiles.push({row: i,column:j})
            }
        }
    }
}

function collisionCheck(){

}

function moveSnake(){
    let head = {row: snake.components[0].row+snake.dx,column: snake.components[0].column+snake.dy};
    snake.components.unshift(head);
    snake.components.pop();
}

function drawSnake(){
    context.fillStyle = "green";
    context.strokeStyle = "black";
    snake.components.forEach((element) => {
        context.fillRect(element.row*tileSize,element.column*tileSize,tileSize,tileSize);
        context.strokeRect(element.row*tileSize,element.column*tileSize,tileSize,tileSize)
    });
}

function clearBoard(){
    context.fillStyle = boardBackground;
    context.fillRect(0,0,numOfRows*tileSize,numOfColumns*tileSize);
}

function createFood(){
    let index = Math.floor(Math.random()*availableTiles.length);
    let tile = availableTiles[index]
    food.row = tile.row;
    food.column = tile.column;
}
function drawFood(){
    context.fillStyle = "red";
    context.fillRect(food.row*tileSize,food.column*tileSize,tileSize,tileSize)
}


document.onkeydown = function(e){
    switch(e.key){
        case 'W':
        case 'w':
          snake.x = 5;  
        case 'A':
        case 'a':

        case 'S':
        case 's':
        
        case 'D':
        case 'd':

    }
};