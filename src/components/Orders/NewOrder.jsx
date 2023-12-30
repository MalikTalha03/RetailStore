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
                    <Autocomplete
                        id="combo-box-demo"
                        options={top10Films}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Combo box" />}
                    />
                </div>
                <div className='form-group'>
                    <TextField
                        id="outlined-number"
                        label="Quantity"
                        type="number"
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                </div>
                <div className='form-group'>
                    <TextField
                        id="outlined-number"
                        label="Price"
                        type="number"
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                </div>
                <div className='form-group'>
                    <TextField
                        id="outlined-number"
                        label="Total"
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
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Product 1</td>
                            <td>1</td>
                            <td>100</td>
                            <td>100</td>
                        </tr>
                    </tbody>
                </table>

                <div className='total'>
                    <h3>Total: 100</h3>

                    <Button variant="contained">Save</Button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default NewOrder