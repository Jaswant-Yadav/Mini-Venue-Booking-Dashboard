import { useEffect, useState } from 'react';

const AdminDashboard = () => {
  const [venues, setVenues] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState('');
  const [newDate, setNewDate] = useState('');

  useEffect(() => {
    getVenues();
  }, []);

  const getVenues = async () => {
    let result = await fetch('https://back-end-barl.onrender.com/api/venues', {
      headers: { "Content-Type": "application/json" }
    });
    result = await result.json();
    setVenues(result);
  };

  const deleteVenue = async (id) => {
    try {
      const response = await fetch(`https://back-end-barl.onrender.com/api/venues/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      });

      if (!response.ok) {
        const errorText = await response.text(); // get raw message if not JSON
        console.error('Delete failed:', errorText);
        return;
      }

      const result = await response.json();
      if (result) getVenues();
    } catch (err) {
      console.error("Delete error:", err.message);
    }
  };


  const blockDate = async () => {
    if (!selectedVenue || !newDate) return alert("Select venue and date");
    try {
      const res = await fetch(`https://back-end-barl.onrender.com/api/venues/${selectedVenue}/availability`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: newDate })
      });
      await res.json();
      alert("Date blocked");
      setNewDate('');
      setSelectedVenue('');
      getVenues();
    } catch (err) {
      alert("Failed to block date");
    }
  };

  return (
    <div className='table'>
      <h1>Admin Dashboard</h1>

      <div>
        <select value={selectedVenue} onChange={e => setSelectedVenue(e.target.value)}>
          <option value="">Select Venue</option>
          {venues.map(v => (
            <option key={v._id} value={v._id}>{v.name}</option>
          ))}
        </select><br /><br />
        <input type="date" value={newDate} onChange={e => setNewDate(e.target.value)} /><br /><br />
        <button onClick={blockDate}>Block Date</button>
      </div>

      <ul>
        <li>Sr. No</li>
        <li>Name</li>
        <li>Location</li>
        <li>Capacity</li>
        <li>Booked Dates</li>
        <li>Operation</li>
      </ul>

      {venues.length > 0 ? (
        venues.map((item, index) => (
          <ul key={item._id || index}>
            <li>{index + 1}</li>
            <li>{item.name}</li>
            <li>{item.location}</li>
            <li>{item.capacity}</li>
            <li>{item.unavailableDates?.join(', ') || 'Available'}</li>
            <li>
              <button onClick={() => deleteVenue(item._id)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                  className="bi bi-trash3" viewBox="0 0 16 16">
                  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 
                    0 0 1 .5-.5M11 2.5v-1A1.5 1.5 
                    0 0 0 9.5 0h-3A1.5 1.5 
                    0 0 0 5 1.5v1H1.5a.5.5 
                    0 0 0 0 1h.538l.853 
                    10.66A2 2 0 0 0 4.885 
                    16h6.23a2 2 0 0 0 
                    1.994-1.84l.853-10.66h.538a.5.5 
                    0 0 0 0-1zm1.958 
                    1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 
                    1 0 0 1-.997-.92L3.042 
                    3.5zm-7.487 1a.5.5 0 0 1 
                    .528.47l.5 8.5a.5.5 0 0 
                    1-.998.06L5 5.03a.5.5 0 
                    0 1 .47-.53Zm5.058 
                    0a.5.5 0 0 1 .47.53l-.5 
                    8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 
                    0 0 1 .528-.47M8 4.5a.5.5 
                    0 0 1 .5.5v8.5a.5.5 0 0 1-1 
                    0V5a.5.5 0 0 1 .5-.5" />
                </svg>
              </button>
            </li>
          </ul>
        ))
      ) : (
        <p>No venues found</p>
      )}
      <br /><br />
      <button><a href='/'>Logout</a></button>
    </div>
  );
};

export default AdminDashboard;
