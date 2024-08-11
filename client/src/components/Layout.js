import React, { useEffect, useState } from "react";
import "./Layout.css";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import avatarImg from "../assets/img/avatar.jpg";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import GridViewIcon from "@mui/icons-material/GridView";
import Box from "@mui/material/Box";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { Outlet } from "react-router-dom";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { Divider, Typography } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import SessionService from "../service/SessionService";
import UserService from "../service/Requests/UserService";
import { useNavigate } from "react-router-dom";

const Layout = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [user, setUser] = useState(SessionService.get.loggedInUser);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  useEffect(()=>{
    if(!user){
      navigate("/login");
    }
      
  },[])
  const menu = [
    {
      id: 1,
      label: "Dashboard",
      path: "/",
      icon: <GridViewIcon />,
    },
    {
      id: 2,
      label: "Expenses",
      path: "/category",
      icon: <CurrencyRupeeIcon />,
    },
    {
      id: 3,
      label: "Shared Expenses",
      path: "/shared-expenses",
      icon: <ShareIcon />,
    },
  ];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [openD, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  

  const onLogOut = () =>{
    UserService.logOut();
    handleClose();
    navigate("/login");
  }

  const ChangePass = () =>{
    navigate("/change-password");
  }

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <Typography variant="h5" sx={{ textAlign: "center", py: 2 }}>
        Accounting
      </Typography>
      <List>
        {menu.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton
              onClick={() => {
                navigate(item.path);
              }}
            >
              <ListItemIcon sx={{ color: "skyblue" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ position: "absolute", bottom: 0 }}>
        <Divider />
        <Typography sx={{ textAlign: "center", py: 2 }}>
          <span style={{ padding: "10px 0px" }}>
            Designed & Developed by Himanshu Singh
          </span>
        </Typography>
      </Box>
    </Box>
  );
  if (user) {
    return (
      <>
        <div className="flex-container">
          <div className="start-component">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={toggleDrawer(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            Accounting
          </div>
          <div className="end-component">
            <Stack direction="row" spacing={2}>
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <Tooltip title={user.name}>
                  <Avatar alt={user.name} src="image.png"/>
                </Tooltip>
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem disabled onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={ChangePass}>Change Password</MenuItem>
                <MenuItem onClick={onLogOut}>Logout</MenuItem>
              </Menu>
            </Stack>
          </div>
          <Drawer open={openD} onClose={toggleDrawer(false)}>
            {DrawerList}
          </Drawer>
        </div>
        <Outlet />
      </>
    );
  }
};

export default Layout;
