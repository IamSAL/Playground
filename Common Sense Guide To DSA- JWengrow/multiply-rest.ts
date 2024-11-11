function multiplyRest(arr: number[]): number[]{
    let n: any = arr.length;
    let res: any[] = new Array(n);
    for (let i = 0; i < n; i++){
        let count: number = 1;
        for (let j = 0; j < n; j++){
            if (j !== i) {
                count *= arr[j]
            }
        }
        res[i] = count;
    }
    return res;
}


function multiplyRest2n(arr: number[]): number[] {
  let n: any = arr.length;
  let res: any[] = new Array(n);
  let mul: number = 1;
  for (let j = 0; j < n; j++) {
   mul *= arr[j];
  }
    for (let j = 0; j < n; j++) {
        if(arr[j]==0) res[j]=arr[j]
        else res[j]=mul/arr[j]
    }
  return res;
}



//n**2
console.log(multiplyRest([1,4,6,8]));
console.log(multiplyRest([0,0]));
console.log(multiplyRest([-1, -1]));

//n
console.log(multiplyRest2n([1, 4, 6, 8]));
console.log(multiplyRest2n([0, 0]));
console.log(multiplyRest2n([-1, -1]));