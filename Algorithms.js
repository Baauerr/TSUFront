class Node {
    constructor(xIndex, yIndex, nodeSize) {
        this.xIndex = xIndex; //X-Index in grid[]
        this.yIndex = yIndex; //Y-Index in grid[]
        this.x = xIndex * nodeSize; //X-Index in grid[] multiplied by nodeSize (e.g. 2 x 50) forms the grid
        this.y = yIndex * nodeSize; //Y-Index in grid[] multiplied by nodeSize (e.g. 2 x 50) forms the grid
        this.nodeSize = nodeSize; //Size of the Node in Pixels
        this.parent = null; //Node's Parent Node
        this.neighbors = []; //The Node's Neighbors
        this.g = 0; //Cost from Start-Node
        this.h = 0; //Heuristic cost to End-Node
        this.f = 0; //F-Cost = Sum of G-Cost + H-Cost
    }
}


const table = document.getElementById('my-table');
table.style.borderCollapse = 'collapse';
document.body.appendChild(table);

let sizeOfMaze = 41
const maze = new Array(sizeOfMaze);
let createWallOrPointMode = null;

for (let i = 0; i < sizeOfMaze; i++) {
    maze[i] = new Array(sizeOfMaze);
}

for (let i = 0; i < sizeOfMaze; i++) {
    for (let j = 0; j < sizeOfMaze; j++) {
        maze[i][j] = new Node(i, j, sizeOfMaze);
    }
}

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
                            cell.classList.remove('startEndPoint');
                            cell.classList.add('wall');
                            break;
                        case 1:
                            maze[y][x] = 0;
                            cell.classList.remove('wall');
                            cell.classList.add('maze');
                            break
                        case 0:
                            maze[y][x] = 1;
                            cell.classList.remove('maze');
                            cell.classList.add('wall');
                            break;
                    }
                }
                else if (createWallOrPointMode === 0) {
                    switch(maze[x][y]){
                        case 2:
                            maze[y][x] = 0;
                            cell.classList.remove('startEndPoint');
                            cell.classList.add('maze');
                            break;
                        case 1:
                            maze[y][x] = 2;
                            cell.classList.remove('wall');
                            cell.classList.add('startEndPoint');
                            break;
                        case 0:
                            maze[y][x] = 2;
                            cell.classList.remove('maze');
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
        if (addBlockWalls && valid(y+1,x) &&  (maze[y+1][x] === 1))
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

            } else
                neighboursList.splice(neighboursList.indexOf(randomWall), 1);
    }
}
console.log(maze);

function aStar(startNode, endNode, maze) {
    function manhattanHeuristic(startX, startY, endX, endY) {
        return Math.abs(startX - endX) + Math.abs(startY - endY);
    }

        function findNeighbors(maze) {
            for (let i = 0; i < maze.length; i++) {
                for (let j = 0; j < maze[i].length; j++) {
                    //Left Neighbor
                    if (i > 0)
                        maze[i][j].neighbors.push(maze[i - 1][j]);
                    //Right Neighbor
                    if (i < maze[i].length - 1)
                        maze[i][j].neighbors.push(maze[i + 1][j]);
                    //Upper Neighbor
                    if (j > 0)
                        maze[i][j].neighbors.push(maze[i][j - 1]);
                    //Lower Neighbor
                    if (j < maze[i].length - 1)
                        maze[i][j].neighbors.push(maze[i][j + 1]);
                }
            }
        }

        findNeighbors(maze);

        let openList = []; //Search-Queue
        let closedList = []; //Finished Queue
        let currentNode;

        //As long as there are items in the openList[], the Search isn't done
        if (!!openList.length) {

            //Find the index of openList with the lowest F-Value
            let lowestFIndex = 0;
            for (let i = 0; i < openList.length - 1; i++) {
                if (openList[i].f < openList[lowestFIndex].f) {
                    lowestFIndex = i;
                }
            }

            currentNode = openList[lowestFIndex]; //Current Node

            openList.splice(lowestFIndex, 1); //Remove Current Node from openList

            closedList.push(currentNode); //Add Current Node to closedList

            //If we're at the End-Node, finish
            if (currentNode === endNode) {
                console.log("FOUND END!!!"); // здесь нужно восстановить путь
            }

            //Find the next Step towards the End
            for (const neighbor of currentNode.neighbors) {
                //If Neighbor is a Wall or in closedList, continue (skip it)
                if (neighbor === 1 || closedList.includes(neighbor)) continue;

                if (currentNode.f + 1 < neighbor.f || !openList.includes(neighbor)) {
                    //Set G-Cost (Distance from Start-Node) of Neighbor
                    //neighbor.g = currentNode.g + 1;
                    neighbor.g = currentNode.g + Math.floor(manhattanHeuristic(currentNode.x, currentNode.y, neighbor.x, neighbor.y))
                    //Set H-Cost (Distance to End-Node) of Neighbor
                    neighbor.h = Math.floor(manhattanHeuristic(neighbor.x, neighbor.y, endNode.x, endNode.y))
                    //Set F-Cost (sum of G-Cost + F-Cost) of neighbor
                    neighbor.f = neighbor.g + neighbor.h;

                    //Set Parent-Node
                    neighbor.parent = currentNode;
                    //Push Neighbor to the openList
                    if (!openList.includes(neighbor)) openList.push(neighbor);

                }
            }
        } else {
            //If there are nomore items in openList[] and the end hasn't been found, the Search failed
            console.log("No Solution!"); //Здесь нужно написать, что пути нет
        }
}



// Helper function to reconstruct the path from start to end node

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
    aStar(maze[0][0], maze[4][0], maze);
});



// function getNeighbours(y,x, maze, table, end) {
//     // table.rows[y].cells[x].classList.remove('maze');
//     // table.rows[y].cells[x].classList.add('active');
//     if (valid(y+1,x) && (maze[y+1][x] === 0)) {
//         maze[y + 1][x].parent.x = x;
//         maze[y + 1][x].parent.y = y;
//         maze[y + 1][x].distance += 10
//         maze[y + 1][x].heuristic = manhattanDistance(maze[y + 1][x], end) * 10
//         neighboursList.push([y + 1, x, [y, x]]);
//     }
//
//     if (valid(y-1,x) && (maze[y-1][x] === 0)) {
//         maze[y - 1][x].parent.x = x;
//         maze[y - 1][x].parent.y = y;
//         maze[y - 1][x].distance += 10
//         maze[y - 1][x].heuristic = manhattanDistance(maze[y - 1][x], end) * 10
//         neighboursList.push([y - 1, x, [y, x]]);
//     }
//     if (valid(y,x+1) && (maze[y][x+1] === 0)) {
//         maze[y][x + 1].parent.x = x;
//         maze[y][x + 1].parent.y = y;
//         maze[y][x + 1].distance = maze[y][x].distance += 10
//         maze[y][x + 1].heuristic = manhattanDistance(maze[y][x + 1], end) * 10
//         neighboursList.push([y, x + 1, [y, x]]);
//     }
//     if (valid(y,x-1) && (maze[y][x-1] === 0)) {
//         maze[y][x - 1].parent.x = x;
//         maze[y][x - 1].parent.y = y;
//         maze[y][x - 1].distance += 10
//         maze[y][x - 1].heuristic = manhattanDistance(maze[y][x - 1], end) * 10
//         neighboursList.push([y, x - 1, [y, x]]);
//     }
// }
// function valid(a,b) {
//     return (a < sizeOfMaze && a >= 0 && b < sizeOfMaze && b >= 0);
// }





