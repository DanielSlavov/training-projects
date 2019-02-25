max = 3200000
red=""
num=1
while len(red)< max :
    red+=str(num*num)
    num+=1
inp=int(input())
assert(inp>0 and inp< max)
print(red[inp-1])