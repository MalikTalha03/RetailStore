import './App.css';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NewOrder from './components/Orders/NewOrder';
import OrderDetails from './components/Orders/OrderDetails';
import SuppOrder from './components/Supplier/SuppOrder';
import Drawer from './components/Dashboard/Drawer';
import Orders from './components/Orders/Orders';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Drawer />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/neworder" element={<NewOrder />} />
        <Route path="/orderdetail" element={<OrderDetails />} />
        <Route path="/suporder" element={<SuppOrder/>} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
