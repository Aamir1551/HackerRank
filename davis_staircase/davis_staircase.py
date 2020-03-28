
def r(c):
    if(c>0):
        r(c-1)

import sys

print(sys.getrecursionlimit())
r(999)

