# CITS3403Project
--design description
the design of the website is meant to look like google's UI. Because the game is based off the default definitions shown by google. So the theme is meant to imitate google dark mode. The phonetic alphabet type shown below the name of the game is to remind the user of dictionaries/definitions because that is the primary thing most people accociate with the phonetic alphabet. This really drills the theme deep into the mind of the user. 

The website utilizes bootstrap to be friendly for any device and have relative text sizes. The navbar always shows and the page body fades in for every transition. the current page is highlighted on the navbar

--development description
development started by copying the flask mega tutorial (https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-i-hello-world). Once that was working we adapted it to our needs by adding the appropriate pages and basic functionality for testing. Halfway through development we realised that the unorganised css styling we were doing was not sustainable, so we completely reworked the all the html and css scripts to be bootstrap based. In development we also made a webscraper to automatically create a table with hundreds of puzzle data entries so we didn't have to manually copy and paste definitions for every word/day. This would be helpful if we were to use the website long term, but for the project we only needed test databases, it was not neccessary. Although the basic functionality of the game was working it was still very unpolished. It was easy to cheat and not a lot of important information was presented. Finally, we added many more snippets of code to make using the website easier.



--how to launch
in the terminal of your virtual environment type:
source venv/bin/activate

then to run the program every time type:
flask run

to stop running press:
^c (mac)
ctrl+c (windows)