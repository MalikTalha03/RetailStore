import React from 'react'
import './neworder.css'
import { useState } from 'react'
import {Button, Autocomplete, TextField} from '@mui/material'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material'


const NewOrder = () => {
    const top10Films = [
        { label: 'The Shawshank Redemption', year: 1994 },
    ];
    const [open, setOpen] = useState(false);
    const openpoup = () => {
        setOpen(true);
    }
    const closepopup = () => {
        setOpen(false);
    }
  return (
    <div className='container'>
        <div className='neworder'>
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
                        id="prod-name"
                        options={top10Films}
                        getOptionLabel={(option) => option.label}
                        sx={{ width: 300 }}
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
                    <Button variant="contained" onClick={openpoup}>Proceed</Button>
                </div>
            </div>
            
            <div className='popup' id='popup'>
                <Dialog
                    open={open} onClick={closepopup}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Order Placed Successfully"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <Autocomplete 
                                id='payment'
                                options={['Cash', 'Bank Account', 'Credit']}
                                getOptionLabel={(option) => option.label}
                                sx={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} label="Payment Method" />}
                            />
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button href="/neworder" autoFocus onClick= {closepopup}>
                        OK
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    </div>
  )
}

export default NewOrder