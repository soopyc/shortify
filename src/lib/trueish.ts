export function trueish(testString: string) {
    const _t = testString.toLowerCase();
    if (
        _t.startsWith("y") ||
        _t == "true"
    ) {
        return true;
    } else {
        return false;
    }
}