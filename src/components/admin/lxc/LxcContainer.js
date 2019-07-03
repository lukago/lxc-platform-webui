import React from 'react';
import Typography from '@material-ui/core/Typography';
import AdminLayoutContainer from "../AdminLayoutContainer";
import {withStyles} from "@material-ui/core";
import t from "../../../locale/locale";
import TextField from "@material-ui/core/TextField/TextField";
import CircularProgress
  from "@material-ui/core/CircularProgress/CircularProgress";
import Button from "@material-ui/core/Button/Button";
import connect from "react-redux/es/connect/connect";
import {
  connectSocket,
  createLxc,
  disconnectSocket,
  fetchLxcList
} from './lxcActions';
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import Table from "@material-ui/core/Table/Table";
import TableBody from "@material-ui/core/TableBody/TableBody";
import {routes} from "../../../config/appData";
import {FailDialog, OkDialog} from "../../common/dialogs";

const styles = theme => ({
  tableContainer: {
    height: 320,
  },
  submit: {
    marginTop: theme.spacing.unit * 2,
  },
  form: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  box: {
    marginRight: theme.spacing.unit * 2,
  },
  table: {
    minWidth: 700,
  },
  row: {
    cursor: 'pointer',
  }
});

class LxcContainer extends React.Component {

  state = {
    lxcName: '',
    lxcPort: '',
    createFailed: false,
    openDialog: false,
  };

  handleChange = name => event => {
    const value = event.target.value;
    this.setState(prevProps => ({
      ...prevProps,
      [name]: value,
    }));
  };

  handleLxcCreateFailed(isFailed) {
    if (isFailed) {
      this.setState({
        ...this.state,
        lxcName: '',
        lxcPort: '',
        createFailed: true,
        openDialog: false,
      });
    }
  }

  sendCreate = () => {
    this.props.createLxc(this.state.lxcName, this.state.lxcPort);
    this.setState({
      openDialog: true,
    })
  };

  handleClose = () => {
    this.setState({
      openDialog: false,
      createFailed: false,
    })
  };

  componentDidMount() {
    this.props.connectSocket();
    this.props.fetchLxcList();
  }

  componentWillUnmount() {
    this.props.disconnectSocket();
  }

  componentDidUpdate(prevProps) {
    this.handleLxcCreateFailed(
        !prevProps.createFailed && this.props.createFailed);
  }

  redirect = (lxcName) => () => {
    this.props.history.push(routes.ADMIN_LXC_DETAILS.replace(':lxcName', lxcName))
  };

  render() {
    const {inProgress, classes, lxcList} = this.props;

    return (
        <AdminLayoutContainer>
          <OkDialog open={this.state.openDialog} handleClose={this.handleClose}/>
          <FailDialog open={this.state.createFailed} handleClose={this.handleClose}/>
          <Typography variant="h4" gutterBottom component="h2">
            {t.admin.lxc.addLxc}
          </Typography>
          <form className={classes.form}>
            <TextField
                required
                autoComplete="username"
                label={t.admin.lxc.lxcName}
                variant="outlined"
                onChange={this.handleChange('lxcName')}
                className={classes.box}
            />
            <TextField
                required
                label={t.admin.lxc.lxcPort}
                autoComplete="username"
                variant="outlined"
                onChange={this.handleChange('lxcPort')}
                className={classes.box}
            />
          </form>
          <div>
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
          </div>

          <br/><br/><br/>

          <Typography variant="h4" gutterBottom component="h2">
            {t.admin.lxc.lxcList}
          </Typography>
          <Table className={classes.table}>
            <colgroup>
              <col style={{width: '30%'}}/>
              <col style={{width: '70%'}}/>
            </colgroup>
            <TableHead>
              <TableRow>
                <TableCell>{t.admin.lxc.name}</TableCell>
                <TableCell>{t.admin.lxc.owner}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lxcList.map(lxc => (
                  <TableRow key={lxc.name} hover={true} className={classes.row} onClick={this.redirect(lxc.name)}>
                    <TableCell>{lxc.name}</TableCell>
                    <TableCell>
                      {lxc.owner ? lxc.owner.username : t.admin.lxc.unassigned}
                    </TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </AdminLayoutContainer>
    );
  }
}

function mapStateToProps({lxc}) {
  return {
    inProgress: lxc.inProgress,
    createFailed: lxc.createFailed,
    lxcList: lxc.lxcList,
  };
}

export default connect(mapStateToProps, {
  createLxc, connectSocket, disconnectSocket, fetchLxcList,
})(withStyles(styles)(LxcContainer));
