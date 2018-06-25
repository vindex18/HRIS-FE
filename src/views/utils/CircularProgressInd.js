import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
//import purple from '@material-ui/core/colors/purple';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
  center: { 
    position: "relative",
    width: "100%",
    left: "44%",
    top: "200px",
    right:"0px",
    outline: "none"
  }
});

function CircularProgressInd(props) {
  const { classes } = props;
  return (
    <div>
      {/* <CircularProgress className={classes.progress} />
      <CircularProgress className={classes.progress} size={50} /> */}
      <CircularProgress className={classes.center} size={150} color="secondary" />
      {/* <CircularProgress className={classes.progress} style={{ color: purple[500] }} thickness={7} /> */}
    </div>
  );
}

CircularProgressInd.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CircularProgressInd);
