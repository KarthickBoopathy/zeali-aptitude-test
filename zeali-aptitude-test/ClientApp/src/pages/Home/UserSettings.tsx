import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { exportLocalStorage } from "../../common/utils";
import { Logout } from "../Login/Logout";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: 15,
    fontSize: 16,
    textAlign: "center",
  },
}));

const UserSettings = () => {
  const classes = useStyles();
  const userDetails = exportLocalStorage();

  return (
    <Paper className={classes.paper} variant="elevation">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          Hello {userDetails?.username??""}, Welcome to Zeali !!
        </Grid>
        
        <Grid item xs={12}>
          <Logout />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default UserSettings;
