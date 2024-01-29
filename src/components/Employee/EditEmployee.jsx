import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { fetchEmployeeById, updateEmployee } from "../../app/features/employee";

const EditEmployee = ({ open, handleClose, employeeid }) => {
  const dispatch = useDispatch();
  const employee = useSelector((state) => state.employees.employee);
  const [editedEmployee, setEditedEmployee] = useState({
    firstname: "",
    lastname: "",
    contact: "",
    address: "",
    salary: "",
    position: "",
    password: "",
    username: "",
  });

  useEffect(() => {
    if (open && employeeid) {
      dispatch(fetchEmployeeById(employeeid));
    }
  }, [open, dispatch, employeeid]);

  useEffect(() => {
    if (employee) {
      setEditedEmployee(employee);
    }
  }, [employee]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  const handleUpdateEmployee = () => {
    dispatch(updateEmployee(editedEmployee));
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Employee</DialogTitle>
      <DialogContent>
        <TextField
          label="Username"
          type="text"
          name="username"
          value={editedEmployee.username}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="First Name"
          type="text"
          name="firstname"
          value={editedEmployee.firstname}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Last Name"
          type="text"
          name="lastname"
          value={editedEmployee.lastname}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Contact"
          type="text"
          name="contact"
          value={editedEmployee.contact}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Address"
          type="text"
          name="address"
          value={editedEmployee.address}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Salary"
          type="text"
          name="salary"
          value={editedEmployee.salary}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Position"
          type="text"
          name="position"
          value={editedEmployee.position}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleUpdateEmployee} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditEmployee;
