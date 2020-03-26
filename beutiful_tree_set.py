def generate_all_tuples(n):
    tuples_in_groups = [], tuples_linear_fashion = []
    for i in range(0, n+1):
        groups = []
        for j in range(0, n-i+1):
            groups.append((i, j, n-i-j))
            tuples_linear_fashion.append((i, j, n-i-j))
        tuples_in_groups.append(groups)
    return tuples_in_groups, tuples_linear_fashion

def tuples_are_pairwise_distinct(a, b): return (a[0] != b[0] and a[1]!=b[1] and a[2] != b[2])

def is_new_set_beutiful(tuple_item, first_item_set, second_item_set, third_item_set): 
    return   not tuple_item in first_item_set and not tuple_item in second_item_set and not tuple_item in third_item_set
    
def number_of_distinct_tuples(n): return (n+1) * (n+2) /2

def generate_cache_for_given_tuples(tuples_in_groups, number_of_distinct_tuples):
    cache = {}
    for i_group in range(len(tuples_in_groups) - 1):
        for i in tuples_in_groups[i_group]:
            cache[i] = set() 
        for i in tuples_in_groups[i]:
            for j in tuples_in_groups[i_group+1]:
                if(tuples_are_pairwise_distinct(i, j)):
                    cache[i].add(j)

    return cache


def get_beutiful_set(node, neighbours_cache, current_beutiful_set, max_beutiful_set, f, s, t, i_group, tuples_in_groups):
    if(i_group == len(tuples_in_groups) -1):
        return
    two_level_down_nodes = []
    if(i_group + 2 <= len(tuples_in_groups) -1):
        two_level_down_nodes = tuples_in_groups[i_group + 2]
    for seq in (neighbours_cache[node], two_level_down_nodes):
        for i in seq:
            if(is_new_set_beutiful(i, f, s, t)):
                current_beutiful_set.add(i)
                f.add(i[0])
                s.add(i[1])
                t.add(i[2])
                get_beutiful_set(i, neighbours_cache, current_beutiful_set, max_beutiful_set, f, s, t, i_group+1, tuples_in_groups) 
                if(len(max_beutiful_set) <= len(current_beutiful_set)):
                    max_beutiful_set = current_beutiful_set
                f.remove(i[0])
                s.remove(i[1])
                t.remove(i[2])
                current_beutiful_set.remove(i)


tuples_in_groups, tuples_linear = generate_all_tuples(4)
neighbour_cache =  generate_cache_for_given_tuples(tuples_in_groups, len(tuples_linear))
#do get_beutiful_set and get the max beutiful set