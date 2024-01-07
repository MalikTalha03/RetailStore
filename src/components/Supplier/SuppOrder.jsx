import React from 'react'
import '../Orders/neworder.css'
import './order.css'
import {Button, Autocomplete, TextField, Stack} from '@mui/material'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material'
import { useState, useEffect } from 'react'

const SuppOrder = () => {
    useEffect(() => {
        fetchSuppliers()
        fetchProducts()
    }, [])
    const [suppliers, setSuppliers] = useState([])
    const [products, setProducts] = useState([])
    const [open, setOpen] = useState(false)
    const [open2, setOpen2] = useState(false)
    const [supplier, setSupplier] = useState({
        contact: '',
        name: '',
        address: ''
    })
    const [selsupp, setSelsupp] = useState({
        name: '',
        id: 0,
        contact: 0,
    })
    const [selProd, setSelProd] = useState({
        name: '',
        id: 0,
        price: 0,
        saleprice: 0,
        quantity: 0,
    })
    const [tableData , setTableData] = useState([])
    

    const apiurl = "http://localhost:3001/"
    const token = localStorage.getItem('token')
    function handleOpen() {
        setOpen(!open)
    }
    function handleClose() {
        setOpen(!open)
    }
    function handleOpen2() {
        setOpen2(!open2)
    }
    function handleClose2() {
        setOpen2(!open2)
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
    const fetchSuppliers = async () => {
        try{
            const data = await fetch(
                apiurl + 'supplier',
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                }
            )
            const res = await data.json()
            if (res.message === 'jwt expired') {
                window.location.href = '/login'
                localStorage.removeItem('token')
            }
            const supps = res.map((item) => {
                const supplier = {
                    name: item.name,
                    id : item.id,
                    contact: item.contact,
                }
                return supplier
            }
            )
            setSuppliers(supps)
        }
        catch(err) {
            console.log(err)
        }
    }
    const fetchProducts = async () => {
        try{
            const data = await fetch(
                apiurl + 'product',
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                }
            )
            const res = await data.json()
            if (res.message === 'jwt expired') {
                window.location.href = '/login'
                localStorage.removeItem('token')
            }
            const prods = res.map((item) => {
                const product = {
                    name: item.name,
                    id : item.id,
                    price: item.price,
                    saleprice: item.saleprice,
                }
                return product
            }
            )
            setProducts(prods)
        }
        catch(err) {
            console.log(err)
        }
    }

    function setsupp(event, value) {
        if (value) {
          const supp = suppliers.find((supp) => supp.name === value.name && supp.id === value.id && supp.contact === value.contact);
          setSelsupp(supp);
        }
        
    }
    function setprod(event, value) {
        if (value) {
            console.log(value)
          const prod = products.find((prod) => prod.name === value.name && prod.id === value.id && prod.price === value.price);
          if(prod) {
            setSelProd(prod);
          }
          else{
            setSelProd({
                name: value,
                id: 0,
                saleprice: 0,
                price: 0,
                quantity: 0,
            })
          }
        }
    }
    function addTableData() {
        const data = {
            id: selProd.id,
            name: selProd.name,
            price: selProd.price,
            quantity: selProd.quantity,
            total: selProd.price * selProd.quantity,
            saleprice: selProd.saleprice
        }
        console.log(tableData)
        setSelProd({
            name: '',
            id: 0,
            price: 0,
            saleprice: 0,
            quantity: 0,
        })
        setTableData(prevValue => {
            return [
                ...prevValue,
                data
            ]
        })
    }

    const maptabledata = tableData.map((item) => {
        console.log(item)
        return (
            <tr>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td contentEditable='true'
                    suppressContentEditableWarning={true}
                >{item.quantity}</td>
                <td>{item.total}</td>
            </tr>
        )
    }
    )
    const totalPrice = tableData.reduce((total, item) => {
        return total + item.total
    }
    , 0)
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
                        id="supplier-name"
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
                        value={selProd.quantity}
                        InputProps={{ inputProps: { min: 0 } }}
                        onChange={(e) => setSelProd({ ...selProd, quantity: e.target.valueAsNumber })}
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
                        value={selProd.price}
                        InputProps={{ inputProps: { min: 0 } }}
                        onChange={(e) => setSelProd({ ...selProd, price: e.target.valueAsNumber })}
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
                        value={selProd.saleprice}
                        InputProps={{ inputProps: { min: 0 } }}
                        InputLabelProps={{
                        shrink: true,
                        }}
                        onChange={(e) => setSelProd({ ...selProd, saleprice: e.target.valueAsNumber })}
                    />
                </div>
                <div className='form-group'>
                    <Button variant="contained" onClick={addTableData}>Add</Button>
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
                    <tbody>
                        {maptabledata}
                    </tbody>
                    <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td className='border'><b>Total</b></td>
                            <td className='border'>{totalPrice}</td>
                        </tr>
                    </tbody>
                </table>
                <div className='proceed'>
                    <Button variant="contained" onClick={handleOpen2}>Proceed</Button>
                </div>
                <Dialog open={open2} onClose={handleClose2} fullWidth maxWidth="md">
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
                                <tbody>
                                    {maptabledata}
                                </tbody>
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td className='border'><b>Total</b></td>
                                        <td className='border'>{totalPrice}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </DialogContentText>
                        <DialogActions>
                            <Button onClick={handleClose2}>Cancel</Button>
                            <Button onClick={addsupplier}>Add</Button>
                        </DialogActions>
                    </DialogContent>
                </Dialog>
            </div>
            </div>
    </div>
  )
}

export default SuppOrder