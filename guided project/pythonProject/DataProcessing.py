import pandas as pd
import random
import logging
import string
import numpy as np
import matplotlib.pyplot as plt


def generate_log_entry():
    '''
    generate a random log entry with a timestamp ,log level ,action, and user

    '''

    
    timestamp=pd.Timestamp.now().strftime("%Y-%m-%d  %H:%M:%S")
    log_level=random.choices(["INFO","DEBUG","ERROR","WARNING"])
    action=random.choice(['Login',"Logout","Data Request","File Upload","Download","Error"])
    user=''.join(random.choices(string.ascii_uppercase + string.digits,k=6))
    return f"{timestamp} - {log_level} - {action} -User: {user}"


# functions to write logs to file
def write_logs_to_file(log_filename,num_entries=100):
    '''
    write the specified number of logs in the given file
    '''
    try:
        with open(log_filename,'w') as file:
            for _ in range(num_entries):
                log=generate_log_entry()
                file.write(log + '\n')
        print(f"Logs have been successfully written to the file :{log_filename}.")
    except Exception as e:
        logging.error(f"error in write_logs_to_file: {e}")
        print("An error occured while writting logs to the file.")

# function to read the log file and process it
def load_and_process_logs(log_filename="generated_logs.txt"):
    """
    loads and process the logs from the given file,cleaning and parsing the timestamps.

    """
    try:
        # read the log file into pandas dataframe,spliting by the '-' separator
        df=pd.read_csv(log_filename,sep=' - ',header=None,names=["Timestamp","log_level","action","user"],engine='python')
        
        # clean and trim spaces around the timestamp
        df["Timestamp"]=df["Timestamp"].str.strip()

        # convert the timestamp column to datetime
        df["Timestamp"]=pd.to_datetime(df["Timestamp"],errors="coerce")

        # drop rows with invalid timestamps
        df=df.dropna(subset=["Timestamp"])

        if df.empty:
            print("No valid data found after timestamp conversion")
        else:
            print("data after timestamp conversion:")
            print(df.head())  #show the data after cleaning
        
        # set the timestamp column as the index for timestamp operations/calculations
        df.set_index("Timestamp",inplace=True)
        return df
    
    except Exception as e:
        print(f"Error processing the log file:{e}")
        return None

# Function to perform basic statistical analysing using pandas and numpy

def analyze_data(df):
    '''
    performs the basic analysis,such as counting log level and actions and computing basic statistics,
    mean,max etc
    '''
    try:
        if df is None or df.empty:
            print("No data avaiable for analyze")
            return None,None

        # count the occurence of each log level
        log_level_counts=df["log_level"].value_counts()

        # counts the occurences of each actions
        action_counts=df["action"].value_counts()

        log_count=len(df)
        unique_users=df["user"].nunique()
        logs_per_day=df.resample('D').size()  #number of logs per day

        # avaerages of ctions per day
        average_logs_per_day=logs_per_day.mean()

        # max logs per day
        max_logs_per_day= logs_per_day.max()

        print(f"log Level Counts:",log_level_counts)
        print("\nactions Counts:\n",action_counts)
        print(f"\nTotal numbers of logs:{log_count}")
        print(f"number of unique users:{unique_users}")
        print(f"average logs per day:{average_logs_per_day:.2f}")
        print(f"maximum logs per day:{max_logs_per_day}")

        # create a dictionary to return analyze results
        stats={
            "log_Level_Counts":log_level_counts,
            "actions_Counts:":action_counts,
            "log_counts":log_count,
            "uniques_users":unique_users,
            "average_logs_per_day":average_logs_per_day,
            "max_logs_per_day":max_logs_per_day
        }

        return stats
    
    except Exception as e:
        print(e)
        print(f"error analyzing data:{e}")
        return None

# functions to visualize trends over time using matplotlib
def visualize_trends(df):
    """
    visulaize the log frequency trends over time using matplotlib.
    """
    try:
        # resample data to get the num of logs per day
        logs_by_day=df.resample('D').size()

        # ploting log frequency
        plt.figure(figsize=(10,5))
        plt.plot(logs_by_day.index,logs_by_day.values,marker='o',linestyle='-',color='b')

        # customize the plot
        plt.title("Log Frequency over time")
        plt.xlabel('Date')
        plt.ylabel("Number of logs")
        plt.xticks(rotation=45)
        plt.grid(True)

        # show the plot
        plt.tight_layout()
        plt.show()

    except Exception as e:
        print(f"error visualizing data:{e}")


log_filename='generated_logs.txt'      #assume that file exits

# step1=write random logs to the file
write_logs_to_file(log_filename,num_entries=200)

# steps 2=load and proces the logs from the file
df_logs=load_and_process_logs(log_filename)

# step 3=perform basic analyze on the log data
if df_logs is not None:
    stats=analyze_data(df_logs)
    
    # step 4 visualize trends over time
    visualize_trends(df_logs) 