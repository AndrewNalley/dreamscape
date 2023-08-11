import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PoetryAPI() {
  const [poems, setPoems] = useState([]);

  useEffect(() => {
    axios.get('https://poetrydb.org/author,linecount/Shakespeare;14/lines')
      .then(response => {
        const fetchedPoems = response.data;
        const randomPoems = [];

        for (let i = 0; i < 5; i++) {
          const randomPoem = fetchedPoems[Math.floor(Math.random() * fetchedPoems.length)];
          randomPoems.push(randomPoem.lines.join('\n')); 
        }

        setPoems(randomPoems);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <div>
      <h1>Random Shakespearean Sonnets</h1>
      {poems.map((poem, index) => (
        <div key={index}>
          <h2>Poem {index + 1}</h2>
          <pre>{poem}</pre>
        </div>
      ))}
    </div>
  );
}

export default PoetryAPI;