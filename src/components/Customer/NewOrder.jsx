import React, { useState, useEffect } from "react";
import "./css/neworder.css";
import { Button, Autocomplete, TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { fetchSuppliers } from "../../app/features/supplier";
import {
  fetchProducts,
  setProduct,
  updateSelectedProduct,
} from "../../app/features/products";
import { setOrderdata, updateOrderdata } from "../../app/features/orderdata";
import {
  fetchCustomers,
  setSelectedCustomer,
  updateSelectedCustomer,
} from "../../app/features/customer";
import { setDialog1 } from "../../app/features/dialogslice";
import ConfirmDialog from "./ConfirmDialog";

const NewOrder = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) =>
    state.products.products
      .filter((product) => product.inventory > 0)
      .map((product) => ({
        id: product._id,
        name: product.name,
        price: product.price,
        quantity: product.inventory,
      }))
  );
  const selectedProd = useSelector((state) => state.products.selectedProduct);
  const selectedCustomer = useSelector(
    (state) => state.customers.selectedCustomer
  );
  const orderdata = useSelector((state) => state.orderdata.orderdata);
  const dialog1 = useSelector((state) => state.dialog.dialog1);

  const [isCustomerSelected, setIsCustomerSelected] = useState(false);
  const [isProductSelected, setIsProductSelected] = useState(false);

  useEffect(() => {
    setIsCustomerSelected(
      selectedCustomer && Object.keys(selectedCustomer).length > 0
    );
  }, [selectedCustomer]);

  useEffect(() => {
    setIsProductSelected(
      selectedProd !== null && Object.keys(selectedProd).length > 0
    );
  }, [selectedProd]);

  useEffect(() => {
    dispatch(fetchSuppliers());
    dispatch(fetchProducts());
    dispatch(fetchCustomers());
  }, [dispatch]);

  function addTableData() {
    const data = {
      id: selectedProd.id,
      name: selectedProd.name,
      price: selectedProd.price,
      quantity: selectedProd.quantity,
      total: selectedProd.price * selectedProd.quantity,
    };
    const inv = products.find((item) => item.id === selectedProd.id).quantity;
    if (data.quantity > inv) {
      alert("Quantity exceeds Stock. Remaining Stock: " + inv);
      return;
    }
    if (selectedProd) {
      if (orderdata.find((item) => item.id === selectedProd.id)) {
        data.quantity += orderdata.find(
          (item) => item.id === selectedProd.id
        ).quantity;
        if (data.quantity > inv) {
          alert("Quantity exceeds Stock. Remaining Stock: " + inv);
          return;
        }
        dispatch(updateOrderdata(data));
      } else {
        dispatch(setOrderdata(data));
      }
    }
    setIsProductSelected(true);
  }

  const maptabledata = orderdata.map((item) => {
    return (
      <tr key={item.id}>
        <td>{item.name}</td>
        <td>{item.price}</td>
        <td>{item.quantity}</td>
        <td>{item.total}</td>
      </tr>
    );
  });

  const totalPrice = orderdata.reduce((total, item) => {
    return total + item.total;
  }, 0);

  return (
    <div className="container">
      <ConfirmDialog
        open={dialog1}
        onClose={() => dispatch(setDialog1(!dialog1))}
        tabledata={maptabledata}
        totalPrice={totalPrice}
      />
      <div className="neworder">
        <form className="orderform">
          <div className="form-group">
            <TextField
              id="outlined-number"
              label="Contact No."
              type="string"
              InputLabelProps={{
                shrink: true,
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  dispatch(setSelectedCustomer(e.target.value));
                }
              }}
            />
          </div>
          <div className="form-group">
            <TextField
              id="name-customer"
              label="Name"
              type="text"
              value={
                selectedCustomer && Object.keys(selectedCustomer).length > 0
                  ? `${selectedCustomer.name}`
                  : ""
              }
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) =>
                dispatch(
                  updateSelectedCustomer({
                    name: "name",
                    value: e.target.value,
                  })
                )
              }
            />
          </div>
          <div className="form-group">
            <Autocomplete
              id="prod-name"
              options={products}
              getOptionLabel={(product) => product.name}
              isOptionEqualToValue={(option, value) =>
                option.name === value.name
              }
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Product" />
              )}
              onChange={(event, value) => dispatch(setProduct(value))}
            />
          </div>
          <div className="form-group">
            <TextField
              id="prod-qty"
              label="Quantity"
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) =>
                dispatch(
                  updateSelectedProduct({
                    name: "quantity",
                    value: e.target.valueAsNumber,
                  })
                )
              }
            />
          </div>
          <div className="form-group">
            <Button variant="contained" onClick={addTableData}>
              Add
            </Button>
          </div>
        </form>

        <div className="table">
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>{maptabledata}</tbody>
            <tbody>
              <tr>
                <td></td>
                <td></td>
                <td className="border">
                  <b>Total</b>
                </td>
                <td className="border">{totalPrice}</td>
              </tr>
            </tbody>
          </table>
          <div className="proceed">
            <Button
              variant="contained"
              onClick={() => dispatch(setDialog1(!dialog1))}
              disabled={!isCustomerSelected || !isProductSelected}
            >
              Proceed
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewOrder;
