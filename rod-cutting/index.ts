const rodCutting = (array: number[]) => {
  let output = [];

  while (array.length != 0) {
    // get the min value in the array
    let minVal = Math.min(...array);
    output.push(array.length);

    for (let i = 0; i < array.length; i++) {
      let diff = array[i] - minVal;

      if (diff === 0) {
        // remove the cut end
        array.splice(i, 1);
        // loop around again
        i -= 1;
      } else {
        // set num of rods before cut
        array[i] = diff;
      }
    }
  }

  return output;
};

const result = rodCutting([5, 4, 4, 2, 2, 8]);

console.log(result);
