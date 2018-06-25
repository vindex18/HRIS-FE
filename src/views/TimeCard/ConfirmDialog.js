import React, {Component}from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = (props) => {
  return <Slide direction="up" {...props} />;
}

class ConfirmDialog extends Component {
  state = {
    open: true,
    title: "",
  };

  handleClose = (e) => {
      this.setState({open:false});
      console.log("CLEARING...");
      this.props.clear();
  }

  handleSend = (e) => {  
     this.props.send(e);
     this.setState({open:false});
  }

  component

  render(props) {
    return (
      <div>
        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Confirm " + this.props.desc + "? "}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {"Are you sure you want to " + this.props.desc +" ?"}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleSend} color="primary">
                Confirm
            </Button>
            <Button onClick={this.handleClose} color="primary">
                Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default ConfirmDialog;
