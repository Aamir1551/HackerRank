import heapq

def builder(prices_grid):
    #prices is an kxn grid consisting of house and their respective houses
    prices, n, k = [], len(prices_grid[0]), len(prices_grid)
    for color in range(k):
        for house in range(n):
            heapq.heappush(prices, (prices_grid[color][house], color, house))

    price_queues = {}
    current_index = {}

    index_state = {} #stores whther if any adjacent neighbours share square with it
    #if index_state is 1 for a house, then it is not sharing same color as neighbout
    #if index_state is 0 then its haring the same color as neighbour
    count_of_index_state = n #storing the number of incorrect houses
    
    while(count_of_index_state != 0):
        p = heapq.heappop()
        (col_price_for_house, color, house_index) = p
        if(index_state.get((house_index), False) == True):
            #if house at index is already in correct location, then add col to its heap
            if(house_index in price_queues):
                heapq.heappush(price_queues[house_index], p)
            else:
                price_queues[house_index] = set({p})
        else:
            #if house is in an incorrect location, then change its location to this new location 

            
            current_index[house_index] = color #new color index for house

            if(current_index[house_index] == current_index[house_index + 1] or current_index[house_index] == current_index[house_index -1]):

            else:
                count_of_index_state += 1
                






    
