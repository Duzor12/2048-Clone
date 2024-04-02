/* Code below initializes the array used for the game
*/
let array = [ 
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]   
];

let grid = document.querySelector(".game-grid");

const gameWon = (array) => {
    for (let r = 0; r < array.length;r++) {
        for (c = 0; c< array.length; c++) {
            if (array[r][c] >= 2048) {
                return true;
            }
        }
    }
    return false;
}
const gameOver = (array) => {
    for (let r = 1; r < array.length-1; r++) {
        let prev = r-1;
        let next = r+1;
        for (let c = 0; c < array.length; c++) {
            if (array[prev][c] === array[r][c] || array[r][c] === array[next][c] ) {
                return false;
            }            
        }
        
    }
    
    for (let c = 1; c < array.length-1; c++) {
        let prev = c-1;
        let next = c+1;
        for (let r = 0; r < array.length; r++) {
            if (array[r][prev] === array[r][c] || array[r][c] === array[r][next]) {
                return false;
            }
        }
    }

    return true;
}

const spaceAvailable = (array) => {
    for (let r = 0; r < array.length;r++) {
        for (c = 0; c< array.length; c++) {
            if (array[r][c] === 0) {
                return true;
            }
        }
    }
    return false;
}
const addRandomTwoToGrid = (array) => {
    let randRow = Math.floor(Math.random()*4);
    let randCol = Math.floor(Math.random()*4);

    while (array[randRow][randCol] !== 0) {
        randRow = Math.floor(Math.random()*4);
        randCol = Math.floor(Math.random()*4);
    }

    randRef = Math.floor(Math.random()*10);
    if (randRef > 2) {
        array[randRow][randCol] = 2;
    } else {
        array[randRow][randCol] = 4;
    }  
}

const addRandomTwosToGrid = (array) => {
    let randRow = Math.floor(Math.random()*4);
    let randCol = Math.floor(Math.random()*4);

    while (array[randRow][randCol] !== 0) {
        randRow = Math.floor(Math.random()*4);
        randCol = Math.floor(Math.random()*4);
    }

    array[randRow][randCol] = 2;

    let randRow2 = randRow;
    let randCol2 = randCol;

    while (array[randRow2][randCol2] !== 0) {
        randRow2 = Math.floor(Math.random()*4);
        randCol2 = Math.floor(Math.random()*4);
    }

    array[randRow2][randCol2] = 2;
    
}

addRandomTwosToGrid(array);




// --- printing array

/* --- for testing
array[0][0] = 2;
array[0][1] = 2;
array[0][2] = 2;
array[0][3] = 2;
array[1][0] = 2;
array[1][1] = 2;
array[1][2] = 2;
array[1][3] = 2;
array[2][2] = 2;
array[3][0] = 2;
array[3][3] = 4;
*/

for (var i = 0; i < array.length; i++) {
    console.log(array[i].join(" "));
}


// reset function prepares grid for new game
const reset = (Refarray) => {
    for (let i = 0; i < Refarray.length; i ++) {
        for (let j = 0; j < Refarray.length; j++) {
            Refarray[i][j] = 0;
        }    
    
    }

    addRandomTwosToGrid(array);

    for (var i = 0; i < Refarray.length; i++) {
        console.log(Refarray[i].join(" "));
    }
} //reset

let moveHappened = false;

/* Shifts numbers in grid from 
 * bottom to top.
*/
const moveDown = () => {
    let merged = Array.from({ length: array.length }, () => Array(array.length).fill(false));
    for (let c = 0; c < array.length; c++) {
        for (let r = array.length - 1; r >= 0; r--) {
            for (let i = r - 1; i >= 0; i--) {
                if (array[i][c] === 0) {
                    continue;
                }
                if (array[r][c] === array[i][c] && !merged[r][c] && !merged[i][c] && (array[i][c] === array[r-1][c] || (array[i][c] === array[r-2][c] && array[r-1][c] === 0) || (array[i][c] === array[r-3][c] && array[r-1][c] === 0 && array[r-2][c] === 0))) {
                    array[r][c] = array[r][c] * 2;
                    array[i][c] = 0;
                    merged[r][c] = true;
                    moveHappened = true;
                } else if (array[r-1][c] === 0 && array[r][c] !== 0) {
                    array[r-1][c] = array[i][c];
                    array[i][c] = 0;
                    moveHappened = true;
                    break;
                } else if (array[r][c] === 0) {
                    array[r][c] = array[i][c];
                    array[i][c] = 0;
                    moveHappened = true;
                }
            }
        }
    }
}

