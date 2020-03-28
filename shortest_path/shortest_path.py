def generate_neighbours(grid):
    #grid is a 2d array that is 1 (true), if square is not a wall, otherwise is 0 or False, if element is a wall

    neighbours = {(0,0):set({}), (len(grid)-1, len(grid[0])-1):set({})} #top corner elemnt has no neighbours currently, and include bottom right corner as well

    for element_index in range(len(grid[0])): neighbours[(0, element_index)] = set({})

    for row_index in range(len(grid)): neighbours[(row_index, len(grid))] = set({})

    for row_index in range(len(grid)-1): #loop until 2nd to last element
        for element_index in range(len(grid[0])-1): #loop until 2nd to last element for that row 
            
            square_below = grid[row_index+1][element_index]
            square_right = grid[row_index][element_index +1]

            current_square_tuple = (row_index, element_index)
            square_below_tuple, square_right_tuple = (row_index + 1, element_index),(row_index, element_index +1)

            if(square_below): neighbours[row_index+1, element_index] = set({})

            if(not grid[row_index][element_index]): continue

            if(square_below): #check if square below is not a wall
                neighbours[current_square_tuple].add(square_below_tuple)
                neighbours[square_below_tuple] = {current_square_tuple}

            if(square_right): #check if square to the right is not a wall
                neighbours[current_square_tuple].add(square_right_tuple)
                neighbours[square_right_tuple].add(current_square_tuple)
    
    for row_index in range(len(grid) - 1):
        if(grid[row_index][len(grid[0]) -1] and grid[row_index +1][len(grid[0]) -1]):
            neighbours[(row_index, len(grid[0]) -1)].add((row_index + 1, len(grid[0]) -1))
            neighbours[(row_index +1, len(grid[0]) -1)].add((row_index, len(grid[0]) -1))
    
    for element_index in range(len(grid[0]) -1):
        if(grid[len(grid) -1][element_index] and grid[len(grid) -1][element_index + 1]):
            neighbours[(len(grid) -1), element_index].add((len(grid) -1, element_index + 1))
            neighbours[(len(grid) -1), element_index + 1].add((len(grid) -1, element_index))

    return neighbours

grid_map = [
    [0, 1, 0, 0, 1, 1],
    [1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 0],
    [1, 1, 0, 1, 1, 1],
    [1, 1, 0, 1, 0, 1]
]
neighbours = generate_neighbours(grid_map)

start = (4,0)
end = (0, 5)

def bfs_search(start_node, end_node, neighbour_map):
    queue = [start_node]
    min_counts = {start_node:0}
    visited = {start_node}

    while(len(queue) > 0):
        node_neighbours = neighbour_map[queue[0]]
        for node in node_neighbours:
            if not node in visited:
                queue.append(node)
                visited.add(node)
                min_counts[node] = min_counts[queue[0]] + 1
        queue.pop(0)
    
    if(end_node in visited): return min_counts[end_node]
    return -1

print(bfs_search(start, end, neighbours))
