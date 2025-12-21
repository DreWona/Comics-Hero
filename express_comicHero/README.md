# Comics-Hero
This is a repo for INST377 final project. A  website dealing with comics and superheros
# Title: Comic Heros

# Description of your project
- This project focuses on comic and super heros that most of us have grown up loving and want to learn more about.
- You can search and learn stats about characters like batman, superman or spiderman and the less know superheroes

# Description of target browsers (iOS? Android? Which ones?)
- This webpage is meant to run mainly on desktops or ios devices.

# Link to Developer Manual
## How to install your application and all dependencies
- Express:
- Nodemon:
- Dotenv: npm install dotenv
- Supabase: npm install @supabase/supabase-js
## How to run your application on a server
-  To Start: npm start
## How to run any tests you have written for your software
- TO show all the heros that are store in the supabased DB
    - comment out the loadSavedHeroes(); in project_her.js
    - Its bad db practice for security but this is a superhero website
## The API for your server application - all GET, POST, PATCH, etc endpoints, and what they each do

- get /api/heroes/search/:name   && app.get'/api/heroes/:id
    - This Retrieves the superhero name from the search form in the web frontpage
    - It makes a call to suerhero api using the stored key to get the data assocoiated with the hero name or id
- post /api/heroes/save
    - Saves the data from multiple endpoints to my supabased data table. combining multiple endpoints to one DB usising remmapped keys to expected object in the superhero api referenc edoc.
- 
## A clear set of expectations around known bugs and a road-map for future development.
- Issues with imgage rendering in the front page

# Links to resources
- https://darkmodejs.learn.uno/
- https://kenwheeler.github.io/slick/

- https://emojipedia.org/bat
- https://icons8.com/icon/61992/batman
- https://getcssscan.com/css-buttons-examples 

- https://superheroapi.com/ids.html


# Real git issue
- so i had stared out with base html css and js. I watched the professor video to set up express server.
- time to deploy an di realised vercel doesnt support html

- If you need the .env plz lmk because this messed up my whole plan

- ggs im losign my mind, Render wont deploy my repo