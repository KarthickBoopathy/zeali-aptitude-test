import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";

import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const Login = () => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <AccountCircleIcon color="action"/>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField fullWidth id="userName" label="Email ID" />
          </Grid>
          <Grid item xs={6}>
            <TextField id="password" type="password" label="Password" />
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" color="primary">
              Forgot ?
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth variant="contained" color="secondary">
              Login
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Login;
