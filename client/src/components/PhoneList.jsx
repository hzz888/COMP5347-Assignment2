import React, { useState, useEffect } from 'react';

function fetchJsonObject(path) {
  return fetch(path)
    .then(response => response.json())
    .then(json =>{ console.log(json);
      return json})
    .catch(error => console.log(error));
}

function PhoneList() {
  const [phones, setPhones] = useState([]);

  useEffect(() => {
    fetchJsonObject('http://localhost:3001/phones/api/phones')

      .then(data => setPhones(data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      <h1>Phone List</h1>
      <ul>
        {phones.map(phone => (
          <li key={phone._id}>{phone.title} {phone.price}</li>
        ))}
      </ul>
    </div>
  );
}



export default PhoneList;
