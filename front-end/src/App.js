import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './Components/HomePage';
import Login from './Components/Login';
import AdminDashboard from './Components/AdminDashboard';
import User from './Components/User';
import OwnerDashboard from './Components/OwnerDashboard';

function App() {
  return (
    <BrowserRouter>
  <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<Login />} />
      <Route path='/admindashboard' element={<AdminDashboard />} />
      <Route path='/ownerdashboard' element={<OwnerDashboard />} />
      <Route path='/user' element={<User />} />

      <Route path="*" element={<HomePage />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
