// Conceptually, a merge sort works as follows:

// Divide the unsorted list into n sublists, each containing one element (a list of one element is considered sorted).
// Repeatedly merge sublists to produce new sorted sublists until there is only one sublist remaining. This will be the sorted list.

function mergesplit(arr) {
  if (arr.length <= 1) {
    return arr
  }
  let mid = arr.length/2;
  let left = arr.slice(0, mid)
  let right = arr.slice(mid)
  return merge(
    mergesplit(left), 
    mergesplit(right));
}

function merge(arr1, arr2) {
  masterSorted = [];
  let i = 0, j = 0;
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      masterSorted.push(arr1[i]);
      i++;
    } else {
      masterSorted.push(arr2[j]);
      j++;
    }
  }
  return masterSorted.concat(arr1.slice(i), arr2.slice(j))
}

console.log(mergesplit([]))
console.log(mergesplit([5, 4, 3, 2, 1]))
console.log(mergesplit([1, 5, 4, 2]))
console.log(mergesplit([1, 5, 5, 2, 2, 3]))
console.log(mergesplit([1, 2, 3, 4, 5]))
console.log(mergesplit([1, 1, 1, 1, 1]))
console.log(mergesplit([1, -1, 1, -1, 1]))
console.log(mergesplit([1, 2, 3, 4]))