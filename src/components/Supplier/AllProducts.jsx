import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "price", label: "Price", minWidth: 100 },
  {
    id: "inventory",
    label: "Inventory",
    minWidth: 170,
    format: (value) => value.toLocaleString("en-US"),
  },
];

const rows = [
  { name: "Product 1", price: 100, inventory: 100 },
  { name: "Product 2", price: 200, inventory: 200 },
  { name: "Product 3", price: 300, inventory: 300 },
  { name: "Product 4", price: 400, inventory: 400 },
  { name: "Product 5", price: 500, inventory: 500 },
  { name: "Product 6", price: 600, inventory: 600 },
  { name: "Product 7", price: 700, inventory: 700 },
  { name: "Product 8", price: 800, inventory: 800 },
  { name: "Product 9", price: 900, inventory: 900 },
  { name: "Product 10", price: 1000, inventory: 1000 },
  { name: "Product 11", price: 1100, inventory: 1100 },
  { name: "Product 12", price: 1200, inventory: 1200 },
  { name: "Product 13", price: 1300, inventory: 1300 },
  { name: "Product 14", price: 1400, inventory: 1400 },
  { name: "Product 15", price: 1500, inventory: 1500 },
  { name: "Product 16", price: 1600, inventory: 1600 },
  { name: "Product 17", price: 1700, inventory: 1700 },
  { name: "Product 18", price: 1800, inventory: 1800 },
  { name: "Product 19", price: 1900, inventory: 1900 },
  { name: "Product 20", price: 2000, inventory: 2000 },
];

export default function ColumnGroupingTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ top: 57, minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
