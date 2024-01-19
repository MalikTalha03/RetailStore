import React from "react";
import { useSelector } from "react-redux";
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
import Paper from "@mui/material/Paper";
import { fetchProducts } from "../../app/features/products";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchCustOrders } from "../../app/features/customer";

const OrderDetail = ({ open, onClose, orderId }) => {
  let customerName = "";
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCustOrders());
  }, [dispatch]);
  const customers = useSelector((state) => state.customers.custOrders);
  const orderCustomer = customers.find((customer) =>
    customer.orders.find((order) => order._id === orderId)
  );

  if (orderCustomer) {
    customerName = orderCustomer.firstname + " " + orderCustomer.lastname;
  } else {
    customerName = "Customer Not Found";
  }

  const order = useSelector((state) => {
    const customers = state.customers.custOrders;
    const allOrders = [].concat.apply(
      [],
      customers.map((customer) => customer.orders)
    );
    return allOrders.find((order) => order._id === orderId);
  });
  const products = useSelector((state) => state.products.products);

  if (!order) {
    return <div>Order not found</div>;
  }

  function prodname(id) {
    const product = products.find((product) => product._id === id);
    return product.name;
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Order Details</DialogTitle>
      <DialogContent>
        <p>Customer Name: {customerName}</p>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  style={{
                    backgroundColor: "#9f9f9f",
                    color: "#000",
                    fontSize: "15px",
                    fontWeight: "Bold",
                  }}
                >
                  Product Name
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "#9f9f9f",
                    color: "#000",
                    fontSize: "15px",
                    fontWeight: "Bold",
                  }}
                >
                  Unit Price
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "#9f9f9f",
                    color: "#000",
                    fontSize: "15px",
                    fontWeight: "Bold",
                  }}
                >
                  Quantity
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "#9f9f9f",
                    color: "#000",
                    fontSize: "15px",
                    fontWeight: "Bold",
                  }}
                >
                  Total
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order.orderDetails.map((orderDetail) => (
                <TableRow key={orderDetail.productid}>
                  <TableCell>{prodname(orderDetail.productid)}</TableCell>
                  <TableCell>{orderDetail.unitPrice}</TableCell>
                  <TableCell>{orderDetail.qty}</TableCell>
                  <TableCell>
                    {orderDetail.unitPrice * orderDetail.qty}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <p style={{ marginTop: 20, fontWeight: "bold" }}>
          Total Amount: {order.totalAmount}
        </p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderDetail;
