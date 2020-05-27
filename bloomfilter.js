// An empty Bloom filter is a bit array of m bits, all set to 0. There must also be k different hash functions defined, 
// each of which maps or hashes some set element to one of the m array positions, generating a uniform random distribution. 
// Typically, k is a small constant which depends on the desired false error rate ε, while m is proportional to k and the number 
// of elements to be added.

// To add an element, feed it to each of the k hash functions to get k array positions. Set the bits at all these positions to 1.

// To query for an element (test whether it is in the set), feed it to each of the k hash functions to get k array positions. 
// If any of the bits at these positions is 0, the element is definitely not in the set; if it were, then all the bits would have 
// been set to 1 when it was inserted. If all are 1, then either the element is in the set, or the bits have by chance been set to 
// 1 during the insertion of other elements, resulting in a false positive. In a simple Bloom filter, there is no way to distinguish 
// between the two cases, but more advanced techniques can address this problem.

class BloomFilter {
  constructor(length) {
    this.arr = new Array(length);
    this.arr.fill(0);
    this.size = length;
    this.h1 = Math.floor(Math.random() * Math.floor(length));
    this.h2 = Math.floor(Math.random() * Math.floor(length));
    this.h3 = Math.floor(Math.random() * Math.floor(length));
  }

  // Hash functions
  _k1(inputStr) {
    let sum = 0;
    for(let i = 0; i < inputStr.length; i++) {
      sum += inputStr[i].charCodeAt();
    }
    return sum % this.h1;
  }
  
  _k2(inputStr) {
    let sum = 0;
    for(let i = 0; i < inputStr.length; i++) {
      sum += inputStr[i].charCodeAt();
    }
    return sum % this.h2;
  }
  
  _k3(inputStr) {
    let sum = 0;
    for(let i = 0; i < inputStr.length; i++) {
      sum += inputStr[i].charCodeAt();
    }
    return sum % this.h3;
  }

  addItem(inputStr) {
    let i1 = this._k1(inputStr) % this.size, i2 = this._k2(inputStr) % this.size, 
      i3 = this._k3(inputStr) % this.size;
    // console.log(i1, i2, i3);
    this.arr[i1] = 1;
    this.arr[i2] = 1;
    this.arr[i3] = 1;
    return "Inserted: " + inputStr;
  }

  checkItem(inputStr) {
    let i1 = this._k1(inputStr) % this.size, i2 = this._k2(inputStr) % this.size, 
      i3 = this._k3(inputStr) % this.size;
      return (!this.arr[i1] || !this.arr[i2] || !this.arr[i3]) ? false : true;
  }
}

let testBloom = new BloomFilter(100)
  
let word_present = ['abound','abounds','abundance','abundant','accessable', 
                'bloom','blossom','bolster','bonny','bonus','bonuses', 
                'coherent','cohesive','colorful','comely','comfort', 
                'gems','generosity','generous','generously','genial'] 
  
let word_absent = ['bluff','cheater','hate','war','humanity', 
               'racism','hurt','nuke','gloomy','facebook', 
               'geeksforgeeks','twitter']

for(i = 0; i < word_present.length; i++) {
  testBloom.addItem(word_present[i])
}

console.log("Checking inserted items: ")

for(i = 0; i < word_present.length; i++) {
  console.log(word_present[i] +": " + testBloom.checkItem(word_present[i]))
}

let fp = 0;

console.log("Checking un-inserted items: ")

for(i = 0; i < word_absent.length; i++) {
  let res = testBloom.checkItem(word_absent[i])
  console.log(word_absent[i] +": " + res)
  if (res) {
    fp++;
  }
}

console.log("False Positive Rate (FPR): " + (fp/word_absent.length))