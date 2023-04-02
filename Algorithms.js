
function createTable() {
    table.style.borderCollapse = 'collapse';
    document.body.appendChild(table);
    for (let i = 0; i < maze.length; i++) {
        const row = document.createElement('tr');
        table.appendChild(row);
        for (let j = 0; j < maze[i].length; j++) {
            maze[i][j] = {
                value: 1,
                visited: false,
            }
            const cell = document.createElement('td');
            cell.style.width = '20px';
            cell.style.height = '20px';
            cell.style.border = '1px solid black';
            cell.style.backgroundColor = 'black';
            cell.addEventListener('click', () => {
                if (createWallOrPointMode === 1) {
                    if (maze[i][j].value === 1 || maze[i][j].value === 2) {
                        cell.style.backgroundColor = 'white';
                        maze[i][j].value = 1;
                    } else if (maze[i][j].value === 0) {
                        cell.style.backgroundColor = 'black'
                        maze[i][j].value = 1;
                    }
                } else {
                    if (maze[i][j].value === 1 || maze[i][j].value === 0) {
                        cell.style.backgroundColor = 'green'
                        maze[i][j].value = 2;
                    } else {
                        cell.style.backgroundColor = 'white'
                        maze[i][j].value = 0;
                    }
                }
            });
            row.appendChild(cell);
        }
    }
}

//Нужно создать кнопку для переключения режимов и передавать её

 const table = document.createElement('table');
let sizeOfMaze = 10
 const maze = [];
 let createWallOrPointMode = 1;

table.style.marginLeft = 520 + "px";
table.style.marginTop = 100 + "px";
for (let i = 0; i < sizeOfMaze * 2 + 1; i++) {
    maze[i] = [];
}
for (let i = 0; i < sizeOfMaze; i++) {
    for (let j = 0; j < sizeOfMaze; j++) {
        maze[i][j] = 0;
    }
}

createTable(maze, createWallOrPointMode, table);

function getNeighbours(openSet, map, x, y){
    if (map[x + 1][y] === 0 && x + 1 < sizeOfMaze){
        openSet.push(map[x + 1][y])
    }
    if (map[x][y + 1] === 0 && y + 1 < sizeOfMaze){
        openSet.push(map[x][y + 1])
    }
    if (map[x - 1][y] === 0 && x - 1 >= 0){
        openSet.push(map[x -1][y])
    }
    if (map[x][y - 1] === 0 && y - 1 >= 0){
        openSet.push(map[x][y - 1])
    }
}

function deleteWall(){

}

function createMaze(rows, columns, maze, sizeOfMaze, table) {
    let CordX = Math.floor(Math.random() * (sizeOfMaze - 1) + 1);
    let CordY = Math.floor(Math.random() * (sizeOfMaze - 1) + 1);
    maze[CordY][CordY].visited = true;
    table.rows[CordY].cells[CordX].style.backgroundColor = 'white'
    let neighboursList = new Set()
    getNeighbours(neighboursList, maze, CordX, CordY)
    while (neighboursList.size > 0 ){
        let currentPoint = neighboursList[Math.floor(Math.random() * ((neighboursList.size - 1)))];
        getNeighbours(neighboursList, maze, currentPoint.x, currentPoint.y);
        table.rows[currentPoint.y].cells[currentPoint.x].style.backgroundColor = 'white';
        maze[currentPoint.y][currentPoint.x].value = 0;
        maze[currentPoint.y][currentPoint.x].visited = true;
        neighboursList.delete(currentPoint);
    }
}

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
    createMaze();
});








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
//     const gScore = new Map();
//     const fScore = new Map();
//     const parent = new Map();
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





