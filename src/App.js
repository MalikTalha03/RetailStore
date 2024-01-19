import "./App.css";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewOrder from "./components/Customer/NewOrder";
import OrderDetails from "./components/Customer/OrderDetails";
import SuppOrder from "./components/Supplier/SuppOrder";
import Drawer from "./components/Dashboard/Drawer";
import AllProducts from "./components/Supplier/AllProducts";
import AllOrders from "./components/Customer/AllOrders";
import RefundOrder from "./components/Customer/RefundOrder";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/neworder"
          element={
            <>
              <Drawer />
              <NewOrder />
            </>
          }
        />
        <Route
          path="/orderdetail"
          element={
            <>
              <Drawer />
              <OrderDetails />
            </>
          }
        />
        <Route
          path="/suporder"
          element={
            <>
              <Drawer />
              <SuppOrder />
            </>
          }
        />
        <Route path="/allorders" element={
          <>
            <Drawer />
            <AllOrders />
          </>
        } />
        <Route path="/products" element={
          <>
            <Drawer />
            <AllProducts />
          </>
        } />
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
