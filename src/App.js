import React, { useState } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import CircularWithValueLabel from './components/CircularWithValueLabel';
import MenuAppBar from './components/MenuAppBar';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // Import CheckCircleIcon from the same package

import { styled } from '@mui/system';
import SendIcon from '@mui/icons-material/Send';
import './App.css'

const Input = styled('input')({
  display: 'none',
});

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [age, setAge] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(null);
  const [uploaded, setUploaded] = useState(null);

  const handleFileChange = (event) => {
    setUploaded(true);
    setSelectedFile(event.target.files[0]);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) return;

    setLoading(true);

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
    setLoading(false);
    setUploaded(false);
  }
  return (
    <Box sx={{ position: 'relative', height: '100vh', width: '100%'}}>
      {/* <h1>Age Estimation</h1>
      <form onSubmit={handleSubmit}>
        <input type='file' onChange={handleFileChange} />
        <button type='submit'>Predict Age</button>
      </form> */}
      {/* Fixed Container for Background Image */}
      <Box
        sx={{
          position: 'relative',
          height: '40%',
          width: '100%',
          overflow: 'hidden', // Ensures zoomed image doesn't overflow the container
          boxSizing: 'border-box',
        }}
      >
        <Box
          component="img"
          src={'/background-pic.jpg'}
          alt="Background"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover', // Ensures the image covers the container
            animation: 'zoomIn 10s ease-in-out infinite',
            boxSizing: 'border-box',
          }}
        />
        {/* Header */}
        {/* <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            padding: 1.5,
            backgroundColor: 'rgba(0, 0, 0, 0)', // Semi-transparent background
            color: 'white',
            zIndex: 1, // Ensures the header is on top of the image
            boxSizing: 'border-box',
          }}
        >
          <Typography fontFamily='sans-serif'>Age Estimation</Typography>
        </Box> */}
        <MenuAppBar />
      </Box>
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant='h3' component='h1' fontFamily='sans-serif' gutterBottom>
          Age Estimation
        </Typography>
        <Typography variant='body' component='body' fontFamily='sans-serif' sx={{mx:4}} gutterBottom>
        Try Out Our Age Prediction Model! <br/>

Upload a selfie to see how our simple CNN model estimates your age. This model has around 6,000 parameters and provides quick predictions based on your uploaded image.        </Typography>
        <form onSubmit={handleSubmit}>
          <label htmlFor='upload-photo'>
            <Input
              accept='image/*'
              id='upload-photo'
              type='file'
              onChange={handleFileChange} 
            />
            <Button
              variant="contained"
              color={uploaded ? "success" : "primary"}
              component="span"
              startIcon={uploaded ? <CheckCircleIcon /> : <CloudUploadIcon />}
              sx={{ margin: 1 }}
            >
              {uploaded ? 'Uploaded' : 'Upload'}
            </Button>
          </label>
          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              endIcon={<SendIcon />}
              sx={{ margin: 1 }}
              type='submit'
              disabled={loading}
            >
              Predict Age
            </Button>
          </Box>
        </form>
      </Box>

      {loading && <CircularWithValueLabel sx={{ mt: 2 }} />}
      {/* {image && <img src={image} alt='age_image' />} */}
      {/* {age && <p>It looks like you are {parseFloat(age).toFixed(1)} years old!</p>} */}
      { age && 
        <Box sx={{ mt: 4, textAlign: 'center'}}>
          <img src={image} alt='age-image' style={{ maxWidth: '100%' }}/>
          <Typography>It looks like you are {parseFloat(age).toFixed(1)} years old!</Typography>
        </Box>}
    </Box>
  )
}

export default App;
