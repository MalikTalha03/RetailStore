import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { fetchSuppOrders } from "../../app/features/supplier";
import checkToken from "../loggedin";

const EditSupplier = (props) => {
  checkToken();
  const dispatch = useDispatch();
  const { open, handleClose, supplierid } = props;
    const [name, setName] = React.useState("");
    const [contact, setContact] = React.useState("");
    const [address, setAddress] = React.useState("");
  const suppliers = useSelector((state) => state.suppliers.supplierOrders);
  const apiurl = process.env.REACT_APP_API_URL;
  const supp = suppliers.filter((supp) => supp._id === supplierid);
  React.useEffect(() => {
    if (supp.length === 0) {
      return;
    }
    setName(supp[0].name);
    setContact(supp[0].contact);
    setAddress(supp[0].address);
  }, [supplierid]);
  const saveSupplier = async () => {
    const data = {
      name: name,
        contact: contact,
        address: address,
    };
    const response = await fetch(`${apiurl}supplier/${supplierid}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")} `,
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (result.message === "Supplier Updated") {
      dispatch(fetchSuppOrders());
      alert(result.message);
      handleClose();
      window.location.reload();
    } else {
      alert(result.message);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit supplier</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          autoFocus
          margin="dense"
          label="Contact"
          fullWidth
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
        <TextField
          autoFocus
          margin="dense"
          label="Address"
          fullWidth
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={saveSupplier}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditSupplier;
