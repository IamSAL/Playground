
import { test } from "./utils";


export function binary_search<T = any>(arr: T[], target: T): T | null{
    let lower_bound=0;
    let upper_bound = arr.length - 1;
    
    while (lower_bound <= upper_bound) {
        let midpoint = Math.floor((lower_bound + upper_bound) / 2);
        let value = arr[midpoint];
        if(value===target){
            return value;
        } else if (target < value) {
            upper_bound=midpoint-1;
        }else if(target>value){
            lower_bound=midpoint+1;
        }
    }
       
    return null;
    
} 






test("First element", binary_search([1, 2, 3, 4, 5], 1), 1);
test("Last element", binary_search([1, 2, 3, 4, 5], 5), 5);
test("Element not in array", binary_search([1, 2, 3, 4, 5], 6), null);
test("Empty array", binary_search([], 1), null);
test("Single element array", binary_search([1], 1), 1);
test("Duplicate elements", binary_search([1, 1, 2, 2, 3, 3], 2), 2);

