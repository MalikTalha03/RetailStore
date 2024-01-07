import React, { useState, useEffect } from 'react';
import '../Orders/neworder.css';
import './order.css';
import {
  Button,
  Autocomplete,
  TextField,
  Stack,
} from '@mui/material';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';

const SuppOrder = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [supplier, setSupplier] = useState({
    contact: '',
    name: '',
    address: '',
  });
  const [selsupp, setSelsupp] = useState({
    name: '',
    id: 0,
    contact: 0,
  });
  const [selProd, setSelProd] = useState({
    name: '',
    id: 0,
    price: 0,
    saleprice: 0,
    quantity: 0,
  });
  const [tableData, setTableData] = useState([]);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    fetchSuppliers();
    fetchProducts();
  }, []);

  const apiurl = 'http://localhost:3001/suppliers'; // Update with your actual API URL

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(!open);
  };

  const handleOpen2 = () => {
    setOpen2(!open2);
  };

  const handleClose2 = () => {
    setOpen2(!open2);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSupplier((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const fetchSuppliers = async () => {
    try {
      const data = await fetch(apiurl);
      const res = await data.json();
      setSuppliers(res);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProducts = async () => {
    try {
      const data = await fetch(apiurl + '/products');
      const res = await data.json();
      setProducts(res);
    } catch (err) {
      console.error(err);
    }
  };

  const addsupplier = async () => {
    try {
      const response = await fetch(apiurl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(supplier),
      });

      const data = await response.json();

      if (data.id) {
        setSelsupp(data); // Update state with the added supplier
        setOpen(!open);
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const setsupp = (event, value) => {
    if (value) {
      setSelsupp(value);
    }
  };

  const setprod = (event, value) => {
    if (value) {
      setSelProd(value);
    }
  };

  const addTableData = () => {
    const data = {
      id: selProd.id,
      name: selProd.name,
      price: selProd.price,
      quantity: selProd.quantity,
      total: selProd.price * selProd.quantity,
      saleprice: selProd.saleprice,
    };
    setSelProd({
      name: '',
      id: 0,
      price: 0,
      saleprice: 0,
      quantity: 0,
    });
    setTableData((prevValue) => [...prevValue, data]);
  };

  const maptabledata = tableData.map((item, index) => (
    <tr key={index}>
      <td>{item.name}</td>
      <td>{item.price}</td>
      <td contentEditable='true' suppressContentEditableWarning={true}>
        {item.quantity}
      </td>
      <td>{item.total}</td>
    </tr>
  ));

  const totalPrice = tableData.reduce((total, item) => total + item.total, 0);

  const addOrder = async () => {
    try {
      const supplierId = parseInt(selsupp.id);
      const paymentStatus = 'Pending';
      const orderDate = new Date();
      const totalAmount = totalPrice;

      const orderData = {
        supplierId,
        paymentStatus,
        orderDate,
        totalAmount,
      };

      const response = await fetch(`${apiurl}/${supplierId}/orders`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (data.id) {
        setOrderId(data.id); // Update state with the created order ID
        addOrderDetails();
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const addOrderDetails = async () => {
    try {
      for (const item of tableData) {
        const productData = {
          name: item.name,
          price: item.saleprice,
          inventory: item.quantity,
          supplierid: selsupp.id,
          category: 'Other',
        };

        const productResponse = await fetch(apiurl + '/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(productData),
        });

        const productDataResult = await productResponse.json();

        if (productDataResult.id) {
          item.id = productDataResult.id;
          addOrderDetails2(item);
        } else {
          alert(productDataResult.message);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const addOrderDetails2 = async (item) => {
    try {
      const orderDetailsData = {
        orderid: orderId,
        productid: item.id,
        qty: item.quantity,
        unitPrice: item.price,
      };

      const response = await fetch(
        `${apiurl}/${selsupp.id}/orders/${orderId}/details`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderDetailsData),
        }
      );

      const data = await response.json();

      if (data.id) {
        alert('Order Added');
        window.location.reload();
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='container'>
      <div className='neworder'>
        <div className='addsupp'>
          <Button variant='contained' onClick={handleOpen}>
            Add Supplier
          </Button>
        </div>
        <Dialog open={open} onClose={handleClose} className='dialog' id='dialog'>
          <DialogTitle>Add Supplier</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Stack spacing={2} margin={2}>
                <div className='form-group'>
                  <TextField
                    id='outlined-number'
                    label='Contact No.'
                    type='text'
                    name='contact'
                    value={supplier.contact}
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>
                <div className='form-group'>
                  <TextField
                    id='outlined-number'
                    label='Name'
                    type='string'
                    name='name'
                    value={supplier.name}
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>
                <div className='form-group'>
                  <TextField
                    id='outlined-number'
                    label='Address'
                    type='string'
                    name='address'
                    value={supplier.address}
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>
              </Stack>
            </DialogContentText>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={addsupplier}>Add</Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
        <form className='orderform'>
          <div className='form-group'>
            <Autocomplete
              id='supplier-name'
              options={suppliers}
              getOptionLabel={(option) => option.name}
              sx={{ width: 300 }}
              onChange={setsupp}
              freeSolo
              renderInput={(params) => <TextField {...params} label='Supplier' />}
            />
          </div>
          <div className='form-group'>
            <Autocomplete
              id='prod-name'
              options={products}
              getOptionLabel={(option) => option.name || selProd.name}
              sx={{ width: 300 }}
              freeSolo
              onChange={setprod}
              renderInput={(params) => <TextField {...params} label='Product' />}
            />
          </div>
          <div className='form-group'>
            <TextField
              id='prod-qty'
              label='Quantity'
              type='number'
              value={selProd.quantity}
              InputProps={{ inputProps: { min: 0 } }}
              onChange={(e) =>
                setSelProd({ ...selProd, quantity: e.target.valueAsNumber })
              }
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div className='form-group'>
            <TextField
              id='price'
              label='Price'
              type='number'
              value={selProd.price}
              InputProps={{ inputProps: { min: 0 } }}
              onChange={(e) =>
                setSelProd({ ...selProd, price: e.target.valueAsNumber })
              }
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div className='form-group'>
            <TextField
              id='sale-price'
              label='Sale Price'
              type='number'
              value={selProd.saleprice}
              InputProps={{ inputProps: { min: 0 } }}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) =>
                setSelProd({ ...selProd, saleprice: e.target.valueAsNumber })
              }
            />
          </div>
          <div className='form-group'>
            <Button variant='contained' onClick={addTableData}>
              Add
            </Button>
          </div>
        </form>
        <div className='table'>
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
                <td></td>
                <td className='border'>
                  <b>Total</b>
                </td>
                <td className='border'>{totalPrice}</td>
              </tr>
            </tbody>
          </table>
          <div className='proceed'>
            <Button variant='contained' onClick={handleOpen2}>
              Proceed
            </Button>
          </div>
          <Dialog open={open2} onClose={handleClose2} fullWidth maxWidth='md'>
            <DialogTitle>Confirm Order</DialogTitle>
            <DialogContent>
              <DialogContentText>
                <table className='table'>
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
                      <td></td>
                      <td className='border'>
                        <b>Total</b>
                      </td>
                      <td className='border'>{totalPrice}</td>
                    </tr>
                  </tbody>
                </table>
              </DialogContentText>
              <DialogActions>
                <Button onClick={handleClose2}>Cancel</Button>
                <Button onClick={addOrder}>Add</Button>
              </DialogActions>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default SuppOrder;
