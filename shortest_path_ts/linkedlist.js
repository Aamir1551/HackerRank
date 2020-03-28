// Double-ended queue structure
export class Deque {
    constructor() {
        this.first = null;
        this.last = null;
        this.size = 0;
    }
    getLength() {
        return this.size;
    }
    pushBack(value) {
        // Update last
        const last = this.last;
        this.last = { previous: last, value: value, next: null };
        if (last !== null)
            last.next = this.last;
        // Update first
        if (this.first === null)
            this.first = this.last;
        // Update size
        this.size++;
        // Return new size
        return this.size;
    }
    pushFront(value) {
        // Update first
        const first = this.first;
        this.first = { previous: null, value: value, next: first };
        if (first !== null)
            first.previous = this.first;
        // Update last
        if (this.last === null)
            this.last = this.first;
        // Update size
        this.size++;
        // Return new size
        return this.size;
    }
    popBack() {
        // Check possibility
        if (this.size === 0)
            return null;
        // Update last
        const entry = this.last;
        this.last = entry.previous;
        if (this.last !== null)
            this.last.next = null;
        // Update first
        if (this.first === entry)
            this.first = null;
        // Update size
        this.size--;
        // Return value of removed entry
        return entry.value;
    }
    popFront() {
        // Check possibility
        if (this.size === 0)
            return null;
        // Update first
        const entry = this.first;
        this.first = entry.next;
        if (this.first !== null)
            this.first.previous = null;
        // Update last
        if (this.last === entry)
            this.last = null;
        // Update size
        this.size--;
        // Return value of removed entry
        return entry.value;
    }
}
