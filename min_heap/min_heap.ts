export class MinHeap<T> {

    private values:Array<[number, T]> = [];
    constructor() {}

    public add(val: [number, T]) : void{
        this.values.push(val);
        if(this.values.length != 1) {
            this.heapifyUp(this.values.length); //passing the one-based index
        }
    }

    private heapifyUp(index:number) : void {
        let parentIndex:number = (index - (index % 2)) /2; //get the one-based index of the parent
        if(this.values[parentIndex-1][0] > this.values[index -1][0]) { //using minus-ones since we were considering one-based indexing
            [this.values[parentIndex -1], this.values[index -1]] = [this.values[index -1], this.values[parentIndex -1]];
            this.heapifyUp(parentIndex)
        }
    }

    private heapifyDown(index:number) : void {
        let childrenLeftIndex:number = index*2;
        let childrenRightIndex:number = index*2+1;

        let leftChildValue =  childrenLeftIndex > this.values.length ? Number.POSITIVE_INFINITY : this.values[childrenLeftIndex -1][0];
        let rightChildValue =  childrenRightIndex > this.values.length ? Number.POSITIVE_INFINITY : this.values[childrenRightIndex -1][0];

        let minChildIndex : number = leftChildValue < rightChildValue ? childrenLeftIndex : childrenRightIndex;

        if((leftChildValue < this.values[index -1][0] || rightChildValue < this.values[index -1][0]) &&  this.values[minChildIndex -1][0] < this.values[index-1][0]) {
            [this.values[index-1], this.values[minChildIndex-1]] = [this.values[minChildIndex-1], this.values[index-1]];
            this.heapifyDown(minChildIndex);
        }

    }

    public removeMin() : [number, T] {
        if(this.values.length == 0) {
            throw "Heap Size is 0";
        }
        let minValue:[number, T] = this.values[0];
        this.values[0] = this.values[this.values.length -1]; //reassign the root of heap, to be leaf
        this.values.pop(); //remove the final value

        if(this.values.length != 1){
            this.heapifyDown(1); //passing the one-based index
        }

        return minValue;
    }

    public peekMin() : [number, T] {
        return this.values[0];
    }

    public showValues() : void {
        console.log(this.values);
    }

    public getSize() : number {
        return this.values.length;
    }

}