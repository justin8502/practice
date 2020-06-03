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
        ((current.right === null) ? current.setRight(new Node(toInsert)) : this.insert(toInsert, current.right)) : 
        ((current.left === null) ? current.setLeft(new Node(toInsert)) : this.insert(toInsert, current.left))
    }
  }

  // 1) Node to be deleted is leaf: Simply remove from the tree.

  // 2) Node to be deleted has only one child: Copy the child to the node and delete the child

  // 3) Node to be deleted has two children: Find inorder successor of the node. Copy contents of the 
  // inorder successor to the node and delete the inorder successor. Note that inorder predecessor can also be used.

  delete(toDelete) {
    if(!this.search(toDelete)) {
      return;
    }
    let current = this.root, parent = null;
    let comparator;
    while(current) {
      if(current.val === toDelete) {
        // console.log("Found")
        break;
      }
      parent = current;
      comparator = (current.val > toDelete)
      comparator ? current = current.left : current = current.right ;
    }
    // console.log(current);
    // console.log(parent);
    // console.log(comparator);
    if(!parent) {
      if(!current.left && !current.right) {
        this.root = new Node();
      } else if (current.left && current.right) {
        let successorParent = current;
        let successor = current.right;
        if(!successor.left) {
          current.setVal(successor.val);
          successorParent.setRight(successor.right);
        } else {
          while(successor.left) {
            successorParent = successor;
            successor = successor.left;
          }
          current.setVal(successor.val);
          if(successor.right) {
            successorParent.setLeft(successor.right);
          } else {
            successorParent.clearLeft();
          }
        }
      } else {
        (current.left) ? this.root = current.left : this.root = current.right;
      }
    } else {
      if(!current.left && !current.right) {
        // console.log(comparator)
        comparator ? parent.clearLeft() : parent.clearRight();
        // console.log(parent);
      } else if (current.left && current.right) {
        let successorParent = current;
        let successor = current.right;
        if(!successor.left) {
          current.setVal(successor.val);
          successorParent.setRight(successor.right);
        } else {
          while(successor.left) {
            successorParent = successor;
            successor = successor.left;
          }
          current.setVal(successor.val);
          if(successor.right) {
            successorParent.setLeft(successor.right);
          } else {
            successorParent.clearLeft();
          }
        }
      } else {
        // console.log("HERE");
        // console.log(parent, current);
        (current.left) ? current.setSelf(current.left) : current.setSelf(current.right);
        // parent.setSelf(current);
      }
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

  //Basic method for printing.

  

  bfsPrint() {
    let searchQueue = [];
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
          newLevel = curr.right;
        }
        searchQueue.push(curr.right)
      }
    }
    console.log();
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
    this.left = target;
  }

  setRight(target) {
    this.right = target;
  }

  setSelf(target) {
    this.left = target.left;
    this.right = target.right;
    this.val = target.val;
  }

  clearLeft() {
    this.left = null;
  }

  clearRight() {
    this.right = null;
  }
}

let testBST = new BST(); 
let testBST2 = new BST(); 

testBST.insert(8);
testBST.insert(3);
testBST.insert(10);
testBST.insert(1);
testBST.insert(6);
testBST.insert(14);
testBST.insert(4);
testBST.insert(7);
testBST.insert(13);

testBST2.insert(50);
testBST2.insert(30);
testBST2.insert(70);
testBST2.insert(20);
testBST2.insert(40);
testBST2.insert(60);
testBST2.insert(80);

console.log(testBST.search(3))
console.log(testBST.search(9999))
console.log(testBST.search(-1))
console.log(testBST.search(14))

testBST.bfsPrint();
testBST.delete(-1);
testBST.delete(999999);
testBST.delete(15.3);
testBST.bfsPrint();

testBST2.bfsPrint();
testBST2.delete(20);
testBST2.bfsPrint();
testBST2.delete(30);
testBST2.bfsPrint();
testBST2.delete(50);
testBST2.bfsPrint();