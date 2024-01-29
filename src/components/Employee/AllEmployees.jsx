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
import Button from "@mui/material/Button";
import EditEmployee from "./EditEmployee";
import { makeStyles } from "@mui/styles";
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
  button: {
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "green",
    },
  },
}));

const columns = [
  { id: "firstname", label: "First Name", minWidth: 170 },
  {
    id: "lastname",
    label: "Last Name",
    minWidth: 170,
  },
  { id: "contact", label: "Contact", minWidth: 100 },
];

const AllEmployees = () => {
  checkToken();
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [eid, setEid] = useState("");

  const fetchEmployees = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}employee`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch employees");
      }

      const employeesData = await response.json();
      setEmployees(employeesData);
    } catch (error) {
      console.error("Error fetching employees:", error.message);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

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