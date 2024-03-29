import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import "../Supplier/order.css";
import "./css/neworder.css";
import { useSelector } from "react-redux";
import { setDialog7 } from "../../app/features/dialogslice";
import { useDispatch } from "react-redux";
import Payment from "./Payment";

const ConfirmationDialog = (props) => {
  const selectedCustomer = useSelector(
    (state) => state.customers.selectedCustomer
  );
  const dispatch = useDispatch();
  const dialog7 = useSelector((state) => state.dialog.dialog7);
  let orderid = "";
  const orderData = useSelector((state) => state.orderdata.orderdata);
  const isSelected = useSelector((state) => state.customers.inselected);
  const token = localStorage.getItem("token");
  const api = process.env.REACT_APP_API_URL;
  async function addCust() {
    try {
      const data = await fetch(api + "customer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: selectedCustomer.firstname,
          lastname: selectedCustomer.lastname,
          contact: selectedCustomer.contact,
        }),
      });
      const response = await data.json();
      if (response.message === "jwt expired") {
        localStorage.removeItem("token");
        window.location.reload();
      } else if (response.message === "Customer Added") {
        localStorage.setItem("customerid", response.id);
        selectedCustomer._id = response.id;
      }
    } catch (err) {
      alert(err);
    }
  }
  const emp = async () => {
    try {
      if (!localStorage.getItem("token")) {
        window.location = "/login";
        return;
      }
      const data = await fetch(
        api + `employee/token/${localStorage.getItem("token")}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const response = await data.json();
      if (response.message === "jwt expired") {
        localStorage.removeItem("token");
        window.location = "/login";
      } else {
        localStorage.setItem("employeeid", response.id);
      }
    } catch (err) {
      alert(err);
    }
  };
  emp();
  async function addOrder() {
    try {
      if (isSelected === "false") {
        await addCust();
      }
      const data = await fetch(
        api + `customer/${selectedCustomer._id}/orders`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderDate: new Date(),
            paymentStatus: "Pending",
            employeeid: localStorage.getItem("employeeid"),
          }),
        }
      );
      const response = await data.json();
      orderid = response.id;
      localStorage.setItem("orderid", response.id);
      if (response.message === "jwt expired") {
        localStorage.removeItem("token");
        window.location.reload();
      } else {
        try {
          orderData.forEach(async (item) => {
            const data = await fetch(
              api +
                `customer/${selectedCustomer._id}/orders/${orderid}/details`,
              {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  productid: item.id,
                  qty: item.quantity,
                  unitPrice: item.price,
                }),
              }
            );
            const response = await data.json();
            if (response.message === "jwt expired") {
              localStorage.removeItem("token");
              window.location = "/login";
            } else {
              alert(response.message);
              dispatch(setDialog7(true));
             
            }
          });
        } catch (err) {
          alert(err);
        }
      }
    } catch (err) {
      alert(err);
    }
  }

  return (
    <div>
      <Payment
        onClose={() => dispatch(setDialog7(false))}
        open={dialog7}
        totalAmount={props.totalPrice}
        custid = {selectedCustomer._id}
      />
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
