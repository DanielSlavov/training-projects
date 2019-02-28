line_length=10
a=2
b=3
c=1

line = list(range(0,line_length))
a_steps=list(range(0,line_length+1,a))
b_steps=list(reversed(range(line_length,-1,-b)))

for i in a_steps:
    for k in b_steps:
        if (abs(i + (-1)*k)==c):
                for j in range(i,k):
                    line[j]=-1

                for j in range(k,i):
                    line[j]=-1

i=0

while i<len(line):
    if line[i]==-1:
        del line[i]
    else:
        i+=1
print(len(line))