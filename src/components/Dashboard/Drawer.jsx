import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
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
import { Divider } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  setDialog5,
  setDialog4,
  setDialog3,
  setDialog6,
  setDialog8,
} from "../../app/features/dialogslice";
import { useDispatch, useSelector } from "react-redux";
import Addsupplier from "../Supplier/Addsupplier";
import AddProduct from "../Supplier/AddProduct";
import AddCategory from "../Supplier/AddCategory";
import { Link } from "react-router-dom";
import SupplierPayment from "../Supplier/SupplierPayment";
import GetPaid from "../Orders/GetPaid";

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

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

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
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [isCollapse, setIsCollapse] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(activeSubMenu);
  }, [activeSubMenu]);

  useEffect(() => {
    console.log(isCollapse);
  }, [isCollapse]);

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
    setActiveSubMenu(null);
    setOpenSubmenus({});
  };

  const handleCollapse = () => {
    setIsCollapse(!isCollapse);
  };

  const sidebarItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
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
          title: "Open an Order",
          path: "/orders/open",
          icon: <FaIcons.FaCartArrowDown />,
        },
        {
          title: "Refund an Order",
          path: "/orders/refund",
          icon: <FaIcons.FaCartArrowDown />,
        },
        {
          title: "Add a Payment",
          path: "/orders/payment",
          icon: <FaIcons.FaCartArrowDown />,
        },
        {
          title: "All Orders",
          path: "/orders/all",
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
          path: "/products/all",
          icon: <FaIcons.FaList />,
        },
        {
          title: "Categories",
          path: "/products/categories",
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
          path: "/customers/add",
          icon: <FaIcons.FaUserPlus />,
        },
        {
          title: "All Customers",
          path: "/customers/all",
          icon: <FaIcons.FaList />,
        },
        {
          title: "Update Customer",
          path: "/customers/update",
          icon: <FaIcons.FaUserEdit />,
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
          path: "/suppliers/all",
          icon: <FaIcons.FaList />,
        },
        {
          title: "Update Supplier",
          path: "/suppliers/update",
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
          path: "/employees/add",
          icon: <FaIcons.FaUserPlus />,
        },
        {
          title: "All Employees",
          path: "/employees/all",
          icon: <FaIcons.FaList />,
        },
        {
          title: "Update Employee",
          path: "/employees/update",
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
      path: "/settings",
      icon: <FaIcons.FaCog />,
      cName: "nav-text",
      subOptions: [],
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <div className="nav" style={{ marginLeft: "66px" }}>
        <h1>Sufi Traders</h1>
      </div>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader />
        <Divider />
        <List onMouseLeave={handleDrawerClose} onMouseEnter={handleDrawerOpen}>
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
      <GetPaid 
        open={dialog8}
        onClose={() => dispatch(setDialog8(!dialog8))}
      />
    </Box>
  );
}
