
function createTable() {
    for (let y = 0; y < maze.length; y++) {
        const row = document.createElement('tr');
        table.appendChild(row);
        for (let x = 0; x < maze[y].length; x++) {
            maze[y][x] = 1
            const cell = document.createElement('td');
            cell.classList.add('cell');
            row.appendChild(cell);
            cell.addEventListener('click', () => {
                if (createWallOrPointMode === 1) {
                    switch (maze[y][x]){
                        case 2:
                            maze[y][x] = 1;
                            cell.classList.replace('startEndPoint','wall');
                            break;
                        case 1:
                            maze[y][x] = 0;
                            cell.classList.replace('wall', 'maze');
                            break
                        case 0:
                            maze[y][x] = 1;
                            cell.classList.replace('maze','wall');
                            break;
                    }
                    // if (maze[y][x] === 1) {
                    //     maze[y][x] = 0;
                    //     cell.classList.replace('wall', 'maze');
                    // } else if (maze[y][x] === 0) {
                    //     maze[y][x] = 1;
                    //     cell.classList.replace('maze','wall');
                    // }
                }
                else if (createWallOrPointMode === 0) {
                    switch(maze[x][y]){
                        case 2:
                            maze[y][x] = 0;
                            cell.classList.replace('startEndPoint', 'maze');
                            break;
                        case 1:
                            maze[y][x] = 2;
                            cell.classList.replace('wall', 'startEndPoint');
                            break;
                        case 0:
                            maze[y][x] = 2;
                            cell.classList.replace('maze', 'startEndPoint');
                            break;
                    }

                    // if (maze[y][x] === 1 || maze[y][x] === 0) {
                    //     maze[y][x] = 2;
                    //     cell.classList.add('startEndPoint');
                    // } else {
                    //     maze[y][x] = 0;
                    //     cell.classList.add('maze');
                    // }
                }
            });
            row.appendChild(cell);
        }
    }
}

const table = document.getElementById('my-table');
table.style.borderCollapse = 'collapse';
document.body.appendChild(table);

let sizeOfMaze = 41
const maze = [];
let createWallOrPointMode = null;

for (let i = 0; i < sizeOfMaze * 2 + 1; i++) {
    maze[i] = [];
}
for (let i = 0; i < sizeOfMaze; i++) {
    for (let j = 0; j < sizeOfMaze; j++) {
        maze[i][j] = null;
    }
}

createTable(maze, createWallOrPointMode);
function createMaze(maze, sizeOfMaze, table) {

    for (let y = 0; y < sizeOfMaze; y++){
        for (let x = 0; x < sizeOfMaze; x++){
            switch (maze[y][x]){
                case 0:
                    table.rows[y].cells[x].classList.replace('maze','wall')
                    break
                case 2:
                    table.rows[y].cells[x].classList.replace('startEndPoint','wall')
                    break
            }
            maze[y][x] = 1
        }
    }

    let neighboursList = []
    function getNeighbours(y,x,addBlockWalls, maze, table) {
        maze[y][x] = 0;
        table.rows[y].cells[x].classList.remove('wall');
        table.rows[y].cells[x].classList.add('maze');
        if (addBlockWalls && valid(y+1,x) && (maze[y+1][x] === 1))
            neighboursList.push([y+1,  x , [y,x]]);
        if (addBlockWalls && valid(y-1,x) && (maze[y-1][x] === 1))
            neighboursList.push([y-1,  x , [y,x]]);
        if (addBlockWalls && valid(y,x+1) && (maze[y][x+1] === 1))
            neighboursList.push([y , x+1, [y,x]]);
        if (addBlockWalls && valid(y,x-1) && (maze[y][x-1] === 1))
            neighboursList.push([y , x-1, [y,x]]);
    }
    function valid(a,b) {
        return (a < sizeOfMaze && a >= 0 && b < sizeOfMaze && b >= 0);
    }
    let CordX = Math.floor(Math.random() * (sizeOfMaze - 2) + 1)
    let CordY = Math.floor(Math.random() * (sizeOfMaze - 2) + 1)

    console.log(CordY, CordX);

    getNeighbours(2, 2, true, maze, table)
    while (neighboursList.length !== 0) {
        let randomWall = neighboursList[Math.floor(Math.random() * neighboursList.length)]
        let host = randomWall[2]
        let opposite = [(host[0] + (randomWall[0] - host[0]) * 2), (host[1] + (randomWall[1] - host[1]) * 2)]
        if (valid(opposite[0], opposite[1])) {
            if (maze[opposite[0]][opposite[1]] === 0)
                neighboursList.splice(neighboursList.indexOf(randomWall), 1);
            else
                getNeighbours(randomWall[0], randomWall[1], false, maze, table),
            getNeighbours(opposite[0], opposite[1], true, maze, table);
        }
        else
            neighboursList.splice(neighboursList.indexOf(randomWall));
    }
}
console.log(maze);

const createWallModeBtn = document.querySelector('#create-wall-mode-btn');
const createPointModeBtn = document.querySelector('#create-point-mode-btn');
const createMazeBtn = document.querySelector('#create-maze-btn');

createWallModeBtn.addEventListener('click', () => {
    createWallOrPointMode = 1;
});

createPointModeBtn.addEventListener('click', () => {
    createWallOrPointMode = 0;
});

createMazeBtn.addEventListener('click', () => {
    createMaze(maze, sizeOfMaze, table);
});






