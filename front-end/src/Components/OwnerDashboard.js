import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OwnerDashboard = () => {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [capacity, setCapacity] = useState('');
    const [venues, setVenues] = useState([]);
    const [blockDate, setBlockDate] = useState('');

    const fetchVenues = async () => {
        const res = await axios.get('http://localhost:5000/api/venues', {
            withCredentials: true,
        });
        setVenues(res.data);
    };

    useEffect(() => {
        fetchVenues();
    }, []);

    const addVenue = async () => {
        let result = await axios.post('http://localhost:5000/api/venues', {
            name,
            location,
            capacity: parseInt(capacity),
            unavailableDates: blockDate ? [blockDate] : [],
        }, {
            withCredentials: true,
        });

        setName('');
        setLocation('');
        setCapacity('');
        setBlockDate('')
        fetchVenues();
        console.log(result);
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
        </div>
    );
};

export default OwnerDashboard;
