from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By

import xlrd
import xlwt
from xlwt import Workbook

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
driver.get("https://www.google.com")
url = 'https://www.lexico.com/definition/'

loc = '/Users/bencreighton/Documents/CITS3403Project/dictionary.xls'

words_list = []

wb = xlrd.open_workbook(loc)
sheet = wb.sheet_by_index(0)
sheet.cell_value(0, 0)
 
for i in range(sheet.nrows):
    words_list.append(sheet.cell_value(i, 0))



offset = 0
with open('puzzleData.txt', 'w') as f:
    for i in range(len(words_list)):
        currenturl = (url + words_list[i] + "\n")
        driver.get(currenturl)
        if driver.find_elements_by_xpath('//*[@id="content"]/div[1]/div[2]/div/div/div/div/section/ul/li/div/div[2]/div/em/span'):
            sentence = driver.find_element(By.XPATH, '//*[@id="content"]/div[1]/div[2]/div/div/div/div/section/ul/li/div/div[2]/div/em/span')
        elif driver.find_elements_by_xpath('//*[@id="content"]/div[1]/div[2]/div/div/div/div/section[1]/ul/li[1]/div/div[3]/div/em/span'):
            sentence = driver.find_element(By.XPATH, '//*[@id="content"]/div[1]/div[2]/div/div/div/div/section[1]/ul/li[1]/div/div[3]/div/em/span')
        else:
            offset += 1
            continue
        defn = driver.find_element(By.XPATH, '//*[@id="content"]/div[1]/div[2]/div/div/div/div/section[1]/ul/li[1]/div/p/span[2]').text
        defnwords = defn.split(' ')
        if len(defnwords) < 4:
            offset += 1
            continue
        langpart = driver.find_element(By.XPATH, '/html/body/div[1]/div/div[2]/div[1]/div[2]/div/div/div/div/section[1]/h3/span')
        redactedsen = sentence.text.replace(words_list[i], '[REDACTED]')
        tempstring = str(i-offset)
        f.writelines("".join("["))
        f.writelines("".join(tempstring))
        f.writelines("".join(", ^"))
        f.writelines("".join(words_list[i]))
        f.writelines("".join("^, ^"))
        f.writelines("".join(defn))
        f.writelines("".join("^, ^"))
        f.writelines("".join(langpart.text))
        f.writelines("".join("^, ^"))
        f.writelines("".join(redactedsen))
        f.writelines("".join("^], \n"))
        #sheet1.write(rown , 0 , words_list[i])
        #sheet1.write(rown , 1 , defn)
        #sheet1.write(rown , 2 , langpart.text)
        #sheet1.write(rown , 3 , redactedsen)

