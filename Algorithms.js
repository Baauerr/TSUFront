
function createTable() {
    table.style.borderCollapse = 'collapse';
    document.body.appendChild(table);
    for (let i = 0; i < labyrinth.length; i++) {
        const row = document.createElement('tr');
        table.appendChild(row);
        for (let j = 0; j < labyrinth[i].length; j++) {
            labyrinth[i][j]  = {
                south: true,
                north: true,
                west: true,
                east: true,
                visited: false
            };
            const cell = document.createElement('td');
            cell.style.width = '20px';
            cell.style.height = '20px';
            cell.style.border = '1px solid black';
            cell.style.backgroundColor = 'black';
            cell.addEventListener('click', () => {
                if (createWallOrPointMode === 0) {
                    if (labyrinth[i][j] === 1 || labyrinth[i][j] === 2) {
                        cell.style.backgroundColor = 'white';
                        labyrinth[i][j] = 0;
                    } else if (labyrinth[i][j] === 0) {
                        cell.style.backgroundColor = 'black'
                        labyrinth[i][j] = 1;
                    }
                }
                else{
                    if (labyrinth[i][j] === 1 || labyrinth[i][j] === 0) {
                        cell.style.backgroundColor = 'green'
                        labyrinth[i][j] = 2;
                    }
                    else{
                        cell.style.backgroundColor = 'white'
                        labyrinth[i][j] = 0;
                    }

                }
            });
            row.appendChild(cell);
        }
    }
}

//Нужно создать кнопку для переключения режимов и передавать её
const table = document.createElement('table');
const createWallOrPointMode = 2
let sizeOfLabyrinth = 10
const labyrinth = [];
let screenHeight = window.innerHeight;

let tableHeight = table.offsetHeight;

table.style.marginLeft = 520 + "px";
table.style.marginTop = 300 + "px";
for (let i = 0; i < sizeOfLabyrinth; i++) {
    labyrinth[i] = [];
}
for (let i = 0; i < sizeOfLabyrinth; i++) {
    for (let j = 0; j < sizeOfLabyrinth; j++) {
        labyrinth[i][j] = 0;
    }
}

createTable(labyrinth, createWallOrPointMode, table);

function createLabyrinth(){
    let startCell = Math.floor(Math.random() * sizeOfLabyrinth);
    let startRow = Math.floor(Math.random() * sizeOfLabyrinth);
    labyrinth[startRow][startCell].visited = true;
    table.rows[startRow].cells[startCell].style.backgroundColor = 'white'
    for (let i = 1; i < sizeOfLabyrinth; i++){
        for (let j = 1; j < sizeOfLabyrinth; j++){
            if (labyrinth[i][j].visited === false){

            }
        }
    }
}

createLabyrinth(labyrinth, sizeOfLabyrinth, table)
