/*Code below prevents default scroll behaviour of arrow keys.
*/
window.addEventListener("keydown", function(e) {
    // Check if arrow key is pressed
    if([37, 38, 39, 40].includes(e.keyCode)) {
      // Prevent default behavior
      e.preventDefault();
    }
  }, false);


let array = [ 
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]   
];



let grid = document.querySelector(".game-grid");

const displayChange = (array) => {
    let refCount = 0;
    for (let r = 0; r < array.length; r++) {
        for (c = 0; c < array.length; c++) {
            refCount++;
            let element = document.createElement("p");
            element.textContent = array[r][c] !== 0 ? array[r][c]: "";
            element.classList.add("item");
            switch (array[r][c]) {
                case 2:
                    element.classList.add("two");
                    break;
                case 4:
                    element.classList.add("four");
                    break;
                case 8:
                    element.classList.add("eight");
                    break;
                case 16:
                    element.classList.add("sixteen");
                    break;
                case 32:
                    element.classList.add("thirty-two");
                    break;
                case 64:
                    element.classList.add("sixty-four");
                    break;
                case 128:
                    element.classList.add("oneTwoEight");
                    break;
                case 256:
                    element.classList.add("twoFiveSix");
                    break;
                case 512:
                    element.classList.add("fiveOneTwo");
                    break;
                case 1024:
                    element.classList.add("oneZeroTwoFour");
                    break;
                case 2048:
                    element.classList.add("twoZeroFourEight");
                    break;
                default:
                    element.classList.add("greater");
                    break;
            }
            
            document.getElementById("n"+refCount).remove();
            element.setAttribute('id',"n"+refCount);
            document.getElementById("grid").appendChild(element);
        }
    }
}
const gameWon = (array) => {
    for (let r = 0; r < array.length; r++) {
        for (c = 0; c < array.length; c++) {
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

    if (spaceAvailable(array)) {
        return false;
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
    
    displayChange(array);
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

    displayChange(array);
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

    

    for (var i = 0; i < Refarray.length; i++) {
        console.log(Refarray[i].join(" "));
    }
    
    grid.classList.remove("gameOver");
    grid.classList.remove("gameWon");

    let elem = document.getElementById("GO");
    let elem2 = document.getElementById("GW");

    if (elem) {
        elem.remove();
    }

    if (elem2) {
        elem2.remove();
    }
    

    addRandomTwosToGrid(array);
    /*displayChange(array)*/

} //reset

let moveHappened = false;

/* Shifts numbers in grid from 
 * bottom to top.
*/
const moveDown = () => {
    
    let before = "";
    for (let r = 0; r < array.length; r++) {
        for (c = 0; c < array.length; c++) {
            before +=array[r][c];
        }
    }
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
    let after = "";
    for (let r = 0; r < array.length; r++) {
        for (c = 0; c < array.length; c++) {
            after +=array[r][c];
        }
    }
    if (before === after) {
        moveHappened = false;
    } else {
        moveHappened = true;
    }
}

/* Shifts numbers in grid from 
 * bottom to top.
*/
const moveUp = () => {
    
    let before = "";
    for (let r = 0; r < array.length; r++) {
        for (c = 0; c < array.length; c++) {
            before +=array[r][c];
        }
    }
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
    let after = "";
    for (let r = 0; r < array.length; r++) {
        for (c = 0; c < array.length; c++) {
            after +=array[r][c];
        }
    }
    if (before === after) {
        moveHappened = false;
    } else {
        moveHappened = true;
    }  
} // moveUp

/* Shifts numbers in grid from 
 * left to right.
*/
const moveRight = () => {
    
    let before = "";
    for (let r = 0; r < array.length; r++) {
        for (c = 0; c < array.length; c++) {
            before +=array[r][c];
        }
    }
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
    let after = "";
    for (let r = 0; r < array.length; r++) {
        for (c = 0; c < array.length; c++) {
            after +=array[r][c];
        }
    }
    if (before === after) {
        moveHappened = false;
    } else {
        moveHappened = true;
    }
} // moveRight

/* Shifts numbers in grid from 
 * right to left.
*/
const moveLeft = () => {
    
    let before = "";
    for (let r = 0; r < array.length; r++) {
        for (c = 0; c < array.length; c++) {
            before +=array[r][c];
        }
    }
    let merged = Array.from({ length: array.length }, () => Array(array.length).fill(false));
    for (let r = 0; r < array.length; r++) {
        for (let c = 0; c < array.length; c++) {
            for (let j = c +1; j < array.length; j++) {
                if (array[r][j] === 0) {
                    continue;
                }
                if (array[r][c] === array[r][j] && !merged[r][c] && !merged[r][j] && (array[r][j] === array[r][c+1] || (array[r][j] === array[r][c+2] && array[r][c+1] === 0) || (array[r][j] === array[r][c+3] && array[r][c+1] === 0 && array[r][c+2] === 0))) {
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
    let after = "";
    for (let r = 0; r < array.length; r++) {
        for (c = 0; c < array.length; c++) {
            after +=array[r][c];
        }
    }
    if (before === after) {
        moveHappened = false;
    } else {
        moveHappened = true;
    }
} // moveLeft


const keyPress = (event) => {
    let arrowKeyPressed = true;
    if (gameOver(array) || gameWon(array)) {
        arrowKeyPressed = false;
    }
    
    if (!gameOver(array)) {
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

        if (gameWon(array)) {
            gameWonScreen(grid);
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
    let element = document.createElement("p");
    element.textContent = "GAME OVER";
    element.classList.add("over");
    element.setAttribute('id',"GO");
    document.getElementById("main").appendChild(element);
}

const gameWonScreen  = (grid) => {
    grid.classList.add("gameWon");
    let element = document.createElement("p");
    element.textContent = "YOU WON!";
    element.classList.add("over");
    element.setAttribute('id',"GW");
    document.getElementById("main").appendChild(element);
}

let button = document.getElementById("button");
button.addEventListener("click", function () {
    reset(array)
});

document.addEventListener('keydown',keyPress);






