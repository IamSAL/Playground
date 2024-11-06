const isSameValue = (a:any, b:any) => {
    if (a === b) return true;

    if (typeof a !== typeof b) return false;

    if (a && b && typeof a === 'object') {
        if (Array.isArray(a) && Array.isArray(b)) {
            if (a.length !== b.length) return false;
            for (let i = 0; i < a.length; i++) {
                if (!isSameValue(a[i], b[i])) return false;
            }
            return true;
        }

        const keysA = Object.keys(a);
        const keysB = Object.keys(b);

        if (keysA.length !== keysB.length) return false;

        for (let key of keysA) {
            if (!isSameValue(a[key], b[key])) return false;
        }

        return true;
    }

    return false;
    
}
export function logTestResult(description: string, result: any, expected: any) {

  const status = isSameValue(result,expected) ? "🟢" : "🔴";
  console.log(
    `${status}  ${description} :  (expected: ${expected}, got: ${result}) \n`
  );
}
