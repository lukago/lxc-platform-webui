import React from 'react';
import Typography from '@material-ui/core/Typography';
import UserLayoutContainer from "../UserLayoutContainer";
import {withStyles} from "@material-ui/core";
import t from "../../../locale/locale";
import connect from "react-redux/es/connect/connect";
import {
  connectSocket,
  disconnectSocket,
  fetchLxcList
} from './lxcActions';
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import Table from "@material-ui/core/Table/Table";
import TableBody from "@material-ui/core/TableBody/TableBody";
import {routes} from "../../../config/appData";
import {fetchServerInfo} from "./details/detailsActions";

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

class LxcUserContainer extends React.Component {

  componentDidMount() {
    this.props.connectSocket();
    this.props.fetchLxcList();
    this.props.fetchServerInfo();
  }

  componentWillUnmount() {
    this.props.disconnectSocket();
  }

  redirect = (lxcName) => () => {
    this.props.history.push(routes.CLIENT_LXC_DETAILS.replace(':lxcName', lxcName))
  };

  render() {
    const {classes, lxcList} = this.props;

    return (
        <UserLayoutContainer>
          <Typography variant="h4" gutterBottom component="h2">
            {t.admin.lxc.lxcList}
          </Typography>
          <Table className={classes.table}>
            <colgroup>
              <col style={{width: '30%'}}/>
              <col style={{width: '30%'}}/>
              <col style={{width: '40%'}}/>
            </colgroup>
            <TableHead>
              <TableRow>
                <TableCell>{t.admin.lxc.name}</TableCell>
                <TableCell>{t.admin.lxc.owner}</TableCell>
                <TableCell>{t.admin.lxc.address}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lxcList.map(lxc => (
                  <TableRow key={lxc.name} hover={true} className={classes.row} onClick={this.redirect(lxc.name)}>
                    <TableCell>{lxc.name}</TableCell>
                    <TableCell>
                      {lxc.owner ? lxc.owner.username : t.admin.lxc.unassigned}
                    </TableCell>
                    <TableCell>{this.props.serverInfo.ip}:{lxc.port}</TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </UserLayoutContainer>
    );
  }
}

function mapStateToProps({lxcUser, lxcUserDetails}) {
  return {
    lxcList: lxcUser.lxcList,
    serverInfo: lxcUserDetails.serverInfo,
  };
}

export default connect(mapStateToProps, {
  connectSocket, disconnectSocket, fetchLxcList, fetchServerInfo,
})(withStyles(styles)(LxcUserContainer));
