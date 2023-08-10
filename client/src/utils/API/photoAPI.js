import React, { useState, useEffect } from 'react';

const key = '38637564-c5454e1bc9b01e325fa8d9305'

const PixabaySearch = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPixabayData = async () => {
      try {
        const response = await fetch(
          `https://pixabay.com/api/?key=${key}&q=${encodeURIComponent('nature')}&image_type=photo&category=nature+places&safesearch=true`
        );

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
          }

        const data = await response.json();
        
        if (data.hits.length > 0) {
          setPhotos(data.hits);
        } else {
          console.log('No hits');
        }
      } catch (error) {
        console.error('Error fetching Pixabay data:', error);
      }
    };

    fetchPixabayData();
  }, []);

  return (
    <div>
      <h1>Pixabay Photos</h1>
      <div className="photo-grid">
        {photos.map((photo, index) => (
          <img
            key={index}
            src={photo.webformatURL}
            alt={`Pixabay ${index}`}
          />
        ))}
      </div>
    </div>
  );
};

export default PixabaySearch;
