import React, {Component, Fragment} from 'react';
import Typography from '@material-ui/core/Typography';
import UserLayoutContainer from "../UserLayoutContainer";
import {withStyles} from "@material-ui/core";
import t from "../../../locale/locale";
import connect from "react-redux/es/connect/connect";
import {fetchUser, updateUserData, updateUserPassowrd} from "./detailsActions";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Dialog from "@material-ui/core/Dialog/Dialog";
import {FailDialog, OkDialog} from "../../common/dialogs";
import FormControl from "@material-ui/core/FormControl/FormControl";
import Select from "@material-ui/core/Select/Select";
import Input from "@material-ui/core/Input/Input";
import Divider from "@material-ui/core/Divider/Divider";
import {Link} from "react-router-dom";
import {routes} from "../../../config/appData";

const styles = theme => ({
  root: {
    display: 'flex',
  },
  tableContainer: {
    minHeight: 100,
  },
  box: {
    minWidth: 500,
    marginTop: theme.spacing.unit * 5,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignContent: 'space-between',
    flexWrap: 'wrap',
    minHeight: 200,
  },
  btn: {
    margin: theme.spacing.unit * 2,
  },
  hdr: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
  },
  divider: {
    marginTop: theme.spacing.unit * 8,
  },
  submit: {
    margin: theme.spacing.unit,
  },
});

class UserProfileContainer extends Component {
  state = {
    user: {},
    showOk: false,
    showFail: false,
    editMode: false,
    editModePwd: false,
    oldPassword: '',
    password: '',
    passwordRetype: '',
  };

  componentDidMount() {
    this.fetchUser();
  }

  componentDidUpdate(prevProps) {
    this.handleActionDone(prevProps.inProgressSend && !this.props.inProgressSend);
    this.handleFetchDone(prevProps.inProgressFetchUser && !this.props.inProgressFetchUser)
  }

  handleFetchDone(done) {
    if (done) {
      this.setState(prevProps => ({
        ...prevProps,
        user: {
          ...this.props.userData,
        },
      }));
    }
  }

  handleActionDone(done) {
    if (done) {
      this.fetchUser();
      this.setState({
        oldPassword: '',
        password: '',
        passwordRetype: '',
      });
      this.props.failedSend ? this.setState({showFail: true}) : this.setState(
          {showOk: true})
    }
  }

  fetchUser = () => {
    this.props.fetchUser();
  };

  updateUser = () => {
    this.props.updateUserData(this.state.user);
    this.setState({editMode: false});
  };

  updatePassword = () => {
    this.props.updateUserPassowrd(
        this.state.oldPassword,
        this.state.password,
        this.state.passwordRetype,
    );
    this.setState({editModePwd: false});
  };

  setEdit = () => {
    this.setState(prevProps => ({
      ...prevProps,
      editMode: true,
    }));
  };

  setCancel = () => {
    this.setState(prevProps => ({
      ...prevProps,
      editMode: false,
      user: {
        ...this.props.userData,
      }
    }));
  };

  setEditPwd = () => {
    this.setState(prevProps => ({
      ...prevProps,
      editModePwd: true,
    }));
  };

  setCancelPwd = () => {
    this.setState(prevProps => ({
      ...prevProps,
      editModePwd: false,
      oldPassword: '',
      password: '',
      passwordRetype: '',
    }));
  };

  handleChangePwd = name => event => {
    const value = event.target.value;
    this.setState(prevProps => ({
      ...prevProps,
      [name]: value,
    }));
  };

  handleChange = name => event => {
    const value = event.target.value;
    this.setState(prevProps => ({
      ...prevProps,
      user: {
        ...prevProps.user,
        [name]: value
      },
    }));
  };

  handleClose = () => {
    this.setState({
      showOk: false,
      showFail: false,
    })
  };

