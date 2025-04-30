import requests
from bs4 import BeautifulSoup
import time
import json
import re

# retry mechanism and dta scrapping functions
def fetch_data_with_retries(url,retries=3,delay=2):
    ''' 
    fetch data from url with retry in case of failure
    '''

    for attempt in range(retries):
        try:
            response=requests.get(url)
            response.raise_for_status()
            return response.text
        except requests.exceptions.RequestException as e:
            print(f"Attempt {attempt + 1 } failed: {e}")
            if attempt< retries - 1:
                time.sleep(delay * (attempt + 1))  #exponential backoff
            else:
                raise


# extract the data using beautiful soup and regular expression
def extract_data_from_html(html_content):
    '''
    extracting relevant data(links containing 'python') from the html content
    '''
    if not html_content:
        raise ValueError("HTML content is invalid or empty!!!")
    
    soup=BeautifulSoup(html_content,'html.parser')
    titles=[]

    # regular expression for finding all the links with specific word python
    for link in soup.find_all('a',href=True):
        title=link.get_text()
        if re.match(r'.*python.*',title,re.IGNORECASE): #looking for link containg python
            titles.append(title)

    return titles

# function to save data into JSON file
def save_data_to_json(data,filename="Scarapped_data.json"):
    try:
        with open(filename,'w') as file:
            json.dump(data,file,indent=4)
        print(f"data has been saved to{filename}")
    except Exception as e:
        print(f"Error saving data to the file: {e}")


url="https://docs.python.org/3/"

# fetch extract and save data
html_content=fetch_data_with_retries(url)
extracted_data=extract_data_from_html(html_content)
save_data_to_json(extracted_data)

