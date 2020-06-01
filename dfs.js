// Input: A graph G and a vertex v of G

// Output: All vertices reachable from v labeled as discovered

// procedure DFS-iterative(G, v) is
//     let S be a stack
//     S.push(v)
//     while S is not empty do
//         v = S.pop()
//         if v is not labeled as discovered then
//             label v as discovered
//             for all edges from v to w in G.adjacentEdges(v) do 
//                 S.push(w)

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

  dfsPrint() {
    let searchStack = [];
    if(this.root.val === undefined) {
      return;
    }
    searchStack.push(this.root);
    while(searchStack.length > 0) {
      let curr = searchStack.shift();
      process.stdout.write(curr.val + " ");
      if(!curr.right && !curr.left && searchStack.length > 1) {
        console.log();
      } else {
        if(curr.right) {
          searchStack.unshift(curr.right)
        }
        if(curr.left) {
          searchStack.unshift(curr.left)
        }
      }
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

// testBST.print()

// console.log(testBST.search(3))
// console.log(testBST.search(9999))
// console.log(testBST.search(14))

// console.log(testBST.root)

testBST.dfsPrint()