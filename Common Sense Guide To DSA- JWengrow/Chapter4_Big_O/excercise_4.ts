import { test } from "../utils";

function greatestNumber(arr: number[]): number {
    let greatestNumber = arr[0];
    for (let i = 1; i <= arr.length; i++){
        if(arr[i]>greatestNumber) greatestNumber=arr[i]
    }
    return greatestNumber;
}



test("equal numbers", greatestNumber([4, 4, 4, 4]), 4);
test("distinct numbers", greatestNumber([1, 2, 3, 4, 5]), 5);
test("negative numbers", greatestNumber([-1, -2, -3, -4, -5]), -1);
test("mixed numbers", greatestNumber([-10, 0, 10, 20, -20]), 20);
test("single element", greatestNumber([42]), 42);
test("empty array", greatestNumber([]), undefined);