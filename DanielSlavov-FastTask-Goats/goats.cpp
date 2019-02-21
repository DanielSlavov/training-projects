#include<iostream>
using namespace std;

void sort(int* arr,int size)
{
    for(int i=0;i<size;i++)
        for(int k=0;k<size-1;k++)
        {
            if(arr[k]<arr[k+1])
            {
                int temp=arr[k];
                arr[k]=arr[k+1];
                arr[k+1]=temp;
            }
        }
}
void print(int* arr,int size)
{
    for(int k=0;k<size;k++)
        cout<<arr[k];
}
void input(int* arr,int size)
{
    for(int k=0;k<size;k++)
        cin>>arr[k];
}
int func(int* _arr,int size,int desiredSize,int maxPasses)
{
    int* arr=new int[size];
    for(int i=0;i<size;i++)
    {
        arr[i]=_arr[i];
    }


    if(arr[0]>desiredSize)
        return 0;
    int sum=0;
    while(maxPasses > 0)
    {
        for(int i=0;i < size;i++)
        {
            if(sum+arr[i] <= desiredSize && arr[i]>0)
            {
                sum+=arr[i];
                arr[i]=0;
            }
        }
        maxPasses--;
        sum=0;
    }
    for(int i=0;i<size;i++)
        sum+=arr[i];
    return sum;
    
}

int find(int* arr,int size,int maxPass)
{
    sort(arr,size);
    for(int i=arr[0];true;i++)
    {
        if(func(arr,size,i,maxPass)==0)
            return i;
    }
}

int main()
{
    // int size=15;
    // int maxPass=3;
    // int arr[64]={666000, 42000, 7000, 13000, 400000, 511000,600000,200000,202000,111000,313000,94000,280000,72000,42000};

    int size;
    int maxPass;
    int arr[64];
    cin>>size>>maxPass;
    input(arr,size);


    
    cout<<find(arr,size,maxPass);




    return 0;
}