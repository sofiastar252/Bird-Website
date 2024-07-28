import React, { useState, useEffect } from 'react';
import axios from 'axios';
import backgroundImage from './Sky.jpg';
import './style.css';
import FunFactsForm from './FunFactsForm';
import NotesManager from './NotesManager';
import './NotesManager.css';

// AudioPlayer Component
const AudioPlayer = ({ src, isPlaying, onTogglePlay }) => {
  return (
    <div>
      <audio
        controls
        src={src} 
        onPlay={() => onTogglePlay(true)}
        onPause={() => onTogglePlay(false)}
      >
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

function App() {
  const [search, setSearch] = useState('');
  const [birdImages, setBirdImages] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showWithDescription, setShowWithDescription] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [grayscaleLevel, setGrayscaleLevel] = useState(0);
  const [birdItems, setBirdItems] = useState([]);
  const [birdSounds, setBirdSounds] = useState([]);
  const [selectedSound, setSelectedSound] = useState(null);
  const [audioSrc, setAudioSrc] = useState(null);
  const [audioDuration, setAudioDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false); 

  useEffect(() => {
    const fetchBirdImages = async () => {
      setIsLoading(true);
      try {
        let query = 'bird';
        if (search.trim()) {
          query += ` ${search.trim()}`;
        }
        const response = await axios.get('https://api.unsplash.com/search/photos', {
          params: {
            query: query,
            per_page: 20,
            client_id: '4GniCvmTYibDrrna0zYzmFULv4UXv2GL5vMAqylCbPE',
          },
        });
        const birdImageData = response.data.results;
        setBirdImages(birdImageData);
      } catch (error) {
        console.error('Error fetching bird images:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBirdImages();
  }, [search]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites'));
    if (storedFavorites) {
      setFavorites(storedFavorites);
    }
  }, []);

  const handleFavorite = (photo) => {
    const existingIndex = favorites.findIndex((fav) => fav.id === photo.id);
    if (existingIndex === -1) {
      const updatedFavorites = [...favorites, photo];
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } else {
      const updatedFavorites = favorites.filter((fav) => fav.id !== photo.id);
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
  };

  const handleFilterWithDescription = () => {
    setShowWithDescription(!showWithDescription);
  };

  const handleRefresh = async () => {
    setSearch('');
    setIsLoading(true);
    try {
      const response = await axios.get('https://api.unsplash.com/photos/random', {
        params: {
          query: 'bird',
          count: 20,
          client_id: '4GniCvmTYibDrrna0zYzmFULv4UXv2GL5vMAqylCbPE',
        },
      });
      const randomBirdImages = response.data;
      setBirdImages(randomBirdImages);
    } catch (error) {
      console.error('Error fetching random bird images:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGrayscaleChange = (e) => {
    setGrayscaleLevel(Number(e.target.value));
  };

  const handleFunFactsSubmit = (answer) => {
    console.log('User submitted answer:', answer);
  };

  useEffect(() => {
    const fetchBirdItems = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/items');
        setBirdItems(response.data);
      } catch (error) {
        console.error('Error fetching bird items:', error);
      }
    };

    fetchBirdItems();
  }, []);

  useEffect(() => {
    const fetchBirdSounds = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/bird-sounds');
        setBirdSounds(response.data);
      } catch (error) {
        console.error('Error fetching bird sounds:', error);
      }
    };

    fetchBirdSounds();
  }, []);

  useEffect(() => {
    if (selectedSound) {
      setAudioSrc(`http://localhost:8080${selectedSound.path}`);
      setIsPlaying(true); // Auto-play when sound is selected
    }
  }, [selectedSound]);

  useEffect(() => {
    if (audioSrc) {
      const audio = new Audio(audioSrc);
      audio.addEventListener('loadedmetadata', () => {
        setAudioDuration(audio.duration);
      });
      if (isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  }, [audioSrc, isPlaying]);

  const handleTogglePlay = (srcs) => {
    setIsPlaying(!isPlaying);
  
    // Array of Audio elements for each source
    const audioElements = srcs.map((src) => new Audio(src));
  
    // Play or pause each audio element based on the isPlaying state
    audioElements.forEach((audio) => {
      if (isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    });
  };   
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    filter: `grayscale(${grayscaleLevel}%)`,
  };

  return (
    <div className="app" style={backgroundStyle}>
      <div className="header">
        <h1>
          <a href="/"> {isLoading ? 'Loading Random Bird Images' : 'Bird Sanctuary'} </a>
        </h1>
        <div className="search-box">
          <input
            type="search"
            placeholder="Search for birds"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button onClick={handleRefresh} className="refresh-btn">
          Refresh
        </button>
        <button onClick={handleFilterWithDescription}>
          {showWithDescription ? 'Hide Description' : 'Show Description'}
        </button>
        <input
          type="range"
          min="0"
          max="100"
          value={grayscaleLevel}
          onChange={handleGrayscaleChange}
          className="grayscale-slider"
        />
      </div>

      <div className="container">
        <div className="anime-row">
          <h2 className="text-heading">Bird Images</h2>
          <div className="row">
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              birdImages.map((birdImage) => (
                <div key={birdImage.id} className="bird-image">
                  <img className="bird-img" src={birdImage.urls.small} alt="Bird" />
                  {showWithDescription && (
                    <div className="image-description">
                      {birdImage.alt_description || 'Description not available'}
                    </div>
                  )}
                  <button onClick={() => handleFavorite(birdImage)} className="favorite-btn">
                    {favorites.some((fav) => fav.id === birdImage.id)
                      ? 'Remove from Favorites'
                      : 'Add to Favorites'}
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="favorites-container">
        <h2 className="text-heading">Favorites</h2>
        <div className="favorites-row">
          {favorites.map((favorite) => (
            <div key={favorite.id} className="favorite-image">
              <img className="favorite-img" src={favorite.urls.small} alt="Bird" />
              <p>{favorite.alt_description || 'Description not available'}</p>
              <button onClick={() => handleFavorite(favorite)} className="remove-favorite-btn">
                Remove from Favorites
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bird-items centered">
        <h2>Most Common Birds</h2>
        <ul><br />
          {birdItems.map((item, index) => (
            <li key={index}>
              <strong>{item.name}</strong>: {item.description}
            </li>
          ))}
        </ul>
      </div>

      <div className="bird-sounds-container centered">
        <h2><br /> Bird Sounds Gallery</h2>
        <ul>
          {birdSounds.map((sound, index) => (
            <li key={index}>
              <br /> <strong>Species:</strong> {sound.species} | <strong>Region:</strong> {sound.region}
              <AudioPlayer src={sound.path} isPlaying={isPlaying} onTogglePlay={handleTogglePlay} /> 
            </li>
          ))}
        </ul>
      </div>
      <NotesManager />
      <FunFactsForm onSubmit={handleFunFactsSubmit} />
    </div>
  );
}

export default App;
