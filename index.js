/* Code below initializes the game
*/
let array = [ 
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]   
];

//test
//array[0][1] = 2;
//array[0][3] = 2; 

/*
//-- adding 2's in random places
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
//-- adding 2's in random places
*/


// --- printing array

// --- for testing
array[0][0] = 2;
array[0][1] = 2;
array[0][2] = 2;
array[0][3] = 2;
array[1][0] = 2;
array[1][1] = 0;
array[1][2] = 2;
array[1][3] = 0;
for (var i = 0; i < array.length; i++) {
    console.log(array[i].join(" "));
}
// --- for testing

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

const moveDown = () => {

} // moveDown

const moveUp = () => {
} // moveUp

const moveRight = () => {

} // moveRight

//supposed to move numbers in a row to the left, if 2 numbers with 0's
// in between them, or consecutive, the are sdded snd put in the closest position they cane be to the left.
const moveLeft = () => { 
    for (let r = 0; r < array.length; r++) {
        for (let c = 0; c < array.length; c++) {
            for (let j = c +1; j < array.length; j++) {
                if (array[r][j] === 0) {
                    continue;
                }
                if (array[r][c] === array[r][j]) {
                    array[r][c] = array[r][c]*2;
                    array[r][j] = 0;
                } else if (array[r][c+1] === 0) {
                    array[r][c+1] = array[r][j];
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
        // --- printing array
        for (var i = 0; i < array.length; i++) {
            console.log(array[i].join(" "));
        }
        // --- printing array

        //remember add random 2 in grid (or 4 (lesser chance))
    }
} //keyPress




document.addEventListener('keydown',keyPress);
