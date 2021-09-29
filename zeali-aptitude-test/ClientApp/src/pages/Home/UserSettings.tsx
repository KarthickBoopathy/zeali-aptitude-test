import { Grid, Paper } from "@material-ui/core";
import { useStyles } from "../../common/style";

import { Logout } from "../Login/Logout";


const UserSettings = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper} variant="elevation">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          Hello, Welcome to Zeali!!
        </Grid>
        <Grid item xs={12}>
          <Logout />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default UserSettings;
