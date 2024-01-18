import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodayOrders } from "../../app/features/orders";
import * as FaIcons from "react-icons/fa";
import "./css/orders.css";
import Pdf from "./Pdf";
import checkToken from "../loggedin";

const Orders = () => {
  checkToken();
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);
  const status = useSelector((state) => state.orders.status);
  const error = useSelector((state) => state.orders.error);

  useEffect(() => {
    dispatch(fetchTodayOrders());
  }, [dispatch]);

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setOpen(true);
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="orders-container">
      <h2>Today's Orders</h2>
      <table className="orders-table">
        <tbody>
          {orders.map((order, index) => (
            <tr key={order.order._id}>
              <td>{index + 1}</td>
              <td>{order.customerName}</td>
              <td>{new Date(order.order.orderDate).toLocaleTimeString()}</td>
              <td>
                <FaIcons.FaFilePdf
                  size={20}
                  style={{ color: "red", cursor: "pointer" }}
                  onClick={() => handleOrderClick(order)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {open && <Pdf order={selectedOrder} setOpen={setOpen} />}
    </div>
  );
};

export default Orders;
