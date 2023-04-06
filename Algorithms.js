const table = document.getElementById('my-table');
table.style.borderCollapse = 'collapse';
document.body.appendChild(table);

// let myInput = document.getElementById('myInput');
// let sizeOfMaze = parseInt(myInput.value)
let sizeOfMaze = 47
const maze = [];
let createWallOrPointMode = null;

for (let i = 0; i < sizeOfMaze; i++) {
    maze[i] = [];
}

for (let i = 0; i < sizeOfMaze; i++) {
    for (let j = 0; j < sizeOfMaze; j++) {
        maze[i][j] = {
            value: 1,
            y: i,
            x: j,
            h: 0,
            d: 0,
            w: 0,
            neighbors: [],
            parent: null,
        };
    }
}

function createTable() {
    for (let y = 0; y < maze.length; y++) {
        const row = document.createElement('tr');
        table.appendChild(row);
        for (let x = 0; x < maze[y].length; x++) {
            maze[y][x].value = 1
            const cell = document.createElement('td');
            cell.classList.add('cell');
            row.appendChild(cell);
            cell.addEventListener('click', () => {
                if (createWallOrPointMode === 1) {
                    switch (maze[y][x].value) {
                        case 2:
                            maze[y][x].value = 1;
                            cell.className = '';
                            cell.classList.add('wall');
                            break;
                        case 1:
                            maze[y][x].value = 0;
                            cell.className = '';
                            cell.classList.add('maze');
                            break
                        case 0:
                            maze[y][x].value = 1;
                            cell.className = '';
                            cell.classList.add('wall');
                            break;
                    }
                } else if (createWallOrPointMode === 0) {
                    switch (maze[x][y].value) {
                        case 2:
                            maze[y][x].value = 0;
                            cell.className = '';
                            cell.classList.add('maze');
                            break;
                        case 1:
                            maze[y][x].value = 2;
                            cell.className = '';
                            cell.classList.add('startEndPoint');
                            break;
                        case 0:
                            maze[y][x].value = 2;
                            cell.className = '';
                            cell.classList.add('startEndPoint');
                            break;
                    }
                }
            });
            row.appendChild(cell);
        }
    }
}
createTable();
function createMaze(maze, sizeOfMaze, table) {
    for (let y = 0; y < sizeOfMaze; y++) {
        for (let x = 0; x < sizeOfMaze; x++) {
            table.rows[y].cells[x].className = '';
            table.rows[y].cells[x].classList.add('wall');
            maze[y][x].value = 1
        }
    }
    let neighboursList = []

    function getNeighbours(y, x, addBlockWalls, maze, table) {
        maze[y][x].value = 0;
        table.rows[y].cells[x].classList.remove('wall');
        table.rows[y].cells[x].classList.add('maze');
        if (addBlockWalls && valid(y + 1, x) && (maze[y + 1][x].value === 1))
            neighboursList.push([y + 1, x, [y, x]]);
        if (addBlockWalls && valid(y - 1, x) && (maze[y - 1][x].value === 1))
            neighboursList.push([y - 1, x, [y, x]]);
        if (addBlockWalls && valid(y, x + 1) && (maze[y][x + 1].value === 1))
            neighboursList.push([y, x + 1, [y, x]]);
        if (addBlockWalls && valid(y, x - 1) && (maze[y][x - 1].value === 1))
            neighboursList.push([y, x - 1, [y, x]]);
    }

    function valid(a, b) {
        return (a < sizeOfMaze && a >= 0 && b < sizeOfMaze && b >= 0);
    }

    getNeighbours(2, 2, true, maze, table)
    while (neighboursList.length !== 0) {
         let randomWall = neighboursList[Math.floor(Math.random() * neighboursList.length)]
        let host = randomWall[2]
        let opposite = [(host[0] + (randomWall[0] - host[0]) * 2), (host[1] + (randomWall[1] - host[1]) * 2)]
        if (valid(opposite[0], opposite[1])) {
            if (maze[opposite[0]][opposite[1]].value === 0)
                neighboursList.splice(neighboursList.indexOf(randomWall), 1);
            else
                getNeighbours(randomWall[0], randomWall[1], false, maze, table),
                    getNeighbours(opposite[0], opposite[1], true, maze, table);

        } else
            neighboursList.splice(neighboursList.indexOf(randomWall), 1);
    }
}

