import React from 'react'
import '../Orders/neworder.css'
import './order.css'
import {Button, Autocomplete, TextField, Stack, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProducts,setSelectedProduct,updateSelectedProduct } from '../../app/features/products'
import { fetchSuppliers,setSelectedSupplier } from '../../app/features/supplier'
import { setDialog1,setDialog2, setDialog3 } from '../../app/features/dialogslice'
import { setOrderdata } from '../../app/features/orderdata'
import Addsupplier from './Addsupplier'
import AddProduct from './AddProduct'
import ConfirmationDialog from './ConfirmationDialog'

const SuppOrder = () => {

    const dispatch = useDispatch()
    const products = useSelector((state) => state.products.products);
    const suppliers = useSelector((state) => state.suppliers.suppliers);
    const dialog1 = useSelector((state) => state.dialog.dialog1);
    const dialog2 = useSelector((state) => state.dialog.dialog2);
    const dialog3 = useSelector((state) => state.dialog.dialog3);
    const orderdata = useSelector((state) => state.orderdata.orderdata);
    const selectedProd = useSelector((state) => state.products.selectedProduct);
    const selectedSupp = useSelector((state) => state.suppliers.selectedSupplier);
    const selectedCat = useSelector((state) => state.categories.selectedCategory);

    useEffect(() => {
        dispatch(fetchProducts())
        dispatch(fetchSuppliers())
        if(!dialog1 || !dialog3) {
            dispatch(fetchProducts())
            dispatch(fetchSuppliers())
        }
    }, [dispatch, dialog1, dialog3])

    function setProduct(target, value) {
        if(value) {
            const prod = products.find((prod) => prod.name === value.name );
            if(prod) {
               dispatch(setSelectedProduct(prod))
            }
            else{
                dispatch(setSelectedProduct({
                    name: value,
                    id: 0,
                    saleprice: 0,
                    price: 0,
                    quantity: 0,
                }))
            }
        }
    }
    let orderid = 0    

    const apiurl = "http://localhost:3001/"
    const token = localStorage.getItem('token')
    function handleChange(event) {
        const name = event.target.name
        dispatch(setSelectedSupplier(name))
    }
    /*async function addsupplier() {
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
                dispatch(setDialog1(!dialog1))
            }
        }
        catch(err) {
            console.log(err)
        }     
    }*/
        
    function addTableData() {
        if(selectedProd) {
            const data = {
                id: selectedProd.id,
                name: selectedProd.name,
                price: selectedProd.price,
                quantity: selectedProd.quantity,
                total: selectedProd.price * selectedProd.quantity,
                saleprice: selectedProd.saleprice
            }
            dispatch(setOrderdata(data))
        }
    }

    const maptabledata = orderdata.map((item) => {
        return (
            <tr>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.quantity}</td>
                <td>{item.total}</td>
            </tr>
        )
    })
    
    const totalPrice = orderdata.reduce((total, item) => {
        return total + item.total
    }, 0)

    /*function addorder (){
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
    }*/

  return (
    <div className='container'>
        <div className='neworder'>
            <div className="addsupp">
                <Button variant="contained" onClick= {()=> dispatch(setDialog3(!dialog3))}>Add Product</Button>
                <Button variant="contained"onClick= {()=> dispatch(setDialog1(!dialog1))}>Add Supplier</Button>
            </div>
            <Addsupplier open={dialog1} onClose={ ()=> dispatch(setDialog1(!dialog1))}/>
            <AddProduct open={dialog3} onClose={ ()=> dispatch(setDialog3(!dialog3))}/>
            <form className='orderform'>
                <div className="form-group">
                    <Autocomplete
                        id="supplier-name"
                        options={suppliers}
                        getOptionLabel={(option) => option.name}
                        sx={{ width: 300 }}
                        onChange={(event, value) => dispatch(setSelectedSupplier(value))}
                        freeSolo
                        renderInput={(params) => <TextField {...params} label="Supplier" />}
                    />
                </div>
                <div className="form-group">
                    <Autocomplete
                        id="prod-name"
                        options={products}
                        getOptionLabel={(option) => option.name || selectedProd.name}
                        sx={{ width: 300 }}
                        onChange={(event, value) => dispatch(setSelectedProduct(value))}
                        renderInput={(params) => <TextField {...params} label="Product" />}
                    />
                </div>
                <div className="form-group">
                    <TextField
                        id="prod-qty"
                        label="Quantity"
                        type="number"
                        InputProps={{ inputProps: { min: 0 } }}
                        onChange={(e)=> dispatch(updateSelectedProduct({ name: 'quantity', value: e.target.valueAsNumber }))}
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
                        value={selectedProd.price}
                        InputProps={{ inputProps: { min: 0 } }}
                        onChange={(e) => dispatch(updateSelectedProduct({ name: 'price', value: e.target.valueAsNumber }))}
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
                        value={selectedProd.saleprice}
                        InputProps={{ inputProps: { min: 0 } }}
                        InputLabelProps={{
                        shrink: true,
                        }}
                        onChange={(e) => dispatch(updateSelectedProduct({ name: 'saleprice', value: e.target.valueAsNumber }))}
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
                    <Button variant="contained" onClick={ ()=> dispatch(setDialog2(!dialog2))}>Proceed</Button>
                </div>
                <ConfirmationDialog open={dialog2} onClose={ ()=> dispatch(setDialog2(!dialog2))} tabledata={maptabledata} totalPrice={totalPrice}/>
            </div>
            </div>
    </div>
  )
}

export default SuppOrder