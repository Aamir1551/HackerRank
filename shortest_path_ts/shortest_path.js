


// Double-ended queue structure
class Deque {
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


let grid_map = [
    [0, 1, 0, 0, 1, 1],
    [1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 0],
    [1, 1, 0, 1, 1, 1],
    [1, 1, 0, 1, 0, 1]
];
let start = [4, 0];
let end = [0, 5];

function getNodeNeighbours(nd, n, m, grid) {
    let [i, j] = nd;
    let out = [];
    if (i + 1 != n && grid[i+1][j] != 0) {
        out.push([i + 1, j]);
    }
    if (i - 1 >= 0  && grid[i-1][j] != 0 ) {
        out.push([i - 1, j]);
    }
    if (j + 1 != m  && grid[i][j+1] != 0 ) {
        out.push([i, j + 1]);
    }
    if (j - 1 >= 0  && grid[i][j-1]!=0) {
        out.push([i, j - 1]);
    }
    return out;
}

function bfs_search(start_node, end_node, grid) {
    let n = grid.length;
    let m = grid[0].length;
    let queue = new Deque();
    queue.pushFront(start_node);

    let min_counts = Array(n * m);
    min_counts[start_node[0] * m + start_node[1]] = 0;

    let visited = new Set();
    visited.add(start_node.toString());

    while (queue.getLength() > 0) {
        firstElementInQueue = queue.first.value;
        let node_neighbours = getNodeNeighbours(firstElementInQueue, n, m, grid);
        let current_distance = min_counts[firstElementInQueue[0] * m + firstElementInQueue[1]];
        for (let nb of node_neighbours) {
            if (!visited.has(nb.toString())) {
                queue.pushBack(nb);
                visited.add(nb.toString());
                min_counts[nb[0] * m + nb[1]] = current_distance + 1;
            }
        }
        queue.popFront();
    }
    if (visited.has(end_node.toString())) {
        return min_counts[end_node[0] * m + end_node[1]];
    }
    return -1;
}
console.log(bfs_search(start, end, grid_map));
