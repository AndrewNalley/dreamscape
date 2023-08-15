import React, { useState, useEffect } from 'react';

function PoetryAPI() {
  const [poems, setPoems] = useState({
    title: '',
    lines: [],
  });
  const [savedPoem, setSavedPoems] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(false);

  useEffect(() => {
    if (buttonClicked) {
      async function fetchPoem() {
        try {
          const response = await fetch('https://poetrydb.org/random/1/author,title,lines');
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const data = await response.json();
          const fetchedPoem = data[0];
          setPoems(fetchedPoem);
        } catch (error) {
          console.error('Error:', error);
        }
      }

      fetchPoem();
    }
  }, [buttonClicked]);

  const handleSave = () => {
    if (poems.title && poems.lines.length > 0) {
      const savedPoem = {
        title: poems.title,
        lines: poems.lines,
      };
      console.log('You saved this poem: ', savedPoem)
      setSavedPoems(prevSavedPoems => [...prevSavedPoems, savedPoem]);
    }
  };
  console.log(poems);
  


  return (
    <div>
      <h1>Random Poem</h1>
      <button onClick={() => setButtonClicked(true)}>New Poem</button>
      <button onClick={handleSave}>Save Poem</button>
      <div className="poem-card">
        <h2>{poems.title}</h2>
        {poems.lines.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
    </div>
  );
}

export default PoetryAPI;