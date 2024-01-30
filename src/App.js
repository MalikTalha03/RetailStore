import "./App.css";
import Login from "./components/Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewOrder from "./components/Customer/NewOrder";
import OrderDetails from "./components/Customer/OrderDetails";
import SuppOrder from "./components/Supplier/SuppOrder";
import Drawer from "./components/Dashboard/Drawer";
import AllProducts from "./components/Supplier/AllProducts";
import AllOrders from "./components/Customer/AllOrders";
import NotFound from "./components/404/NotFound";
import AllCustomers from "./components/Customer/AllCustomers";
import AllSuppliers from "./components/Supplier/AllSuppliers";
import OnlineOrders from "./components/Customer/OnlineOrders";
import AllEmployees from "./components/Employee/AllEmployees";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
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
        <Route
          path="/allorders"
          element={
            <>
              <Drawer />
              <AllOrders />
            </>
          }
        />
        <Route
          path="/products"
          element={
            <>
              <Drawer />
              <AllProducts />
            </>
          }
        />
        <Route
          path="/customers"
          element={
            <>
              <Drawer />
              <AllCustomers />
            </>
          }
        />
        <Route
          path="/suppliers"
          element={
            <>
              <Drawer />
              <AllSuppliers />
            </>
          }
        />
        <Route
          path="/weborders"
          element={
            <>
              <Drawer />
              <OnlineOrders />
            </>
          }
        />
        <Route
          path="/"
          element={
            <>
              <Drawer />
              <Dashboard />
            </>
          }
        />
        <Route
          path="/employees"
          element={
            <>
              <Drawer />
              <AllEmployees />
            </>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
