import { log, test } from "../Common Sense Guide To DSA- JWengrow/utils";
function deepClone<T = Object>(obj: T): T {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }
  let newObj = {};
  Object.keys(obj).map((key) => {
    if (typeof obj[key] == "object") {
      newObj[key] = deepClone(obj[key]);
    } else {
        newObj[key] = obj[key];
    }
      
    
  });
  return newObj as T;
}


// function deepClone<T = object>(obj: T, seen = new WeakMap()): T {
//   // Handle primitives and null
//   if (obj === null || typeof obj !== "object") {
//     return obj;
//   }

//   // Handle circular references
//   if (seen.has(obj)) {
//     return seen.get(obj);
//   }

//   // Handle special objects
//   if (obj instanceof Date) {
//     return new Date(obj) as T;
//   }

//   if (obj instanceof RegExp) {
//     return new RegExp(obj.source, obj.flags) as T;
//   }

//   if (obj instanceof Map) {
//     const clone = new Map();
//     seen.set(obj, clone);
//     obj.forEach((value, key) => {
//       clone.set(deepClone(key, seen), deepClone(value, seen));
//     });
//     return clone as T;
//   }

//   if (obj instanceof Set) {
//     const clone = new Set();
//     seen.set(obj, clone);
//     obj.forEach((value) => {
//       clone.add(deepClone(value, seen));
//     });
//     return clone as T;
//   }

//   // Handle arrays
//   if (Array.isArray(obj)) {
//     const clone: any[] = [];
//     seen.set(obj, clone);
//     obj.forEach((item, index) => {
//       clone[index] = deepClone(item, seen);
//     });
//     return clone as T;
//   }

//   // Handle plain objects
//   const clone: Record<string, any> = {};
//   seen.set(obj, clone);
//   Object.keys(obj).forEach((key) => {
//     clone[key] = deepClone(obj[key], seen);
//   });

//   return clone as T;
// }



test("Simple object", deepClone({ a: 1, b: 2 }), { a: 1, b: 2 });
test("Nested object", deepClone({ a: 1, b: { c: 2, d: 3 } }), {
  a: 1,
  b: { c: 2, d: 3 },
});
test("Array", deepClone([1, 2, { a: 3, b: 4 }]), [1, 2, { a: 3, b: 4 }]);
test("Null values", deepClone({ a: null, b: 2 }), { a: null, b: 2 });
test("Primitive value (number)", deepClone(1), 1);
test("Primitive value (string)", deepClone("string"), "string");
test("Primitive value (boolean)", deepClone(true), true);
test("Undefined values", deepClone({ a: undefined, b: 2 }), {
  a: undefined,
  b: 2,
});
test(
  "Function values",
  deepClone({ a: () => {}, b: 2 }).a.toString(),
  (() => {}).toString()
);
test(
  "Simple object",
  deepClone({
    name: "paddy",
    address: {
      town: "Lerum",
      country: "sweden",
    },
  }),
  {
    name: "paddy",
    address: {
      town: "Lerum",
      country: "sweden",
    },
  }
);