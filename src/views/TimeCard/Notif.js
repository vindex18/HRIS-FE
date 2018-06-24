import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

class Notif extends React.Component {
  state = {
    open: true,
    vertical: 'top',
    horizontal: 'center',
  };

  handleClick = state => () => {
    this.setState({ open: true, ...state });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render(props) {
    const { vertical, horizontal, open } = this.state;
    return (
      <div>
        {/* <Button onClick={this.handleClick({ vertical: 'top', horizontal: 'center' })}>
          Top-Center
        </Button> */}
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.props.msg}</span>}
        />
      </div>
    );
  }
}

export default Notif;