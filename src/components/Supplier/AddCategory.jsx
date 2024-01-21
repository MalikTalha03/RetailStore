import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Autocomplete,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./order.css";
import "../Customer/css/neworder.css";
import { fetchCategories } from "../../app/features/categories";

const AddCategory = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  const categories = useSelector((state) => state.categories.categories);
  const [category, setCategory] = useState({
    name: "",
  });

  function handleChange(e) {
    const value = e.target.value;
    if (categories.find((item) => item.name === value)) {
      alert("Category already exists");
    } else {
      setCategory((prevState) => ({
        ...prevState,
        name: value,
      }));
    }
  }

  async function addcategory() {
    try {
      const data = await fetch(process.env.REACT_APP_API_URL + "category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(category),
      });
      const response = await data.json();
      if (response.message === "jwt expired") {
        localStorage.removeItem("token");
        window.location.reload();
      } else {
        alert(response.message);
        await dispatch(fetchCategories());
      }
      props.onClose();
      setCategory({ name: "" });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <Dialog className="dialog" id="dialog" open={props.open} onClose={props.onClose}>
        <DialogTitle>Add Category</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Stack spacing={2} margin={2}>
              <div className="form-group">
                <TextField
                  id="outlined-number"
                  label="Category Name"
                  type="text"
                  name="name"
                  value={category.name}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
            </Stack>
          </DialogContentText>
          <DialogActions>
            <Button onClick={props.onClose}>Cancel</Button>
            <Button onClick={addcategory}>Add</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddCategory;
