import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { mailFolderListItems, otherMailFolderListItems } from './tileData';
import logo from "../../assets/img/InventoBrandingLogo.svg"
import { decodeToken } from '../../config/Token';
import Notifications from '@material-ui/icons/Notifications';
import Chat from '@material-ui/icons/Chat';
import Settings from '@material-ui/icons/Settings';

import Avatar from '@material-ui/core/Avatar';
import displayPicture from "../../assets/img/avatar.jpg";
import ExpandMore from '@material-ui/icons/ExpandMore';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Dashboard from './Dashboard/Dashboard';

import Error404 from './../../views/Error/404.js';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


const drawerWidth = 300;

const options = [
    'Home',
    'Settings',
    'Notification',
    'Logout',
];

const ITEM_HEIGHT = 48;

const styles = theme => ({
    root: {
        flexGrow: 1,
        height: "100vh",
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        backgroundColor: '#FDFDFD',
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        backgroundColor: '#21292B',
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing.unit * 7,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 9,
        },

    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        backgroundColor: "#F6EDF0",
        padding: theme.spacing.unit * 3,
    },
    rightToolbar: {
        marginLeft: 'auto',
        marginRight: 10,
    },
});

class Home extends Component {
    state = {
        anchorEl: null,
        open: false,
        firstname: "",
        email: ""
    };

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    componentWillMount() {
        console.log("WILL MOUNT TIME CARD: " + this.state);
        if (localStorage && localStorage.getItem('token')) {
            this.setState({ auth: decodeToken(this.state) });
        } else {
            //Redirect To LOGIN NOT FINISHED....
        }
    }

    render() {
        const { classes, theme } = this.props;
        const { anchorEl } = this.state;

        return (
            <Router>
                <div className={classes.root}>
                    <AppBar
                        position="absolute"
                        className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
                    >

                        <Toolbar disableGutters={!this.state.open}>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={this.handleDrawerOpen}
                                className={classNames(classes.menuButton, this.state.open && classes.hide)}
                                style={{ color: '#21292B' }}
                            >
                                <MenuIcon />
                            </IconButton>
                            {/* <Typography variant="title" color="inherit" noWrap>
                                Mini variant drawer
                            </Typography> */}
                            <section className={classes.rightToolbar}>

                                <IconButton>
                                    <Settings />
                                </IconButton>

                                <IconButton>
                                    <Chat />
                                </IconButton>

                                <IconButton>
                                    <Notifications />
                                </IconButton>
                            </section>
                            <Typography type="title" style={{ borderCollapse: "separate", borderSpacing: "0", borderLeft: '0.1em solid silver', padding: '1.5em' }} />

                            <Typography type="title">
                                {this.state.firstname}
                            </Typography>


                            <div>
                                <IconButton
                                    aria-label="More"
                                    aria-owns={anchorEl ? 'long-menu' : null}
                                    aria-haspopup="true"
                                    onClick={this.handleClick}
                                >
                                    <ExpandMore />
                                </IconButton>
                                <Menu
                                    id="long-menu"
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={this.handleClose}
                                    PaperProps={{
                                        style: {
                                            maxHeight: ITEM_HEIGHT * 4.5,
                                            width: 200,
                                        },
                                    }} >
                                    {options.map(option => (
                                        <MenuItem key={option} selected={option === 'Pyxis'} onClick={this.handleClose}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </div>

                            <section style={{ marginLeft: 0, marginRight: 50 }}>
                                <Avatar alt="Remy Sharp" src={displayPicture} className={classes.avatar} />
                            </section>
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        variant="permanent"
                        classes={{
                            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
                        }}
                        open={this.state.open} >
                        <div className={classes.toolbar} >
                            <img src={logo} style={{ display: "flex", width: "40%", margin: "auto", left: "50%" }} />
                            <IconButton onClick={this.handleDrawerClose} style={{ color: '#FDFDFD' }}>
                                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                            </IconButton>
                        </div>
                        <Divider />
                        <List>{mailFolderListItems}</List>
                        <Divider />
                        <List>{otherMailFolderListItems}</List>
                    </Drawer>

                    {/* Main Body Page */}
                    <main className={classes.content}>

                        <div className={classes.toolbar} />
                        <Switch>
                            <Route path="/user" component={Dashboard} exact />
                            {/* <Route path="/user/overtime" component={Timekeeping} exact />
                            <Route path="/user/leave" component={Leave} exact /> */}
                            <Route component={Error404} exact />
                        </Switch>
                    </main>
                </div>
            </Router>
        );
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Home);
