const express = require("express");
const cors = require("cors");
const path = require('path'); 

const app = express(); //Creates an instance of Express application
const PORT = process.env.PORT || 8080;

app.use(cors()); //Allows for node.js and React to share data & work together
app.use(express.static(path.join(__dirname, 'public')));
const birdItems = [
  {
    name: "Blue Jay",
    description: "A beautiful blue bird often found in North America.",
  },
  {
    name: "Eagle",
    description: "A majestic bird of prey known for its powerful flight.",
  },
  {
    name: "Robin",
    description: "A small bird with a red breast, commonly seen in gardens.",
  },
  {
    name: "Sparrow",
    description: "A small, brown bird often found in urban areas.",
  },
  {
    name: "Pigeon",
    description: "A common city bird known for its gray feathers.",
  },
  {
    name: "Cardinal",
    description: "A bright red bird often seen in trees and bushes.",
  },
  {
    name: "Crow",
    description: "A large, black bird known for its intelligence.",
  },
  {
    name: "Dove",
    description: "A symbol of peace, often seen in parks and gardens.",
  },
  {
    name: "Hummingbird",
    description: "A tiny bird known for its rapid wing beats and colorful plumage.",
  },
  {
    name: "Pelican",
    description: "A large water bird with a distinctive pouch under its beak.",
  },
  {
    name: "Owl",
    description: "A nocturnal bird of prey known for its silent flight and keen senses.",
  },
  {
    name: "Hawk",
    description: "A bird of prey with sharp talons and excellent vision.",
  },
  {
    name: "Swan",
    description: "A graceful water bird known for its long neck and elegant movements.",
  },
  {
    name: "Woodpecker",
    description: "A bird with a strong beak used for drumming on trees to find insects.",
  },
  {
    name: "Seagull",
    description: "A coastal bird known for scavenging and flying effortlessly over water.",
  },
  {
    name: "Penguin",
    description: "A flightless bird found in cold climates, known for its tuxedo-like appearance.",
  },
  {
    name: "Parrot",
    description: "A colorful bird with the ability to mimic human speech.",
  },
  {
    name: "Kingfisher",
    description: "A bird often found near water, known for its fast dives to catch fish.",
  },
  {
    name: "Emu",
    description: "A large flightless bird native to Australia, known for its speed and agility.",
  },
  {
    name: "Flamingo",
    description: "A tall wading bird with pink feathers and a distinctive curved beak.",
  },
];

const birdSounds = [
  { species: "Blue Jay", region: "North America", path: "/sounds/bluejay.mp3" },
  { species: "Jungle Bird", region: "Amazon Rainforest", path: "/sounds/jungle.mp3" },
  { species: "Mourning Dove", region: "United States", path: "/sounds/mourningdove.mp3" },
  { species: "Raven", region: "Worldwide", path: "/sounds/raven.mp3" },
  { species: "Different Birds in Nature", region: "Various", path: "/sounds/nature.mp3" },
  { species: "Many Birds in Rainforest", region: "Rainforest", path: "/sounds/rainforest.mp3" },
];

app.get("/api/items", (req, res) => {
  res.send(birdItems);
});

app.get("/api/bird-sounds", (req, res) => {
  res.json(birdSounds);
});

app.listen(PORT, () => console.log("Server started"));