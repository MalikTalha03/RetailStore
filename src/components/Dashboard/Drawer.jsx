import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import "./navbar.css";
import * as FaIcons from "react-icons/fa";
import { useState } from "react";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import {
  setDialog5,
  setDialog4,
  setDialog3,
  setDialog6,
  setDialog8,
  setDialog9,
} from "../../app/features/dialogslice";
import { useDispatch, useSelector } from "react-redux";
import Addsupplier from "../Supplier/Addsupplier";
import AddProduct from "../Supplier/AddProduct";
import AddCategory from "../Supplier/AddCategory";
import { Link } from "react-router-dom";
import SupplierPayment from "../Supplier/SupplierPayment";
import GetPaid from "../Customer/GetPaid";
import UpdateCustomer from "../Customer/UpdateCustomer";
import AddEmployee from "../Employee/AddEmployee";
import { Button } from "@mui/material";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const dialog5 = useSelector((state) => state.dialog.dialog5);
  const dialog3 = useSelector((state) => state.dialog.dialog3);
  const dialog4 = useSelector((state) => state.dialog.dialog4);
  const dialog6 = useSelector((state) => state.dialog.dialog6);
  const dialog8 = useSelector((state) => state.dialog.dialog8);
  const dialog9 = useSelector((state) => state.dialog.dialog9);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [addEmp, setAddEmp] = useState(false);
  const dispatch = useDispatch();

  const [openSubmenus, setOpenSubmenus] = useState({});

  const handleSubMenuClick = (item) => {
    const submenuKey = item.title;
    setOpenSubmenus((prevOpenSubmenus) => ({
      ...prevOpenSubmenus,
      [submenuKey]: !prevOpenSubmenus[submenuKey],
    }));

    if (item.path) {
      navigate(item.path);
    }
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setOpenSubmenus({});
  };

  const sidebarItems = [
    {
      title: "Dashboard",
      path: "/",
      icon: <FaIcons.FaHome />,
      cName: "nav-text",
      subOptions: [],
    },
    {
      title: "Orders",
      icon: <FaIcons.FaCartPlus />,
      cName: "nav-text",
      subOptions: [
        {
          title: "New Order",
          path: "/neworder",
          icon: <FaIcons.FaCartPlus />,
        },
        {
          title: "Get Paid",
          icon: <FaIcons.FaCartArrowDown />,
          onClick: () => dispatch(setDialog8(!dialog8)),
        },
        {
          title: "Web Orders",
          path: "/weborders",
          icon: <FaIcons.FaCartArrowDown />,
        },
        {
          title: "Refund an Order",
          path: "/allorders",
          icon: <FaIcons.FaCartArrowDown />,
        },
        {
          title: "All Orders",
          path: "/allorders",
          icon: <FaIcons.FaCartArrowDown />,
        },
      ],
    },
    {
      title: "Products",
      icon: <FaIcons.FaProductHunt />,
      cName: "nav-text",
      subOptions: [
        {
          title: "Add Product",
          icon: <FaIcons.FaPlus />,
          onClick: () => dispatch(setDialog3(!dialog3)),
        },
        {
          title: "Add Category",
          icon: <FaIcons.FaPlus />,
          onClick: () => dispatch(setDialog4(!dialog4)),
        },
        {
          title: "All Products",
          path: "/products",
          icon: <FaIcons.FaList />,
        },
      ],
    },
    {
      title: "Customers",
      icon: <FaIcons.FaUsers />,
      cName: "nav-text",
      subOptions: [
        {
          title: "Find Customer",
          path: "/customers",
          icon: <FaIcons.FaUserPlus />,
        },
        {
          title: "All Customers",
          path: "/customers",
          icon: <FaIcons.FaList />,
        },
        {
          title: "Update Customer",
          icon: <FaIcons.FaUserEdit />,
          onClick: () => dispatch(setDialog9(!dialog9)),
        },
      ],
    },
    {
      title: "Suppliers",
      icon: <FaIcons.FaUserTie />,
      cName: "nav-text",
      subOptions: [
        {
          title: "New Order",
          path: "/suporder",
          icon: <FaIcons.FaCartPlus />,
        },
        {
          title: "Pay Supplier",
          icon: <FaIcons.FaCartPlus />,
          onClick: () => dispatch(setDialog6(!dialog6)),
        },
        {
          title: "Add Supplier",
          icon: <FaIcons.FaUserPlus />,
          onClick: () => dispatch(setDialog5(!dialog5)),
        },
        {
          title: "All Suppliers",
          path: "/suppliers",
          icon: <FaIcons.FaList />,
        },
        {
          title: "Update Supplier",
          path: "/suppliers",
          icon: <FaIcons.FaUserEdit />,
        },
      ],
    },
    {
      title: "Employees",
      icon: <FaIcons.FaUser />,
      cName: "nav-text",
      subOptions: [
        {
          title: "Add Employee",
          icon: <FaIcons.FaUserPlus />,
          onClick: () => setAddEmp(!addEmp),
        },
        {
          title: "All Employees",
          path: "/employees",
          icon: <FaIcons.FaList />,
        },
        {
          title: "Update Employee",
          path: "/employees",
          icon: <FaIcons.FaUserEdit />,
        },
      ],
    },
    {
      title: "Reports",
      icon: <FaIcons.FaChartBar />,
      cName: "nav-text",
      subOptions: [],
    },
    {
      title: "Settings",
      icon: <FaIcons.FaCog />,
      cName: "nav-text",
      subOptions: [],
    },
  ];

  const logout = () => {
    console.log("logout");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <div
        className="nav"
        style={{
          marginLeft: "66px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 style={{ marginLeft: "20px" }}>Sufi Traders</h1>
        <Button
          onClick={logout}
          variant="contained"
          style={{
            marginRight: "150px",
            backgroundColor: "#FF0000",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "14px",
            borderRadius: "50px",
            padding: "10px",
            textTransform: "capitalize",
            width: "100px",
          }}
        >
          Logout
        </Button>
      </div>
      <Drawer variant="permanent" open={open}>
        <List
          onMouseLeave={handleDrawerClose}
          onMouseEnter={handleDrawerOpen}
          sx={{ marginTop: "36px" }}
        >
          {sidebarItems.map((item, index) => (
            <React.Fragment key={index}>
              <ListItem
                disablePadding
                sx={{ display: "block" }}
                onClick={() => handleSubMenuClick(item)}
              >
                <ListItemButton sx={{ minHeight: 48, px: 2.5 }}>
                  <ListItemIcon sx={{ minWidth: 0, mr: 5 }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.title} />
                  {item.subOptions.length > 0 &&
                    (openSubmenus[item.title] ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    ))}
                </ListItemButton>
              </ListItem>
              <Collapse
                in={openSubmenus[item.title]}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding sx={{ ml: 3 }}>
                  {item.subOptions.map((subOption, subIndex) => (
                    <ListItem
                      key={subIndex}
                      disablePadding
                      sx={{ display: "block" }}
                    >
                      {subOption.path ? (
                        <Link
                          to={subOption.path}
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          <ListItemButton sx={{ minHeight: 48, px: 2.5 }}>
                            <ListItemIcon sx={{ minWidth: 0, mr: 5 }}>
                              {subOption.icon}
                            </ListItemIcon>
                            <ListItemText primary={subOption.title} />
                          </ListItemButton>
                        </Link>
                      ) : (
                        <ListItemButton
                          sx={{ minHeight: 48, px: 2.5 }}
                          onClick={
                            subOption.onClick ? subOption.onClick : undefined
                          }
                        >
                          <ListItemIcon sx={{ minWidth: 0, mr: 5 }}>
                            {subOption.icon}
                          </ListItemIcon>
                          <ListItemText primary={subOption.title} />
                        </ListItemButton>
                      )}
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </React.Fragment>
          ))}
        </List>
      </Drawer>
      <Addsupplier
        open={dialog5}
        onClose={() => dispatch(setDialog5(!dialog5))}
      />
      <AddProduct
        open={dialog3}
        onClose={() => dispatch(setDialog3(!dialog3))}
      />
      <AddCategory
        open={dialog4}
        onClose={() => dispatch(setDialog4(!dialog4))}
      />
      <SupplierPayment
        open={dialog6}
        onClose={() => dispatch(setDialog6(!dialog6))}
      />
      <UpdateCustomer
        open={dialog9}
        onClose={() => dispatch(setDialog9(!dialog9))}
      />
      <GetPaid open={dialog8} onClose={() => dispatch(setDialog8(!dialog8))} />
      <AddEmployee open={addEmp} onClose={() => setAddEmp(!addEmp)} />
    </Box>
  );
}
