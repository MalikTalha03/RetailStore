import React from 'react'
import { useState } from 'react'
import './order.css'
import '../Orders/neworder.css'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, TextField } from '@mui/material'

const Addsupplier = ({open, onClose}) => {
    const [supplier, setSupplier] = useState({
        name: '',
        address: '',
        contact: ''
    })

    function handleChange(e){
        const {name, value} = e.target
        setSupplier(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    async function addsupplier(){
        try{
            const data = await fetch('http://localhost:3001/supplier', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                },
                body: JSON.stringify(supplier)
            })
            const response = await data.json()
            if(response.message === 'jwt expired'){
                localStorage.removeItem('token')
                window.location.reload()
            }
            else{
                alert(response.message)
            }
        }
        catch(err){
            console.log(err)
        }
    }
    
  return (
    <div>
        <Dialog className='dialog' id = 'dialog' open={open} onClose={onClose}>
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
                        <Button onClick={onClose}>Cancel</Button>
                        <Button onClick={addsupplier}>Add</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
    </div>
  )
}

export default Addsupplier