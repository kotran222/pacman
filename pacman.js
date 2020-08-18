// Pacman JS

document.addEventListener('DOMContentLoaded', () => {

    const grid = document.querySelector('.grid');
    const scoreDisplay = document.getElementById('score');
    let score = 0;
    const width = 28;
    const directions = [-1, 1, width, (-1*width)];
    const minIndex = 0; 
    const maxIndex = 783;

    //Corner of the maps
    const topLeftCornerLocation = 29; //Pinky

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
        1,0,0,0,0,0,0,0,0,0,0,0,0,4,4,0,0,0,0,0,0,0,0,0,0,0,0,1,
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
    let pacmanCurrentIndex = 742;
    //let pacmanCurrentIndex = 293;

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
        new Ghost('blinky', 351, 500, 'chaseAggressive', 'scatterTopRightCorner'),
        new Ghost('pinky', 348, 600, 'chaseAmbush', 'scatterTopLeftCorner'),
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
        * 
        */



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
        //Add these to the map
        if(layout[i] === 0){
            map.addNode(i);
            nodeWeightFinderAllDirections(map, i);
        }else if(layout[i] === 2){
            map.addNode(i);
            nodeWeightFinderAllDirections(map, i);
        }else if(layout[i] === 3){
            map.addNode(i);
            nodeWeightFinderAllDirections(map, i);
        }else if(layout[i] === 4){
            map.addNode(i);
            nodeWeightFinderAllDirections(map, i);
        }  
    }

    //All Ghosts can move
    //ghosts.forEach(ghost => moveGhost(ghost));
    moveGhost(map, ghosts[0]);
    moveGhost(map, ghosts[1]);

    //Ghost Move Function
    function moveGhost(graph, ghost){
        chaseAggressive(graph, ghost);
        chaseAmbush(graph, ghost);
        // setTimeout(scatterTopLeftCorner(graph, ghost), 10000);


        // switch(ghost.className){
        //     case 'blinky':
        //         chaseAggressive(map, ghost);
        //         break;

            // case 'pinky':

            //     break;

            // case 'inky':

            //     break;

            // case 'clyde':
 
            //     break;

        // }
    }

    //const directions = [-1, +1, +width, -width];
    //All edges are weight=1
    /* NOTE: Only Need FinderUp and FinderLeft; others are redundant and broken anyways*/
    function nodeWeightFinderAllDirections(graph, nodeSource){

        nodeWeightFinderUp(graph, nodeSource);
        nodeWeightFinderLeft(graph, nodeSource);

        function nodeWeightFinderUp(graph, nodeSource){
            //Going Up
            const tileUp = nodeSource + directions[3];
            if(tileUp < minIndex || tileUp > maxIndex){
                return;
            }
            if(layout[tileUp] === 0 || layout[tileUp] === 2 || layout[tileUp] === 3 || layout[tileUp] === 4){
                graph.addEdge(nodeSource, tileUp, 1);
            }
        }

        function nodeWeightFinderLeft(graph, nodeSource){
            //Going Left
            const tileLeft = nodeSource + directions[0];
            if(tileLeft < minIndex || tileLeft > maxIndex){
                return;
            }
            if(layout[tileLeft] === 0 || layout[tileLeft] === 2 || layout[tileLeft] === 3 || layout[tileLeft] === 4){
                graph.addEdge(nodeSource, tileLeft, 1);
            }
        }
    }

    /* Let's Try Dijkstra for Blinky */
    //priority queue
    class PriorityQueue {
        constructor() {
          this.collection = [];
        }

        //function to add elements to queue
        //element is an array with element[0]=indexOnLayout and element[1]=weight
        enqueue(element){
            if (this.isEmpty()){ 
            this.collection.push(element);
            } else {
            let added = false;
            for (let i = 1; i <= this.collection.length; i++){
                if (element[1] < this.collection[i-1][1]){ 
                this.collection.splice(i-1, 0, element);
                added = true;
                break;
                }
            }
            if (!added){
                this.collection.push(element);
            }
            }
        };
        //remove elements
        dequeue() {
            let value = this.collection.shift();
            return value;
        };
        //check if queue is empty
        isEmpty() {
            return (this.collection.length === 0) 
        };
    }

    //Dijkstra's Algorithm to find shortest path
    function findPathWithDijkstra(graph, startNode, endNode) {
        //initialize queue
        let times = {}; //time stores the weights along the path
        let backtrace = {};
        let pq = new PriorityQueue();

        //Obviously, starting at startNode is time = 0
        times[startNode] = 0;

        //the other nodes can be anything so initialize to inf
        graph.nodes.forEach(node => {
          if (node !== startNode) {
            times[node] = Infinity;
          }
        });
        
        //add starting node to priority queue
        pq.enqueue([startNode, 0]);

        //access first element in the queue and start checking the neighbors
        while (!pq.isEmpty()) {
            let shortestStep = pq.dequeue();
            let currentNode = shortestStep[0];
            graph.adjacencyList[currentNode].forEach(neighbor => {
                //We add the neighbor’s weight to the time it took to get to the node we’re on.
                let time = times[currentNode] + neighbor.weight;
                //Then we check if the calculated time is less than the time we currently have on file for this neighbor.
                if (time < times[neighbor.node]) {
                    //update the time
                    times[neighbor.node] = time;
                    //add this step to backtrace
                    backtrace[neighbor.node] = currentNode;
                    //add the neighbor to priority queue
                    pq.enqueue([neighbor.node, time]);
                }
            });
        }

        let path = [endNode];
        let lastStep = endNode;
        while(lastStep !== startNode) {
          path.unshift(backtrace[lastStep]);
          lastStep = backtrace[lastStep];
        }
        // return `Path is ${path} and time is ${times[endNode]}`;
        return path;
    }

    //findPathWithDijkstra(map, ghosts[0].startIndex, pacmanCurrentIndex);
    //console.log(findPathWithDijkstra(map, ghosts[0].startIndex, 364));

//******************************************* */
    /* Scatter Mode (used for any Ghosts)
     * The Ghost will move in random directions for a certain period of time
     * Will not target the player
    */

   function scatterMode(ghost){
        let direction = directions[Math.floor(Math.random() * directions.length)];
        ghost.timerId = setInterval(function() {
            //if the next squre your ghost is going to go to does not have a ghost and does not have a wall
            if (!squares[ghost.currentIndex + direction].classList.contains('ghost') &&
              !squares[ghost.currentIndex + direction].classList.contains('wall') ) {
                //remove the ghosts classes
                squares[ghost.currentIndex].classList.remove(ghost.className);
                squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost');
                //move into that space
                ghost.currentIndex += direction;
                squares[ghost.currentIndex].classList.add(ghost.className, 'ghost');
            //else find a new random direction ot go in
            } else direction = directions[Math.floor(Math.random() * directions.length)];

            scaredGhostMode(ghost);
            checkForGameOver();
        }, ghost.speed);
   }

    /* Blinky Movements */
    //chaseAggressive Mode: Stalks Pacman in shortest path
    function chaseAggressive(graph, ghost){
        ghost.timerId = setInterval(function(){
            squares[ghost.currentIndex].classList.remove(ghost.className);
            squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost');

            //path is confined in an array
            let path = findPathWithDijkstra(graph, ghost.currentIndex, pacmanCurrentIndex);
            i = 1;

            //Skip pass other ghost teleport
            if(squares[path[i]].classList.contains('ghost') ){
                i++;
            }

            //check there are no other ghosts in your path
            if(i < path.length && !squares[path[i]].classList.contains('ghost')){
                //change index to one step forward of the path each time
                ghost.currentIndex = path[i];
                //redraw the ghost in the new safe space
                squares[ghost.currentIndex].classList.add(ghost.className, 'ghost');

                scaredGhostMode(ghost);
                checkForGameOver();
            }

        }, ghost.speed);
    }

    //scatterTopRightCorner 
    //******************************************* */

    
    /* Pinky Movements */
    //chaseAmbush Mode: Blocks Pacman in shortest path
    function chaseAmbush(graph, ghost){
        ghost.timerId = setInterval(function(){
            squares[ghost.currentIndex].classList.remove(ghost.className);
            squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost');

            //const directions = [-1, +1, +width, -width];
            let blockCheckPoint = 0;

            const tileUp = pacmanCurrentIndex + directions[3];
            const tileRight = pacmanCurrentIndex + directions[1];
            const tileDown = pacmanCurrentIndex + directions[2];
            const tileLeft = pacmanCurrentIndex + directions[0];

            if(tileUp >= minIndex && tileUp <= maxIndex 
                && layout[tileUp] !== 1 && ghost.currentIndex !== tileUp) {
                blockCheckPoint = tileUp;
            }else if(tileRight >= minIndex && tileRight <= maxIndex 
                && layout[tileRight] !== 1 && ghost.currentIndex !== tileRight) {
                blockCheckPoint = tileRight;
            }else if(tileDown >= minIndex && tileDown <= maxIndex 
                && layout[tileDown] !== 1 && ghost.currentIndex !== tileDown) {
                blockCheckPoint = tileDown;
            }else if(tileLeft >= minIndex && tileLeft <= maxIndex 
                && layout[tileLeft] !== 1 && ghost.currentIndex !== tileLeft) {
                blockCheckPoint = tileLeft;
            }
            
            //console.log(blockCheckPoint);

            //path is confined in an array
            let path = findPathWithDijkstra(graph, ghost.currentIndex, blockCheckPoint);
            let i = 1;

            //Skip pass other ghost teleport
            if(squares[path[i]].classList.contains('ghost') ){
                i++;
            }

            //Ghosts Pauses depending on the direction it is facing. 
            if(path[i] === blockCheckPoint){
                i--;
            }

            //check there are no other ghosts in your path
            if(i < path.length && !squares[path[i]].classList.contains('ghost')){
                //change index to one step forward of the path each time
                ghost.currentIndex = path[i];
                //redraw the ghost in the new safe space
                squares[ghost.currentIndex].classList.add(ghost.className, 'ghost');

                scaredGhostMode(ghost);
                checkForGameOver();
            }

        }, ghost.speed);

    }

    //setTimeout(unScareGhosts, 10000);

    //scatterTopLeftCorner
    function scatterTopLeftCorner(graph, ghost){
        ghost.timerId = setInterval(function(){
            squares[ghost.currentIndex].classList.remove(ghost.className);
            squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost');

            //scatterTopLeftCorner
            path = findPathWithDijkstra(graph, ghost.currentIndex, topLeftCornerLocation);
            let i = 1;

            if(i < path.length){
                //remove all ghost related classes
                ghost.currentIndex = path[i];
                //redraw the ghost in the new safe space
                squares[ghost.currentIndex].classList.add(ghost.className, 'ghost');

                // i++; //Look at the logic! Not needed! setInterval is like a loop. then look at the lets
                scaredGhostMode(ghost);
                checkForGameOver();
            }

            if(ghost.currentIndex === topLeftCornerLocation){
                setTimeout(scatterMode(ghost), 10000);
            }
        }, ghost.speed);
    }





    /* Inky Movements */

    /* Clyde Movements */




    //////////////////

    //Program for when Ghosts are scared
    function scaredGhostMode(ghost){
        //if the ghost is currently scared
        if(ghost.isScared){
            squares[ghost.currentIndex].classList.add('scared-ghost');
        }

        //if the ghosts are scared and pacman runs int it
        if(ghost.isScared && squares[ghost.currentIndex].classList.contains('pac-man')){
            squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost');
            ghost.currentIndex = ghost.startIndex;
            score += 100;
            squares[ghost.currentIndex].classList.add(ghost.className, 'ghost');
        }
    }

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
        if(score >= 1000){
            ghosts.forEach(ghost => clearInterval(ghost.timerId));
            document.removeEventListener('keyup', movePacman);
            scoreDisplay.innerHTML = 'YOU WON';
        }
    }

});