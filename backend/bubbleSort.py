def BubbleSort(array):
    for i in range(len(array)):
        for j in range(len(array)-i-1):
            if array[j]>array[j+1]:
                temp = array[j+1]
                array[j+1] = array[j]
                array[j] = temp
            j +=1
        i+=1
    print(array)
    return array
