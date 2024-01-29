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
import employee, { fetchEmployees } from "../../app/features/employee";  // Update the import path
import Button from "@mui/material/Button";
import EditEmployee from "./EditEmployee";  // Assuming you have an EditEmployee component

const useStyles = makeStyles((theme) => ({
  // Your existing styles
}));

const columns = [
  { id: "firstname", label: "First Name", minWidth: 170 },
  {
    id: "lastname",
    label: "Last Name",
    minWidth: 170,
  },
  { id: "contact", label: "Contact", minWidth: 100 },
  // Add more columns as needed
];

const AllEmployees = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [eid, setEid] = useState("");  // Assuming employee id

  useEffect(() => {
    dispatch(fetchEmployees());  // Dispatch action to fetch employees
  }, [dispatch]);

  const employees = useSelector((state) => state.employees.employees);  // Update the selector

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const filteredEmployees = employees.filter((employee) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      employee.firstname.toLowerCase().includes(searchTermLower) ||
      employee.lastname.toLowerCase().includes(searchTermLower) ||
      employee.contact.toLowerCase().includes(searchTermLower)
    );
  });

  return (
    <div className={classes.root}>
      <Paper className={classes.tableContainer}>
        <div className={classes.searchBarContainer}>
          <TextField
            className={classes.searchBar}
            label="Search Employee"
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
                <TableCell
                  align="left"
                  style={{
                    minWidth: 170,
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
              {filteredEmployees
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((employee, index) => (
                  <TableRow
                    key={employee._id}
                    className={
                      index % 2 === 0 ? classes.evenRow : classes.oddRow
                    }
                  >
                    {columns.map((column) => (
                      <TableCell key={column.id} align="left">
                        {column.format &&
                        typeof employee[column.id] === "number"
                          ? column.format(employee[column.id])
                          : column.format
                          ? column.format(employee)
                          : employee[column.id]}
                      </TableCell>
                    ))}
                    <TableCell align="left">
                      <Button
                        className={classes.button}
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          setOpen(true);
                          setEid(employee._id);
                        }}
                      >
                        Update
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={filteredEmployees.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <EditEmployee
        open={open}
        handleClose={() => setOpen(false)}
        employeeid={eid}
      />
    </div>
  );
};

export default AllEmployees;
