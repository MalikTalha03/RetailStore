import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NewOrder from './components/Orders/NewOrder';
import OrderDetails from './components/Orders/OrderDetails';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/neworder" element={<NewOrder />} />
        <Route path="/orderdetail" element={<OrderDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
