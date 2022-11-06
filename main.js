// Pacman JS

document.addEventListener('DOMContentLoaded', () => {

    const grid = document.querySelector('.grid');
    const scoreDisplay = document.getElementById('score');
    let score = 0;
    const width = 28;
    const directions = [-1, 1, width, (-1*width)];
    const minIndex = 0; 
    const maxIndex = 783;
    let current_level = 1;

    //Corner of the maps
    const topLeftCornerLocation = 29; //Pinky
    const topRightCornerLocation = 54; //Blinky
    const bottomRightCornerLocation = 754; //Inky
    const bottomLeftCornerLocation = 729; //Clyde

    //Corner of Maps' paths during scatter mode
    const topLeftCornerPath = [29, 57, 85, 113, 141, 
                                142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 
                                152, 124, 96, 68, 40, 
                                39, 38, 37, 36, 35, 34, 33, 32, 31, 30]; //Pinky: counterclockwise
    const topRightCornerPath = [54, 82, 110, 138, 166, 
                                165, 164, 163, 162, 161, 160, 159, 158, 157, 156,
                                155, 127, 99, 71, 43,
                                44, 45, 46, 47, 48, 49, 50, 51, 52, 53]; //Blinky: clockwise
    const bottomRightCornerPath = [754, 726, 698, 670, 
                                    669, 668, 667, 666, 
                                    665, 637, 609, 581, 
                                    580, 579, 
                                    578, 606, 634, 662, 
                                    661, 660, 
                                    659, 687, 715, 743, 
                                    744, 745, 746, 747, 748, 749, 750, 751, 752, 753]; //Inky: counter-clockwise
    const bottomLeftCornerPath = [729, 701, 673, 645, 
                                    646, 647, 648, 649, 
                                    650, 622, 594, 566, 
                                    567, 568, 
                                    569, 597, 625, 653, 
                                    654, 655, 
                                    656, 684, 712, 740, 
                                    739, 738, 737, 736, 735, 734, 733, 732, 731, 730]; //Clyde

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
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,3,1,1,3,1,1,1,1,1,0,1,1,1,1,0,1,
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
        1,0,0,0,3,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,3,0,0,0,1,
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
        constructor(className, startIndex, speed){
            this.className = className;
            this.startIndex = startIndex;
            this.speed = speed;
            this.currentIndex = startIndex;
            // this.moving = false;
            this.chaseBehavior = false; //chaseBehavior = chaseAggressive, chaseAmbush, chasePatrol, or chaseRandom
            // this.travelBehavior = false; //travelBehavior = travelTopLeftCorner, travelTopRightCorner, travelBottomLeftCorner, or travelBottomRightCorner
            // this.scatterBehavior = scatterBehavior;   //scatterBehavior = scatterTopLeftCorner, scatterTopRightCorner, scatterBottomLeftCorner, or scatterBottomRightCorner
            //this.frightenedBehavior = frightenedBehavior; //frightenedBehavior = frightenedWandering;
            this.isScared = false;
            this.timerId = NaN;
        }
    }

    //all the ghosts
    ghosts = [
        new Ghost('pinky', 348, 250),
        new Ghost('blinky', 351, 200),
        new Ghost('inky', 435, 300),
        new Ghost('clyde', 432, 400)  
    ];

    //draw my ghost onto the grid
    ghosts.forEach(ghost => {
        squares[ghost.currentIndex].classList.add(ghost.className);
        squares[ghost.currentIndex].classList.add('ghost');
        squares[ghost.currentIndex].classList.add('eyes');
        // squares[pacmanCurrentIndex].classList.add('skirt');
    });

    //get coordinates of pacman or ghosts
    function getCoordinates(index){
        return[index % width, Math.floor(index / width)];
    }
        /*EXAMPLE: An indexed Location on the layout
        * index = 490
        * x-coor: 490 % 28 = 14 since 28*17=476. --> 490-476=14. Therefore, x = 14 
        * y-coor: 490 / 28 = 17.5 --> floor = 17. Therfore, y = 17.
        * 
        */

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

    //******************************************* */

    //All Ghosts can move
    ghosts.forEach(ghost => moveGhost(map, ghost));
    // ghosts.forEach(ghost => moveGhost(ghost));
    // moveGhost(map, ghosts[0]);
    // moveGhost(map, ghosts[1]);
    // moveGhost(map, ghosts[2]);
    // moveGhost(map, ghosts[3]);



    //Ghost Move Function
    function moveGhost(graph, ghost){


    //     let timerId = setInterval(function(){
    //     current_level = incrementLevel(current_level, score);
    //     console.log(current_level);
    //     switch(current_level){
    //         case 1: // score < 20 is round 1
    //             console.log('random');
    //             activateGhostRandomMode(ghost, 20); //score >= 20, then random mode stops
    //             break;
    //         case 2: // score < 40 is round 2
    //             console.log('scatter');
    //             activateGhostScatterMode(graph, ghost, 40); //score >= 40, then scatter mode stops
    //             break;
    //         case 3: // score < 80 is round 3
    //             console.log('chase');
    //             activateGhostChaseMode(graph, ghost, 80); //score >= 80, then chase mode stops
    //             break;
    //         case 4: //score < 120 is round 4
    //             console.log('scatter');
    //             activateGhostScatterMode(graph, ghost, 120); //score >= 120, then scatter mode stops
    //             break;
    //         // case current_level == 5:
    //         //     console.log('chase');
    //         //     activateGhostChaseMode(graph, ghost, 1200);
    //         //     break;
    //         default: 
    //             // console.log(current_level);
    //             console.log('chase default');
    //             clearInterval(timerId);
    //             activateGhostChaseMode(graph, ghost, 1200); //score >= 1200, then chase mode stops
    //             break;
    //     }
        
    // }, 3000);
    



        // activateGhostRandomMode(ghost, 20);

        // activateGhostScatterMode(graph, ghost, 40);

        activateGhostChaseMode(graph, ghost, 8000); //score 8000 and ghost stop
    }

    function scoreToLevel(playerScore){
        if(playerScore < 20){
            return 1;
        }else if (playerScore < 40){
            return 2;
        }else if(playerScore < 80){
            return 3;
        }else if(playerScore < 120){
            return 4;
        }else{
            return 5;
        }
    }

    function incrementLevel(current_level, playerScore){
        let next_level = scoreToLevel(playerScore);
        if(next_level !== current_level){
            current_level = next_level;
            current_level = parseInt(current_level);
            return current_level;
        }else{
            current_level = parseInt(current_level);
            return current_level;
        }
    }

    //Each ghost will move randomly
    function activateGhostRandomMode(ghost, scoreParameter){
        /* Random Scatter Mode (used for any Ghosts)
        * The Ghost will move in random directions for a certain period of time
        * Will not target the player in any special way
        */
        chaseRandom(ghost, scoreParameter); //borrowed by Clyde
    }

    // Each ghost has a unique chase mode 
    function activateGhostChaseMode(graph, ghost, scoreParameter){
        switch(ghost.className){
            case 'pinky':
                chaseAmbush(graph, ghost, scoreParameter);
                break;

            case 'blinky':
                chaseAggressive(graph, ghost, scoreParameter);
                break;

            case 'inky':
                chasePatrol(graph, ghost, scoreParameter);
                break;

            case 'clyde':
                // chaseRandom(ghost, scoreParameter);
                // travelToCorner(graph, ghost, bottomLeftCornerLocation, bottomLeftCornerPath, scoreParameter);
                chasePatrol(graph, ghost, scoreParameter);
                break;

        }
    }

    //each ghost has a unique scatter mode
    function activateGhostScatterMode(graph, ghost, scoreParameter){
        switch(ghost.className){
            case 'pinky':
                travelToCorner(graph, ghost, topLeftCornerLocation, topLeftCornerPath, scoreParameter);
                break;

            case 'blinky':
                travelToCorner(graph, ghost, topRightCornerLocation, topRightCornerPath, scoreParameter);
                break;

            case 'inky':
                travelToCorner(graph, ghost, bottomRightCornerLocation, bottomRightCornerPath, scoreParameter);
                break;

            case 'clyde':
                travelToCorner(graph, ghost, bottomLeftCornerLocation, bottomLeftCornerPath, scoreParameter);
                break;

        }
    }

    //******************************************* */
    /* Let's Try Dijkstra Algorithm */
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

    /* Let's Try Dijkstra Algorithm */
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
        return path;
    }

