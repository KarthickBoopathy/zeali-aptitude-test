import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { Grid, Paper } from "@material-ui/core";
import { useState } from "react";
import {userAuthentication} from "../../utils"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: 10,
      textAlign: "center",
      backgroundColor: "#69924a",
      color: "white",
    },

    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  })
);

const Login = () => {
  const classes = useStyles();

  const [emailID, setEmailID] = useState("");
  const [password, setPassword] = useState("");
  

  const handleSubmit = () => {

   userAuthentication(emailID, password);
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>LOGIN WITH GOOGLE ACCOUNT</Paper>
          </Grid>
        </Grid>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="emailID"
                label="Email ID"
                onChange={(event) => setEmailID(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="password"
                type="password"
                label="Password"
                onChange={(event) => setPassword(event.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                type="submit"
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default Login;
