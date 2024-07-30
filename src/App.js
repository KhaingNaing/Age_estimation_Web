import React, { useState } from 'react';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [age, setAge] = useState(null);
  const [image, setImage] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setImage(data.image);
      setAge(data.age);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  return (
    <div className='App'>
      <h1>Age Estimation</h1>
      <form onSubmit={handleSubmit}>
        <input type='file' onChange={handleFileChange} />
        <button type='submit'>Predict Age</button>
      </form>
      {image && <img src={image} alt='age_image' />}
      {age && <p>You are {parseFloat(age).toFixed(1)} years old!</p>}
    </div>
  )
}

export default App;
