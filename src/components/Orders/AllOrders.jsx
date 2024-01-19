import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCustOrders } from "../../app/features/customer"; 
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
import OrderDetail from "./OrderDetail";
import {
  FormControl,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import RefundOrder from "./RefundOrder";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "4rem",
  },
  tableContainer: {
    width: "89%",
    "& th:first-child": {
      borderRadius: "1em 0 0 1em",
    },
    "& th:last-child": {
      borderRadius: "0 1em 1em 0",
    },
  },
  thead: {
    "& th:first-child": {
      borderRadius: "1em 0 0 1em",
    },
    "& th:last-child": {
      borderRadius: "0 1em 1em 0",
    },
  },
  oddRow: {
    backgroundColor: "#f9f9f9",
  },

  evenRow: {
    backgroundColor: "#ffffff",
  },
  button: {
    backgroundColor: "#4caf50",
    color: "#ffffff",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
    width: "50%",
    marginLeft: "1rem",
    fontSize: "0.9rem",
  },
  searchBarContainer: {
    width: "89%",
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "1rem",
  },
  searchBar: {
    width: "20%",
  },
  formControl: {
    minWidth: 120,
    alignSelf: "flex-end",
  },
  refund: {
    backgroundColor: "#f44336",
  },
}));

const columns = [
  { id: "customerName", label: "Customer Name", minWidth: 170 },
  { id: "orderDate", label: "Order Date", minWidth: 170 },
  { id: "totalAmount", label: "Total Amount", minWidth: 100 },
  { id: "paymentStatus", label: "Payment Status", minWidth: 170 },
];

const sortOptions = [
  { value: "orderDate", label: "Order Date" },
  { value: "customerName", label: "Customer Name" },
  { value: "totalAmount", label: "Total Amount" },
  { value: "paymentStatus", label: "Payment Status" },
];

const AllOrders = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customers.custOrders);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [orderid, setOrderid] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortCriteria, setSortCriteria] = useState({
    column: "orderDate",
    order: "desc",
  });

  useEffect(() => {
    dispatch(fetchCustOrders());
  }, [dispatch]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSort = (columnId) => {
    setSortCriteria((prevSortCriteria) => ({
      column: columnId,
      order:
        prevSortCriteria.column === columnId && prevSortCriteria.order === "asc"
          ? "desc"
          : "asc",
    }));
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
      customer.orders.map((order) => ({
        ...order,
        customerName: `${customer.firstname} ${customer.lastname}`,
      }))
    )
  );

  sortedOrders.sort((a, b) => {
    const columnA = a[sortCriteria.column];
    const columnB = b[sortCriteria.column];

    if (columnA < columnB) {
      return sortCriteria.order === "asc" ? -1 : 1;
    }
    if (columnA > columnB) {
      return sortCriteria.order === "asc" ? 1 : -1;
    }
    return 0;
  });

  return (
    <div className={classes.root}>
      <div className={classes.searchBarContainer}>
        <TextField
          className={classes.searchBar}
          label="Search Order by Customer"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "20%",
          }}
        >
          <Typography
            sx={{ fontWeight: "bold", fontSize: "1.2rem", marginRight: "1rem" }}
          >
            Sort By:{" "}
          </Typography>
          <FormControl className={classes.formControl}>
            <Select
              value={sortCriteria.column}
              onChange={(e) => handleSort(e.target.value)}
              displayEmpty
            >
              {sortOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>

      <Paper className={classes.tableContainer}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead className={classes.thead}>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align="left"
                    style={{ minWidth: column.minWidth, cursor: "pointer" }}
                    sx={{
                      fontWeight: "bold",
                      backgroundColor: "#9f9f9f",
                      color: "#000000",
                    }}
                    onClick={() => handleSort(column.id)}
                  >
                    {column.label}
                    {sortCriteria.column === column.id && (
                      <span>{sortCriteria.order === "asc" ? " ▲" : " ▼"}</span>
                    )}
                  </TableCell>
                ))}
                <TableCell
                  align="left"
                  style={{
                    minWidth: 100,
                    fontWeight: "bold",
                    backgroundColor: "#9f9f9f",
                    color: "#000000",
                  }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedOrders
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((order, index) => (
                  <TableRow
                    key={order._id}
                    className={
                      index % 2 === 0 ? classes.evenRow : classes.oddRow
                    }
                  >
                    {columns.map((column) => (
                      <TableCell key={column.id} align="left">
                        {column.id === "orderDate"
                          ? new Date(order.orderDate).toLocaleDateString()
                          : column.id === "customerName"
                          ? order[column.id]
                          : order[column.id] || order[column.id]}
                      </TableCell>
                    ))}
                    <TableCell align="left" sx={{ display: "flex" }}>
                      <button
                        className={classes.button}
                        onClick={() => {
                          setOpen(true);
                          setOrderid(order._id);
                        }}
                      >
                        Open Details
                      </button>
                      <button
                        className={classes.button + " " + classes.refund}
                        onClick={() => {
                          setOpen2(true);
                          setOrderid(order._id);
                        }}
                      >
                        Refund
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
      <OrderDetail
        open={open}
        onClose={() => setOpen(false)}
        orderId={orderid}
      />
      <RefundOrder
        open={open2}
        onClose={() => setOpen2(false)}
        orderId={orderid}
      />
    </div>
  );
};

export default AllOrders;
