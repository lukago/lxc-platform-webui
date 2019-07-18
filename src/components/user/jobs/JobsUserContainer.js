import React from 'react';
import Typography from '@material-ui/core/Typography';
import UserLayoutContainer from "../UserLayoutContainer";
import {withStyles} from "@material-ui/core";
import t from "../../../locale/locale";
import connect from "react-redux/es/connect/connect";
import {connectSocket, disconnectSocket, fetchJobList} from './jobsActions';
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import Table from "@material-ui/core/Table/Table";
import TableBody from "@material-ui/core/TableBody/TableBody";
import {FailDialog} from "../../common/dialogs";
import Button from "@material-ui/core/Button/Button";
import {routes} from "../../../config/appData";

const styles = theme => ({
  tableContainer: {
    height: 320,
  },
  table: {
    minWidth: 700,
    maxWidth: 1100,
  },
});

class JobsUserContainer extends React.Component {

  state = {
    showOk: false,
    showFail: false,
  };

  componentDidMount() {
    this.props.connectSocket();
    this.props.fetchJobList(this.props.match.params.pageNr);
  }

  componentWillUnmount() {
    this.props.disconnectSocket();
  }

  componentDidUpdate(prevProps) {
    this.handleDone(prevProps.inProgressList && !this.props.inProgressList)
  }

  handleDone(done) {
    if (done) {
      this.props.fetchJobsFailed ?
          this.setState({showFail: true}) :
          this.setState({showOk: true})
    }
  }

  handleClose = () => {
    this.setState({
      showOk: false,
      showFail: false,
    })
  };

  goNext = () => {
    const page = Number(this.props.match.params.pageNr) + 1;
    this.props.history.push(routes.CLIENT_JOBS.replace(':pageNr', page));
    this.props.fetchJobList(page);
  };

  goPrev = () => {
    const page = Number(this.props.match.params.pageNr) - 1;
    this.props.history.push(routes.CLIENT_JOBS.replace(':pageNr', page));
    this.props.fetchJobList(page);
  };

  render() {
    const {classes, jobList} = this.props;

    return (
        <UserLayoutContainer>
          <FailDialog open={this.state.showFail}
                      handleClose={this.handleClose}/>

          <Typography variant="h4" gutterBottom component="h2">
            {t.admin.jobs.jobList}
          </Typography>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>{t.admin.jobs.description}</TableCell>
                <TableCell>{t.admin.jobs.jobStatus}</TableCell>
                <TableCell>{t.admin.jobs.jobCode}</TableCell>
                <TableCell>{t.admin.jobs.startDate}</TableCell>
                <TableCell>{t.admin.jobs.endDate}</TableCell>
                <TableCell>{t.admin.jobs.createdBy}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {jobList.map(job => (
                  <TableRow key={job.key} hover={true}>
                    <TableCell>{job.description}</TableCell>
                    <TableCell>{job.jobStatus}</TableCell>
                    <TableCell>{job.jobCode}</TableCell>
                    <TableCell>{job.startDate}</TableCell>
                    <TableCell>{job.endDate}</TableCell>
                    <TableCell>{job.createdBy.username}</TableCell>
                  </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={6} align="center" variant="footer">
                  <br/>
                  <div>
                    <Button onClick={this.goPrev} color="secondary"
                            disabled={this.props.match.params.pageNr < 2}>
                      {t.admin.jobs.prev}
                    </Button>
                    <Button onClick={this.goNext} color="secondary"
                            disabled={jobList.length < 20}>
                      {t.admin.jobs.next}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

        </UserLayoutContainer>
    );
  }
}

function mapStateToProps({jobs}) {
  return {
    jobList: jobs.jobList,
    inProgressList: jobs.inProgressList,
    fetchJobsFailed: jobs.fetchJobsFailed,
  };
}

export default connect(mapStateToProps, {
  fetchJobList, connectSocket, disconnectSocket,
})(withStyles(styles)(JobsUserContainer));
