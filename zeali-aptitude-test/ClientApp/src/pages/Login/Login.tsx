import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { Grid, Link, Paper } from "@material-ui/core";
import { useState } from "react";
import { loginZeali, registerNewZealiUsers } from "../../utils";
import { ZealiUsers, ErrorMessage } from "../../types/schema";

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
  const [confirmPassword, setConfirmPassword] = useState("");
  const [enableLogin, setEnableLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>({
    error: false,
    message: "",
  });
  const [userDetails, SetUserDetails] = useState<ZealiUsers>({
    email: "",
    password: "",
  });

  const handleLogin = (event: any) => {
    
    if (enableLogin) {

      loginZeali(userDetails);

      const loginStatus = JSON.parse(localStorage?.getItem("loginStatus") ?? "");

      if (!loginStatus?.isLoggedIn) {
          event.preventDefault();
        setErrorMessage({ error: true, message: loginStatus?.errorMessage });
      }
    } else {
      if (userDetails.password === confirmPassword) {
        registerNewZealiUsers(userDetails);
      } else {
        event.preventDefault();
        setErrorMessage({
          error: true,
          message: "Password does not match",
        });
      }
    }
  };

  const handleEnableLogin = () => {
    setEnableLogin(true);
  };

  const handleEnableSignUp = () => {
    setEnableLogin(false);
  };
  return (
    <Card variant="outlined">
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              {enableLogin
                ? "LOGIN WITH YOUR DETAILS"
                : "REGISTER WITH YOUR DETAILS"}
            </Paper>
          </Grid>
        </Grid>
        <form onSubmit={handleLogin}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                type="email"
                id="email"
                label="Email ID"
                onChange={(event) =>
                  SetUserDetails({ ...userDetails, email: event.target.value })
                }
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                error={errorMessage.error}
                helperText={errorMessage.message}
                id="password"
                type="password"
                label={enableLogin ? "Password" : "Create Password"}
                onChange={(event) =>
                  SetUserDetails({
                    ...userDetails,
                    password: event.target.value,
                  })
                }
              />
            </Grid>

            {!enableLogin && (
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  error={errorMessage.error}
                  helperText={errorMessage.message}
                  id="confirmPassword"
                  type="password"
                  label="Confirm Password"
                  onChange={(event) => setConfirmPassword(event.target.value)}
                />
              </Grid>
            )}

            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                type="submit"
              >
                {enableLogin ? "LOGIN" : "REGISTER"}
              </Button>
            </Grid>

            {enableLogin && (
              <Grid item xs={12}>
                <Link href="#" onClick={handleEnableSignUp}>
                  Already having Account ?
                </Link>
              </Grid>
            )}
            {!enableLogin && (
              <Grid item xs={12}>
                <Link href="#" onClick={handleEnableLogin}>
                  New to Zeali ? Register here
                </Link>
              </Grid>
            )}
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default Login;
