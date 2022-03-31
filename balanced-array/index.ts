const balancedIndex = (array: number[]) => {
  let total = array.reduce((a, b) => a + b);
  let sumLeft = 0;

  for (let i = 0; i < array.length; i++) {
    // subtract the total with the current value of array[i]
    total = total - array[i];
    // compare the sum to the left of current index against total
    console.log(sumLeft, total);
    if (sumLeft === total) {
      // if the sums match, the current index will be returned
      return i;
    }
    sumLeft += array[i];
  }
  // if there is no balanced index, return -1
  return -1;
};

const result = balancedIndex([1, 3, 4, 4, 8, 12]);

console.log(result);
