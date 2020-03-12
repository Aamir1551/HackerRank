import math

def power_of_two(n):
  return [2**i for i in range(0,math.floor(math.log(n, 2)) + 1)]

def decibinary_number(n, cache, powers, max_minus_index):
  if(n==0):return [{}]
  max_minus_index = min(max_minus_index, math.floor(math.log(n, 2)) +1)
  if (n,max_minus_index) in cache:
    return cache[n, max_minus_index]
  sols = []
  p = powers[:max_minus_index]
  for i in p:
    t = decibinary_number(n-i, cache, powers, i)
    for j in t:
      tt = j.copy()
      tt[i] = tt.get(i, 0) + 1
      sols.append(tt)
  cache[n, max_minus_index] = sols
  return cache[n, max_minus_index]

p = power_of_two(130)
cache = {}
sumed = 0
for i in range(100):
  print(i)
  sumed+= len(decibinary_number(i, cache, p, i))
print(sumed)