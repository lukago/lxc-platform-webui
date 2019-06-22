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
import {deleteUser, createUser, fetchUserList} from './userlistActions';
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import Table from "@material-ui/core/Table/Table";
import TableBody from "@material-ui/core/TableBody/TableBody";
import {routes} from "../../../config/appData";
import {DelDialog, FailDialog, OkDialog} from "../../common/dialogs";
import IconButton from "@material-ui/core/IconButton/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import Input from "@material-ui/core/Input/Input";

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
  },
  del: {
    marginLeft: -theme.spacing.unit,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 200,
    maxWidth: 300,
  },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const roles = [
  'ROLE_ADMIN',
  'ROLE_CLIENT',
];

class UserlistContainer extends React.Component {

  state = {
    user: {
      username: '',
      email: '',
      roles: [],
      password: '',
      passwordRetype: '',
    },
    showOk: false,
    showFail: false,
    showDel: false,
    usernameToDelete: ''
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

  handleChangeMultiple = (event) => {
    this.setState(prevProps => ({
      ...prevProps,
      user: {
        ...prevProps.user,
        roles: event.target.value
      },
    }));
  };

  handleUserCreateFailed(isFailed) {
    if (isFailed) {
      this.setState({
        user: {
          username: '',
          email: '',
          roles: [],
          password: '',
        },
        showOk: false,
        showFail: true,
        showDel: false,
      });
    }
  }

  handleDone(done) {
    if (done) {
      this.props.fetchUserList();
      this.props.createFailed ? this.setState({showFail: true}) : this.setState({showOk: true});
      this.props.deleteFailed ? this.setState({showFail: true}) : this.setState({showOk: true});
    }
  }

  sendCreate = () => {
    this.props.createUser(this.state.user);
  };

  handleClose = () => {
    this.setState({
      showOk: false,
      showFail: false,
      showDel: false,
    })
  };

  componentDidMount() {
    this.props.fetchUserList();
  }

  componentDidUpdate(prevProps) {
    const createDone = prevProps.inProgressCreate && !this.props.inProgressCreate;
    const deleteDone = prevProps.inProgressDelete && !this.props.inProgressDelete;

    this.handleUserCreateFailed(!prevProps.createFailed && this.props.createFailed);
    this.handleDone(createDone || deleteDone);
  }

  redirect = (username) => () => {
    this.props.history.push(routes.ADMIN_USER_DETAILS.replace(':username', username))
  };

  confirmDelete = (username) => () => {
    this.setState({
      usernameToDelete: username,
      showDel: true,
    })
  };

  handleDelete = () => {
    this.props.deleteUser(this.state.usernameToDelete);
    this.handleClose();
  };

  render() {
    const {inProgressCreate, classes, userList} = this.props;

    return (
        <AdminLayoutContainer>
          <OkDialog open={this.state.showOk} handleClose={this.handleClose}/>
          <FailDialog open={this.state.showFail} handleClose={this.handleClose}/>
          <DelDialog open={this.state.showDel} handleClose={this.handleClose} handleDelete={this.handleDelete}/>
          <Typography variant="h4" gutterBottom component="h2">
            {t.admin.users.addUser}
          </Typography>
          <form className={classes.form}>
            <TextField
                required
                autoComplete="username"
                label={t.admin.users.username}
                variant="outlined"
                onChange={this.handleChange('username')}
                className={classes.box}
            />
            <TextField
                required
                label={t.admin.users.email}
                autoComplete="email"
                variant="outlined"
                onChange={this.handleChange('email')}
                className={classes.box}
            />
            <TextField
                required
                label={t.admin.users.password}
                variant="outlined"
                type="password"
                autoComplete="current-password"
                onChange={this.handleChange('password')}
                className={classes.box}
            />
            <TextField
                required
                label={t.admin.users.confirmPassword}
                variant="outlined"
                type="password"
                autoComplete="current-password"
                onChange={this.handleChange('passwordRetype')}
                className={classes.box}
            />
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="select-multiple-checkbox">{t.admin.users.roles}</InputLabel>
              <Select
                  multiple
                  value={this.state.user.roles}
                  onChange={this.handleChangeMultiple}
                  input={<Input id="select-multiple-checkbox" />}
                  renderValue={selected => selected.join(', ')}
                  MenuProps={MenuProps}
              >
                {roles.map(role => (
                    <MenuItem key={role} value={role}>
                      <Checkbox checked={this.state.user.roles.indexOf(role) > -1} />
                      <ListItemText primary={role} />
                    </MenuItem>
                ))}
              </Select>
            </FormControl>
          </form>
          <div>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={this.sendCreate}
                disabled={inProgressCreate}
            >
              {inProgressCreate ?
                  <CircularProgress size={25}/>
                  : t.admin.users.create
              }
            </Button>
          </div>

          <br/><br/><br/>

          <Typography variant="h4" gutterBottom component="h2">
            {t.admin.users.userList}
          </Typography>
          <Table className={classes.table}>
            <colgroup>
              <col style={{width: '25%'}}/>
              <col style={{width: '25%'}}/>
              <col style={{width: '25%'}}/>
              <col style={{width: '25%'}}/>
            </colgroup>
            <TableHead>
              <TableRow>
                <TableCell>{t.admin.users.username}</TableCell>
                <TableCell>{t.admin.users.email}</TableCell>
                <TableCell>{t.admin.users.roles}</TableCell>
                <TableCell>{t.admin.users.delete}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userList.map(user => (
                  <TableRow key={user.username} hover={true} className={classes.row}>
                    <TableCell onClick={this.redirect(user.username)}>{user.username}</TableCell>
                    <TableCell onClick={this.redirect(user.username)}>{user.email}</TableCell>
                    <TableCell onClick={this.redirect(user.username)}>{user.roles.join(', ')}</TableCell>
                    <TableCell>
                      <IconButton className={classes.del} onClick={this.confirmDelete(user.username)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </AdminLayoutContainer>
    );
  }
}

function mapStateToProps({userlist}) {
  return {
    inProgressCreate: userlist.inProgressCreate,
    inProgressDelete: userlist.inProgressDelete,
    createFailed: userlist.createFailed,
    deleteFailed: userlist.deleteFailed,
    userList: userlist.userList,
  };
}

export default connect(mapStateToProps, {
  createUser, deleteUser, fetchUserList,
})(withStyles(styles)(UserlistContainer));
