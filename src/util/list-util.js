/**
 * 
 * @param {any[]} array 
 * @param {any} element 
 * @returns 
 */
export const removeIfExists = (array, element) => {
    const index = array.indexOf(element);
    if (index >= 0) {
        array.splice(index, 1);
    }
    return array;
};

/**
 * Inserts a value in a sorted array such that the order of the array is preserved using the binary insertion algorithm.
 * 
 * @param {any[]} array 
 * @param {any} element 
 * @param {(a: any, b: any) => number} comparator 
 */
export const binaryInsert = (array, element, comparator) => {
    if (array.length === 0) {
        array.push(element);
        return array;
    }
    if (comparator(array[0], element) >= 0) {
        array.splice(0, 0, element);
        return array;
    }
    if (comparator(array[array.length - 1], element) <= 0) {
        array.splice(array.length, 0, element);
        return array;
    }
    var start = 0;
    var end = array.length;
    var pivot = Math.floor((start + end) / 2);
    while (start < end && pivot !== start) {
        var comparison = comparator(array[pivot], element);
        if (comparison === 0) {
            // we can just put it here
            array.splice(pivot, 0, element);
            return array;
        } else {
            if (comparison < 0) {
                start = pivot;
            } else if (comparison > 0) {
                end = pivot;
            }
            pivot = Math.floor((start + end) / 2);
        }
    }
    array.splice(end, 0, element);
    return array;
}
