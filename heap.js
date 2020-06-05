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
  constructor(init, arr) {
    this.heapArr = [];
    this.heapType = init.type;
    if(arr) {
      for(let i = 0; i < arr.length; i++) {
        this.insert(arr[i])
      }
    }
  }

  insert(val) {
    console.log("Inserting: " + val);
    this.heapArr.push(val);
    this.heapify();
  }

  delete() {
    // console.log("Popping element off the heap...");
    if(this.heapArr.length <= 1) {
      let lastVal = this.heapArr.pop();
      return lastVal;
    }
    let lastVal = this.heapArr.pop();
    let returnVal = this.heapArr[0];
    this.heapArr[0] = lastVal;
    this.heapfiyDown();
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
    }
  }

  heapfiyDown() {
    let parent = 0
    while (parent < this.heapArr.length) {

      let idx1 = (parent * 2) + 1, idx2 = (parent * 2) + 2;

      let childLeft = this.heapArr[idx1];
      let childRight = this.heapArr[idx2];
      let parentNode = this.heapArr[parent];

      let largerChildIdx = (typeof childLeft === "undefined") ? idx2 : 
        (typeof childRight === "undefined") ? idx1 : undefined;
      if(!largerChildIdx && (childLeft && childRight)) {
        largerChildIdx = (this.heapType === "max-heap") ? 
        (childLeft > childRight ? idx1 : idx2) : (childLeft > childRight ? idx2 : idx1)
      }

      switch(this.heapType) {
        case "max-heap":
          if(largerChildIdx && this.heapArr[largerChildIdx] > parentNode) {
            let tmp = this.heapArr[largerChildIdx];
            this.heapArr[largerChildIdx] = this.heapArr[parent];
            this.heapArr[parent] = tmp;
          }
          break;
        case "min-heap":
          if(largerChildIdx && this.heapArr[largerChildIdx] < parentNode) {
            let tmp = this.heapArr[largerChildIdx];
            this.heapArr[largerChildIdx] = this.heapArr[parent];
            this.heapArr[parent] = tmp;
          }
          break;
        }
      parent++;
    }
  }
  
  print() {
    let newLine = 1;
    for(let i = 0; i < this.heapArr.length; i++) {
      if((i+1) == newLine) {
        newLine *= 2;
        console.log();
      }
      process.stdout.write(this.heapArr[i] + " ");
    }
    console.log();
  }
}

// Initialize Max and Min Heaps
testHeap = new Heap(init = { type: "max-heap"});
testHeap2 = new Heap(init = { type: "min-heap"}, [-1, 10, 100, 1000, 99]);

testHeap.insert(5);
testHeap.insert(100);
testHeap.insert(300);
testHeap.insert(999999999999);
testHeap.insert(-1);
testHeap.insert(-2);
testHeap.insert(-3);
testHeap.insert(-4);
testHeap.insert(-5);
console.log("Current heap structure: ")
testHeap.print();

console.log("Highest Element: " + testHeap.delete());
testHeap.print();
console.log("Highest Element: " + testHeap.delete());
testHeap.print();

console.log("Current heap structure: ")
testHeap2.print();

console.log("Lowest Element: " + testHeap2.delete());
testHeap2.print();
console.log("Lowest Element: " + testHeap2.delete());
testHeap2.print();
console.log("Lowest Element: " + testHeap2.delete());
testHeap2.print();
console.log("Lowest Element: " + testHeap2.delete());
testHeap2.print();
console.log("Lowest Element: " + testHeap2.delete());
testHeap2.print();
console.log("Lowest Element: " + testHeap2.delete());
testHeap2.print();