/* Shifts numbers in grid from 
 * bottom to top.
*/
const moveUp = () => {
    let merged = Array.from({ length: array.length }, () => Array(array.length).fill(false));
    for (let c = 0; c < array.length; c++) {
        for (let r = 0; r < array.length; r++) {
            for (let i = r + 1; i < array.length; i++) {
                if (array[i][c] === 0) {
                    continue;
                }
                if (array[r][c] === array[i][c] && !merged[r][c] && !merged[i][c] && (array[i][c] === array[r+1][c] || (array[i][c] === array[r+2][c] && array[r+1][c] === 0) || (array[i][c] === array[r+3][c] && array[r+1][c] === 0 && array[r+2][c] === 0))) {
                    array[r][c] = array[r][c] * 2;
                    array[i][c] = 0;
                    merged[r][c] = true;
                    moveHappened = true;
                } else if (array[r+1][c] === 0 && array[r][c] !== 0) {
                    array[r+1][c] = array[i][c];
                    array[i][c] = 0;
                    moveHappened = true;
                    break;
                } else if (array[r][c] === 0) {
                    array[r][c] = array[i][c];
                    array[i][c] = 0;
                    moveHappened = true;
                }
            }
        }
    }    
} // moveUp

/* Shifts numbers in grid from 
 * left to right.
*/
const moveRight = () => {
    let merged = Array.from({ length: array.length }, () => Array(array.length).fill(false));
    for (let r = 0; r < array.length; r++) {
        for (let c = array.length-1; c >= 0; c--) {
            for (let j = c-1; j >= 0; j--) {
                if (array[r][j] === 0) {
                    continue;
                }
                if (array[r][c] === array[r][j] && !merged[r][c] && !merged[r][j] && (array[r][j] === array[r][c-1] || (array[r][j] === array[r][c-2] && array[r][c-1] === 0) || (array[r][j] === array[r][c-3] && array[r][c-1] === 0 && array[r][c-2] === 0))) {
                    array[r][c] = array[r][c]*2;
                    array[r][j] = 0;
                    merged[r][c] = true;
                    moveHappened = true;
                } else if (array[r][c-1] === 0 && array[r][c] !== 0) {
                    array[r][c-1] = array[r][j];
                    array[r][j] = 0;
                    moveHappened = true;
                    break;
                } else if (array[r][c] === 0) {
                    array[r][c] = array[r][j];
                    array[r][j] = 0;
                    moveHappened = true;
                }
            }
        }
    }
} // moveRight

/* Shifts numbers in grid from 
 * right to left.
*/
const moveLeft = () => {
    let merged = Array.from({ length: array.length }, () => Array(array.length).fill(false));
    for (let r = 0; r < array.length; r++) {
        for (let c = 0; c < array.length; c++) {
            for (let j = c +1; j < array.length; j++) {
                if (array[r][j] === 0) {
                    continue;
                }
                if (array[r][c] === array[r][j] && !merged[r][c] && !merged[r][j] && (array[r][j] === array[r][c+1] || (array[r][j] === array[r][c+2] && array[r][c+1] === 0) || (array[r][j] === array[r][c+3] && array[r][c+1] === 0 && array[r][c+2] === 0) )) {
                    array[r][c] = array[r][c]*2;
                    array[r][j] = 0;
                    merged[r][c] = true;
                    moveHappened = true;
                } else if (array[r][c+1] === 0 && array[r][c] !== 0) {
                    array[r][c+1] = array[r][j];
                    array[r][j] = 0;
                    moveHappened = true;
                    break;              
                } else if (array[r][c] === 0) {
                    array[r][c] = array[r][j];
                    array[r][j] = 0; 
                    moveHappened = true;
                }
            }
        }
    }
} // moveLeft


const keyPress = (event) => {
    let arrowKeyPressed = true;
    if (!gameOver) {
        switch (event.key) {
            case "ArrowDown":
                moveDown();
                break;
            case "ArrowUp":
                moveUp();
                break;
            case "ArrowLeft":
                moveLeft();
                break;
            case "ArrowRight":
                moveRight();
                break;
            default:
                arrowKeyPressed = false;
                break;
        }
    }

    if (arrowKeyPressed) {
        if (moveHappened && spaceAvailable(array)) {
            addRandomTwoToGrid(array);
        }

        if (gameOver(array)) {
            if (gameWon(array)) {
                gameWonScreen(grid);
            } else {
                gameOverScreen(grid);
            }
        }

        // --- printing array
        for (var i = 0; i < array.length; i++) {
            console.log(array[i].join(" "));
        }
        // --- printing array

    }
} //keyPress

const gameOverScreen = (grid) => {
    grid.classList.add("gameOver");
}

const gameWonScreen  = (grid) => {
    grid.classList.add("gameWon");
}

let button = document.getElementById("button");
button.addEventListener("click", function () {
    reset(array)
});

document.addEventListener('keydown',keyPress);






