import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import checkToken from "../loggedin";

const EditEmployee = ({ open, handleClose, employeeid }) => {
  checkToken();
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
      fetchEmployeeById(employeeid);
    }
  }, [open, employeeid]);

  const fetchEmployeeById = async (id) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}employee/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch employee");
      }

      const employeeData = await response.json();
      setEditedEmployee(employeeData);
    } catch (error) {
      alert("Error fetching employee:", error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  const handleUpdateEmployee = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}employee/${editedEmployee._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify(editedEmployee),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update employee");
      }

      const updatedEmployeeData = await response.json();
      alert("Updated Employee Data:", updatedEmployeeData);

      handleClose();
    } catch (error) {
      console.error("Error updating employee:", error.message);
    }
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

        <TextField
          label="Password"
          type="text"
          name="password"
          value={editedEmployee.password}
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
