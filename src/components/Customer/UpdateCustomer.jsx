import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Autocomplete,
  DialogActions,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers } from "../../app/features/customer";

const UpdateCustomer = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  const customers = useSelector((state) => state.customers.customers);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [newCustomerData, setNewCustomerData] = useState({
    firstname: "",
    lastname: "",
    contact: "",
  });

  useEffect(() => {
    if (selectedCustomer) {
      setNewCustomerData({
        firstname: selectedCustomer.firstname,
        lastname: selectedCustomer.lastname,
        contact: selectedCustomer.contact,
      });
    }
  }, [selectedCustomer]);

  const handleUpdate = async () => {
    try {
      if (selectedCustomer) {
        const data = await fetch(
          process.env.REACT_APP_API_URL + "customer/" + selectedCustomer._id,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify(newCustomerData),
          }
        );
        const response = await data.json();
        if (response.message === "jwt expired") {
          localStorage.removeItem("token");
          window.location.reload();
        } else {
          alert(response.message);
        }
      }
      props.onClose();
    } catch (error) {
      console.error("Error updating customer:", error);
    }
  };

  return (
    <div>
      <Dialog className="dialog" open={props.open} onClose={props.onClose}>
        <DialogTitle>Update Customer</DialogTitle>
        <DialogContent>
          <Stack spacing={2} margin={2}>
            <div className="form-group">
              <Autocomplete
                id="customer-combo-box"
                options={customers}
                getOptionLabel={(option) => option.name}
                onChange={(event, value) => {
                  setSelectedCustomer(value);
                }}
                style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Customer" />}
              />
            </div>
            {selectedCustomer && (
              <>
                <div className="form-group">
                  <TextField
                    id="outlined-firstname"
                    label="First Name"
                    type="text"
                    name="firstname"
                    value={newCustomerData.firstname}
                    onChange={(e) =>
                      setNewCustomerData({ ...newCustomerData, firstname: e.target.value })
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>
                <div className="form-group">
                  <TextField
                    id="outlined-lastname"
                    label="Last Name"
                    type="text"
                    name="lastname"
                    value={newCustomerData.lastname}
                    onChange={(e) =>
                      setNewCustomerData({ ...newCustomerData, lastname: e.target.value })
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>
                <div className="form-group">
                  <TextField
                    id="outlined-contact"
                    label="Contact"
                    type="text"
                    name="contact"
                    value={newCustomerData.contact}
                    onChange={(e) =>
                      setNewCustomerData({ ...newCustomerData, contact: e.target.value })
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>
                {/* Add other fields as needed */}
              </>
            )}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose}>Cancel</Button>
          <Button onClick={handleUpdate}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UpdateCustomer;
