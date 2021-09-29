import { Button, Grid, Paper, TextField, Link } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { useCallback, useEffect, useState } from "react";
import { authorize, loginZeali } from "../../service/utils";
import { Error, ZealiUsers } from "../../types/schema";
import { useHistory } from "react-router";

const useStyles = makeStyles(() =>
  createStyles({
    paper: {
      padding: 10,
      textAlign: "center",
      backgroundColor: "#69924a",
      color: "white",
    },
  })
);

const Signin = () => {
  const classes = useStyles();
  const [error, setError] = useState<Error>({});
  const [zealiUsers, SetZealiUsers] = useState<ZealiUsers>({});

  const history = useHistory();
  const NavigateTo = useCallback((path: string) => history.push(path), [
    history,
  ]);
  
  useEffect(() => {
    authorize().then((data) => {
      if (data) {
        if (data.errorCode === 0) {
          NavigateTo("/Home");
        }
      } else {
        NavigateTo("/Signin");
      }
    });
  }, [NavigateTo]);

  const handleLogin = useCallback(
    (event: any) => {
      event.preventDefault();
      loginZeali(zealiUsers).then((data) => {
        if (data) {
          setError(data);
          if (data.errorCode === 0) {
            NavigateTo("/Home");
          }
        }
      });
    },
    [zealiUsers, NavigateTo]
  );

  return (
    <>
      <form onSubmit={handleLogin}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>LOGIN WITH YOUR DETAILS</Paper>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              type="email"
              id="email"
              label="Email ID"
              error={error.emailError ? true : false}
              helperText={error.emailError}
              onChange={(event) =>
                SetZealiUsers({ ...zealiUsers, email: event.target.value })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              type="password"
              id="password"
              label="Password"
              error={error.passwordError ? true : false}
              helperText={error.passwordError}
              onChange={(event) =>
                SetZealiUsers({ ...zealiUsers, password: event.target.value })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              type="submit"
            >
              LOGIN
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Link onClick={() => NavigateTo("/Signup")}>New to Zeali?</Link>
          </Grid>
          <Grid item xs={6}>
            <Link onClick={() => NavigateTo("/ForgotPassword")}>
              Forgot password?
            </Link>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default Signin;
