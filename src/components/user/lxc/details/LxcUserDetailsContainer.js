import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import UserLayoutContainer from "../../UserLayoutContainer";
import {withStyles} from "@material-ui/core";
import t from "../../../../locale/locale";
import connect from "react-redux/es/connect/connect";
import {
  fetchLxcStatus, startLxc, stopLxc,
  connectSocket, disconnectSocket, fetchServerInfo,
} from "./detailsActions";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import Divider from "@material-ui/core/Divider/Divider";
import {FailDialog, OkDialog} from "../../../common/dialogs";
import {Link} from "react-router-dom";
import {routes} from "../../../../config/appData";

const styles = theme => ({
  root: {
    display: 'flex',
  },
  tableContainer: {
    minHeight: 100,
  },
  form: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  btn: {
    margin: theme.spacing.unit * 2,
  },
  hdr: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
  },
  divider: {
    marginTop: theme.spacing.unit * 2,
  },
});

class LxcUserDetailsContainer extends Component {
  state = {
    showOk: false,
    showFail: false,
  };

  componentDidMount() {
    this.props.connectSocket(this.props.match.params.lxcName);
    this.fetchStatus();
    this.props.fetchServerInfo();
  }

  componentWillUnmount() {
    this.props.disconnectSocket();
  }

  componentDidUpdate(prevProps) {
    this.handleLxcActionDone(prevProps.inProgressSend && !this.props.inProgressSend)
  }

  handleLxcActionDone(done) {
    if (done) {
      this.fetchStatus();
      this.props.failedSend ? this.setState({showFail: true}) : this.setState({showOk: true})
    }
  }

  fetchStatus = () => {
    this.props.fetchLxcStatus(this.props.match.params.lxcName);
  };

  sendStart = () => {
    this.props.startLxc(this.props.match.params.lxcName)
  };

  sendStop = () => {
    this.props.stopLxc(this.props.match.params.lxcName)
  };

  handleChange = name => event => {
    const value = event.target.value;
    this.setState(prevProps => ({
      ...prevProps,
      [name]: value,
    }));
  };

  handleClose = () => {
    this.setState({
      showOk: false,
      showFail: false,
    })
  };

  render() {
    const {classes, match} = this.props;
    const data = {...this.props.userData, ip: this.props.serverInfo.ip};
    const str = JSON.stringify(data, null, 2)
    .replace(/\\n\\n/g, "\n\t")
    .replace(/\\t/g, "\t")
    .replace("Name:", "\n\tName:");
    return (
        <UserLayoutContainer>
          <OkDialog open={this.state.showOk} handleClose={this.handleClose}/>
          <FailDialog open={this.state.showFail} handleClose={this.handleClose}/>
          <Button variant="contained" component={Link} to={routes.CLIENT_DASHBOARD}>
            {t.admin.lxc.back}
          </Button>
          <br/>
          <br/>
          <Typography variant="h5" gutterBottom component="h2">
            {t.admin.lxc.details.header + ` (${match.params.lxcName})`}
          </Typography>
          <Typography component="div" className={classes.tableContainer}>
            <TextField
                id="outlined-multiline-flexible"
                multiline
                rowsMax="100"
                value={str}
                variant="outlined"
                fullWidth={true}
                disabled={true}
            />
          </Typography>
          <Divider variant="middle" className={classes.divider}/>
          <Typography variant="h5" gutterBottom component="h2" className={classes.hdr}>
            {t.admin.lxc.details.actions.start}
          </Typography>
          <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={this.sendStart}
          >
            {t.admin.lxc.details.start}
          </Button>
          <Divider variant="middle" className={classes.divider}/>
          <Typography variant="h5" gutterBottom component="h2" className={classes.hdr}>
            {t.admin.lxc.details.actions.stop}
          </Typography>
          <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={this.sendStop}
          >
            {t.admin.lxc.details.stop}
          </Button>
        </UserLayoutContainer>
    );
  }
}

function mapStateToProps({ lxcUserDetails }) {
  return {
    userData: lxcUserDetails.userData,
    serverInfo: lxcUserDetails.serverInfo,
    inProgressSend: lxcUserDetails.inProgressSend,
    failedSend: lxcUserDetails.failedSend,
  };
}

export default connect(mapStateToProps, {
  fetchLxcStatus, startLxc, stopLxc,
  connectSocket, disconnectSocket, fetchServerInfo,
})(withStyles(styles)(LxcUserDetailsContainer));