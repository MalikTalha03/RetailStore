import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import checkToken from "../loggedin";
import { fetchCustOrders } from "../../app/features/customer";
import { fetchProducts } from "../../app/features/products";

const OrderDetail = (props) => {
  checkToken();
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customers.custOrders);
  const order = useSelector((state) => {
    const customers = state.customers.custOrders;
    const allOrders = [].concat.apply(
      [],
      customers.map((customer) => customer.orders)
    );
    return allOrders.find((order) => order._id === props.orderId);
  });
  let custid = "";

  const products = useSelector((state) => state.products.products);

  const [editableOrderDetails, setEditableOrderDetails] = useState([]);

  useEffect(() => {
    if (order) {
      setEditableOrderDetails([...order.orderDetails]);
    }
  }, [order]);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCustOrders());
  }, [dispatch]);
  custid = customers.find((customer) =>
    customer.orders.find((order) => order._id === props.orderId)
  );
  if (custid) {
    custid = custid._id;
  }

  const handleQuantityChange = (index, value) => {
    const updatedOrderDetailsCopy = [...editableOrderDetails];
    const qty = parseInt(value, 10);

    if (qty < 0) {
      alert("Quantity cannot be negative");
      return;
    }
    if (qty > editableOrderDetails[index].qty) {
      alert("You cannot increase the quantity");
      return;
    }

    updatedOrderDetailsCopy[index] = {
      ...updatedOrderDetailsCopy[index],
      qty: qty,
    };

    setEditableOrderDetails(updatedOrderDetailsCopy);
  };

  const handleRefund = async () => {
    try {
      if (!order) {
        alert("Order not found");
        return;
      }

      const refundData = {
        refundDate: new Date(),
        orderDetails: editableOrderDetails,
      };

      const response = await fetch(
        process.env.REACT_APP_API_URL +
          `customer/${custid}/orders/${props.orderId}/refund`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(refundData),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        const { updatedCustomer, amountToReturn } = responseData;

        dispatch(fetchCustOrders());

        props.onClose();

        alert(`Amount to be returned: ${amountToReturn}`);
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  useEffect(() => {
    if (!products.length) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products]);

  function findProdName(id) {
    const product = products.find((product) => product._id === id);
    return product.name;
  }

  return (
    <Dialog open={props.open} onClose={props.onClose} maxWidth="md" fullWidth>
      <DialogTitle>Order Details</DialogTitle>
      <DialogContent>
        <p>
          Customer Name: {order ? order.customerName : "Customer Not Found"}
        </p>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product Name</TableCell>
                <TableCell>Unit Price</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {editableOrderDetails.map((orderDetail, index) => (
                <TableRow key={orderDetail.productid}>
                  <TableCell>{findProdName(orderDetail.productid)}</TableCell>
                  <TableCell>{orderDetail.unitPrice}</TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      value={orderDetail.qty}
                      onChange={(e) =>
                        handleQuantityChange(index, e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    {orderDetail.unitPrice * orderDetail.qty}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <p style={{ marginTop: 20, fontWeight: "bold" }}>
          Total Amount: {order ? order.totalAmount : 0}
        </p>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} color="primary">
          Close
        </Button>
        <Button
          onClick={handleRefund}
          color="primary"
          disabled={!editableOrderDetails.length}
        >
          Refund
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderDetail;
