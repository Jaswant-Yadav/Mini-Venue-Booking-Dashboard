import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OwnerDashboard = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [capacity, setCapacity] = useState('');
  const [venues, setVenues] = useState([]);
  const [blockDate, setBlockDate] = useState('');

  const fetchVenues = async () => {
    const res = await axios.get('https://back-end-barl.onrender.com/api/venues', {
      withCredentials: true,
    });
    setVenues(res.data);
  };

  useEffect(() => {
    fetchVenues();
  }, []);

  const addVenue = async () => {
    // Basic validation for required fields
    if (!name.trim() || !location.trim() || !capacity) {
      alert("Please fill in all required fields (Name, Location, Capacity).");
      return;
    }

    const parsedCapacity = parseInt(capacity, 10);

    if (isNaN(parsedCapacity) || parsedCapacity <= 0) {
      alert("Capacity must be a valid positive number.");
      return;
    }

    try {
      const result = await axios.post(
        "https://back-end-barl.onrender.com/api/venues",
        {
          name: name.trim(),
          location: location.trim(),
          capacity: parsedCapacity,
          unavailableDates: blockDate ? [blockDate] : [],
        },
        {
          withCredentials: true,
        }
      );

      // Clear inputs on success
      setName("");
      setLocation("");
      setCapacity("");
      setBlockDate("");
      fetchVenues();
      console.log(result);
    } catch (error) {
      console.error("Error adding venue:", error.response?.data || error.message);
      alert(
        "Failed to add venue: " +
        (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div className='owner'>
      <h2>Owner Dashboard</h2>

      <div className='table'>
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} /><br /><br />
        <input placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} /><br /><br />
        <input placeholder="Capacity" type="number" value={capacity} onChange={e => setCapacity(e.target.value)} />


        <br /><br />
        <label>Block Date:- </label>
        <input type="date" value={blockDate} onChange={e => setBlockDate(e.target.value)} />
        <br /><br />

        <button onClick={addVenue}>Add Venue</button>
        <br /><br />

        <ul>
          <li>Sr. No</li>
          <li>Name</li>
          <li>Location</li>
          <li>Capacity</li>
          <li>Unavailable Date</li>
        </ul>

        {venues.length > 0 ? (
          venues.map((item, index) => (
            <ul key={item._id || index}>
              <li>{index + 1}</li>
              <li>{item.name}</li>
              <li>{item.location}</li>
              <li>{item.capacity}</li>
              <li>{item.unavailableDates?.join(', ') || 'available'}</li>

            </ul>
          ))
        ) : (
          <p>No venues found</p>
        )}
      </div>
      <br /><br />
      <button><a href='/'>Logout</a></button>
    </div>
  );
};

export default OwnerDashboard;
