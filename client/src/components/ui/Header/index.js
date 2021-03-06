import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
//icons
import MenuIcon from '@material-ui/icons/Menu';
import CartIcon from '@material-ui/icons/ShoppingCart';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab'

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import { Link } from 'react-router-dom'

import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";



function ElevationScroll(props) {
    const { children } = props;

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0
    });
}

const useStyles = makeStyles((theme) => ({

    toolbarMargin: {
        ...theme.mixins.toolbar,
        marginBottom: "3em",
        [theme.breakpoints.down("md")]: {
            marginBottom: "2em"
        },
        [theme.breakpoints.down("xs")]: {
            marginBottom: "1.25em"
        }
    },
    logo: {
        height: "8em",
        [theme.breakpoints.down("md")]: {
            height: "7em"
        },
        [theme.breakpoints.down("xs")]: {
            height: "5.5em"
        }
    },
    root: {
        flexGrow: 1,

    },
    tab: {
        ...theme.typography.tab,
        minWidth: 10,
        marginLeft: "25px"
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function ButtonAppBar() {

    const classes = useStyles();
    const theme = useTheme();
    //true if Md or below 
    const matches = useMediaQuery(theme.breakpoints.down("xd"));

    const [value, setValue] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null); //position of the menu 
    const [openMenu, setOpenMenu] = useState(false); //for menu 
    const [selectedIndex, setSelectedIndex] = useState(0); //for menu 



    useEffect(() => {

        if (window.location.pathname === '/account') {
            setValue(1)
        } else if (window.location.pathname === '/cart') {
            setValue(2)
        }

        if (window.location.pathname === '/register') {
            setSelectedIndex(0)
            setValue(1)
        } else if (window.location.pathname === '/account/profile') {
            setSelectedIndex(1)
            setValue(1)
        }

    }, [value])


    //change tabs position 
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    const handleOpenMenu = e => {
        setAnchorEl(e.currentTarget); //position of clicked item
        setOpenMenu(true);
    };

    const handleCloseMenu = e => {
        setAnchorEl(null);
        setOpenMenu(false);
    };

    const handleMenuItemClick = (e, i) => {
        setAnchorEl(null);
        setOpenMenu(false);
        setSelectedIndex(i);
    };

    const menuOptions = [
        {
            link: '/register',
            name: 'register'

        },
        {
            link: '/account/profile',
            name: 'profile page'
        }
    ]


    const tabs = (
        <React.Fragment>
            <Tabs
                value={value} //store the value index for saving state 
                onChange={handleChange}
                indicatorColor="primary"
            >
                <Tab icon={<HomeIcon />}
                    classes={classes.tab}
                    component={Link}

                    to='/'
                />
                <Tab
                    icon={<AccountCircleIcon />}
                    classes={classes.tab}
                    component={Link}
                    ariaOwns={anchorEl ? "account-toolbar-menu" : undefined}
                    ariaPopup={anchorEl ? "true" : undefined}
                    onMouseOver={event => handleOpenMenu(event)}
                />
                <Tab icon={<CartIcon />}
                    classes={classes.tab}
                    component={Link}
                    to='/cart'
                />
            </Tabs>

            <Menu
                id="account-toolbar-menu"
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleCloseMenu}
                classes={{ paper: classes.menu }}
                MenuListProps={{
                    onMouseLeave: handleCloseMenu
                }}
                elevation={0}
                style={{ zIndex: 1302 }}
                keepMounted
            >
                {menuOptions.map((option, i) => (
                    <MenuItem
                        key={`${option}${i}`}
                        component={Link}
                        to={option.link}
                        classes={{ root: classes.menuItem }}
                        onClick={event => {
                            handleMenuItemClick(event, i)
                            handleCloseMenu();
                            setValue(1);
                        }}
                        selected={i === selectedIndex && value === 1}
                    >
                        {option.name}
                    </MenuItem>
                ))}
            </Menu>
        </React.Fragment>
    );

    return (
        <React.Fragment>
            {/* <ElevationScroll> */}
                <AppBar position="fixed">
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>


                        {matches ? null : tabs}
                    </Toolbar>
                </AppBar>
            {/* </ElevationScroll> */}
<div className={classes.toolbarMargin} />
        </React.Fragment>
    );
}