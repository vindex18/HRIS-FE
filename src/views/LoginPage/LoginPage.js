import React, { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import { verifyToken } from '../../config/Token';
import image from "../../assets/img/bgLogin.jpg";
import logo from "../../assets/img/InventoLogo.svg";
import { validateCredentials } from "../../config/Api";
import Notif from '../TimeCard/Notif';

import { 
    Card, TextField, Button, CardContent, Typography, InputAdornment, IconButton, Input, InputLabel, FormControl
} from '@material-ui/core/';

import { 
    Visibility, VisibilityOff 
} from '@material-ui/icons';

class LoginPage extends Component {

    state = {
        email: "",
        password: "",
        isLoggedIn: false,
        showPassword: false,
        msg:''
    }

    handleChange = (e) => {
        let target = e.target;
        let value = target.value;
        let name = target.name;
        
        this.setState({
            [name]: value
        })        
    }

    handleMouseDownPassword = event => {
        event.preventDefault();
      };
    
    handleClickShowPassword = () => {
        this.setState({ showPassword: !this.state.showPassword }); 
      };

    handleLogIn = (e) => {   
        e.preventDefault();       
     
        localStorage.clear();
        this.setState({ isLoggedIn: false, msg: "   " });    
        let bodyFormData = new FormData();
        // bodyFormData.set('email', 'ivan@invento.io');
        bodyFormData.set('email', this.state.email + '@invento.io');
        // bodyFormData.set('email', this.state.email);
        bodyFormData.set('password', 'qwerty');
        const logstat = validateCredentials(bodyFormData);
        logstat.then(response => {
            console.log(response.data);
            if(response.data.status===true){ // if valid
            console.log(response.data.status);
            //console.log(response.data.tk);
            console.log ("OKKKKK");
            localStorage.setItem('token', response.data.tk );
            localStorage.setItem('firstname', response.data.userdata.firstname);
            localStorage.setItem('middlename', response.data.userdata.middlename);
            localStorage.setItem('lastname', response.data.userdata.lastname);
            localStorage.setItem('email', response.data.userdata.email);
            localStorage.setItem('position', response.data.userdata.position);
            this.setState({isLoggedIn:true});
            }else if(!response.data.status!==true){ // if invalid
                console.log(response.status);
                console.log ("NOT OKKKKK");
                this.setState({ isLoggedIn: false, msg: <Notif msg={response.data.msg}/> });
                return false;
                //this.setState({ isLoggedIn: false, msg: <Notif msg={response.data.msg}/> });           
            }
        }).catch(function (response) {
            //handle error
            //console.log(response);
        });
    }
    
    // handleLogIn = (e) => {   
    //     e.preventDefault();       
    //     this.setState({ isLoggedIn: false, msg: "   " });    
    //     let bodyFormData = new FormData();
    //     // bodyFormData.set('email', 'ivan@invento.io');
    //     bodyFormData.set('email', this.state.email + '@invento.io');
    //     // bodyFormData.set('email', this.state.email);
    //     bodyFormData.set('password', 'qwerty');
    //     console.log("Submitting: ");
    //     axios({
    //         method: 'POST',
    //         url: api_url() +'/authorization/validatecredentials',
    //         data: bodyFormData, // / data,      //
    //         // config: { headers: {'Content-Type': 'multipart/form-data' }}
    //         // config: { headers: {'Content-Type': 'application/json' }}
    //         config: { 'Content-Type': 'application/json',}
    //     }).then((response) => {
    //         //handle success
    //         if(response.data.status){ // if valid
    //             console.log(response);
    //             console.log(response.data.tk);
    //             console.log ("OKKKKK");
    //             localStorage.setItem('token', response.data.tk );
    //             localStorage.setItem('firstname', response.data.userdata.firstname);
    //             localStorage.setItem('middlename', response.data.userdata.middlename);
    //             localStorage.setItem('lastname', response.data.userdata.lastname);
    //             localStorage.setItem('email', response.data.userdata.email);
    //             localStorage.setItem('position', response.data.userdata.position);

    //             this.setState({isLoggedIn:true});
    //         }else if(!response.data.status){ // if invalid
    //             console.log(response);
    //             console.log ("NOT OKKKKK");
    //             this.setState({ isLoggedIn: false, msg: <Notif msg={response.data.msg}/> });           
    //         }
    //     }).catch(function (response) {
    //         //handle error
    //         console.log(response);
    //     });
    // }

    componentDidMount(){
        console.log("------------- YOU ARE NOW IN LOGIN PAGE DID MOUNT --------------");
        if(localStorage && localStorage.getItem('token') && localStorage.getItem('token') !== undefined){ 
            const hasToken = verifyToken();
            console.log(hasToken);
            hasToken.then(response => {
                console.log(response);
                (response.status) ? this.setState({isLoggedIn:true}) : this.setState({isLoggedIn:false});
            }).catch(function (response) {
                //handle error
                console.log(response);
            });
            //console.log(this.state);
        }
        // console.log(this.state);
    }
    render(){

        const theme = createMuiTheme({
            palette: {
              primary: indigo,
            },
        });

        const styles = {
            root: {
                flexGrow: 1,
            },
            container: {
                display: 'flex',
                flexWrap: 'wrap',
                flexBasis: 200,
                margin: theme.spacing.unit,
            },
            textField: {
                opacity: ".9",
                "&:before": {
                    opacity: "1",
                },
                width: "80%",
                border: "none",
                color: "white",
                outline: "none",                
                fontSize: "1em",
                fontWeight: 300,
                paddingBottom: "10px",
                marginTop: "0px",
                marginLeft: "10%"
            },
            menu: {
                width: 200,
            },
            card: {
                borderRadius: 30,
                opacity: "0.9",
                width: 565,
                height: 683,
                position: "absolute",
                top: "50%",
                left: "50%",
                marginRight: "-50%",
                transform: "translate(-50%, -50%)",
            },
            media: {      
                height: 0,
                paddingTop: '56.25%', // 16:9
            },
              
            pageHeader: {
                flex: 1,
                minHeight: "100vh",
                maxHeight: "100vh",
                height: "0",
                display: "inherit",
                position: "relative",
                margin: "0",
                padding: "0",
                border: "0",
                alignItems: "center",
                "&:before": {
                    background: "rgba(0, 0, 0, 0.5)"
                },
                "&:before,&:after": {
                    position: "absolute",
                    zIndex: "1",
                    width: "100%",
                    height: "100%",
                    display: "block",
                    left: "0",
                    top: "0",
                    content: '""'
                },
                backgroundImage: "url(" + image + ")",
                backgroundSize: "cover",
                backgroundPosition: "top center",
                overflow: "hidden",
            },            
            inputIconsColor: {
                color: "#495057",
            },
            divider: {
                marginTop: "-50px",
                marginBottom: "60px",
                textAlign: "center",
                fontFamily: "SegoeUI, Segoe UI",
                fontSize: "18px",
              },
            cardImgTop: {
                width: "100%",
                borderTopLeftRadius: "calc(.25rem - 1px)",
                borderTopRightRadius: "calc(.25rem - 1px)"
            },
            cardFooter: {
                paddingTop: "0rem",
                border: "0",
                borderRadius: "6px",
                justifyContent: "center !important"
            },
            buttonColor: {            
                color: theme.palette.getContrastText("#A0446A"),
                backgroundColor: "#A0446A",
                '&:hover': {
                    backgroundColor: "#A0446A",
                },
            },
        };

        if (this.state.isLoggedIn) {
            return <Redirect to={"/TimeCard"}/>;
        };

        return (
            <div style={styles.pageHeader}>
                <div>
                {this.state.msg}
                    <Card style={styles.card}>                    
                        <img
                            alt= "Logo"
                            src={logo}
                            style={{                            
                                marginLeft: "30%",
                                height: "180px", 
                                width: "40%",
                                marginTop: "40px",
                                borderTopLeftRadius: "calc(.25rem - 1px)",
                                borderTopRightRadius: "calc(.25rem - 1px)",
                            }}
                            data-holder-rendered="true"
                        />
                        <p style={styles.divider}>Welcome back! Please login to your account.</p>
                        
                        <CardContent>
                            <form style={styles.container} noValidate autoComplete="off">
                                <MuiThemeProvider theme={theme}>
                                    <TextField required style={styles.textField} label="Email" margin="normal" type="email" id="email"
                                    name="email" value={this.state.email} onChange={this.handleChange}/>
                                </MuiThemeProvider>
                                <MuiThemeProvider theme={theme}>
                                    <FormControl required style={styles.textField}>
                                        <InputLabel htmlFor="password">Password</InputLabel>
                                        <Input type={this.state.showPassword ? 'text' : 'password'} id="password"
                                                name="password" value={this.state.password} onChange={this.handleChange} 
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="Toggle password visibility"
                                                        onClick={this.handleClickShowPassword}
                                                        onMouseDown={this.handleMouseDownPassword}
                                                    >
                                                        {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                        </FormControl>
                                </MuiThemeProvider>
                                <NavLink to="/" style={{position: "relative", left: "68%", textTransform: "uppercase", textDecoration: 'none', }}>
                                    <Typography variant="caption">Forgot Password</Typography>
                                </NavLink>
                                                             
                            </form>
                            <Button style={{position: "relative", top: "50px", left: "32%", height: "50px", width: "185px", color: theme.palette.getContrastText("#A0446A"), backgroundColor: "#A0446A", '&:hover': { backgroundColor: "#A0446A", },}} variant="contained" color="secondary"  onClick={(e) => this.handleLogIn(e)}>
                                Login
                            </Button>                                                     
                        </CardContent>
                        
                    </Card>
                    
                </div> 
            </div>         
        )
    }
}

export default LoginPage;