import numpy as np
import pandas as pd

my_data=pd.read_csv('iris.csv', sep=',',header=0)

my_data = my_data.iloc[:,1:]
my_data = my_data.replace(['Iris-setosa','Iris-versicolor','Iris-virginica'],[0,1,2])

my_data = np.array2string(np.array(my_data),separator = ',')
print("var irisData = nj.array(",my_data,");")
