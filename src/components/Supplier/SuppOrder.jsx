import React from 'react'
import '../Orders/neworder.css'
import './order.css'
import {Button, Autocomplete, TextField, Stack, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCategories } from '../../app/features/categories'
import { fetchProducts } from '../../app/features/products'
import { fetchSuppliers } from '../../app/features/supplier'

const SuppOrder = () => {
    const dispatch = useDispatch()
    const categories = useSelector((state) => state.categories.categories);
const products = useSelector((state) => state.products.products);
const suppliers = useSelector((state) => state.suppliers.suppliers);


    useEffect(() => {
        dispatch(fetchCategories())
        dispatch(fetchProducts())
        dispatch(fetchSuppliers())
    }, [dispatch])


    let orderid = 0
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
    const handleOpen = () => { setOpen(!open) }
    const handleOpen2 = () => { setOpen2(!open2) }
    const handleClose2 = () => { setOpen2(!open2) }
    const handleClose = () => { setOpen(!open) }
    function handleChange(event) {
        const {name, value} = event.target
        setSupplier(prevValue => ({ ...prevValue, [name]: value }));
    }
    async function addsupplier() {
        try{
            if(supplier.contact === '' || supplier.name === '' || supplier.address === '') {
                alert('Please fill all the fields')
                return
            }
            if(supplier.contact.length !== 11 || supplier.contact.match(/^[0-9]+$/) === null) {
                alert('Invalid Contact Number')
                return
            }
            supplier.contact = parseInt(supplier.contact)
            const response = await fetch(
                apiurl + 'supplier',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(supplier)
                })
            const data = await response.json()
            if (data.message === 'jwt expired') {
                window.location.href = '/login'
                localStorage.removeItem('token')
            }
            else{
                alert(data.message)
                setOpen(!open)
            }
        }
        catch(err) {
            console.log(err)
        }     
    }
    function setsupp(event, value) {
        if (value) {
          const supp = suppliers.find((supp) => supp.name === value.name);
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

    function addorder (){
        const supplierid = selsupp.id;
        const paymentStatus = 'Pending'
        const orderDate = new Date()
        const totalAmount = totalPrice
        const data = {
            paymentStatus,
            orderDate,
            totalAmount        
        }
        fetch (
            apiurl + `supplier/${supplierid}/orders`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            }
        )
        .then(res => res.json())
        .then(data => {
            if (data.message === 'jwt expired') {
                window.location.href = '/login'
                localStorage.removeItem('token')
            }
            else{
                orderid = data.id
                addorderdetails()
            }
        })
        .catch (err => {
            console.log(err)
        }
        )
    }

    function addorderdetails() {
        tableData.forEach((item) => {
            if(item.id === 0) {
                const data = {
                    name: item.name,
                    price: item.saleprice,
                    inventory: item.quantity,
                    supplierID: selsupp.id,
                    category : '6598314c83f3a0e6e47f50da',
                }
                fetch (
                    apiurl + 'products',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify(data)
                    }
                )
                .then(res => res.json())
                .then(data => {
                    if (data.message === 'jwt expired') {
                        window.location.href = '/login'
                        localStorage.removeItem('token')
                    }
                    else{
                        item.id = data.id
                        addorderdetails2(item)
                    }
                })
                .catch (err => {
                    console.log(err)
                }
                )
            }
            else {
                addorderdetails2(item)
            }
        })
    }

    function addorderdetails2(item) {
        const data = {
            productid: item.id,
            qty: item.quantity,
            unitPrice: item.price,
        }
        fetch (
            apiurl + `supplier/${selsupp.id}/orders/${orderid}/details`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(data => {
                if (data.message === 'jwt expired') {
                    window.location.href = '/login'
                    localStorage.removeItem('token')
                }
                else{
                    alert(data.message)
                    window.location.reload()
                }
            })
            .catch(err => {
                console.log(err)
            })
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
                    <Autocomplete
                        id="prod-category"
                        options={categories}
                        getOptionLabel={(option) => option.name}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Category" />}
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
                            <Button onClick={addorder}>Add</Button>
                        </DialogActions>
                    </DialogContent>
                </Dialog>
            </div>
            </div>
    </div>
  )
}

export default SuppOrder