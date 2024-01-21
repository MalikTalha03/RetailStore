import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import "./order.css";
import "../Customer/css/neworder.css";
import { useSelector } from "react-redux";

const ConfirmationDialog = (props) => {
  const selectedSupplier = useSelector(
    (state) => state.suppliers.selectedSupplier
  );
  const orderData = useSelector((state) => state.orderdata.orderdata);
  const supplierid =
    selectedSupplier && selectedSupplier.length > 0
      ? selectedSupplier[0]._id
      : null;
  const token = localStorage.getItem("token");
  const api = process.env.REACT_APP_API_URL;
  async function addOrder() {
    try {
      const data = await fetch(api + `supplier/${supplierid}/orders`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          orderDate: new Date(),
          totalAmount: props.totalPrice,
          paymentStatus: "Pending",
        }),
      });
      const response = await data.json();
      const orderid = response.id;
      if (response.message === "jwt expired") {
        localStorage.removeItem("token");
        window.location.reload();
      } else {
        try {
          orderData.forEach(async (item) => {
            console.log(item);
            const data = await fetch(
              api + `supplier/${supplierid}/orders/${orderid}/details`,
              {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                  productid: item.id,
                  qty: item.quantity,
                  unitPrice: item.price,
                  saleprice: item.saleprice,
                }),
              }
            );
            const response = await data.json();
            if (response.message === "jwt expired") {
              localStorage.removeItem("token");
              window.location.reload();
            }
          });
          alert(response.message);
          window.location.reload();
        } catch (err) {
          console.log(err);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div>
      <Dialog open={props.open} onClose={props.onClose} fullWidth={true} maxWidth="md">
        <DialogTitle>Confirm Order</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <table className="table">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>{props.tabledata}</tbody>
              <tbody>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className="border">
                    <b>Total</b>
                  </td>
                  <td className="border">{props.totalPrice}</td>
                </tr>
              </tbody>
            </table>
          </DialogContentText>
          <DialogActions>
            <Button onClick={props.onClose}>Cancel</Button>
            <Button onClick={addOrder}>Add</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ConfirmationDialog;