//******************************************* */
    /*All ghosts */

    //travel to designated corner
    function travelToCorner(graph, ghost, cornerLocation, cornerPath, scoreParameter){
        ghost.timerId = setInterval(function(){
            squares[ghost.currentIndex].classList.remove(ghost.className);
            squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost');

            //travel to designated corner
            let path = findPathWithDijkstra(graph, ghost.currentIndex, cornerLocation);
            let i = 1;

            //Skip pass other ghost teleport
            if(i < path.length && squares[path[i]].classList.contains('ghost') ){
                i++;
            }

            //check there are no other ghosts in your path
            if(i < path.length && !squares[path[i]].classList.contains('ghost')){
                //remove all ghost related classes
                ghost.currentIndex = path[i];
                //redraw the ghost in the new safe space
                squares[ghost.currentIndex].classList.add(ghost.className, 'ghost');
            }

            if(ghost.currentIndex === cornerLocation){
                clearInterval(ghost.timerId);
                // console.log('Finished travel');
                scatterAtCorner(ghost, cornerPath, scoreParameter);
            }

            scaredGhostMode(ghost);
            checkForGameOver();
            stopMoving(ghost, scoreParameter);
        }, ghost.speed);
    }

    //Scatter at the designated corner
    function scatterAtCorner(ghost, cornerPath, scoreParameter){
        //scatterTopLeftCorner
        let path = cornerPath;
        let i = 0;
        ghost.timerId = setInterval(function(){
            if(i >= path.length){
                i = 0;
            }

            squares[ghost.currentIndex].classList.remove(ghost.className);
            squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost');
    
            //Skip pass other ghost teleport
            if(i < path.length && squares[path[i]].classList.contains('ghost') ){
                i++;
            }
    
            //check there are no other ghosts in your path
            if(i < path.length && !squares[path[i]].classList.contains('ghost')){
                //remove all ghost related classes
                ghost.currentIndex = path[i];
                //redraw the ghost in the new safe space
                squares[ghost.currentIndex].classList.add(ghost.className, 'ghost');

                i++;
            }

            // console.log(i);

            scaredGhostMode(ghost);
            checkForGameOver();
            stopMoving(ghost, scoreParameter);
        }, ghost.speed);
    }

    //******************************************* */
    
    /* Pinky Movements */
    //chaseAmbush Mode: Blocks Pacman in shortest path
    function chaseAmbush(graph, ghost, scoreParameter){
        ghost.timerId = setInterval(function(){
            squares[ghost.currentIndex].classList.remove(ghost.className);
            squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost');

            //const directions = [-1, +1, +width, -width];
            let blockCheckPoint = 0;

            const tileUp = pacmanCurrentIndex + 2*directions[3];
            const tileRight = pacmanCurrentIndex + 2*directions[1];
            const tileDown = pacmanCurrentIndex + 2*directions[2];
            const tileLeft = pacmanCurrentIndex + 2*directions[0];

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

            //path is confined in an array
            let path = findPathWithDijkstra(graph, ghost.currentIndex, blockCheckPoint);
            let i = 1;

            //Skip pass other ghost teleport
            if(i < path.length && squares[path[i]].classList.contains('ghost') ){
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
            }

            scaredGhostMode(ghost);
            checkForGameOver();
            stopMoving(ghost, scoreParameter);
        }, ghost.speed);

    }


    //******************************************* */

    /* Blinky Movements */
    //chaseAggressive Mode: Stalks Pacman in shortest path
    function chaseAggressive(graph, ghost, scoreParameter){
        ghost.timerId = setInterval(function(){
            squares[ghost.currentIndex].classList.remove(ghost.className);
            squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost');

            //path is confined in an array
            let path = findPathWithDijkstra(graph, ghost.currentIndex, pacmanCurrentIndex);
            let i = 1;

            //Skip pass other ghost teleport
            if(i < path.length && squares[path[i]].classList.contains('ghost') ){
                i++;
            }

            //check there are no other ghosts in your path
            if(i < path.length && !squares[path[i]].classList.contains('ghost')){
                //change index to one step forward of the path each time
                ghost.currentIndex = path[i];
                //redraw the ghost in the new safe space
                squares[ghost.currentIndex].classList.add(ghost.className, 'ghost');
            }

            scaredGhostMode(ghost);
            checkForGameOver();
            stopMoving(ghost, scoreParameter);
        }, ghost.speed);
    }

    //******************************************* */

    /* Inky Movements */
    //chasePatrol Mode: Random Patrol Locations Assign every second
    function chasePatrol(graph, ghost, scoreParameter){
        let randomPatrolLocation = Math.floor(Math.random() * (graph.nodes.length - 1));
        if(ghost.currentIndex != graph.nodes[randomPatrolLocation]){
        ghost.timerId = setInterval(function(){
            squares[ghost.currentIndex].classList.remove(ghost.className);
            squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost');

            //path is confined in an array
            let path = findPathWithDijkstra(graph, ghost.currentIndex, graph.nodes[randomPatrolLocation]);
            i = 1;

            //Skip pass other ghost teleport
            if(i < path.length && squares[path[i]].classList.contains('ghost') ){
                i++;
            }

            //check there are no other ghosts in your path
            if(i < path.length && !squares[path[i]].classList.contains('ghost')){
                //change index to one step forward of the path each time
                ghost.currentIndex = path[i];
                //redraw the ghost in the new safe space
                squares[ghost.currentIndex].classList.add(ghost.className, 'ghost');
            }

            if(ghost.currentIndex === graph.nodes[randomPatrolLocation]){
                randomPatrolLocation = Math.floor(Math.random() * (graph.nodes.length - 1));
            }

            scaredGhostMode(ghost);
            checkForGameOver();
            stopMoving(ghost, scoreParameter);
        }, ghost.speed);
        }
    }



    //******************************************* */

    /* Clyde Movements */
    //chaseRandom Mode: complete random movements. 
    function chaseRandom(ghost, scoreParameter){
        let direction = directions[Math.floor(Math.random() * directions.length)];
        ghost.timerId = setInterval(function() {
            //if the next squre your ghost is going t go to does not have a ghost and does not have a wall
            if (!squares[ghost.currentIndex + direction].classList.contains('ghost') 
            && !squares[ghost.currentIndex + direction].classList.contains('wall') ) {
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
            stopMoving(ghost, scoreParameter);
        }, ghost.speed);
    }



    //******************************************* */

    //when score parameter is reached, ghosts should stop moving
    function stopMoving(ghost, scoreParameter){
        if(score >= scoreParameter){
            clearInterval(ghost.timerId);
        }
    }

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