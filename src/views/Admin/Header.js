import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import SidebarItems from './SidebarItems';
import logo from "../../assets/img/InventoBrandingLogo.svg"
import { verifyToken, decodeToken } from '../../config/Token';
import Notifications from '@material-ui/icons/Notifications';
import Chat from '@material-ui/icons/Chat';
import Settings from '@material-ui/icons/Settings';

import Avatar from '@material-ui/core/Avatar';
import displayPicture from "../../assets/img/avatar.jpg";
import ExpandMore from '@material-ui/icons/ExpandMore';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import TimekeepingTable from './Timekeeping/TimekeepingTable';
import TimekeepingTable1 from './Timekeeping/TimekeepingTable1';

import Error404 from './../../views/Error/404.js';
import { Redirect } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const drawerWidth = 300;

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
        middlename:"",
        lastname:"",
        postitle:"",
        email: "",
        isLoggedIn:true,
        mainContent:""
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

    handleTimeCard = () => {
        this.setState({showTimeLog:true});
    }

    handleLogout = () => {
        localStorage.clear();
        this.setState({ isLoggedIn: false });
    }

    viewEmployeeTimeLog = (id) => {
        console.log("THIS IS THE IDDD!!");
        console.log(id);
        console.log("THIS IS THE IDDD!!");
        this.setState({mainContent:<TimekeepingTable1 id={id}/>});
    }

    renderData = (data, module) => {
        console.log("Data successfully Transferred");
        console.log(data);
        console.log(module);
        switch(module){
          
            case 2: this.setState({mainContent:<TimekeepingTable viewLog={this.viewEmployeeTimeLog} data={data}/>});
                    console.log(this.state.mainContent);
                    break;
            
            default: break;
        }
        console.log("Data successfully Transferred");
    }

    componentWillMount(){
        console.log("Component Mounted!");
        if(localStorage && localStorage.getItem('token') && localStorage.getItem('token') !== undefined){ 
            const hasToken = verifyToken();
            console.log("HAS TOKEN: "+hasToken);
            hasToken.then(response => {
                console.log(response);
                if(response.status){
                     decodeToken(this.state);
                     this.setState({isLoggedIn:true});
                 }else{ 
                     this.setState({isLoggedIn:false});
                 }
            }).catch(function(response) {
                //handle error
                console.log(response);
            });
        }
        else{
            this.setState({isLoggedIn:false});
        }
    }

    render() {
        const { classes, theme } = this.props;
        const { anchorEl } = this.state;
        
        if(this.state.isLoggedIn===false){
            return <Redirect to={"/"}/>;
        }

        if(this.state.showTimeLog===true){
            return <Redirect to={"/TimeCard"}/>;
        }

        return (<div className={classes.root}>
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
                                <MenuItem key={"My Timecard"} onClick={this.handleTimeCard}>My Timecard</MenuItem>
                                <MenuItem key={"Account Settings"}  onClick={this.handleClose}>
                                    Account Settings
                                </MenuItem>
                                <MenuItem key={"Logout"} onClick={this.handleLogout}>
                                    {"Logout"}
                                </MenuItem>
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
                        <List><SidebarItems renderData={this.renderData}/></List>
                    </Drawer>
                    <main className={classes.content} style={{overflow:"auto"}} > {/*style={{overflowY:'scroll'}}*/}
                        <div className={classes.toolbar}/>
                        {this.state.mainContent}
                    </main>
                </div>
          
        );
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Home);
