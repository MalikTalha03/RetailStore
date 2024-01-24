import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useSelector, useDispatch } from "react-redux";
import { fetchCustomers } from "../../app/features/customer";

const EditCustomer = (props) => {
  const dispatch = useDispatch();
  const { open, handleClose, customerid } = props;
  const [firstname, setFirstname] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [contact, setContact] = React.useState("");
  const customer = useSelector((state) => state.customers.customers);
  const apiurl = process.env.REACT_APP_API_URL;
  const cust = customer.filter((cust) => cust._id === customerid);
  React.useEffect(() => {
    if (cust.length === 0) {
      return;
    }
    setFirstname(cust[0].firstname);
    setLastname(cust[0].lastname);
    setContact(cust[0].contact);
  }, [customerid]);
  const saveCustomer = async () => {
    const data = {
      firstname: firstname,
      lastname: lastname,
      contact: contact,
    };
    const response = await fetch(`${apiurl}customer/${customerid}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (result.message === "Customer Updated") {
      dispatch(fetchCustomers());
      alert(result.message);
      handleClose();
      window.location.reload();
    } else {
      alert(result.message);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Customer</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="First Name"
          type="text"
          fullWidth
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Last Name"
          type="text"
          fullWidth
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Contact"
          type="text"
          fullWidth
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={saveCustomer}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditCustomer;
