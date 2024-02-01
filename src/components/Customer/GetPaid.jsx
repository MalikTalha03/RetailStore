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
import { fetchCustOrders } from "../../app/features/customer";
import { useEffect } from "react";

const GetPaid = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCustOrders());
  }, [dispatch]);
  const customers = useSelector((state) => state.customers.custOrders);
  const [selectedCustomers, setSelectedCustomers] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState("");
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [remainingAmount, setRemainingAmount] = useState(0);
  const [totrem, setTotrem] = useState(0);

  const handleCustomerChange = (event) => {
    const selectedCustomers = customers.find(
      (customer) =>
        customer.firstname + " " + customer.lastname === event.target.value
    );
    setSelectedCustomers(selectedCustomers);
    setSelectedOrder("");
    setPaymentAmount(0);
    setRemainingAmount(0);
    setTotrem(0);
  };

  const handleOrderChange = (event) => {
    const selectedOrder = selectedCustomers.orders.find(
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
    setTotrem(rem);
  };

  const handlePaymentAmountChange = (event) => {
    const amount = event.target.valueAsNumber || 0;
    setPaymentAmount(amount);
    setRemainingAmount(totrem - amount);
  };

  const getPayment = async () => {
    let status = "";
    const url = process.env.REACT_APP_API_URL + `customer/${selectedCustomers._id}/orders/${selectedOrder._id}/transactions`;

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
    if (status === 200) {
      alert("Payment Successful : " + response.message);
      props.onClose();
      setPaymentAmount(0);
      setRemainingAmount(0);
      setSelectedOrder("");
      setSelectedCustomers(null);
    } else {
      alert("Payment Failed! : " + response.message);
    }
  };

  return (
    <>
      <Dialog open={props.open} onClose={props.onClose}>
        <DialogTitle>{`Get Paid`}</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Select the Customer:</Typography>
          <FormControl fullWidth style={{ marginTop: "1rem" }}>
            <InputLabel id="customer-select-label">Customer</InputLabel>
            <Select
              labelId="customer-select-label"
              id="customer-select"
              value={
                selectedCustomers
                  ? selectedCustomers.firstname +
                    " " +
                    selectedCustomers.lastname
                  : ""
              }
              onChange={(event) => handleCustomerChange(event)}
              label="Customer"
            >
              {customers.map((customer) => (
                <MenuItem
                  key={customer._id}
                  value={`${customer.firstname} ${customer.lastname}`}
                >
                  {customer.firstname} {customer.lastname}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {selectedCustomers && (
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
                  {selectedCustomers.orders
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
            onClick={getPayment}
            variant="contained"
            disabled={
              !selectedCustomers || !selectedOrder || paymentAmount <= 0
            }
          >
            Pay
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default GetPaid;
