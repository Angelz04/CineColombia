// endpoint.jsx
import  { useState, useEffect } from 'react';

const CardEndPoint = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/carousel')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return data;
};

export default CardEndPoint;

