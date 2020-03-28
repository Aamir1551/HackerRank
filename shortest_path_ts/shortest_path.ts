
import {Deque} from "./linkedlist";

let grid_map:Array<Array<number>> = [
    [0, 1, 0, 0, 1, 1],
    [1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 0],
    [1, 1, 0, 1, 1, 1],
    [1, 1, 0, 1, 0, 1]
]
type node = [number, number]

let start : node = [4, 0]
let end : node = [0, 5]

function getNodeNeighbours(nd:node, n:number, m:number) : node[] {
    let [i, j]:[number, number] = nd;
    let out:Array<node> = []
    if(i+1 != n){
        out.push([i+1, j])
    }
    if(i-1 >= 0){
        out.push([i-1, j]);
    }
    if(j+1 != m){
        out.push([i, j+1])
    }
    if(j-1 >= 0){
        out.push([i, j-1]);
    }
    return out 
}


function bfs_search(start_node:node, end_node:node, grid:Array<Array<number>>) : number {

    let n = grid.length;
    let m = grid[0].length;

    let queue : Deque<node> = new Deque();
    queue.pushFront(start_node);

    let min_counts = Array(n*m);

    min_counts[start_node[0] * n + start_node[1]] = 0;
    let visited :Set<node> = new Set();
    visited.add(start_node);

    while(queue.getLength() > 0){
        let node_neighbours : Array<node> = getNodeNeighbours(queue[0], n, m)
        let current_distance : number = min_counts[queue[0][0] * n + queue[0][1]];
        for( let nb of node_neighbours){
            if(!visited.has(nb)) {
                queue.pushBack(nb);
                visited.add(nb);
                min_counts[nb[0] * n + nb[1]] = current_distance + 1;
            }
        }
        queue.popFront();
    }
    if(visited.has(end_node)){
        return min_counts[end_node[0] * n + end_node[1]]
    }
    return -1
}

console.log(bfs_search(start, end, grid_map));