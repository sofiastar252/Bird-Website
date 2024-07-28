# Bird-Project
Bird Sanctuary Website that uses the API Unsplash to fetch bird images and descriptions. The user can search up birds and favorite the images they like. In order to run the app, you have to open up the backend app.js which is the node.js and express fiiles and type in “npm start”. That’ll get the backend code running. And then you have to go to the frontend App.js which is React and also type in “npm start”. This will open up the localhost 3000 server and display both the frontend and backend on the app.

If you click the “x” in the search box, it’ll take you right back to the homepage. Or you can just click the title and it’ll take you back as well. So when you click the title, it brings you back to the starting page with the same images. 

I also added a refresh button which reaches the bird images on the page so they’re completely different now. And then if you just want to go back to the default images on the homepage, just click the title. 
You can refresh as many times are you want and it’ll generate new bird images. 

There’s a list from the backend server that shows the most common birds and a description of them. 
Also from the backend server, we have the Bird Sounds Gallery.
So if the user clicks on the play button, it’ll play the audio. As you can see, there’s 6 different types of audio. If you click the 3 dots, you can download the audio and change the playback speed.

Then, there’s the notes section. The NotesManager component in the app handles the basic operations of creating, reading, updating, and deleting notes (It’s also known as CRUD).

Finally, there’s a quiz on the bottom of the page, where the user can answer a random question about birds. It’ll tell them if their answer is correct or incorrect.


**1. Backend Setup (app.js):**
    * It’s a Node.js application
    * It requires necessary modules like express, cors, and path.
    * Sets up an Express server with const app = express();.
    * Uses middleware such as cors() to enable Cross-Origin Resource Sharing and express.static to serve static files. Cors allows the frontend to make requests to the backend server.
    * Defines the /api/bird-sounds endpoint and handles GET requests for bird sound data.
    * It manages data, such as defining arrays or objects containing information (like birdItems and birdSounds)
    * Responds to requests with JSON data containing information about bird sounds, including species, region, and paths to audio files.
    * It starts the Express server by calling app.listen(PORT, callback) to listen for incoming HTTP requests on the specified port.
  
**2. Frontend Interaction (App.js):**
    * Imports React, useState, useEffect, axios, and other necessary components and libraries.
    * Defines a functional component App that manages state using React hooks (such as useState and useEffect).
    * Uses useEffect to fetch data from the backend server (app.js) when the component mounts or when specific conditions trigger.
    * Utilizes Axios (axios.get) to make HTTP GET requests to the /api/bird-sounds endpoint on the backend.
    * It triggers a GET request to the backend server (app.js) at /api/bird-sounds.
    * The backend processes this request and responds with JSON data containing an array of bird sounds, each object in the array including information such as species, region, and audio file paths.
    * App.js receives this response data containing the bird sounds array.
    * Once App.js receives the bird sounds array from the backend, it maps over this array to render each bird sound as a list item (<li>).
    * For each bird sound, it renders an AudioPlayer component passing the audio file path (src) as a prop to the AudioPlayer.
    * The AudioPlayer component receives the audio file path (src) as a prop from App.js.
    * When the user interacts with the UI (such as clicking play or pause), the AudioPlayer component loads and plays the corresponding audio file.
    * Users is able to see a list of bird sounds displayed on the frontend.
    * Each bird sound in the list is accompanied by an audio player, which is implemented by AudioPlayer component.


This process allows the frontend application to dynamically fetch birdItems which is a list of their names and descriptions, as well as fetching audio information from the backend server and integrating audio playback functionality for users.

The user can manage and store notes within the app (add, remove, & submit notes). There’s a mini-quiz that generates a random question. It uses the FormData API to include relevant information such as the question, user's answer, and the status of the answer (if it is correct or incorrect).

I was able to use both React and node.js, specifically Express and Cors. For Frontend, we have the React App. But some of the things are displayed through backend. For instance, the Bird Descriptions at the bottom of the page are because I used Express and Cors. And I got the bird audios by using the backend.

Birds are one of my favorite animals because they are so colorful and beautiful. I had a fun time making it this and I hope you enjoyed it too. Thank you so much! :)
