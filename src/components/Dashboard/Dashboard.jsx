import React from "react";
import checkToken from "../loggedin";
import { fetchTodayOrders } from "../../app/features/orders";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchSuppliers } from "../../app/features/supplier";
import { fetchProducts } from "../../app/features/products";
import { fetchCustomers } from "../../app/features/customer";
import "./navbar.css";

const Dashboard = () => {
  useEffect(() => {
    checkToken();
  }, []);
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);
  const suppliers = useSelector((state) => state.suppliers.suppliers);
  const products = useSelector((state) => state.products.products);
  const customers = useSelector((state) => state.customers.customers);
  let tcust = customers.length;
  let tprod = products.length;
  let tsup = suppliers.length;
  let tord = orders.length;
  useEffect(() => {
    dispatch(fetchTodayOrders());
    dispatch(fetchSuppliers());
    dispatch(fetchProducts());
    dispatch(fetchCustomers());
  }, [dispatch]);
  return (
    <div className="cardscontainer">
      <div className="card" onClick={() => window.location.assign("/allorders")}>
        <div className="cardtitle">Today Total Orders</div>
        <div className="cardvalue">{tord}</div>
      </div>
      <div className="card" onClick={() => window.location.assign("/products")}>
        <div className="cardtitle">Total Products</div>
        <div className="cardvalue">{tprod}</div>
      </div>
      <div className="card" onClick={() => window.location.assign("/customers")}>
        <div className="cardtitle">Total Customers</div>
        <div className="cardvalue">{tcust}</div>
      </div>
      <div className="card" onClick={() => window.location.assign("/suppliers")}>
        <div className="cardtitle">Total Suppliers</div>
        <div className="cardvalue">{tsup}</div>
      </div>
    </div>
  );
};

export default Dashboard;
