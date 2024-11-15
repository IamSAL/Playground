import { log,  test } from "../utils";

export function selectionSort(unsorted_array: any[]) {
  if (unsorted_array.length == 0) return unsorted_array;
  
  let passStart = 0;
  while (passStart < unsorted_array.length) {

    //find minimum
    let minimumIdx = passStart;
    for (let k = passStart; k < unsorted_array.length; k++) {
      
       if (unsorted_array[k] < unsorted_array[minimumIdx]) {
         minimumIdx = k;
       }
     }

     //swap minimum with current pass idx
    if (passStart != minimumIdx) {
       const minValue = unsorted_array[minimumIdx];
       const currentPassValue = unsorted_array[passStart];
       unsorted_array[minimumIdx] = currentPassValue;
       unsorted_array[passStart] = minValue;
    }
 
    passStart++;

  }

  return unsorted_array;
  

}


test("simple array", selectionSort([4, 2, 7, 1, 3]), [1, 2, 3, 4, 7]);
test(
  "Already sorted array",
  selectionSort([1, 2, 3, 4, 5]),
  [1, 2, 3, 4, 5]
);

test(
  "Reverse sorted array",
  selectionSort([5, 4, 3, 2, 1]),
  [1, 2, 3, 4, 5]
);
test(
  "Unsorted array",
  selectionSort([3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5]),
  [1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9]
);
test(
  "Array with duplicates",
  selectionSort([4, 5, 4, 3, 2, 1, 2]),
  [1, 2, 2, 3, 4, 4, 5]
);
test("Single element array", selectionSort([1]), [1]);
test("Empty array", selectionSort([]), []);
test(
  "Array with negative numbers",
  selectionSort([3, -1, 4, -1, 5, -9, 2, 6, -5, 3, 5]),
  [-9, -5, -1, -1, 2, 3, 3, 4, 5, 5, 6]
);