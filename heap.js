// The common operations involving heaps are:

// Basic
// find-max (or find-min): find a maximum item of a max-heap, or a minimum item of a min-heap, respectively (a.k.a. peek)
// insert: adding a new key to the heap (a.k.a., push[4])
// extract-max (or extract-min): returns the node of maximum value from a max heap [or minimum value from a min heap] after removing it from the heap (a.k.a., pop[5])
// delete-max (or delete-min): removing the root node of a max heap (or min heap), respectively
// replace: pop root and push a new key. More efficient than pop followed by push, since only need to balance once, not twice, and appropriate for fixed-size heaps.[6]

// Creation
// create-heap: create an empty heap
// heapify: create a heap out of given array of elements
// merge (union): joining two heaps to form a valid new heap containing all the elements of both, preserving the original heaps.
// meld: joining two heaps to form a valid new heap containing all the elements of both, destroying the original heaps.

// Inspection
// size: return the number of items in the heap.
// is-empty: return true if the heap is empty, false otherwise.
// Internal
// increase-key or decrease-key: updating a key within a max- or min-heap, respectively
// delete: delete an arbitrary node (followed by moving last node and sifting to maintain heap)
// sift-up: move a node up in the tree, as long as needed; used to restore heap condition after insertion. Called "sift" because node moves up the tree until it reaches the correct level, as in a sieve.
// sift-down: move a node down in the tree, similar to sift-up; used to restore heap condition after deletion or replacement.

class Heap {
  constructor(init) {
    this.heapArr = [];
    this.heapType = init.type;
  }

  insert(val) {
    console.log("Inserting: " + val);
    this.heapArr.push(val);
    this.heapify();
  }

  delete() {
    console.log("Popping element off the heap...");
    let lastVal = this.heapArr.pop();
    let returnVal = this.heapArr[0];
    this.heapArr[0] = lastVal;
    this.heapify();
    return returnVal;
  }

  heapify() {
    let parent = Math.floor(this.heapArr.length / 2);

    while(parent > 0) {

      let idx1 = (parent * 2) - 1, idx2 = (parent * 2);

      let childLeft = this.heapArr[idx1];
      let childRight = this.heapArr[idx2];
      let parentNode = this.heapArr[parent - 1];

      switch(this.heapType) {
        case "max-heap":
          if(childLeft > parentNode && typeof childLeft !== "undefined") {
            let tmp = this.heapArr[idx1];
            this.heapArr[idx1] = this.heapArr[parent - 1];
            this.heapArr[parent - 1] = tmp;
          } else if (childRight > parentNode && typeof childRight !== "undefined") {
            let tmp = this.heapArr[idx2];
            this.heapArr[idx2] = this.heapArr[parent - 1];
            this.heapArr[parent - 1] = tmp;
          }
          break;
        case "min-heap":
          if(childLeft < parentNode && typeof childLeft !== "undefined") {
            let tmp = this.heapArr[idx1];
            this.heapArr[idx1] = this.heapArr[parent - 1];
            this.heapArr[parent - 1] = tmp;
          } else if (childRight < parentNode && typeof childRight !== "undefined") {
            let tmp = this.heapArr[idx2];
            this.heapArr[idx2] = this.heapArr[parent - 1];
            this.heapArr[parent - 1] = tmp;
          }
          break;
      }
      parent -= 1;
      console.log("CURRENT PARENT VAL" + parent)
    }
    // console.log(this.heapArr)
  }
}

testHeap = new Heap(init = { type: "max-heap"});

testHeap.insert(5);
testHeap.insert(100);
testHeap.insert(300);
testHeap.insert(999999999999);
testHeap.insert(-1);

console.log(testHeap.delete());