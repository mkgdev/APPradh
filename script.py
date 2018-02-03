import pandas as pd
 
columns=['2002','2003','2004','2005']
index=['Zidane','Figo','Beckham','Totti']
df = pd.DataFrame(columns=columns,index=index)

df.to_csv('out.csv', sep=',')