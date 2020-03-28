
import { MinHeap } from "../min_heap/min_heap";

function solveForInstance(treeWeights:Map<number, number>, tree:Map<number, number>, i:number, j:number, k:number, l:number) : number {

    let heap1 = generateHeap(i, j, tree, treeWeights);
    let heap2 = generateHeap(k, l, tree, treeWeights);

    let count:number = 0;

    while(heap1.getSize() > 0 && heap2.getSize() > 0) {
        
        let heap1MinValue = heap1.peekMin()[0];
        let heap1Values:Set<number> = new Set<number>();
        let heap2Values:Set<number> = new Set<number>();

        while(heap1.peekMin()[0] == heap1MinValue) {
            let nodeIndex:number = heap1.removeMin()[1];
            heap1Values.add(nodeIndex);
        }

        while(heap2.peekMin()[0] <= heap1MinValue) {

            let [weight, nodeIndex]:[number, number] = heap2.removeMin();

            if(weight == heap1MinValue) {
                heap2Values.add(nodeIndex);
            }
        }

        heap2Values.forEach(x=> count+=heap1Values.size - (heap1Values.has(x) ? 1 : 0));
    }
    
    return count
}


function generateHeap(i:number, j:number, tree:Map<number, number>, treeWeights:Map<number, number>) : MinHeap<number> {

    let pathMinHeap : MinHeap<number> = new MinHeap<number>();
    let path:Array<number> = getPathFrom(i, j, tree);

    for(let k=0; k<path.length; k++) {
        pathMinHeap.add([treeWeights.get(path[k]), path[k]]);
    }

    return pathMinHeap;
}


function getPathToRoot(tree:Map<number, number>, nodeInTree : number) : [Array<number>, Set<number>] {

    //tree is a map that connects children with their parent nodes

    let currentNode : number = nodeInTree;
    let path:Array<number> = [currentNode];
    let pathSet: Set<number> = new Set<number>([currentNode]);

    while (tree.has(currentNode)) {
        path.push(tree.get(currentNode));
        pathSet.add(tree.get(currentNode));
        currentNode = tree.get(currentNode);
    }

    return [path, pathSet];
}

function getPathFrom(i:number, j:number, tree:Map<number, number>) : Array<number> {

    let [pathToRoot, pathSetToRoot] = getPathToRoot(tree, j);
    let currentNode :number = i;
    let path: Array<number> = [currentNode]
    
    while(!pathSetToRoot.has(currentNode)) {
        path.push(tree.get(currentNode));
        currentNode = tree.get(currentNode);
    }

    let indexOfIntersection:number = pathToRoot.indexOf(currentNode);

    for(let k=0; k<indexOfIntersection; k--) {
        path.push(pathToRoot[i]);
    }
    return path;
}