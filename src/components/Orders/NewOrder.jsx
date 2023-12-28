import React from 'react'
import './neworder.css'

const NewOrder = () => {
  return (
    <div className='container'>
        <form>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" />
            <label htmlFor="contact">Contact</label>
            <input type="text" id="contact" name="contact" />
            <label htmlFor="address">Address</label>
            <input type="text" id="address" name="address" />
            <label htmlFor="product">Product ID</label>
            <input type="text" id="product" name="product" />
            <label htmlFor="quantity">Quantity</label>
            <input type="number" id="quantity" name="quantity" />
        </form>
        <table>
            <thead>
                <tr>
                    <th>Product ID</th>
                    <th>Product Name</th>
                    <th>Unit Price</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
        <button type="submit" >Create Order</button>
    </div>
  )
}

export default NewOrder