import math

def power_of_two(n):
  return [2**i for i in range(0,  int(math.floor(math.log(n, 2) + 1)))]

def decibinary_number(n, cache, powers, max_minus_index):
  if(n==0):return [{}]
  max_minus_index = min(max_minus_index, int(math.floor(math.log(n, 2)) +1))
  if (n,max_minus_index) in cache:
    return cache[n, max_minus_index]
  sols = []
  p = powers[:max_minus_index]
  for i in p:
    t = decibinary_number(n-i, cache, powers, i)
    for j in t:
      tt = j.copy()
      tt[i] = tt.get(i, 0) + 1
      if(tt[i] < 10):
        sols.append(tt)
  cache[n, max_minus_index] = sols
  return cache[n, max_minus_index]


def get_count_of_decibinary_number_equivalent_to(n, cache, powers, max_minus_index, count_of_max_minus_index):
  if(count_of_max_minus_index >= 10): return 0
  if(n==0): return 1
  if (n,max_minus_index, count_of_max_minus_index) in cache: return cache[(n, max_minus_index, count_of_max_minus_index)]

  max_minus_index = min(max_minus_index, int(math.floor(math.log(n, 2)) +1))
  p = powers[:max_minus_index-1]
  count = 0
  for i in p:
      count += get_count_of_decibinary_number_equivalent_to(n-i, cache, powers, i, 1) 
  count += get_count_of_decibinary_number_equivalent_to(n- powers[max_minus_index -1], cache, powers, max_minus_index,count_of_max_minus_index + 1) 
  cache[(n, max_minus_index, count_of_max_minus_index)] = count 
  return count 


decibinary_numbers_count = [] #stores the number of different representations in decibinary form of the decimal numer at index i
brute_force = []

p = power_of_two(300)
cache = {}
max_iter = 35 
for i in range(max_iter + 1):
  decibinary_numbers_count.append(get_count_of_decibinary_number_equivalent_to(i, cache, p, i, 0))
  brute_force.append(len(decibinary_number(i, {}, p, i)))


print(decibinary_numbers_count)
print(brute_force)
