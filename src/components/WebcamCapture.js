
import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import FaceOverlay from './FaceOverlay';
import '../index.css';

const WebcamCapture = () => {
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [faces, setFaces] = useState([]);
  const [error, setError] = useState('');
  const [num,setNum]=useState(0);

  const capture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);

    const base64Response = await fetch(imageSrc);
    const blob = await base64Response.blob();

    const formData = new FormData();
    formData.append('image', blob);

    try {
      const response = await axios.post('https://api.api-ninjas.com/v1/facedetect', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-Api-Key': 'WnM3Ttvr831dO5VnOI5lHw==n7wJz28nxDyOGzyN' 
        }
      });
      setFaces(response.data);
      console.log(response.data);
      setNum(response.data.length);
      setError('');
    } catch (error) {
      console.error("There was an error making the request:", error);
      if (error.response) {
        alert(`Error: ${error.response.data.message || error.response.statusText}`);
        setError(`Error: ${error.response.data.message || error.response.statusText}`);
      } else {
        alert("An error occurred while uploading the image");
        setError("An error occurred while uploading the image");
      }
    }
  };

  return (
    <div className="App">
      <h1>Face Detection React Webapp</h1>
      <div className="webcam-container">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={640}
          height={480}
        />
        <FaceOverlay faces={faces} />
      </div>
      <p style={{fontSize: "x-large",
  fontWeight: "bold"}}>{num} faces detected</p>
      <button onClick={capture}>Detect faces</button>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {num==0 && <p style={{color:'red', fontSize: 'large'}}>No faces detected</p>}
    </div>
  );
};

export default WebcamCapture;
