import React from 'react'
import './neworder.css'
import {Button, Autocomplete, TextField} from '@mui/material'


const NewOrder = () => {
    const top10Films = [
        { label: 'The Shawshank Redemption', year: 1994 },
    ];
  return (
    <div className='container'>
        <div className='neworder'>
            <form>
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
                            <td>2</td>
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
                </table>

                <div className='proceed'>
                    <Button variant="contained">Proceed</Button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default NewOrder