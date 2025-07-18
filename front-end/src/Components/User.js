import React, { useState, useEffect } from 'react';
import axios from 'axios';

const User = () => {
    const [venues, setVenues] = useState([]);
    const [bookedVenues, setBookedVenues] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [user, setUser] = useState('');

    const fetchVenues = async () => {
        const res = await axios.get('http://localhost:5000/api/venues');
        setVenues(res.data);
        setBookedVenues([]); // reset on every fetch
    };

    useEffect(() => {
        fetchVenues();
    }, []);

    const bookVenue = async (venueId) => {
        if (!selectedDate || !user) return alert("Date and User required");
        try {
            await axios.post(`http://localhost:5000/api/venues/${venueId}/book`, {
                date: selectedDate,
                user,
            });
            alert("Booking successful");

            // Find the booked venue and move to booked list
            const booked = venues.find(v => v._id === venueId);
            setBookedVenues(prev => [...prev, booked]);

            // Remove it from available venues
            setVenues(prev => prev.filter(v => v._id !== venueId));
        } catch (e) {
            alert(e.response?.data?.error || "Booking failed");
        }
    };

    return (
        <div className='table'>
            <h2>User Panel</h2>
            <input placeholder="Your Name" value={user} onChange={e => setUser(e.target.value)} />
            <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} />

            <h4>Available Venues</h4>
            <ul>
                <li>Sr. No</li>
                <li>Name</li>
                <li>Location</li>
                <li>Capacity</li>
                <li>Unavailable Dates</li>
                <li>Operation</li>
            </ul>

            {venues.length > 0 ? (
                venues.map((item, index) => (
                    <ul key={item._id || index}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>{item.location}</li>
                        <li>{item.capacity}</li>
                        <li>{item.unavailableDates?.join(', ') || 'available'}</li>
                        <li>
                            {item.unavailableDates.includes(selectedDate) ? (
                                <span style={{ color: 'red' }}>Unavailable</span>
                            ) : (
                                <button onClick={() => bookVenue(item._id)}>Book</button>
                            )}
                        </li>
                    </ul>
                ))
            ) : (
                <p>No venues found</p>
            )}

            {bookedVenues.length > 0 && (
                <>
                    <h4>🎉 Booked Venues</h4>
                    <ul>
                        <li>Sr. No</li>
                        <li>Name</li>
                        <li>Location</li>
                        <li>Capacity</li>
                        <li>Booked Dates</li>
                    </ul>

                    {bookedVenues.map((item, index) => (
                        <ul key={item._id || index}>
                            <li>{index + 1}</li>
                            <li>{item.name}</li>
                            <li>{item.location}</li>
                            <li>{item.capacity}</li>
                            <li>{selectedDate}</li>
                        </ul>
                    ))}
                </>
            )}
        </div>
    );
};

export default User;
