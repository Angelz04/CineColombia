// endpoint.jsx
import  { useState, useEffect } from 'react';

const ScheduleEndPoint = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/cinemas')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return data;
};

export default ScheduleEndPoint;

