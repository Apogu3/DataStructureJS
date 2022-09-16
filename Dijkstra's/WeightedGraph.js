class WeightedGraph {
    constructor() {
        this.adjacencyList = {};
    }
    addVertex(vertex) {
        if(!this.adjacencyList[vertex]) this.adjacecyList[vertex] = [];
    }
    addEdge(vertex1, vertex2, weight){
        this.adjacecyList[vertex1].push({node:vertex2,weight});
        this.adjacecyList[vertex2].push({node:vertex1,weight});
    }
}



