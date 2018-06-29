import React from 'react';
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
          style={{textAlign:"center"}}
          message={<span id="message-id" style={{margin:"auto", marginLeft:"40px"}}>{this.props.msg}</span>}
        />
      </div>
    );
  }
}

export default Notif;