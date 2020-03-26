def superDigit(n, k):
    n = str(n)
    if(len(n) == 1):
        return n
    sum_of_digit = 0
    for i in n:
        sum_of_digit += int(i)
    sum_of_digit *= k

    return superDigit(sum_of_digit, 1)
    
        
