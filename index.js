/* Code below initializes the array used for the game
*/
let array = [ 
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]   
];

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
const addRandomTwoToGrid = (array) => {
    let randRow = Math.floor(Math.random()*4);
    let randCol = Math.floor(Math.random()*4);

    while (array[randRow][randCol] !== 0) {
        randRow = Math.floor(Math.random()*4);
        randCol = Math.floor(Math.random()*4);
    }

    array[randRow][randCol] = 2;  
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
const reset = () => {
    for (let i = 0; i < array.length; i ++) {
        for (let j = 0; j < array.length; i++) {
            array[i][j] = 0;
        }    
    
    }

    let randRow = Math.floor(Math.random()*4);
        let randCol = Math.floor(Math.random()*4);
        
        array[randRow][randCol] = 2;
        
        let randRow2 = randRow;
        let randCol2 = randCol;
        
        while (randRow2 === randRow || randCol2 === randCol) {
            randRow2 = Math.floor(Math.random()*4);
            randCol2 = Math.floor(Math.random()*4);
        }
        
        array[randRow2][randCol2] = 2;

} //reset



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
                } else if (array[r-1][c] === 0 && array[r][c] !== 0) {
                    array[r-1][c] = array[i][c];
                    array[i][c] = 0;
                    break;
                } else if (array[r][c] === 0) {
                    array[r][c] = array[i][c];
                    array[i][c] = 0;
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
                } else if (array[r+1][c] === 0 && array[r][c] !== 0) {
                    array[r+1][c] = array[i][c];
                    array[i][c] = 0;
                    break;
                } else if (array[r][c] === 0) {
                    array[r][c] = array[i][c];
                    array[i][c] = 0;
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
                } else if (array[r][c-1] === 0 && array[r][c] !== 0) {
                    array[r][c-1] = array[r][j];
                    array[r][j] = 0;
                    break;
                } else if (array[r][c] === 0) {
                    array[r][c] = array[r][j];
                    array[r][j] = 0;
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
                } else if (array[r][c+1] === 0 && array[r][c] !== 0) {
                    array[r][c+1] = array[r][j];
                    array[r][j] = 0;
                    break;              
                } else if (array[r][c] === 0) {
                    array[r][c] = array[r][j];
                    array[r][j] = 0; 
                }
            }
        }
    }
} // moveLeft


const keyPress = (event) => {
    let arrowKeyPressed = true;
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

    if (arrowKeyPressed) {
        addRandomTwoToGrid(array);
        // --- printing array
        for (var i = 0; i < array.length; i++) {
            console.log(array[i].join(" "));
        }
        // --- printing array

        //remember add random 2 in grid (or 4 (lesser chance))
    }
} //keyPress



if (!gameOver(array)) {
    document.addEventListener('keydown',keyPress);
}
