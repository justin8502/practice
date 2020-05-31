// Input: A graph Graph and a starting vertex root of Graph

// Output: Goal state. The parent links trace the shortest path back to root

// 1  procedure BFS(G, start_v) is
// 2      let Q be a queue
// 3      label start_v as discovered
// 4      Q.enqueue(start_v)
// 5      while Q is not empty do
// 6          v := Q.dequeue()
// 7          if v is the goal then
// 8              return v
// 9          for all edges from v to w in G.adjacentEdges(v) do
// 10             if w is not labeled as discovered then
// 11                 label w as discovered
// 12                 w.parent := v
// 13                 Q.enqueue(w)

// Imported from binarytree.js

class BST {
  constructor() {
    this.root = new Node();
  }

  insert(toInsert, current = this.root) {
    if(!current.val) {
      current.setVal(toInsert)
    } else {
      (toInsert > current.val) ? 
        ((current.right === null) ? current.setRight(toInsert) : this.insert(toInsert, current.right)) : 
        ((current.left === null) ? current.setLeft(toInsert) : this.insert(toInsert, current.left))
    }
  }

  search(target, current = this.root) {
    if(!current) {
      return false;
    } else {
      if(current.val === target) {
        return true;
      }
      return (current.val > target) ? this.search(target, current.left) : 
      this.search(target, current.right);
    }
  }

  bfsPrint() {
    let searchQueue = [], explored = [];
    if(this.root.val === undefined) {
      return;
    }
    let newLevel = this.root;
    searchQueue.push(this.root);
    while(searchQueue.length > 0) {
      let curr = searchQueue.shift();
      if(curr === newLevel){
        console.log();
        newLevel = null;
      }
      process.stdout.write(curr.val + " ");
      if(curr.left) {
        if(!newLevel) {
          newLevel = curr.left;
        }
        searchQueue.push(curr.left)
      }
      if(curr.right) {
        if(!newLevel) {
          newLevel = curr.left;
        }
        searchQueue.push(curr.right)
      }
      // console.log(curr);
      // console.log(searchQueue);
    }
  }
}

class Node {
  constructor(val) {
    this.left = null;
    this.right = null;
    this.val = val;
  }

  setVal(target) {
    this.val = target;
  }

  setLeft(target) {
    this.left = new Node(target);
  }

  setRight(target) {
    this.right = new Node(target);
  }
}

let testBST = new BST() 

testBST.insert(8)
testBST.insert(3)
testBST.insert(10)
testBST.insert(1)
testBST.insert(6)
testBST.insert(14)
testBST.insert(4)
testBST.insert(7)
testBST.insert(13)

testBST.delete(13)

// testBST.print()

// console.log(testBST.search(3))
// console.log(testBST.search(9999))
// console.log(testBST.search(14))

// console.log(testBST.root)

testBST.bfsPrint()