import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { fetchSuppOrders } from "../../app/features/supplier";
import { useEffect } from "react";
import checkToken from "../loggedin";

const SupplierPayment = (props) => {
  checkToken();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSuppOrders());
  }, [dispatch]);
  const suppliers = useSelector((state) => state.suppliers.supplierOrders);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState("");
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [remainingAmount, setRemainingAmount] = useState(0);
  const [totrem, setTotrem] = useState(0);

  const handleSupplierChange = (event) => {
    const selectedSupplier = suppliers.find(
      (supplier) => supplier.name === event.target.value
    );
    setSelectedSupplier(selectedSupplier);
    setSelectedOrder("");
    setPaymentAmount(0);
    setRemainingAmount(0);
    setTotrem(0)
  };

  const handleOrderChange = (event) => {
    const selectedOrder = selectedSupplier.orders.find(
      (order) => order._id === event.target.value
    );
    setSelectedOrder(selectedOrder);
    setPaymentAmount(0);
    const rem =
      selectedOrder.totalAmount -
      selectedOrder.transactions.reduce(
        (acc, curr) => acc + curr.totalAmount,
        0
      );
    setRemainingAmount(rem);
    setTotrem(rem)
  };

  const handlePaymentAmountChange = (event) => {
    const amount = event.target.valueAsNumber || 0;
    setPaymentAmount(amount);
    setRemainingAmount(totrem - amount);
  };

  const paySupplier = async () => {
    let status = "";
    const url = process.env.REACT_APP_API_URL + `supplier/${selectedSupplier._id}/orders/${selectedOrder._id}/transactions`;

    const data = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        transactionDate: new Date(),
        transactionType: "Cash",
        totalAmount: paymentAmount,
      }),
    });
    status = data.status;
    const response = await data.json();
    if (response.message === "jwt expired") {
      localStorage.removeItem("token");
      window.location.reload();
    }
    console.log(response);
    if (status === 200) {
      alert("Payment Successful : " + response.message);
      props.onClose();
      setPaymentAmount(0);
      setRemainingAmount(0);
      setSelectedOrder("");
      setSelectedSupplier(null);
    } else {
      alert("Payment Failed! : " + response.message);
    }
  };

  return (
    <>
      <Dialog open={props.open} onClose={props.onClose}>
        <DialogTitle>{`Pay Supplier`}</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Select the supplier:</Typography>
          <FormControl fullWidth style={{ marginTop: "1rem" }}>
            <InputLabel id="supplier-select-label">Supplier</InputLabel>
            <Select
              labelId="supplier-select-label"
              id="supplier-select"
              value={selectedSupplier ? selectedSupplier.name : ""}
              onChange={handleSupplierChange}
              label="Supplier"
            >
              {suppliers.map((supplier) => (
                <MenuItem key={supplier._id} value={supplier.name}>
                  {supplier.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {selectedSupplier && (
            <>
              <Typography variant="body1" style={{ marginTop: "2rem" }}>
                Select the order to pay:
              </Typography>
              <FormControl fullWidth style={{ marginTop: "1rem" }}>
                <InputLabel id="order-select-label">Order</InputLabel>
                <Select
                  labelId="order-select-label"
                  id="order-select"
                  value={selectedOrder ? selectedOrder._id : ""}
                  onChange={handleOrderChange}
                  label="Order"
                >
                  {selectedSupplier.orders
                    .filter((order) => order.paymentStatus === "Pending")
                    .map((order) => (
                      <MenuItem key={order._id} value={order._id}>
                        {`Order ${order._id} - Total Amount: ${order.totalAmount}`}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>

              <Typography variant="body1" style={{ marginTop: "2rem" }}>
                Enter the payment amount:
              </Typography>
              <TextField
                style={{ marginTop: "1rem" }}
                id="payment-amount"
                label="Payment Amount"
                type="number"
                value={paymentAmount}
                InputProps={{ inputProps: { min: 0 } }}
                onChange={handlePaymentAmountChange}
                fullWidth
              />

              <Typography variant="body1">
                Remaining Amount: {remainingAmount}
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={paySupplier}
            variant="contained"
            disabled={!selectedSupplier || !selectedOrder || paymentAmount <= 0}
          >
            Pay
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SupplierPayment;