// function manhattanDistance(start, end) {
//     let dx = Math.abs(start.x - end.x);
//     let dy = Math.abs(start.y - end.y);
//     let distance = dx + dy;
//     return distance * 10;
// }
//
// function findNeighbours(openSet, map, x, y, end){
//     if (map[x + 1][y] === 0 && x + 1 < sizeOfMaze){
//         openSet.push(map[x + 1][y])
//         map[x + 1][y].cost = 10 + map[x][y].cost
//         map[x + 1][y].parent = map[x][y]
//         map[x + 1][y].heuristic = manhattanDistance(map[x + 1][y], end)
//         map[x + 1][y].weight = map[x + 1][y].heuristic + map[x + 1][y].cost
//     }
//     if (map[x][y + 1] === 0 && y + 1 < sizeOfMaze){
//         openSet.push(map[x][y + 1])
//         map[x][y + 1].cost = 10 + map[x][y].cost
//         map[x][y + 1].parent = map[x][y]
//         map[x][y + 1].heuristic = manhattanDistance([x][y + 1], end)
//         map[x][y + 1].weight = map[x + 1][y].heuristic + map[x + 1][y].cost
//     }
//     if (map[x - 1][y] === 0 && x - 1 >= 0){
//         openSet.push(map[x -1][y])
//         map[x - 1][y].cost = 10 + map[x][y].cost
//         map[x -1][y].parent = map[x][y]
//         map[x -1][y].heuristic = manhattanDistance([x -1][y], end)
//         map[x -1][y].weight = map[x -1][y].heuristic + map[x -1][y].cost
//     }
//     if (map[x][y - 1] === 0 && y - 1 >= 0){
//         openSet.push(map[x][y - 1])
//         map[x][y - 1].cost = 10 + map[x][y].cost
//         map[x][y - 1].parent = map[x][y]
//         map[x][y - 1].heuristic = manhattanDistance([x][y - 1], end)
//         map[x][y - 1].weight = map[x -1][y].heuristic + map[x][y - 1].cost
//     }
//     if (map[x + 1][y + 1] === 0 && y + 1 < sizeOfMaze && x + 1 < sizeOfMaze){
//         openSet.push(map[x + 1][y + 1])
//         map[x + 1][y + 1].cost = 14 + map[x][y].cost
//         map[x + 1][y + 1].parent = map[x][y]
//         map[x + 1][y + 1].heuristic = manhattanDistance([x + 1][y + 1], end)
//         map[x + 1][y + 1].weight = map[x -1][y].heuristic + map[x + 1][y + 1].cost
//     }
//     if (map[x + 1][y - 1] === 0 && x + 1 < sizeOfMaze && y - 1 >= 0){
//         openSet.push(map[x + 1][y - 1])
//         map[x + 1][y - 1].cost = 14 + map[x][y].cost
//         map[x + 1][y - 1].parent = map[x][y]
//         map[x + 1][y - 1].heuristic = manhattanDistance([x + 1][y - 1], end)
//         map[x + 1][y - 1].weight = map[x -1][y].heuristic + map[x + 1][y - 1].cost
//     }
//     if (map[x - 1][y + 1] === 0 && y + 1 < sizeOfMaze && x - 1 >= 0){
//         openSet.push(map[x - 1][y + 1])
//         map[x - 1][y + 1].cost = 14 + map[x][y].cost
//         map[x - 1][y + 1].parent = map[x][y]
//         map[x - 1][y + 1].heuristic = manhattanDistance([x - 1][y + 1], end)
//         map[x + 1][y - 1].weight = map[x - 1][y + 1].heuristic + map[x - 1][y + 1].cost
//     }
//     if (map[x - 1][y - 1] === 0 && y - 1 >= 0 && x - 1 >= 0){
//         openSet.push(map[x - 1][y - 1])
//         map[x - 1][y - 1].cost = 14 + map[x][y].cost
//         map[x - 1][y - 1].parent = map[x][y]
//         map[x - 1][y - 1].heuristic = manhattanDistance([x - 1][y - 1], end)
//         map[x - 1][y - 1].weight = map[x - 1][y - 1].heuristic + map[x - 1][y - 1].cost
//     }
// }
// function recoveryPath(){
//
// }
//
// function findPath(start, end, map){
//     let closedSet = [];
//     let openSet = [];
//     let current = start;
//     closedSet.push(start);
//     while (openSet.length > 0) {
//         findNeighbours(openSet, start);
//         for (let i = 1; i < openSet.length; i++) {
//             if (openSet[i].weight < current.weight) {
//                 current = openSet[i];
//             }
//         }
//         closedSet.push(current);
//         openSet.splice(current, 1)
//     }
//     return "No way"
// }

