import React from "react";

const HomePage = () => {
    return (
        <div className="home">
            <h1>Welcome to Mini Venue Booking</h1>
            <button><a href='/login'>Login</a></button>
            <br /><br />
            <button><a href='/user'>User Booking</a></button>

        </div>
    )
};

export default HomePage;