  render() {
    const {classes} = this.props;
    if (!this.state.user.username) {
      return <div/>;
    }

    return (
        <UserLayoutContainer>
          <OkDialog open={this.state.showOk} handleClose={this.handleClose}/>
          <FailDialog open={this.state.showFail}
                      handleClose={this.handleClose}/>
          <Dialog onClose={this.handleClose} open={this.state.showOk}>
            <DialogTitle id="customized-dialog-title">
              {t.dialog.titleOk}
            </DialogTitle>
            <DialogContent>
              {t.dialog.contentOk}
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                {t.dialog.close}
              </Button>
            </DialogActions>
          </Dialog>
          <Button variant="contained" component={Link} to={routes.ADMIN_USERS}>
            {t.admin.lxc.back}
          </Button>
          <br/>
          <br/>
          <Typography variant="h5" gutterBottom component="h2">
            {`${t.admin.users.details.me}`}
          </Typography>
          <form className={classes.form}>
            <TextField
                id="username"
                label={t.admin.users.username}
                className={classes.box}
                value={this.props.userData.username}
                disabled={true}
                autoFocus={true}
                variant="outlined"
            />
            <TextField
                required
                label={t.admin.users.email}
                autoComplete="email"
                variant="outlined"
                onChange={this.handleChange('email')}
                className={classes.box}
                value={this.state.user.email}
                disabled={!this.state.editMode}
            />
            <FormControl className={classes.box} disabled={true}>
              <Select
                  multiple
                  value={this.props.userData.roles}
                  input={<Input id="select-multiple-checkbox"/>}
                  renderValue={selected => selected.join(', ')}
              >
              </Select>
            </FormControl>
          </form>
          <br/>
          <br/>
          <div>
            {
              !this.state.editMode ?
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={this.setEdit}
                >
                  {t.admin.users.details.edit}
                </Button>
                :
                <Fragment>
                  <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      onClick={this.setCancel}
                  >
                    {t.admin.users.details.cancel}
                  </Button>
                  <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      onClick={this.updateUser}
                  >
                    {t.admin.users.details.update}
                  </Button>
                </Fragment>
            }
          </div>
          <Divider variant="middle" className={classes.divider}/>
          <br/>
          <Typography variant="h5" gutterBottom component="h2">
            {t.admin.users.details.updatePassword}
          </Typography>
          <form className={classes.form}>
            <TextField
                required
                label={t.admin.users.oldPassword}
                type="password"
                autoComplete="current-password"
                variant="outlined"
                onChange={this.handleChangePwd('oldPassword')}
                className={classes.box}
                value={this.state.oldPassword}
                disabled={!this.state.editModePwd}
            />
            <TextField
                required
                label={t.admin.users.password}
                type="password"
                autoComplete="current-password"
                variant="outlined"
                onChange={this.handleChangePwd('password')}
                className={classes.box}
                value={this.state.password}
                disabled={!this.state.editModePwd}
            />
            <TextField
                required
                label={t.admin.users.confirmPassword}
                type="password"
                autoComplete="current-password"
                variant="outlined"
                onChange={this.handleChangePwd('passwordRetype')}
                className={classes.box}
                value={this.state.passwordRetype}
                disabled={!this.state.editModePwd}
            />
          </form>
          <br/><br/>
          <div>
            {
              !this.state.editModePwd ?
                  <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      onClick={this.setEditPwd}
                  >
                    {t.admin.users.details.edit}
                  </Button>
                  :
                  <Fragment>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={this.setCancelPwd}
                    >
                      {t.admin.users.details.cancel}
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={this.updatePassword}
                    >
                      {t.admin.users.details.update}
                    </Button>
                  </Fragment>
            }
          </div>

        </UserLayoutContainer>
    );
  }
}

function mapStateToProps({detailsUsr}) {
  return {
    inProgressFetchUser: detailsUsr.inProgressFetchUser,
    failedFetchUser: detailsUsr.failedFetchUser,
    userData: detailsUsr.userData,
    inProgressSend: detailsUsr.inProgressSend,
    failedSend: detailsUsr.failedSend,
  };
}

export default connect(mapStateToProps, {
  fetchUser, updateUserData, updateUserPassowrd,
})(withStyles(styles)(UserProfileContainer));