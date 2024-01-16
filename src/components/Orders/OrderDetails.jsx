import React from 'react'
import './css/details.css'
import './css/neworder.css'
import { useState } from 'react'
import {Autocomplete, Button, TextField, Typography} from '@mui/material'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material'

const OrderDetails = () => {
    const [open, setOpen] = useState(false)
    const handleclick = () => {
        setOpen(!open)
    }
    const handlePrint = () => {
        const shopname = 'Sufi Traders';
        const shopaddress = 'Railway Road, Bhakkar';
        const shopcontact = '0333-6845939';
        const orderid = '123456';
        const totalamount = '800';
        const amountpaid = '600';
        const amountdue = '200';
        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth() + 1; // Months are zero-based
        const year = date.getFullYear();
        const hour = date.getHours();
        const minute = date.getMinutes();
        const second = date.getSeconds();
        const datetime = `${day}/${month}/${year} ${hour}:${minute}:${second}`;
      
        const printContent = document.getElementById('table').outerHTML;
        
        // Create a new window for printing
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
          <html>
            <head>
              <title>Print Receipt</title>
            </head>
            <body>
                <h1>${shopname}</h1>
                <p>${shopaddress}</p>
                <p>Contact: ${shopcontact}</p>
                <p>Date: ${datetime}</p>
                <p>Order ID: ${orderid}</p>
                <p>Total Amount: ${totalamount}</p>
                <p>Amount Paid: ${amountpaid}</p>
                <p>Amount Due: ${amountdue}</p>            
                ${printContent}
                <p>Thank you for shopping with us!</p>
            </body>
          </html>
        `);
      
        // Trigger the print dialog
        printWindow.print();
      
        setOpen(!open)
      };

  return (
    <div>
        <div className='container'>
            <div className='orderdetails'>
                <form className='orderform'>
                    <div className='form-group'>
                    <TextField
                        id="outlined-number"
                        label="Contact No."
                        type="string"
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
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                    </div>
                    <div className="form-group">
                        <Autocomplete 
                            id="payment-method"
                            options={['Cash', 'Credit', 'Bank Transfer']}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Payment Method" />}
                        />
                    </div>
                    <div className='form-group'>
                    <TextField
                        id="outlined-number"
                        label="Total Amount"
                        type="number"
                        InputProps={{ inputProps: { min: 0 } }}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                    </div>
                    <div className='form-group'>
                    <TextField
                        id="outlined-number"
                        label="Amount"
                        type="number"
                        InputProps={{ inputProps: { min: 0 } }}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                    </div>
                </form>
                <div className='table' id='table'>
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
                        <Button variant="contained" onClick={handleclick}>Proceed</Button>
                    </div>
                    <Dialog open={open}>
                        <DialogTitle>Order Placed Successfully</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                <Typography variant='h6'>Order ID: 123456</Typography>
                                <Typography variant='h6'>Total Amount: 800</Typography>
                                <Typography variant='h6'>Amount Paid: 600</Typography>
                                <Typography variant='h6'>Amount Due: 200</Typography>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button variant="contained" onClick={handlePrint}>Print Receipt</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        </div>
    </div>
  )
}

export default OrderDetails