var MinHeap = /** @class */ (function () {
    function MinHeap() {
        this.values = [];
    }
    MinHeap.prototype.add = function (val) {
        this.values.push(val);
        if (this.values.length != 1) {
            this.heapifyUp(this.values.length); //passing the one-based index
        }
    };
    MinHeap.prototype.heapifyUp = function (index) {
        var _a;
        var parentIndex = (index - (index % 2)) / 2; //get the one-based index of the parent
        if (this.values[parentIndex - 1][0] > this.values[index - 1][0]) { //using minus-ones since we were considering one-based indexing
            _a = [this.values[index - 1], this.values[parentIndex - 1]], this.values[parentIndex - 1] = _a[0], this.values[index - 1] = _a[1];
            this.heapifyUp(parentIndex);
        }
    };
    MinHeap.prototype.heapifyDown = function (index) {
        var _a;
        var childrenLeftIndex = index * 2;
        var childrenRightIndex = index * 2 + 1;
        var leftChildValue = childrenLeftIndex > this.values.length ? Number.POSITIVE_INFINITY : this.values[childrenLeftIndex - 1][0];
        var rightChildValue = childrenRightIndex > this.values.length ? Number.POSITIVE_INFINITY : this.values[childrenRightIndex - 1][0];
        var minChildIndex = leftChildValue < rightChildValue ? childrenLeftIndex : childrenRightIndex;
        if ((leftChildValue < this.values[index - 1][0] || rightChildValue < this.values[index - 1][0]) && this.values[minChildIndex - 1][0] < this.values[index - 1][0]) {
            _a = [this.values[minChildIndex - 1], this.values[index - 1]], this.values[index - 1] = _a[0], this.values[minChildIndex - 1] = _a[1];
            this.heapifyDown(minChildIndex);
        }
    };
    MinHeap.prototype.removeMin = function () {
        if (this.values.length == 0) {
            throw "Heap Size is 0";
        }
        var minValue = this.values[0];
        this.values[0] = this.values[this.values.length - 1]; //reassign the root of heap, to be leaf
        this.values.pop(); //remove the final value
        if (this.values.length != 1) {
            this.heapifyDown(1); //passing the one-based index
        }
        return minValue;
    };
    MinHeap.prototype.peakMin = function () {
        return this.values[0];
    };
    MinHeap.prototype.showValues = function () {
        console.log(this.values);
    };
    return MinHeap;
}());
var h = new MinHeap();
h.add([1, 3]);
h.add([8, 3]);
h.add([2, 3]);
h.add([7, 3]);
h.add([1, 3]);
h.add([5, 3]);
h.showValues();
console.log(h.removeMin());
console.log(h.removeMin());
h.showValues();
h.add([11, 3]);
h.showValues();
