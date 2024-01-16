import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import './navbar.css';
import * as FaIcons from 'react-icons/fa';
import { useState } from 'react';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Divider } from '@mui/material';
import { useEffect } from 'react';


const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [isCollapse, setIsCollapse] = useState(false);

  useEffect(() => {
    console.log(activeSubMenu);
  }, [activeSubMenu]);

  useEffect(() => {
    console.log(isCollapse);
  }
  , [isCollapse]);

  const [openSubmenus, setOpenSubmenus] = useState({});

  const handleSubMenuClick = (item) => {
    const submenuKey = item.title;

    // Toggle the submenu state
    setOpenSubmenus((prevOpenSubmenus) => ({
      ...prevOpenSubmenus,
      [submenuKey]: !prevOpenSubmenus[submenuKey],
    }));
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
      title: 'Dashboard',
      path: '/dashboard',
      icon: <FaIcons.FaHome />,
      cName: 'nav-text',
      subOptions: [],
    },
    {
      title: 'Orders',
      path: '#',
      icon: <FaIcons.FaCartPlus />,
      cName: 'nav-text',
      subOptions: [
        { title: 'New Order', path: '/orders', icon: <FaIcons.FaCartPlus /> },
        { title: 'Open an Order', path: '/orders/open', icon: <FaIcons.FaCartArrowDown /> },
        { title: 'Refund an Order', path: '/orders/refund', icon: <FaIcons.FaCartArrowDown /> },
        { title: 'Add a Payment', path: '/orders/payment', icon: <FaIcons.FaCartArrowDown /> },
        { title: 'All Orders', path: '/orders/all', icon: <FaIcons.FaCartArrowDown /> },
      ],
    },
    {
      title: 'Products',
      path: '#',
      icon: <FaIcons.FaProductHunt />,
      cName: 'nav-text',
      subOptions: [
        { title: 'Add Product', path: '/products/add', icon: <FaIcons.FaPlus /> },
        { title: 'All Products', path: '/products/all', icon: <FaIcons.FaList /> },
        { title: 'Categories', path: '/products/categories', icon: <FaIcons.FaList /> },
      ],
    },
    {
      title: 'Customers',
      path: '#',
      icon: <FaIcons.FaUsers />,
      cName: 'nav-text',
      subOptions: [
        { title: 'Add Customer', path: '/customers/add', icon: <FaIcons.FaUserPlus /> },
        { title: 'All Customers', path: '/customers/all', icon: <FaIcons.FaList /> },
        { title: 'Update Customer', path: '/customers/update', icon: <FaIcons.FaUserEdit /> },
      ],
    },
    {
      title: 'Suppliers',
      path: '#',
      icon: <FaIcons.FaUserTie />,
      cName: 'nav-text',
      subOptions: [
        { title: 'Add Supplier', path: '/suppliers/add', icon: <FaIcons.FaUserPlus /> },
        { title: 'All Suppliers', path: '/suppliers/all', icon: <FaIcons.FaList /> },
        { title: 'Update Supplier', path: '/suppliers/update', icon: <FaIcons.FaUserEdit /> },
      ],
    },
    {
      title: 'Employees',
      path: '#',
      icon: <FaIcons.FaUser />,
      cName: 'nav-text',
      subOptions: [
        { title: 'Add Employee', path: '/employees/add', icon: <FaIcons.FaUserPlus /> },
        { title: 'All Employees', path: '/employees/all', icon: <FaIcons.FaList /> },
        { title: 'Update Employee', path: '/employees/update', icon: <FaIcons.FaUserEdit /> },
      ],
    },
    {
      title: 'Reports',
      path: '#',
      icon: <FaIcons.FaChartBar />,
      cName: 'nav-text',
      subOptions: [],
    },
    {
      title: 'Settings',
      path: '/settings',
      icon: <FaIcons.FaCog />,
      cName: 'nav-text',
      subOptions: [],
    },
  ];


  return (
    <Box sx={{ display: 'flex' }}>
      <div className="nav" style={{marginLeft: '66px'}}>
        <h1>Sufi Traders</h1>
      </div>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader />
        <Divider />
        <List onMouseLeave={handleDrawerClose} onMouseEnter={handleDrawerOpen}>
          {sidebarItems.map((item, index) => (
            <React.Fragment key={index}>
              <ListItem disablePadding sx={{ display: 'block' }} onClick={() => handleSubMenuClick(item)}>
                <ListItemButton sx={{ minHeight: 48, px: 2.5 }}>
                  <ListItemIcon sx={{ minWidth: 0, mr: 5 }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.title} />
                  {item.subOptions.length > 0 && (
                    openSubmenus[item.title] ? <ExpandLess /> : <ExpandMore />
                  )}
                </ListItemButton>
              </ListItem>
              <Collapse in={openSubmenus[item.title]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding sx={{ ml: 3 }}>
                  {item.subOptions.map((subOption, subIndex) => (
                    <ListItem key={subIndex} disablePadding sx={{ display: 'block' }}>
                      <ListItemButton sx={{ minHeight: 48, px: 2.5 }}>
                        <ListItemIcon sx={{ minWidth: 0, mr: 5 }}>
                          {subOption.icon}
                        </ListItemIcon>
                        <ListItemText primary={subOption.title} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </React.Fragment>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}