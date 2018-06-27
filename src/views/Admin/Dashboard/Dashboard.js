import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Group, Block, Error, Warning } from '@material-ui/icons';
import { verifyToken } from '../../../config/Token';
import { Redirect } from 'react-router-dom';


const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    card: {
        padding: theme.spacing.unit * 2,
        height: 180,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        marginBottom: 16,
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
    },

    cardDisplay: {
        position: "relative",
        top: 0,
        left: 25,
    },

});


class Dashboard extends Component {

    state = {
        isLoggedIn:true
    }
    
    componentWillMount(){
        console.log("Dashboard Mounting");
        if(localStorage && localStorage.getItem('token') && localStorage.getItem('token') !== undefined){ 
            const hasToken = verifyToken();
            console.log(hasToken);
            hasToken.then(response => {
                console.log(response);
                (response.status) ? this.setState({isLoggedIn:true}) : this.setState({isLoggedIn:false});
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
        if (!this.state.isLoggedIn) {
            return <Redirect to={"/"} />;
        };

        const { classes } = this.props;
        return (
            <Grid container className={classes.root} spacing={8}>
                <Grid container spacing={8}>
                    <Grid item xs={12} sm={3}>
                        <Card className={classes.card} style={{ backgroundColor: "#152C55" }}>
                            <CardContent>
                                <div className={classes.controls}>
                                    <Group style={{ width: 120, height: 120, position: "relative", right: "20px",  color: "#FDFDFD" }} />
                                    <div className={classes.cardDisplay}>
                                        <Typography variant="title" component="h2" style={{ color: "white", margin: "auto", textAlign: "right", }} >
                                            0
                                        </Typography>
                                        <Typography variant="title" component="h2" style={{ color: "white", margin: "auto", textAlign: "right", }} >
                                            Active Employees
                                        </Typography>

                                        <div style={{ marginTop: 20 }} />
                                        
                                        <Typography variant="title" component="h2" style={{ color: "white", margin: "auto", textAlign: "right", }} >
                                            0
                                        </Typography>
                                        <Typography variant="title" component="h2" style={{ color: "white", margin: "auto", textAlign: "right", }} >
                                            Inactive Employees
                                        </Typography>

                                    </div>
                                </div>

                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={3}>
                        <Card className={classes.card} style={{backgroundColor: "#791422"}}>
                            <CardContent>
                                <div className={classes.controls}>
                                    <Block style={{ width: 120, height: 120, position: "relative", right: "20px",  color: "#FDFDFD" }} />
                                    <div className={classes.cardDisplay}>
                                        <Typography variant="title" component="h2" style={{ color: "white", margin: "auto", textAlign: "right", }} >
                                            0
                                        </Typography>
                                        <Typography variant="title" component="h2" style={{ color: "white", margin: "auto", textAlign: "right", }} >
                                            Number of Absences
                                        </Typography>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={3}>
                        <Card className={classes.card} style={{ backgroundColor: "#10621E" }}>
                            <CardContent>
                                <div className={classes.controls}>
                                    <Warning style={{ width: 120, height: 120, position: "relative", right: "20px",  color: "#FDFDFD" }} />
                                    <div className={classes.cardDisplay}>
                                        <Typography variant="title" component="h2" style={{ color: "white", margin: "auto", textAlign: "right", }} >
                                            0
                                        </Typography>
                                        <Typography variant="title" component="h2" style={{ color: "white", margin: "auto", textAlign: "right", }} >
                                            Number of Tardiness
                                        </Typography>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={3}>
                        <Card className={classes.card} style={{ backgroundColor: "#661141" }}>
                            <CardContent>
                                <div className={classes.controls}>
                                    <Error style={{ width: 120, height: 120, position: "relative", right: "20px",  color: "#FDFDFD" }} />
                                    <div className={classes.cardDisplay}>
                                        <Typography variant="title" component="h2" style={{ color: "white", margin: "auto", textAlign: "right", }} >
                                            0
                                        </Typography>
                                        <Typography variant="title" component="h2" style={{ color: "white", margin: "auto", textAlign: "right", }} >
                                            Number of Undertime
                                        </Typography>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);