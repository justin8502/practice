// Binary Search Tree is a node-based binary tree data structure which has the following properties:

// The left subtree of a node contains only nodes with keys lesser than the node’s key.
// The right subtree of a node contains only nodes with keys greater than the node’s key.
// The left and right subtree each must also be a binary search tree.

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

  //Basic method for printing.

  print(current = this.root) {
    if(!current) {
      return;
    } else {
      process.stdout.write(current.val + " ");
      this.print(current.left);
      this.print(current.right);
      if(!current.left && !current.right) {
        console.log()
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

testBST.print()

// console.log(testBST.root)