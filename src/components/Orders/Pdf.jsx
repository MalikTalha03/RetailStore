// OrderPdf.js
import React from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import * as DialogComp from '@mui/material';

const OrderPdf = ({ order }) => {
  const generatePdf = async () => {
    const pdf = new jsPDF();

    // Get the content of the component
    const element = document.getElementById('orderDetails');

    // Use html2canvas to capture the HTML content as an image
    const canvas = await html2canvas(element);

    // Convert the image to a data URL
    const dataUrl = canvas.toDataURL();

    // Add the image to the PDF
    pdf.addImage(dataUrl, 'PNG', 0, 0);

    // Save or display the PDF
    pdf.save('order.pdf');
  };

  return (
    <div>
        <DialogComp.Dialog open={order} onClose={() => {}}>
            <DialogComp.DialogTitle>Order Details</DialogComp.DialogTitle>
            <DialogComp.DialogContent>
            <div id="orderDetails">
                <h1>Order Details</h1>
                <p>Order ID: </p>
                <p>Order Date: 12/12/2021</p>
                <p>Customer Name: John Doe</p>
                <p>Customer Contact: 123456789</p>
                <p>Customer Address: 123, Main St, New York</p>
                <table>
                <thead>
                    <tr>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>Product 1</td>
                    <td>2</td>
                    <td>100</td>
                    <td>200</td>
                    </tr>
                    <tr>
                    <td>Product 2</td>
                    <td>1</td>
                    <td>200</td>
                    <td>200</td>
                    </tr>
                </tbody>
                </table>
                <p>Total: 400</p>
            </div>
            </DialogComp.DialogContent>
            <DialogComp.DialogActions>
            <button onClick={generatePdf}>Generate PDF</button>
            </DialogComp.DialogActions>
        </DialogComp.Dialog>
    </div>
  );
};

export default OrderPdf;
