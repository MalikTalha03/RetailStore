import React from 'react'
import '../Orders/neworder.css'
import './order.css'
import {Button, Autocomplete, TextField, Stack} from '@mui/material'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material'
import { useState, useEffect } from 'react'
import axios from 'axios'

const SuppOrder = () => {
    const suppid = 0
    const [open, setOpen] = useState(false)
    const [supplier, setSupplier] = useState({
        contact: '',
        name: '',
        address: ''
    })
    const [selsupp, setSelsupp] = useState({
        name: '',
        id: 0,
        contact: 0
    })
    const [selProd, setSelProd] = useState({
        name: '',
        id: 0,
        price: 0
    })
    const [prod, setProd] = useState({
        name: '',
        id: 0,
        price: 0
    })
    

    const apiurl = "http://localhost:3001/"
    const suppliers = []
    const token = localStorage.getItem('token')
    function handleOpen() {
        setOpen(!open)
    }
    function handleClose() {
        setOpen(!open)
    }
    function handleChange(event) {
        const {name, value} = event.target
        setSupplier(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        })
    }
    async function addsupplier() {
        if(supplier.contact === '' || supplier.name === '' || supplier.address === '') {
            alert('Please fill all the fields')
        }
        if(supplier.contact.length !== 11) {
            alert('Invalid Contact Number')
        }
        if(supplier.contact.match(/^[0-9]+$/) === null) {
            alert('Invalid Contact Number')
        }
        supplier.contact = parseInt(supplier.contact)
        await fetch(
            apiurl + 'supplier',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(supplier)
            }
        )
        .then(res => res.json())
        .then(data => {
            if (data.message === 'jwt expired') {
                window.location.href = '/login'
                localStorage.removeItem('token')
            }
            alert(data.message)
            if(data.message === 'Supplier Added') {
                setOpen(!open)
            }
        })
        .catch(err => {
            console.log(err)
        })
            
    }
    fetch(
        apiurl + 'supplier',
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }
    )
    .then(res => res.json())
    .then(data => {
        if (data.message === 'jwt expired') {
            window.location.href = '/login'
            localStorage.removeItem('token')
        }
        data.map((item) => {
            const supplier = {
                name: item.name,
                id : item.id,
                contact: item.contact,
            }
            suppliers.push(supplier)
        })
    })
    .catch(err => {
        console.log(err)
    })
    const products = []
    fetch (
        apiurl + 'product',
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }
    )
    .then(res => res.json())
    .then(data => {
        if (data.message === 'jwt expired') {
            window.location.href = '/login'
            localStorage.removeItem('token')
        }
        data.map((item) => {
            const product = {
                label: item.name,
                id : item.id,
                price: item.price,
            }
            products.push(product)
        })
    })
    .catch(err => {
        console.log(err)
    })
    function setsupp(event, value) {
        if (value) {
          const supp = suppliers.find((supp) => supp.name === value.name && supp.id === value.id && supp.contact === value.contact);
          setSelsupp(supp);
        }
        
    }
    function setprod(event, value) {
        if (value) {
          const prod = products.find((prod) => prod.name === value.name && prod.id === value.id && prod.price === value.price);
          if(prod) {
            setSelProd(prod);
          }
          else{
            setSelProd({
                name: value,
                id: 0,
                price: 0
            })
          }
        }
    }
  return (
    <div className='container'>
        <div className='neworder'>
            <div className="addsupp">
                <Button variant="contained"onClick={handleOpen}>Add Supplier</Button>
            </div>
            <Dialog open={open} onClose={handleClose} className='dialog' id = 'dialog'>
                <DialogTitle>Add Supplier</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Stack spacing={2} margin={2}>
                            <div className='form-group'>
                                <TextField
                                    id="outlined-number"
                                    label="Contact No."
                                    type="text"
                                    name = 'contact'
                                    value= {supplier.contact}
                                    onChange={handleChange}
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                />
                            </div>
                            <div className='form-group'>
                                <TextField
                                    id="outlined-number"
                                    label="Name"
                                    type="string"
                                    name = 'name'
                                    value= {supplier.name}
                                    onChange={handleChange}
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                />
                            </div>
                            <div className='form-group'>
                                <TextField
                                    id="outlined-number"
                                    label="Address"
                                    type="string"
                                    name = 'address'
                                    value= {supplier.address}
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
                <div className="form-group">
                    <Autocomplete
                        id="prod-name"
                        options={suppliers}
                        getOptionLabel={(option) => option.name}
                        sx={{ width: 300 }}
                        onChange={setsupp}
                        freeSolo
                        renderInput={(params) => <TextField {...params} label="Supplier" />}
                    />
                </div>
                <div className="form-group">
                    <Autocomplete
                        id="prod-name"
                        options={products}
                        getOptionLabel={(option) => option.name || selProd.name}
                        sx={{ width: 300 }}
                        freeSolo
                        onChange={setprod}
                        renderInput={(params) => <TextField {...params} label="Product" />}
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
                    />
                </div>
                <div className="form-group">
                    <TextField
                        id="price"
                        label="Price"
                        type="number"
                        InputProps={{ inputProps: { min: 0 } }}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                </div>
                <div className="form-group">
                    <TextField
                        id="sale-price"
                        label="Sale Price"
                        type="number"
                        value={selProd.price}
                        InputProps={{ inputProps: { min: 0 } }}
                        InputLabelProps={{
                        shrink: true,
                        }}
                        onChange={(e) => setSelProd({ ...selProd, price: e.target.valueAsNumber })}
                    />
                </div>
                <div className='form-group'>
                    <Button variant="contained">Add</Button>
                </div>
            </form>

            <div className='table'>
                <table>
                    <thead>
                        <tr>
                            <th>Product ID</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Product 1</td>
                            <td>100</td>
                            <td contentEditable='true'
                                suppressContentEditableWarning={true}
                            >2</td>
                            <td>200</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Product 2</td>
                            <td>200</td>
                            <td>3</td>
                            <td>600</td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td className='border'><b>Total</b></td>
                            <td className='border'>800</td>
                        </tr>
                    </tbody>
                </table>
                <div className='proceed'>
                    <Button variant="contained" >Proceed</Button>
                </div>
            </div>
            </div>
    </div>
  )
}

export default SuppOrder