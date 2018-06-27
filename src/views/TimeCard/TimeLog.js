import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import CircularLoader from '../utils/CircularProgressInd';
import Button from '@material-ui/core/Button';
import LogTable from './LogTable';

const getModalStyle = () => {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 160,
    height: theme.spacing.unit * 80,
    backgroundColor: theme.palette.background.paper,
    boxShadow: '#f50057', //theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },

  root: {
    flexGrow: 1,
  },
});

class TimeLog extends React.Component {
  state = {
    open: true,
    logtable: <CircularLoader/>
  };

  componentDidMount(){ 
        console.log("MOUNTED!");
        // let tablelog = "";
        // this.props.data.data.map((log, index) => (
        console.log(this.props.data);
        // // ));
        this.setState({
             logtable:<LogTable data={this.props.data}/>
        })
        // console.log(this.props.data);
        console.log("MOUNTED!");
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.props.clear();
    this.setState({
      open: false,
    });
  };

  handleClickAway = () => {
    this.props.clear();
    this.setState({
      open: false,
    });
  };

  render(props) {
    const { classes } = this.props;

    return (
      <div>
        {/* <Typography gutterBottom>Click to get the full Modal experience!</Typography>
        <Button onClick={this.handleOpen}>Open Modal</Button> */}
        {this.state.open ? (
          <ClickAwayListener onClickAway={this.handleClickAway}>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="title" id="modal-title">
               {this.props.name + " ("+this.props.position+")" } 
               <Button style={{left:'1185px', position:'fixed', top:'10px'}} onClick={this.handleClose}>x</Button>
            </Typography>
            <Typography variant="headline" id="simple-modal-description">
               {/* Duis mollis, est non commodo luctus, nisi erat porttitor ligula. */}
              <div>
                {this.state.logtable}
              </div>
              </Typography>
          </div>
        </Modal>
            </ClickAwayListener>
        ) : null}
      </div>
    );
  }
}

TimeLog.propTypes = {
  classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const TimeLogWrapped = withStyles(styles)(TimeLog);

export default TimeLogWrapped;