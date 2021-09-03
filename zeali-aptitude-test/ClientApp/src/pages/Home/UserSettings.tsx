import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: 15,
    textAlign: "center",
    fontSize: 16,
  },
}));

const UserSettings = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper} variant="elevation">
      <br />
      New Features are coming soon ...
      <br />
    </Paper>
  );
};

export default UserSettings;
