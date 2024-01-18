import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCustOrders } from '../../app/features/customer'; // Replace with your correct path

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import OrderDetail from './OrderDetail';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '3rem',
  },
  tableContainer: {
    width: '89%',
    '& th:first-child': {
        borderRadius: '1em 0 0 1em'
      },
      '& th:last-child': {
        borderRadius: '0 1em 1em 0'
      }
  },
  thead: {
    '& th:first-child': {
      borderRadius: '1em 0 0 1em'
    },
    '& th:last-child': {
      borderRadius: '0 1em 1em 0'
    }
  },
  oddRow: {
    backgroundColor: '#f9f9f9', 
  },

  evenRow: {
    backgroundColor: '#ffffff', 
  },
  button: {
    backgroundColor: '#4caf50', // Choose your desired color
    color: '#ffffff', // Choose your desired color
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
}));

const columns = [
  { id: 'customerName', label: 'Customer Name', minWidth: 170 },
  { id: 'orderDate', label: 'Order Date', minWidth: 170 },
  { id: 'totalAmount', label: 'Total Amount', minWidth: 100 },
  { id: 'paymentStatus', label: 'Payment Status', minWidth: 170 },
];

const AllOrders = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customers.custOrders);
    const [open, setOpen] = useState(false);
    const [orderid, setOrderid] = useState('');


  useEffect(() => {
    dispatch(fetchCustOrders());
  }, [dispatch]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const filteredRows = customers.filter((customer) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      customer.firstname.toLowerCase().includes(searchTermLower) ||
      customer.lastname.toLowerCase().includes(searchTermLower)
    );
  });

  const sortedOrders = [].concat.apply(
    [],
    filteredRows.map((customer) =>
      customer.orders.map((order) => ({ ...order, customerName: `${customer.firstname} ${customer.lastname}` }))
    )
  );

  // Sort orders by orderDate in descending order
  sortedOrders.sort((a, b) => new Date(b.orderDate.$date) - new Date(a.orderDate.$date));

  return (
    <div className={classes.root}>
      <TextField
        label="Search Order"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Paper className={classes.tableContainer}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead className = {classes.thead}>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align="left"
                    style={{ minWidth: column.minWidth }}
                    sx={{ fontWeight: "bold", backgroundColor : "#9f9f9f", color: "#000000" }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                <TableCell align="left" style={{ minWidth: 100, fontWeight: 'bold', backgroundColor: '#9f9f9f', color: '#000000' }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedOrders
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((order,index) => (
                  <TableRow key={order._id}
                  className={index % 2 === 0 ? classes.evenRow : classes.oddRow}> 
                    {columns.map((column) => (
                      <TableCell key={column.id} align="left">
                        {column.id === 'orderDate'
                          ? new Date(order.orderDate).toLocaleDateString()
                          : column.id === 'customerName'
                          ? order[column.id]
                          : order[column.id] || order[column.id]}
                      </TableCell>
                      
                    ))}
                    <TableCell align="left">
                      <button
                        className={classes.button}
                        onClick={() => { setOpen(true); setOrderid(order._id);}}
                        >
                        Open Details
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={sortedOrders.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <OrderDetail open={open} onClose={() => setOpen(false)} orderId = {orderid}/>
    </div>
  );
};

export default AllOrders;
