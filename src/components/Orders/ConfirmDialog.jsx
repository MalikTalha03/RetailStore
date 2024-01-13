import React from 'react'
import { Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions, Button } from '@mui/material'
import '../Supplier/order.css'
import '../Orders/neworder.css'
import { useSelector } from 'react-redux'


const ConfirmationDialog = ({open, onClose, tabledata, totalPrice}) => {
    const selectedCustomer = useSelector(state => state.customers.selectedCustomer);
    const orderData = useSelector(state => state.orderdata.orderdata);
    const customerid = selectedCustomer && selectedCustomer.length > 0 ? selectedCustomer[0]._id : null;
    const token = localStorage.getItem('token');
    const api = 'http://localhost:3001/'
    const [employee, setEmployeeid] = React.useState(null)
    const emp= async ()=>{
            try{
                const data = await fetch(api +`employee/token/${localStorage.getItem('token')}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },                })
                const response = await data.json()
                if(response.message === 'jwt expired'){
                    localStorage.removeItem('token')
                    window.location.reload()
                }
                else{
                    localStorage.setItem('employeeid', response.id)
                }
            }
            catch(err){
                console.log(err)
            }
    }
    emp()
    async function addOrder(){
        try{
            console.log(api +`customer/${customerid}/orders`)
            const data = await fetch(api +`customer/${customerid}/orders`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    orderDate: new Date(),
                    paymentStatus: 'Pending',
                    employeeid : localStorage.getItem('employeeid')
                })
            })
            const response = await data.json()
            const orderid = response.id
            console.log(response)
            if(response.message === 'jwt expired'){
                localStorage.removeItem('token')
                window.location.reload()
            }
            else{
                try{
                    orderData.forEach(async (item) => {
                        console.log(item)
                        const data = await fetch(api +`customer/${customerid}/orders/${orderid}/details`, {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                            },
                            body: JSON.stringify({
                                productid: item.id,
                                qty: item.quantity,
                                unitPrice: item.price
                            })
                        })
                        const response = await data.json()
                        if(response.message === 'jwt expired'){
                            localStorage.removeItem('token')
                            window.location.reload()
                        }
                        else{
                            alert(response.message)
                            window.location.reload()
                        }
                    })
                }
                catch(err){
                    console.log(err)
                }
            }
        }
        catch(err){
            console.log(err)
        }
    }
        
  return (
    <div>
        <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth='md' >
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
                                    {tabledata}
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
                            <Button onClick={onClose}>Cancel</Button>
                            <Button onClick={addOrder}>Add</Button>
                        </DialogActions>
                    </DialogContent>
                </Dialog>
    </div>
  )
}

export default ConfirmationDialog