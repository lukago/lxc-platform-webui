import React from 'react';
import Typography from '@material-ui/core/Typography';
import UserLayoutContainer from "../AdminLayoutContainer";
import {withStyles} from "@material-ui/core";
import t from "../../../locale/locale";
import TextField from "@material-ui/core/TextField/TextField";
import CircularProgress
  from "@material-ui/core/CircularProgress/CircularProgress";
import Button from "@material-ui/core/Button/Button";
import connect from "react-redux/es/connect/connect";
import { createLxc } from './lxcActions';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  tableContainer: {
    height: 320,
  },
  submit: {
    marginTop: theme.spacing.unit * 2,
  },
});

class LxcContainer extends React.Component {

  state = {
    lxcName: '',
    createFailed: false,
  };

  handleChange = event => {
    const lxcName = event.target.value;
    this.setState(prevProps => ({
      ...prevProps,
      lxcName,
    }));
  };

  handleLxcCreateFailed(isFailed) {
    if (isFailed) {
      this.setState({
        ...this.state,
        //lxcName: '',
      });
    }
  }

  sendCreate = () => {
    this.props.createLxc(this.state.lxcName);
  };

  componentDidUpdate(prevProps) {
    this.handleLxcCreateFailed(!prevProps.createFailed && this.props.createFailed);
  }

  render() {
    const { inProgress, classes } = this.props;
    return (
      <UserLayoutContainer>
        <Typography variant="h4" gutterBottom component="h2">
          {t.admin.lxc.addLxc}
        </Typography>
        <TextField
            required
            label={t.admin.lxc.lxcName}
            variant="outlined"
            onChange={this.handleChange}
        />
        <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={this.sendCreate}
            disabled={inProgress}
        >
          {inProgress ?
              <CircularProgress size={25}/>
              : t.admin.lxc.create
          }
        </Button>
      </UserLayoutContainer>
    );
  }
}

function mapStateToProps({ lxc }) {
  return {
    inProgress: lxc.inProgress,
    createFailed: lxc.createFailed,
  };
}

export default connect(mapStateToProps, { createLxc })(withStyles(styles)(LxcContainer));
