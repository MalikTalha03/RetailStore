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
import "../Orders/css/neworder.css";
import { fetchCategories } from "../../app/features/categories";
import { fetchSuppliers } from "../../app/features/supplier";

const AddProduct = ({ open, onClose }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchSuppliers());
  }, [dispatch]);
  const categories = useSelector((state) => state.categories.categories);
  const suppliers = useSelector((state) => state.suppliers.suppliers);
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    inventory: 0,
    category: "",
    supplierID: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  async function addproduct() {
    try {
      console.log(product);
      const data = await fetch("http://localhost:3001/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(product),
      });
      const response = await data.json();
      if (response.message === "jwt expired") {
        localStorage.removeItem("token");
        window.location.reload();
      } else {
        alert(response.message);
      }
      onClose();
      setProduct({
        name: "",
        price: 0,
        inventory: 0,
        category: "",
        supplierID: "",
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <Dialog className="dialog" id="dialog" open={open} onClose={onClose}>
        <DialogTitle>Add Product</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Stack spacing={2} margin={2}>
              <div className="form-group">
                <Autocomplete
                  id="supplier-combo-box"
                  options={suppliers}
                  getOptionLabel={(option) => option.name}
                  onChange={(event, value) => {
                    setProduct((prevState) => ({
                      ...prevState,
                      supplierID: value._id,
                    }));
                  }}
                  style={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Supplier" />
                  )}
                />
              </div>
              <div className="form-group">
                <Autocomplete
                  id="category-combo-box"
                  options={categories}
                  getOptionLabel={(option) => option.name}
                  style={{ width: 300 }}
                  onChange={(event, value) => {
                    setProduct((prevState) => ({
                      ...prevState,
                      category: value._id,
                    }));
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Category" />
                  )}
                />
              </div>
              <div className="form-group">
                <TextField
                  id="outlined-number"
                  label="Product Name"
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
            </Stack>
          </DialogContentText>
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={addproduct}>Add</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddProduct;
