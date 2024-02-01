import React, { useState } from "react";
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

const Payment = (props) => {
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [payMethod, setPayMethod] = useState("Cash");
  const customerid = props.custid;
  const handlePaymentAmountChange = (event) => {
    const amount = event.target.valueAsNumber || 0;
    setPaymentAmount(amount);
  };
  const orderid = localStorage.getItem("orderid");
  const api = process.env.REACT_APP_API_URL;
  const processPayment = async () => {
    const data = await fetch(
      api + `customer/${customerid}/orders/${orderid}/transactions`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          totalAmount: paymentAmount,
          transactionType: payMethod,
          transactionDate: new Date(),
        }),
      }
    );
    const response = await data.json();
    if (response.message === "jwt expired") {
      localStorage.removeItem("token");
      window.location = "/login";
    } else if (response.message === "Transaction Added") {
      alert("Payment Successful");
      window.location = "/neworder";
      props.onClose();
    } else {
      alert("Payment Failed : ", +response.message);
    }
  };

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>{`Payment for Order ${orderid}`}</DialogTitle>
      <DialogContent>
        <TextField
          id="total-amount"
          label="Total Amount"
          type="number"
          value={props.totalAmount}
          InputProps={{ inputProps: { min: 0 } }}
          disabled
          fullWidth
        />
        <Autocomplete
          id="payment-method"
          options={["Cash", "Bank Transfer"]}
          renderInput={(params) => (
            <TextField {...params} label="Payment Method" fullWidth />
          )}
          onChange={(event, value) => {
            setPayMethod(value);
          }}
        />
        <TextField
          id="payment-amount"
          label="Payment Amount"
          type="number"
          value={paymentAmount}
          InputProps={{ inputProps: { min: 0 } }}
          onChange={handlePaymentAmountChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={processPayment}
          variant="contained"
          disabled={paymentAmount <= 0}
        >
          Pay
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Payment;
