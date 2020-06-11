class HashTable {
  constructor() {
    this.hashStore = new Array(10).fill(null).map(() => new Array());
    this.numKeys = 0;
    this.loadFactor = this.numKeys/this.hashStore.length;
    // console.log(this.hashStore);
  }

  hashFunction(key) {
    let hashedVal = 0;
    for(let i = 0; i < key.length; i++) {
      hashedVal += key.charCodeAt(i);
    }
    return hashedVal % 599;
  }

  print() {
    console.log(this.hashStore);
    console.log("Load Factor: " + this.loadFactor)
  }

  insert(val) {
    let hashIdx = this.hashFunction(val) % this.hashStore.length;
    this.hashStore[hashIdx].push(val);
    this.incrementLoadFactor();
  }

  search(val) {
    let hashIdx = this.hashFunction(val) % this.hashStore.length;
    for(let i = 0; i < this.hashStore[hashIdx].length; i++) {
      if(this.hashStore[hashIdx][i] === val) {
        return true;
      }
    }
    return false;
  }

  incrementLoadFactor() {
    this.numKeys += 1;
    this.loadFactor = this.numKeys/this.hashStore.length;
  }
}

let testHashTable = new HashTable();
testHashTable.insert("HackerEarth");
testHashTable.insert("CodeMonk");
testHashTable.insert("Tutorial");
testHashTable.insert("Hashing");
console.log(testHashTable.search("HackerEarth"));
console.log(testHashTable.search("-1"));
console.log(testHashTable.search("Tutorial"));
testHashTable.print();