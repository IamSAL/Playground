import { log,  test } from "./utils";

export function bubbleSort(unsorted_array: any[]) {
  if (unsorted_array.length == 0) return unsorted_array;
    let unsorted_until_index = unsorted_array.length - 1;
  
  for (let k = 0; k <unsorted_array.length; k++){
    let swapCountInCurrentStep = 0;
    
    for (let i = 0; i < unsorted_until_index; i++) {
      const left = unsorted_array[i];
      const right = unsorted_array[i+1];

      if (left > right) {
        unsorted_array[i] = right;
        unsorted_array[i+1] = left;
        swapCountInCurrentStep++;
       
      }
       
    }
    if (swapCountInCurrentStep == 0) {
      return unsorted_array;
    }
    unsorted_until_index--;

    log("pass",k, unsorted_until_index);
  }
 
  
}

test("simple array", bubbleSort([4, 2, 7, 1, 3]), [1, 2, 3, 4, 7]);
test(
  "Already sorted array",
  bubbleSort([1, 2, 3, 4, 5]),
  [1, 2, 3, 4, 5]
);
test(
  "Reverse sorted array",
  bubbleSort([5, 4, 3, 2, 1]),
  [1, 2, 3, 4, 5]
);
test(
  "Unsorted array",
  bubbleSort([3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5]),
  [1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9]
);
test(
  "Array with duplicates",
  bubbleSort([4, 5, 4, 3, 2, 1, 2]),
  [1, 2, 2, 3, 4, 4, 5]
);
test("Single element array", bubbleSort([1]), [1]);
test("Empty array", bubbleSort([]), []);
test(
  "Array with negative numbers",
  bubbleSort([3, -1, 4, -1, 5, -9, 2, 6, -5, 3, 5]),
  [-9, -5, -1, -1, 2, 3, 3, 4, 5, 5, 6]
);