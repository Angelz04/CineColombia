import { useState, useEffect } from 'react';

const CinemasEndPoint = () => {
  const [cinemasData, setCinemasData] = useState({});

  useEffect(() => {
    fetch('http://localhost:3000/cinemas')
      .then(response => response.json())
      .then(data => {
        setCinemasData(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return cinemasData;
};

export default CinemasEndPoint;
