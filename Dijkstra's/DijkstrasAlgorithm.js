class WeightedGraph {
    constructor() {
        this.adjacencyList = {};
    }
    addVertex(vertex) {
        if(!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
    }
    addEdge(vertex1, vertex2, weight){
        this.adjacencyList[vertex1].push({node:vertex2,weight});
        this.adjacencyList[vertex2].push({node:vertex1,weight});
    }
    Dijkstra(start, finish){
        const nodes = new PriorityQueue();
        const distances = {};
        const previous = {};
        let smallest;
        let path = []; //Return at the end//
        //Build up initial state//
        for(let vertex in this.adjacencyList){
            if(vertex === start){//Starting vertex setting value to 0//
                distances[vertex] = 0;
                nodes.enqueue(vertex, 0); //Add the starting value and priority to the PriorityQueue//
            } else {//Any vertex that isnt the START, is Infinity//
                distances[vertex] = Infinity;
                nodes.enqueue(vertex, Infinity);//Add each value and priority of the node to the PriorityQueue//
            }
            previous[vertex] = null;//Set previous of the vertex to null//
        }
        //As long as there is something to visit//
        while(nodes.values.length){//Start looping as long as there is something in the PriorityQueue//
            smallest = nodes.dequeue().val;
            if(smallest === finish){//If start and finish are the same vertex, we are done//
              //Build path to return at the END//
                while(previous[smallest]){
                    path.push(smallest);
                    smallest = previous[smallest];
                }
                break;//Stops the loop//
            }
            if(smallest || distances[smallest] !== Infinity){
                for(let neighbor in this.adjacencyList[smallest]){
                    //Find neighboring node//
                  let nextNode = this.adjacencyList[smallest][neighbor];
                    //Calculate distance between neighboring node//
                    let candidate = distances[smallest] + nextNode.weight;
                    let nextNeighbor = nextNode.node;
                    if(candidate < distances[nextNeighbor]){
                       //Updates new smallest distance to neighbor// 
                        distances[nextNeighbor] = candidate;
                        //Updating previous - How we got to next neighbor//
                        previous[nextNeighbor] = smallest;
                        //Enqueue in priority queue with new priority//
                        nodes.enqueue(nextNeighbor, candidate);
                    }
                }
            }
        }
        return path.concat(smallest).reverse(); //Returns the array of vertices//
    }
    
}

class PriorityQueue {
    constructor(){
        this.values=  [];
    }
    enqueue(val , priority){//Each node has a value and a priority//
        let newNode = new Node(val, priority);
        this.values.push(newNode);//Add new node to the end of heap//
        this.bubbleUp();//Allows node to move up the heap to correct position//
    }
    bubbleUp(){
        let idx = this.values.length - 1;//Variable called idx which is the length of the values property minus 1//
        const element = this.values[idx];
        while(idx > 0){
            let parentIdx = Math.floor((idx - 1)/2);//Create var called parentIdx which is the floor of (index-1)/2 //
            let parent = this.values[parentIdx];
            if(element.priority >= parent.priority) break;//Keep looping if values at the parentIdx is greater than values at child index. Added priority to compare the element of PRIORITY to each node//
                this.values[parentIdx] = element;
                this.values[idx] = parent;//Swap the values of parentIdx and child index//
                idx = parentIdx;//Set the idx to parentIdx and start over //
        }
    }
    dequeue(){
        const min = this.values[0];
        const end = this.values.pop();//Pops from the values property so we can return at the end//
        if(this.values.length > 0){//Returns undefined if all elements have been extracted//
            this.values[0] = end;//This puts last element at index of 0 and the largest element in the max property//
            //Sink Down//
            this.sinkDown();//Created method that allows element to sink Down//
        }
        return min;//Returns the old root//
    }
    sinkDown(){
        let idx = 0;//Parent index starts at 0//
        const length = this.values.length;
        const element = this.values[0];
        while(true){
            let leftChildIdx = 2 * idx + 1;
            let rightChildIdx = 2 * idx + 2;
            let leftChild,rightChild;//These two emtpy variables will store the elements on right/left that are in bounds//
            let swap = null;
            if(leftChildIdx < length){
                leftChild = this.values[leftChildIdx];//Makes sure its not out of bounds as well as stores element in the empty leftChild variable//
                if(leftChild.priority < element.priority) {//If left child 'priority' is smaller than 'priority' element...swap//
                    swap = leftChildIdx;
                }
            }
            if(rightChildIdx < length){
               rightChild = this.values[rightChildIdx];//Makes sure its not out of bounds as well as stores element in the empty rightChild variable//
               if(//If the right child 'priority' is less than the element 'priority' then swap...AND swap with the smaller child between the left and the right children//
                   (swap === null && rightChild.priority < element.priority) ||
                   (swap !== null && rightChild.priority < leftChild.priority)
               ) {
                  swap = rightChildIdx;//If right is larger than the element and the left child// 
               } 
            }
            if(swap === null) break;//If we do not swap, stop the loop//
            this.values[idx] = this.values[swap];
            this.values[swap] = element;
            idx = swap;//The child index was swapped becoming the new parent index//
        }
    }
}

class Node {
    constructor(val, priority){
        this.val = val;
        this.priority = priority;
    }
}

var graph = new WeightedGraph()
graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
graph.addVertex("E");
graph.addVertex("F");

graph.addEdge("A","B", 4);
graph.addEdge("A","C", 2);
graph.addEdge("B","E", 3);
graph.addEdge("C","D", 2);
graph.addEdge("C","F", 4);
graph.addEdge("D","E", 3);
graph.addEdge("D","F", 1);
graph.addEdge("E","F", 1);

graph.Dijkstra("A", "E");