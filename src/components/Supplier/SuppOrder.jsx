import React from 'react'
import '../Orders/css/neworder.css'
import './order.css'
import {Button, Autocomplete, TextField } from '@mui/material'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProducts,setSelectedProduct,updateSelectedProduct } from '../../app/features/products'
import { fetchSuppliers,setSelectedSupplier } from '../../app/features/supplier'
import { setDialog1,setDialog2, setDialog3 } from '../../app/features/dialogslice'
import { setOrderdata } from '../../app/features/orderdata'
import Addsupplier from './Addsupplier'
import AddProduct from './AddProduct'
import ConfirmationDialog from './ConfirmationDialog'
import checkToken from '../loggedin';

const SuppOrder = () => {
    checkToken();
    const dispatch = useDispatch()
    const products = useSelector((state) => state.products.products);
    const suppliers = useSelector((state) => state.suppliers.suppliers);
    const dialog1 = useSelector((state) => state.dialog.dialog1);
    const dialog2 = useSelector((state) => state.dialog.dialog2);
    const dialog3 = useSelector((state) => state.dialog.dialog3);
    const orderdata = useSelector((state) => state.orderdata.orderdata);
    const selectedProd = useSelector((state) => state.products.selectedProduct);

    useEffect(() => {
        dispatch(fetchProducts())
        dispatch(fetchSuppliers())
        if(!dialog1 || !dialog3) {
            dispatch(fetchProducts())
            dispatch(fetchSuppliers())
        }
    }, [dispatch, dialog1, dialog3])
        
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

  return (
    <div className='container'>
        <div className='neworder'>
            <div className="addsupp">
                <Button variant="contained" onClick= {()=> dispatch(setDialog3(!dialog3))}>Add Product</Button>
                <Button variant="contained"onClick= {()=> dispatch(setDialog1(!dialog1))}>Add Supplier</Button>
                <Button variant="contained">Add Category</Button>
                <Button variant="contained">Pay Supplier </Button>
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