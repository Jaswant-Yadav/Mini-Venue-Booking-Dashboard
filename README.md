# 🏨 Mini Venue Booking Dashboard

A simple web-based application where:

- **Venue owners (admins)** can view, add, and manage venues, including marking them unavailable for specific dates.
- **Users** can view available venues and make bookings.
- The system ensures automatic update of venue availability after booking.

---

## 🔧 Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js + Express
- **Database**: MongoDB with Mongoose
- **Deployment**: Vercel (Frontend), Render (Backend)

---

## 📂 Features

###  Venue Owner
- Add new venues with name, location, and capacity.
- View all venues.
- Block specific dates for maintenance or offline bookings.

### Admin Panel 
- View all venues.
- Block specific dates for maintenance or offline bookings.
- Delete venues

### User Panel
- View list of venues with capacity and location.
- Select a date to check availability.
- Book venue if the date is available.
- Booking auto-blocks the date to prevent double bookings.

---

## ⚙️ Backend API Endpoints

| Method | Endpoint                       | Description                         |
|--------|--------------------------------|-------------------------------------|
| GET    | `/api/venues`                 | Fetch all venues                    |
| POST   | `/api/venues`                | Add a new venue                     |
| POST   | `/api/venues/:id/block`      | Block/unblock specific date         |
| POST   | `/api/venues/:id/book`       | Book a venue if it's available      |

---

## 🚀 Setup Instructions

### 1. Clone the Repository

git clone https://github.com/Jaswant-Yadav/Mini-Venue-Booking-Dashboard.git
cd Mini-Venue-Booking-Dashboard


##  2. Install Backend Dependencies

cd backend
npm install

## 3. Run Backend Server

node index.js

## 4. install Frontend Dependencies

cd frontend
npm install

## 5. Run Frontend Server

npm start

## 6. Admin Login

username :- admin
password :- admin123

## 7. Owner Login

username :- owner
password :- owner123