function findPath(start, end, maze, table) {
    function manhattanHeuristic(start, end) {
        return Math.abs(start.x - end.x) + Math.abs(start.y - end.y);
    }

    function getNeighbours(y, x, maze, table, end, openList, closedList) {
        if (valid(y + 1, x) && (maze[y + 1][x].value === 0) && !closedList.includes(maze[y + 1][x])) {
            maze[y + 1][x].h = manhattanHeuristic(maze[y + 1][x], end) * 10
            maze[y + 1][x].d = maze[x][y].d + 10
            maze[y + 1][x].w = maze[y + 1][x].h + maze[y + 1][x].d
            maze[y + 1][x].parent = maze[y][x]
            openList.add(maze[y + 1][x]);
        }
        if (valid(y - 1, x) && (maze[y - 1][x].value === 0) && !closedList.includes(maze[y - 1][x])) {
            maze[y - 1][x].h = manhattanHeuristic(maze[y - 1][x], end) * 10
            maze[y - 1][x].d = maze[x][y].d + 10
            maze[y - 1][x].w = maze[y - 1][x].h + maze[y - 1][x].d
            maze[y - 1][x].parent = maze[y][x]
            openList.add(maze[y - 1][x]);
        }
        if (valid(y, x + 1) && (maze[y][x + 1].value === 0) && !closedList.includes(maze[y][x + 1])) {
            maze[y][x + 1].h = manhattanHeuristic(maze[y][x + 1], end) * 10
            maze[y][x + 1].d = maze[x][y].d + 10
            maze[y][x + 1].w = maze[y][x + 1].h + maze[y][x + 1].d
            maze[y][x + 1].parent = maze[y][x]
            openList.add(maze[y][x + 1]);
        }
        if (valid(y, x - 1) && (maze[y][x - 1].value === 0) && !closedList.includes(maze[y][x - 1])) {
            maze[y][x - 1].h = manhattanHeuristic(maze[y][x - 1], end) * 10
            maze[y][x - 1].d = maze[x][y].d + 10
            maze[y][x - 1].w = maze[y][x - 1].h + maze[y][x - 1].d
            maze[y][x - 1].parent = maze[y][x]
            openList.add(maze[y][x - 1]);
        }
    }

    function valid(a, b) {
        return (a < sizeOfMaze && a >= 0 && b < sizeOfMaze && b >= 0);
    }

    function getMin(openList) {
        let minValue = [...openList][0];
        [...openList].forEach((elem) => {
            if (elem.w < minValue.w) {
                minValue = elem;
            }
        });
        return minValue;
    }

    let openList = new Set();
    let closedList = [];

    getNeighbours(start.y, start.x, maze, table, end, openList, closedList)
    closedList.push(start)
    table.rows[start.y].cells[start.x].classList.replace('maze', 'active')
    while (openList.size > 0) {

        let current = getMin(openList)
        if (current === end) {
            table.rows[start.y].cells[start.x].classList.replace('active', 'path')
            table.rows[current.y].cells[current.x].classList.replace('maze', 'path')
            while (current != start) {
                table.rows[current.y].cells[current.x].classList.replace('active', 'path')
                current = current.parent
            }
            return
        }
        table.rows[current.y].cells[current.x].classList.replace('maze', 'active')
        getNeighbours(current.y, current.x, maze, table, end, openList, closedList)
        openList.delete(current)
        closedList.push(current)
    }
    console.log('no way')

}

const createWallModeBtn = document.querySelector('#create-wall-mode-btn');
const createPointModeBtn = document.querySelector('#create-point-mode-btn');
const createMazeBtn = document.querySelector('#create-maze-btn');
const findPathBtn = document.querySelector('#find-path-btn');

createWallModeBtn.addEventListener('click', () => {
    createWallOrPointMode = 1;
});

createPointModeBtn.addEventListener('click', () => {
    createWallOrPointMode = 0;
});

createMazeBtn.addEventListener('click', () => {
    createMaze(maze, sizeOfMaze, table);
});

findPathBtn.addEventListener('click', () => {
    findPath(maze[0][0], maze[20][2], maze, table);
});

