# CITS3403Project

## Design Description
the design of the website is meant to look like google's UI. Because the game is based off the default definitions shown by google. So the theme is meant to imitate google dark mode. The phonetic alphabet type shown below the name of the game is to remind the user of dictionaries/definitions because that is the primary thing most people accociate with the phonetic alphabet. This really drills the theme deep into the mind of the user. 

The website utilizes bootstrap to be friendly for any device and have relative text sizes. The navbar always shows and the page body fades in for every transition. the current page is highlighted on the navbar

## Development Description
Development started by copying the flask mega tutorial (https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-i-hello-world). Once that was working we adapted it to our needs by adding the appropriate pages and basic functionality for testing. Halfway through development we realised that the unorganised css styling we were doing was not sustainable, so we completely reworked the all the html and css scripts to be bootstrap based. In development we also made a webscraper to automatically create a table with hundreds of puzzle data entries so we didn't have to manually copy and paste definitions for every word/day. This would be helpful if we were to use the website long term, but for the project we only needed test databases, it was not neccessary. Although the basic functionality of the game was working it was still very unpolished. It was easy to cheat and not a lot of important information was presented. Finally, we added many more snippets of code to make using the website easier.



## How to Launch
In the terminal of your virtual environment type: source venv/bin/activate

Then to run the website locally type: flask run

To stop running press: ^c (mac) or ctrl+c (windows)

## How to Test
To run the tests.py script run the "python tests.py" command in your terminal 

## Sample Database
A sample database is provided with some sample user accounts. The user below is an administrator who can access developer tools tab and who already has some game statistics

Username: cam

Password: cam123

For testing you can register a user and play the game as this user to view how the statistics change

A new puzzle will be selected every day from the puzzles database and more can be added using the form
