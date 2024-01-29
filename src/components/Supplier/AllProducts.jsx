import React, { useEffect, useState } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../app/features/products";
import checkToken from "../loggedin";

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
  searchBarContainer: {
    width: "89%",
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "1rem",
  },
  searchBar: {
    width: "20%",
  },
}));

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  {
    id: "supplier",
    label: "Supplier",
    minWidth: 170,
    format: (value) => value.supplierID.name,
  },
  { id: "price", label: "Unit Price", minWidth: 100 },
  {
    id: "inventory",
    label: "Inventory",
    minWidth: 170,
    format: (value) => value.toLocaleString("en-US"),
  },
];

const AllProducts = () => {
  checkToken();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const products = useSelector((state) => state.products.products);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const filteredProducts = products.filter((product) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      product.name.toLowerCase().includes(searchTermLower) ||
      product.price.toString().includes(searchTermLower) ||
      product.inventory.toString().includes(searchTermLower)
    );
  });

  return (
    <div className={classes.root}>
      <Paper className={classes.tableContainer}>
        <div className={classes.searchBarContainer}>
          <TextField
            className={classes.searchBar}
            label="Search Product"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead className={classes.thead}>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align="left"
                    style={{
                      minWidth: column.minWidth,
                      fontWeight: "bold",
                      backgroundColor: "#9f9f9f",
                      color: "#000000",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProducts
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((product, index) => (
                  <TableRow
                    key={product._id}
                    className={
                      index % 2 === 0 ? classes.evenRow : classes.oddRow
                    }
                  >
                    {columns.map((column) => (
                      <TableCell key={column.id} align="left">
                        {column.format && typeof product[column.id] === "number"
                          ? column.format(product[column.id])
                          : column.format
                          ? column.format(product)
                          : product[column.id]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={filteredProducts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default AllProducts;
