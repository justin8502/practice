// A Graph is a non-linear data structure consisting of nodes and edges. The nodes are sometimes also referred 
// to as vertices and the edges are lines or arcs that connect any two nodes in the graph. More formally a Graph 
// can be defined as,

// A Graph consists of a finite set of vertices(or nodes) and set of Edges which connect a pair of nodes.

class Graph {
  constructor(type) {
    this.type = type;
    this.nodes = [];
  }

  addNode(node) {
    this.nodes.push(node);
  }

  setNodes(nodelist) {
    this.nodes = nodelist;
  }

  removeNode() {
    return this.nodes.pop();
  }

  bfs() {
    let explored = [];
    let toExplore = [];
    toExplore.push(this.nodes[0])
    while(toExplore.length > 0) {
      let topElem = toExplore.shift();
      if(explored.includes(topElem)) {
        break;
      }
      explored.push(topElem);
      console.log("Discovered: " + topElem.getVal())
      let newElem = topElem.getEdges().filter((item) => 
        !explored.includes(item));
      console.log("Explored Nodes: " + explored.map((node) => {
        return node.getVal();
      }))
      for(let i = 0; i < newElem.length; i++) {
        toExplore.push(newElem[i])
      }
    }
    return;
  }
}

class Node {
  constructor(val) {
    this.val = val;
    this.edges = [];
  }

  getVal() {
    return this.val;
  }

  getEdges() {
    return this.edges;
  }

  addEdge(e) {
    this.edges.push(e);
  }

  addUndirectedEdge(e) {
    this.edges.push(e);
    if(!e.getEdges().includes(this)) {
      e.addEdge(this);
    }
  }

  setEdges(edges) {
    this.edges = edges;
  }

  removeEdge(e) {
    this.edges = this.edges.filter((item) => {
      return item !== e;
    })
  }
}

let testGraph = new Graph("undirected");

let testNodes = [new Node("A"), new Node("B"), new Node("C"), new Node("D"), new Node("E")];
// let testNodeEdges = testNodes.map((val, idx) => {
//   return testNodes.splice(idx, idx+1);
// })

testNodes[0].addUndirectedEdge(testNodes[1]);
testNodes[1].addUndirectedEdge(testNodes[2]);
testNodes[1].addUndirectedEdge(testNodes[3]);
testNodes[3].addUndirectedEdge(testNodes[4]);
testNodes[2].addUndirectedEdge(testNodes[4]);

// console.log(testNodeEdges);
// for(let i = 0; i < testNodes.length; i++) {
//   testNodes[i].setEdges(testNodes);
// }

testGraph.setNodes(testNodes);
testGraph.bfs();

// console.log(testGraph);
// console.log(testNodes);