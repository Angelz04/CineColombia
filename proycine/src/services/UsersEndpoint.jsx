import { useState, useEffect } from 'react';

const UsersEndpoint = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/usuario')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  return users;
};

export default UsersEndpoint;
