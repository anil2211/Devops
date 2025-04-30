import random
import string
import time
import logging

# setting up logging for error handling

logging.basicConfig(filename="log_generator_error.log",level=logging.ERROR)

# list the level of logs
LOG_LEVELS=['INFO',"DEBUG","ERROR","WARNING"]

# list of possible actions
ACTIONS=['Login',"Logout","Data Request","File Upload","Download","Error"]

# Function to generate random string for logs
def generate_random_string(length=10):
    '''
    generating a random strings of given length(10 character)
    '''
    try:
        return ''.join(random.choices(string.ascii_letters + string.digits,k=length))
    except Exception as e:
        logging.error(f"Error in generate random string: {e}")
        return "ERROR"

#function to generate a random log entry
def generate_log_entery():
     '''
     generate a random log entry with a timestamp,log level,action and user
     '''
     try:
         log_level=random.choice(LOG_LEVELS)
         timestamp=time.strftime("%Y-%m-%d  %H:%M:%S",time.gmtime())

         action=random.choice(ACTIONS)
         user=generate_random_string(8)
         log_entry=f"{timestamp}   -   {log_level}        -       {action}             -  User:{user}"
         return log_entry
     except Exception as e:
         logging.error(f"Error in generate log entry: {e}")
         return "ERROR" 

# function to write a log in file
def write_logs_to_file(log_filename,num_entries=100):
    '''
    write the specified number of random logs to the given file.

    '''

    try:
        with open(log_filename,'w') as file:
            for _ in range(num_entries):
                log=generate_log_entery()
                if log !="ERROR":
                    file.write(log +'\n')
        print(f"log have been successfully written to {log_filename}")
    except Exception as e:
        logging.error(f"Error in write_logs_to_file:{e}")
        print("An error occured whle writing logs to the file")


# generate and write 200 random entries
write_logs_to_file('generated_logs.txt',num_entries=200)
