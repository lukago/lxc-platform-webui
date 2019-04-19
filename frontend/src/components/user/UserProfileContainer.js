import React from 'react';
import Typography from '@material-ui/core/Typography';
import UserLayoutContainer from "./UserLayoutContainer";
import {withStyles} from "@material-ui/core";
import t from "../../locale/locale";

const styles = theme => ({
  root: {
    display: 'flex',
  },
  tableContainer: {
    height: 320,
  },
});

const UserProfileContainer = (props) => {
  const { classes } = props;

  return (
      <UserLayoutContainer>
        <Typography variant="h4" gutterBottom component="h2">
          {t.user.profile.userProfile}
        </Typography>
        <Typography component="div" className={classes.tableContainer}>
          {t.user.profile.content}
        </Typography>
      </UserLayoutContainer>
  );
};

export default withStyles(styles)(UserProfileContainer);
