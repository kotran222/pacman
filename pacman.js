// Pacman JS

document.addEventListener('DOMContentLoaded', () => {

    const grid = document.querySelector('.grid');
    const scoreDisplay = document.getElementById('score');
    let score = 0;
    const width = 28;
    const directions = [-1, 1, width, (-1*width)];
    const minIndex = 0; 
    const maxIndex = 783;

    //Legend
    // 0 - pac-dot
    // 1 - wall
    // 2 - ghost-lair
    // 3 - power-pellet
    // 4 - empty
    const layout = [
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,0,1,
        1,0,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,0,1,
        1,0,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,0,1,
        4,4,4,4,4,4,0,0,0,4,2,2,2,2,2,2,2,2,4,0,0,0,4,4,4,4,4,4,
        1,0,1,1,1,1,0,1,1,4,2,2,2,2,2,2,2,2,4,1,1,0,1,1,1,1,0,1,
        1,0,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,0,1,
        1,0,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
        1,1,1,0,1,1,0,1,1,0,1,0,1,1,1,1,0,1,0,1,1,0,1,1,0,1,1,1,
        1,1,1,0,1,1,0,1,1,0,1,0,1,1,1,1,0,1,0,1,1,0,1,1,0,1,1,1,
        1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
        1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
        1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
    ];

    /* How indexes work
    * Top-Left Corner is index = 0 (Min)
    * Bottom-Right Corner is index = 783 (Max)
    * 
    * How Coordinates Work 
    * X-Coor: Top-Left to Top-Right: 0 --> 27
    * Y-Coor: Top-Left to Bottom-Right: 0 --> 27
    */
    const squares =[];

    function createBoard(){
        for(let i=0; i<layout.length; i++){
            const square = document.createElement('div');
            grid.appendChild(square);
            squares.push(square);

            //add layout to board
            if(layout[i] === 0){
                squares[i].classList.add('pac-dot');
            }else if(layout[i] === 1){
                squares[i].classList.add('wall');
            }else if(layout[i] === 2){
                squares[i].classList.add('ghost-lair');
            }else if(layout[i] === 3){
                squares[i].classList.add('power-pellet');
            }
        }
    }
    createBoard();

    //starting position of pac-man
    //let pacmanCurrentIndex = 490;
    //let pacmanCurrentIndex = 391;

    squares[pacmanCurrentIndex].classList.add('pac-man');

    //move pac-man
    function movePacman(e){
        squares[pacmanCurrentIndex].classList.remove('pac-man');

        //recall width is 28
        switch(e.keyCode){
            case 37: //Don't want to go off map (leftside) and want to move left
                if(pacmanCurrentIndex % width !== 0 
                    && !squares[pacmanCurrentIndex - 1].classList.contains('wall') 
                    && !squares[pacmanCurrentIndex - 1].classList.contains('ghost-lair')){

                    pacmanCurrentIndex -= 1;

                    //check if pacman is in the left exit
                    if(pacmanCurrentIndex - 1 === 363){
                        pacmanCurrentIndex = 391;
                    }
                    break;
            }
            case 38: //Can't go beyond min index of 0. Want to move one space up.
                if(pacmanCurrentIndex - width >= 0 
                    && !squares[pacmanCurrentIndex - width].classList.contains('wall') 
                    && !squares[pacmanCurrentIndex - width].classList.contains('ghost-lair')){

                    pacmanCurrentIndex -= width;
                    break;
                } 
            case 39: //Don't want to go off map (rightside) and want to move right
                if(pacmanCurrentIndex % width < width - 1 
                    && !squares[pacmanCurrentIndex + 1].classList.contains('wall') 
                    && !squares[pacmanCurrentIndex + 1].classList.contains('ghost-lair')){

                    pacmanCurrentIndex += 1;

                    //check if pacman is the right exit
                    if(pacmanCurrentIndex + 1 === 392){
                        pacmanCurrentIndex = 364;
                    }

                    break;
                }
            case 40: //Can't go beyond max index of 783 (width X width = 784). Want to move one space down. 
                if(pacmanCurrentIndex + width < width * width 
                    && !squares[pacmanCurrentIndex + width].classList.contains('wall') 
                    && !squares[pacmanCurrentIndex + width].classList.contains('ghost-lair')){

                    pacmanCurrentIndex += width;
                    break;
                }
        }

        squares[pacmanCurrentIndex].classList.add('pac-man');

        pacDotEaten();
        powerPelletEaten();
        checkForGameOver();
        checkForWin();
    }
    document.addEventListener('keyup', movePacman);

    //what happens when pac-man eats a pac-dot
    function pacDotEaten(){
        if(squares[pacmanCurrentIndex].classList.contains('pac-dot')){
            score++;
            scoreDisplay.innerHTML = score;
            squares[pacmanCurrentIndex].classList.remove('pac-dot');
        }
    }

    //what happens when you eat a power-pellet 
    function powerPelletEaten(){
        if(squares[pacmanCurrentIndex].classList.contains('power-pellet')){
            score += 10;
            ghosts.forEach(ghost => ghost.isScared = true);
            setTimeout(unScareGhosts, 10000);
            squares[pacmanCurrentIndex].classList.remove('power-pellet');
        }
    }

    //make the ghosts stop flashing
    function unScareGhosts(){
        ghosts.forEach(ghost => ghost.isScared = false);
    }


    //create our Ghost template
    class Ghost{
        constructor(className, startIndex, speed, chaseBehavior, scatterBehavior){
            this.className = className;
            this.startIndex = startIndex;
            this.speed = speed;
            this.currentIndex = startIndex;
            this.destination = (-1, -1);
            // this.moving = false;
            this.chaseBehavior = chaseBehavior; //chaseBehavior = chaseAggressive, chaseAmbush, chasePatrol, or chaseRandom
            this.scatterBehavior = scatterBehavior;   //scatterBehavior = scatterTopLeftCorner, scatterTopRightCorner, scatterBottomLeftCorner, or scatterBottomRightCorner
            //this.frightenedBehavior = frightenedBehavior; //frightenedBehavior = frightenedWandering;
            this.isScared = false;
            this.timerId = NaN;
        }
    }

    //all the ghosts
    ghosts = [
        new Ghost('blinky', 351, 250, 'chaseAggressive', 'scatterTopRightCorner'),
        new Ghost('pinky', 348, 400, 'chaseAmbush', 'scatterTopLeftCorner'),
        new Ghost('inky', 435, 300, 'chasePatrol', 'scatterBottomRightCorner'),
        new Ghost('clyde', 432, 500, 'chaseRandom', 'scatterBottomLeftCorner')  
    ];

    //draw my ghost onto the grid
    ghosts.forEach(ghost => {
        squares[ghost.currentIndex].classList.add(ghost.className);
        squares[ghost.currentIndex].classList.add('ghost');
        // squares[pacmanCurrentIndex].classList.add('eyes');
        // squares[pacmanCurrentIndex].classList.add('skirt');
    });

    //get coordinates of pacman or ghosts
    function getCoordinates(index){
        return[index % width, Math.floor(index / width)];
    }
        /*EXAMPLE: PACMAN START
        * index = 490
        * x-coor: 490 % 28 = 14 since 28*17=476. --> 490-476=14. Therefore, x = 14 
        * y-coor: 490 / 28 = 17.5 --> floor = 17. Therfore, y = 17.
        * /


    //All Ghosts can move
    // ghosts.forEach(ghost => moveGhost(ghost));

    // //Ghost Move Function
    // function moveGhost(ghost){
    //     const directions = [-1, +1, +width, -width];
    //     let direction = directions[Math.floor(Math.random() * directions.length)];

    //     ghost.timerId = setInterval(function(){
    //         // console.log(ghost.currentIndex); ************
    //         //Ghost in chase mode
    //         if(ghost.behavior === 1){
    //             //if the next square your ghost is going to do in does NOT contain a wall and a ghost, you can go there.
    //             if(!squares[ghost.currentIndex + direction].classList.contains('wall')
    //             && !squares[ghost.currentIndex + direction].classList.contains('ghost') ){
    //                 //remove all ghost related classes
    //                 squares[ghost.currentIndex].classList.remove(ghost.className);
    //                 squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost');

    //                 //check if the new space is closer
    //                 const [pacmanX, pacmanY] = getCoordinates(pacmanCurrentIndex);
    //                 const [ghostX, ghostY] = getCoordinates(ghost.currentIndex);
                    
    //                 const possibleMoves = [
    //                     [ghostX - 1, ghostY],
    //                     [ghostX + 1, ghostY],
    //                     [ghostX, ghostY - 1],
    //                     [ghostX, ghostY + 1],
    //                 ];
            
    //                 /* sort by distance from Pac-man */
    //                 possibleMoves.sort(function (a, b) {
    //                     var aD = dist(a.x, a.y, pacman.x, pacman.y);
    //                     var bD = dist(b.x, b.y, pacman.x, pacman.y);
    //                     return aD - bD;
    //                 });
    //                 for(var i = 0; i < possibleMoves.length; i++){
    //                     ghost.destination = createVector(possibleMoves[i].x, possibleMoves[i].y);
    //                 }

    //                                 function isXCoordCloser(){
    //                 if((ghostNewX - pacmanX) > (ghostX - pacmanX)){
    //                     return true;
    //                 }else{
    //                     return false;
    //                 }
    //             }

    //             function isYCoordCloser(){
    //                 if((ghostNewY - pacmanY) > (ghostY - pacmanY)){
    //                     return true;
    //                 }else{
    //                     return false;
    //                 }
    //             }

    //             if( isXCoordCloser() || isYCoordCloser() ){
    //                 //change the current index to the new safe square
    //                 ghost.currentIndex += direction;
    //                 squares[ghost.currentIndex].classList.add(ghost.className, 'ghost');
    //             }else{
    //                 squares[ghost.currentIndex].classList.add(ghost.className, 'ghost');
    //                 direction = directions[Math.floor(Math.random() * directions.length)];
    //             }
    //             }//might need an else to rotate away from corners or dead ends ******

    //         //Ghost in Scatter Mode
    //         }else if(ghost.behavior === 0){
    //             //if the next square your ghost is going to do in does NOT contain a wall and a ghost, you can go there.
    //             if(!squares[ghost.currentIndex + direction].classList.contains('wall')
    //             && !squares[ghost.currentIndex + direction].classList.contains('ghost') ){
    //                 //remove all ghost related classes
    //                 squares[ghost.currentIndex].classList.remove(ghost.className);
    //                 squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost');

    //                 //check if the new space is closer
    //                 const [pacmanX, pacmanY] = getCoordinates(pacmanCurrentIndex);
    //                 const [ghostX, ghostY] = getCoordinates(ghost.currentIndex);
                    
    //                 const possibleMoves = [
    //                     [ghostX - 1, ghostY],
    //                     [ghostX + 1, ghostY],
    //                     [ghostX, ghostY - 1],
    //                     [ghostX, ghostY + 1],
    //                 ];
            
    //                 /* sort by distance from Pac-man */
    //                 possibleMoves.sort(function (a, b) {
    //                     var aD = dist(a.x, a.y, pacman.x, pacman.y);
    //                     var bD = dist(b.x, b.y, pacman.x, pacman.y);
    //                     return aD - bD;
    //                 });
    
    //                 direction = directions[Math.floor(Math.random() * directions.length)];
    //             }//might need an else to rotate away from corners or dead ends ******

    //         }

    //         //if the ghost is currently scared
    //         if(ghost.isScared){
    //             squares[ghost.currentIndex].classList.add('scared-ghost');
    //         }

    //         //if the ghosts are scared and pacman runs int0 it
    //         if(ghost.isScared && squares[ghost.currentIndex].classList.contains('pac-man')){
    //             squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost');
    //             ghost.currentIndex = ghost.startIndex;
    //             score += 100;
    //             squares[ghost.currentIndex].classList.add(ghost.className, 'ghost');
    //         }
    //         checkForGameOver();
    //     }, ghost.speed);
    // }

    //******************************************* */
    // //Ghost Move Function
    // function moveGhost(ghost){
    //     switch(ghost.className){
    //         case 'binky':
    //             chaseAggressive(ghost[0]);
    //             break;

    //         // case 'pinky':

    //         //     break;

    //         // case 'inky':

    //         //     break;

    //         // case 'clyde':
 
    //         //     break;

    //     }
    // }

    //******************************************* */

    //Need to distinguish from acceptable path from the walls and ghost lair
    class Graph {
        constructor() {
          this.nodes = [];
          this.adjacencyList = {};
        }

        //Prep the nodes (indices that represent the tiles where characters can move on)
        addNode(node) {
            this.nodes.push(node); 
            this.adjacencyList[node] = [];
        }

        //Add edges: (1)adjacent nodes and (2)weight to that adjacent node
        addEdge(node1, node2, weight) {
            this.adjacencyList[node1].push({node:node2, weight: weight});
            this.adjacencyList[node2].push({node:node1, weight: weight});
        }
    }

    //Create our new map of the walkable paths
    let map = new Graph();
    //Reference
    // 0 - pac-dot
    // 1 - wall
    // 2 - ghost-lair
    // 3 - power-pellet
    // 4 - empty

    //map will have all the nodes and edges
    for(let i=0; i<layout.length; i++){
        if(layout[i] === 0){
            map.addNode(i);
            nodeWeightFinderAllDirections(i);
        }else if(layout[i] === 3){
            map.addNode(i);
            nodeWeightFinderAllDirections(i);
        }else if(layout[i] === 4){
            map.addNode(i);
            nodeWeightFinderAllDirections(i);
        }  
    }
    console.log(map.adjacencyList);
    

    //const directions = [-1, +1, +width, -width];
    //All edges are weight=1
    function nodeWeightFinderAllDirections(nodeSource){
                    //Going Right
                    const tileRight = nodeSource + directions[1];
                    if(tileRight < minIndex || tileRight > maxIndex || tileRight === 321 
                        || tileRight === 322 || tileRight === 374 || tileRight === 381
                        || tileRight === 392 || tileRight === 402 || tileRight === 409 
                        || tileRight === 461 || tileRight === 462 || tileRight === 364
                        || tileRight === 391){
                        return;
                    }
                    if(layout[tileRight] === 0 || layout[tileRight] === 3 || layout[tileRight] === 4){
                        map.addEdge(nodeSource, tileRight, 1);
                    }

        // nodeWeightFinderUp(nodeSource);
        // nodeWeightFinderRight(nodeSource);
        // nodeWeightFinderDown(nodeSource);
        // nodeWeightFinderLeft(nodeSource);

        // function nodeWeightFinderUp(nodeSource){
        //     //Going Up
        //     const tileUp = nodeSource + directions[3];
        //     if(tileUp < minIndex || tileUp > maxIndex){
        //         return;
        //     }
        //     if(layout[tileUp] === 0 || layout[tileUp] === 3 || layout[tileUp] === 4){
        //         map.addEdge(nodeSource, tileUp, 1);
        //     }
        // }

        // function nodeWeightFinderRight(nodeSource){
        //     //Going Right
        //     const tileRight = nodeSource + directions[1];
        //     if(tileRight < minIndex || tileRight > maxIndex){
        //         return;
        //     }
        //     if(layout[tileRight] === 0 || layout[tileRight] === 3 || layout[tileRight] === 4){
        //         map.addEdge(nodeSource, tileRight, 1);
        //     }
        // }

        // function nodeWeightFinderDown(nodeSource){
        //     //Going Down
        //     const tileDown = nodeSource + directions[2];
        //     if(tileDown < minIndex || tileDown > maxIndex){
        //         return;
        //     }
        //     if(layout[tileDown] === 0 || layout[tileDown] === 3 || layout[tileDown] === 4){
        //         map.addEdge(nodeSource, tileDown, 1);
        //     }
        // }

        // function nodeWeightFinderLeft(nodeSource){
        //     //Going Left
        //     const tileLeft = nodeSource + directions[0];
        //     if(tileLeft < minIndex || tileLeft > maxIndex){
        //         return;
        //     }
        //     if(layout[tileLeft] === 0 || layout[tileLeft] === 3 || layout[tileLeft] === 4){
        //         map.addEdge(nodeSource, tileLeft, 1);
        //     }
        // }
    }


    // /* Let's Try Dijkstra for Blinky */
    // //priority queue
    // class PriorityQueue {
    //     constructor() {
    //       this.collection = [];
    //     }

    //     //function to add elements to queue
    //     //element is an array with element[0]=indexOnLayout and element[1]=weight
    //     enqueue(element){
    //         if (this.isEmpty()){ 
    //         this.collection.push(element);
    //         } else {
    //         let added = false;
    //         for (let i = 1; i <= this.collection.length; i++){
    //             if (element[1] < this.collection[i-1][1]){ 
    //             this.collection.splice(i-1, 0, element);
    //             added = true;
    //             break;
    //             }
    //         }
    //         if (!added){
    //             this.collection.push(element);
    //         }
    //         }
    //     };
    //     //remove elements
    //     dequeue() {
    //         let value = this.collection.shift();
    //         return value;
    //     };
    //     //check if queue is empty
    //     isEmpty() {
    //         return (this.collection.length === 0) 
    //     };
    // }

    // //Dijkstra's Algorithm to find shortest path
    // function findPathWithDijkstra(startNode, endNode) {
    //     //initialize queue
    //     let times = {}; //time stores the weights along the path
    //     let backtrace = {};
    //     let pq = new PriorityQueue();

    //     //Obviously, starting at startNode is time = 0
    //     times[startNode] = 0;
    //     //the other nodes can be anything so initialize to inf
    //     this.nodes.forEach(node => {
    //       if (node !== startNode) {
    //         times[node] = Infinity;
    //       }
    //     });
    //     //add starting node to priority queue
    //     pq.enqueue([startNode, 0]);

    //     //access first element in the queue and start checking the neighbors
    //     while (!pq.isEmpty()) {
    //         let shortestStep = pq.dequeue();
    //         let currentNode = shortestStep[0];
    //         this.adjacencyList[currentNode].forEach(neighbor => {
    //             //We add the neighbor’s weight to the time it took to get to the node we’re on.
    //             let time = times[currentNode] + neighbor.weight;
    //             //Then we check if the calculated time is less than the time we currently have on file for this neighbor.
    //             if (time < times[neighbor.node]) {
    //                 //update the time
    //                 times[neighbor.node] = time;
    //                 //add this step to backtrace
    //                 backtrace[neighbor.node] = currentNode;
    //                 //add the neighbor to priority queue
    //                 pq.enqueue([neighbor.node, time]);
    //             }
    //         });
    //     }

    //     let path = [endNode];
    //     let lastStep = endNode;
    //     while(lastStep !== startNode) {
    //       path.unshift(backtrace[lastStep]);
    //       lastStep = backtrace[lastStep];
    //     }
    //     return `Path is ${path} and time is ${times[endNode]}`;
    // }

    // findPathWithDijkstra(ghosts[0].startIndex, pacmanCurrentIndex);



//******************************************* */
    // /* Blinky Movements */
    // //chaseAggressive Mode: Stalks Pacman in shortest path
    // function chaseAggressive(ghost){
    //     //const directions = [-1, +1, +width, -width];
    //     let direction = directions[Math.floor(Math.random() * directions.length)];

    //     ghost.timerId = setInterval(function(){

    //     }, ghost.speed);
    // }

    //scatterTopRightCorner 
    //******************************************* */



    /* Pinky Movements */

    /* Inky Movements */

    /* Clyde Movements */




    //////////////////



    // ghosts.forEach(ghost => moveGhost(ghost));

    // //write the function to move the ghosts
    // function moveGhost(ghost){
    //     const directions = [-1, +1, +width, -width];
    //     let direction = directions[Math.floor(Math.random() * directions.length)];

    //     ghost.timerId = setInterval(function(){
    //         // console.log(ghost.currentIndex); ************
    //         //if the next square your ghost is going to do in does NOT contain a wall and a ghost, you can go there.
    //         if(!squares[ghost.currentIndex + direction].classList.contains('wall')
    //             && !squares[ghost.currentIndex + direction].classList.contains('ghost') ){

    //             //remove all ghost related classes
    //             squares[ghost.currentIndex].classList.remove(ghost.className);
    //             squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost');
                
    //             //check if the new space is closer
    //             const [ghostX, ghostY] = getCoordinates(ghost.currentIndex);
    //             const [pacmanX, pacmanY] = getCoordinates(pacmanCurrentIndex);
    //             const [ghostNewX, ghostNewY] = getCoordinates(ghost.currentIndex + direction);

    //             function isXCoordCloser(){
    //                 if((ghostNewX - pacmanX) > (ghostX - pacmanX)){
    //                     return true;
    //                 }else{
    //                     return false;
    //                 }
    //             }

    //             function isYCoordCloser(){
    //                 if((ghostNewY - pacmanY) > (ghostY - pacmanY)){
    //                     return true;
    //                 }else{
    //                     return false;
    //                 }
    //             }

    //             if( isXCoordCloser() || isYCoordCloser() ){
    //                 //change the current index to the new safe square
    //                 ghost.currentIndex += direction;
    //                 squares[ghost.currentIndex].classList.add(ghost.className, 'ghost');
    //             }else{
    //                 squares[ghost.currentIndex].classList.add(ghost.className, 'ghost');
    //                 direction = directions[Math.floor(Math.random() * directions.length)];
    //             }
    //             //************************************************** */
    //             //redraw the ghost in the new safe space
    //             // squares[ghost.currentIndex].classList.add(ghost.className, 'ghost');

    //             //else find a new direction to try
    //             }else{
    //                 direction = directions[Math.floor(Math.random() * directions.length)];
    //             }

    //             //if the ghost is currently scared
    //             if(ghost.isScared){
    //                 squares[ghost.currentIndex].classList.add('scared-ghost');
    //             }

    //             //if the ghosts are scared and pacman runs int it
    //             if(ghost.isScared && squares[ghost.currentIndex].classList.contains('pac-man')){
    //                 squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost');
    //                 ghost.currentIndex = ghost.startIndex;
    //                 score += 100;
    //                 squares[ghost.currentIndex].classList.add(ghost.className, 'ghost');
    //             }
    //             checkForGameOver();
    //     }, ghost.speed);
    // }

    //check for game over
    function checkForGameOver(){
        if(squares[pacmanCurrentIndex].classList.contains('ghost') &&
        !squares[pacmanCurrentIndex].classList.contains('scared-ghost')){
            ghosts.forEach(ghost => clearInterval(ghost.timerId));
            document.removeEventListener('keyup', movePacman);
            scoreDisplay.innerHTML = 'GAME OVER';
        }
    }

    //check for a win
    function checkForWin(){
        if(score === 292){
            ghosts.forEach(ghost => clearInterval(ghost.timerId));
            document.removeEventListener('keyup', movePacman);
            scoreDisplay.innerHTML = 'YOU WON';
        }
    }

});