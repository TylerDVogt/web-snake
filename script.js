const canvas = document.getElementById("game");
const context = canvas.getContext("2d");
const tileSize = 25;
const boardBackground = "white";
const numOfRows = canvas.width/tileSize;
const numOfColumns = canvas.height/tileSize;
let running = false;
let snake = {
    components: [],
    dx: 0,
    dy: 0
};
let food = {
   row: 0,
   column: 0
};
let availableTiles = [];
let score = 0;



init();

function init(){
    clearBoard();
    setSnakeInitialValues();
    populateAvailableTiles();
    drawSnake();
    createFood();
    drawFood();
    drawScore();
}

function setSnakeInitialValues(){
    snake.components = [{row: numOfRows/2, column: numOfColumns/2},
                        {row: (numOfRows/2)-1, column: numOfColumns/2},
                        {row: (numOfRows/2)-2, column: numOfColumns/2},
                        {row: (numOfRows/2)-3, column: numOfColumns/2}]
    snake.dx = 1;
    snake.dy = 0;
}


function startGame(){
    if(running){
        return;
    }
    running = true;
    score = 0;
    window.requestAnimationFrame(gameLoop);
}

function gameLoop(){
    if(running){
        setTimeout(()=>{
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake()
            collisionWallCheck();
            collisionComponentCheck();
            collisionFoodCheck();
            drawScore();
            gameLoop();
        }, 200)
    }
}

function populateAvailableTiles(){
    availableTiles = [];
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

function drawScore(){
    document.getElementById("score").innerHTML = "Score: "+score;
}



function collisionWallCheck(){
    if(snake.components[0].row < 0 || snake.components[0].row >= numOfRows || snake.components[0].column < 0 || snake.components[0].column >= numOfColumns){
        gameOver();
    }
}

function collisionComponentCheck(){
    let head = snake.components[0];
    for(let i = 1;i<snake.components.length;i++){
        let component = snake.components[i];
        if(head.row == component.row && head.column == component.column){
            gameOver();
        }
    }
}

function collisionFoodCheck(){
    if(snake.components[0].row == food.row && snake.components[0].column == food.column){
        createFood();
        updateAvailableTiles(1,{row: food.row, column: food.column});
        increaseSize();
        score++;
    }
}

function increaseSize(){
    let lastComponent = snake.components[snake.components.length-1];
    snake.components.push({row: lastComponent.row, column: lastComponent.column})
}

function gameOver(){
    running = false;
    init();
}

function moveSnake(){
    let newHead = {row: snake.components[0].row+snake.dx,column: snake.components[0].column+snake.dy};
    snake.components.unshift(newHead);
    let tail = snake.components.pop();
    updateAvailableTiles(-1,newHead.row,newHead.column);
    updateAvailableTiles(1,tail.row,tail.column);
}

function updateAvailableTiles(flag,tile){
    if(flag == -1){//make the tile unavailable
        for(let i = 0;i<availableTiles.length;i++){
            if(availableTiles[i].row == tile.row && availableTiles[i].column == tile.column){
                availableTiles.splice(i,1);
            }
        }
    }else if(flag == 1){//make the tile available
        availableTiles.push(tile);
    }
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
            if(snake.dy != 1){
                snake.dy = -1;
                snake.dx = 0; 
            }
            break; 
        case 'A':
        case 'a':
            if(snake.dx != 1){
                snake.dx = -1
                snake.dy = 0;
            }
            break;
        case 'S':
        case 's':
            if(snake.dy != -1){
                snake.dy = 1;
                snake.dx = 0;
            }
            break;
        case 'D':
        case 'd':
            if(snake.dx != -1){
                snake.dx = 1;
                snake.dy = 0;
            }
            break;

    }
};