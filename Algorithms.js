
function createTable() {
    for (let i = 0; i < maze.length; i++) {
        const row = document.createElement('tr');
        table.appendChild(row);
        for (let j = 0; j < maze[i].length; j++) {
            maze[i][j] = 1
            const cell = document.createElement('td');
            cell.style.width = '20px';
            cell.style.height = '20px';
            cell.style.border = '1px solid black';
            cell.style.backgroundColor = 'black';
            cell.addEventListener('click', () => {
                if (createWallOrPointMode === 1) {
                    if (maze[i][j] === 1 || maze[i][j] === 2) {
                        cell.style.backgroundColor = 'white';
                        maze[i][j] = 0;
                    } else if (maze[i][j].value === 0) {
                        cell.style.backgroundColor = 'black'
                        maze[i][j] = 1;
                    }
                } else {
                    if (maze[i][j].value === 1 || maze[i][j].value === 0) {
                        cell.style.backgroundColor = 'green'
                        maze[i][j] = 2;
                    } else {
                        cell.style.backgroundColor = 'white'
                        maze[i][j] = 0;
                    }
                }
            });
            row.appendChild(cell);
        }
    }
}

const table = document.createElement('table');
let sizeOfMaze = 51
const maze = [];
let createWallOrPointMode = 1;
table.style.borderCollapse = 'collapse';
document.body.appendChild(table);
table.style.marginLeft = 520 + "px";
table.style.marginTop = 100 + "px";
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

    let neighboursList = []
    function getNeighbours(y,x,addBlockWalls, maze, table) {
        maze[y][x] = 0;
        table.rows[y].cells[x].style.backgroundColor = 'white'
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


// function deleteWall(maze, x, y, table, sizeOfMaze){
//     maze[y][x] = 0
//     if (y + 2 < sizeOfMaze && maze[y + 2][x].value === 0){
//         maze[y + 1][x].value = 0
//         table.rows[y + 1].cells[x].style.backgroundColor = 'white';
//         maze[y + 2][x].value = 0
//         table.rows[y + 2].cells[x].style.backgroundColor = 'white';
//     }
//     else if (x + 2 < sizeOfMaze && maze[y][x + 2].value === 0){
//         maze[y][x + 1].value = 0
//         table.rows[y].cells[x + 1].style.backgroundColor = 'white';
//         maze[y][x + 2].value = 0
//         table.rows[y].cells[x + 2].style.backgroundColor = 'white';
//     }
//     else if ( y - 2 >= 0 && maze[y - 2][x].value === 0){
//         maze[y - 1][x].value = 0;
//         table.rows[y - 1].cells[x].style.backgroundColor = 'white';
//         maze[y - 2][x].value = 0;
//         table.rows[y - 2].cells[x].style.backgroundColor = 'white';
//     }
//     else if (x - 2 >= 0 && maze[y][x - 2].value === 0 ){
//         maze[y][x - 1].value = 0
//         table.rows[y].cells[x - 1].style.backgroundColor = 'white';
//         maze[y][x - 2].value = 0
//         table.rows[y].cells[x - 2].style.backgroundColor = 'white';
//     }
// }
// function findNeighbour(y,x,addBlockWalls) {
//     maze[y][x] = 0;
//     if (addBlockWalls && valid(y+1,x) && (maze[y+1][x].value === 1)) walls.push([y+1,  x , [y,x]]);
//     if (addBlockWalls && valid(y-1,x) && (maze[y-1][x].value === 1)) walls.push([y-1,  x , [y,x]]);
//     if (addBlockWalls && valid(y,x+1) && (maze[y][x+1].value === 1)) walls.push([ y , x+1, [y,x]]);
//     if (addBlockWalls && valid(y,x-1) && (maze[y][x-1].value === 1)) walls.push([ y , x-1, [y,x]]);
// }




// deleteWall(maze, currentPoint.x, currentPoint.y, table)
// getNeighbours( maze, currentPoint.x, currentPoint.y);
// neighboursList.delete(currentPoint);


//     function getNeighbours(y, x, addBlockWalls){
//         maze[x][y].value = 0
//         if (addBlockWalls && y + 2 < sizeOfMaze && maze[y + 2][x].value === 1){
//             maze[y + 2][x].x = x;
//             maze[y + 2][x].y = y + 2;
//             neighboursList.push(maze[y + 2][x])
//         }
//         if (addBlockWalls && x + 2 < sizeOfMaze && maze[y][x + 2].value === 1){
//             maze[y][x + 2].x = x + 2;
//             maze[y][x + 2].y = y;
//             neighboursList.push(maze[y][x + 2])
//         }
//         if (addBlockWalls && y - 2 >= 0 && maze[y - 2][x].value === 1){
//             maze[y - 2][x].x = x;
//             maze[y - 2][x].y = y - 2;
//             neighboursList.push(maze[y - 2][x])
//         }
//         if (addBlockWalls && x - 2 >= 0 && maze[y][x - 2].value === 1){
//             maze[y][x - 2].x = x - 2;
//             maze[y][x - 2].y = y;
//             neighboursList.push(maze[y][x - 2])
//         }
//     }







//ПОСМОТРИ И РАЗБЕРИСЬ, МОЖЕТ ПРИГОДИТЬСЯ!!!

// function astar(startNode, goalNode) {
//     // Определяем эвристическую функцию
//     function heuristic(node) {
//         const dx = Math.abs(node.x - goalNode.x);
//         const dy = Math.abs(node.y - goalNode.y);
//         return dx + dy;
//     }
//
//     // Создаем объекты для хранения стоимости пути и родительских узлов
//     const gScore = new maze();
//     const fScore = new maze();
//     const parent = new maze();
//
//     // Создаем очередь с приоритетом
//     const openSet = new PriorityQueue((a, b) => fScore.get(a) < fScore.get(b));
//
//     // Добавляем начальную вершину в очередь с приоритетом и устанавливаем ее стоимость пути на 0
//     openSet.enqueue(startNode);
//     gScore.set(startNode, 0);
//
//     // Устанавливаем стоимость пути от начальной вершины до целевой равной бесконечности
//     fScore.set(startNode, heuristic(startNode));
//
//     while (!openSet.isEmpty()) {
//         // Извлекаем узел с наименьшей оценкой из очереди
//         const current = openSet.dequeue();
//
//         // Если текущий узел является целевым, возвращаем путь
//         if (current === goalNode) {
//             const path = [current];
//             while (parent.has(current)) {
//                 current = parent.get(current);
//                 path.unshift(current);
//             }
//             return path;
//         }
//
//         // Иначе просматриваем соседей текущего узла
//         for (const neighbor of current.neighbors) {
//             // Вычисляем стоимость пути от начальной вершины до текущей вершины через текущий узел
//             const tentativeGScore = gScore.get(current) + current.costTo(neighbor);
//
//             // Если путь через текущий узел короче, чем имеющийся, обновляем стоимость пути
//             if (!gScore.has(neighbor) || tentativeGScore < gScore.get(neighbor)) {
//                 parent.set(neighbor, current);
//                 gScore.set(neighbor, tentativeGScore);
//                 fScore.set(neighbor, tentativeGScore + heuristic(neighbor));
//                 if (!openSet.includes(neighbor)) {
//                     openSet.enqueue(neighbor);
//                 }
//             }
//         }
//     }
//
//     // Если целевой узел недостижим, возвращаем пустой путь
//     return [];
// }






