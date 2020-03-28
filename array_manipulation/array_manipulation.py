def arrayManipulation(n, queries):
    h = {}
    h_sum = {}
    t = {}
    for q in queries:
        if q[0] in h:
            h[q[0]].add(q)
        else:
            h[q[0]] = {}
        h_sum[q[0]] += q[2]
        if(q[1] - q[0] == 1):
            t[q[0]] = q[2]
    

