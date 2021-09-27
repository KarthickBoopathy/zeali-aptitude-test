import { Button, Grid, Link, Paper, TextField } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router";

import {
  authorize,
  generateSignUpOTP,
  registerNewZealiUsers,
  verifyNewUserOTP,
} from "../../service/utils";
import { Error, ZealiUsers } from "../../types/schema";

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

const Signup = () => {
  const classes = useStyles();

  const [error, setError] = useState<Error>({});
  const [zealiUsers, SetZealiUsers] = useState<ZealiUsers>({});
  const [verify, SetVerify] = useState(false);
  const [enablePassword, SetEnablePassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

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

  const handleSendOTP = useCallback(
    (event: any) => {
      event.preventDefault();
      generateSignUpOTP(zealiUsers).then((data) => {
        if (data) {
          setError(data);
          SetVerify(data.errorCode !== 0 ? false : true);
        }
      });
    },
    [zealiUsers]
  );

  const handleVerifyOTP = useCallback(
    (event: any) => {
      event.preventDefault();
      verifyNewUserOTP(zealiUsers).then((data) => {
        if (data) {
          setError(data);
          SetEnablePassword(data.errorCode !== 0 ? false : true);
        }
      });
    },
    [zealiUsers]
  );

  const handleCreatePassword = useCallback(
    (event: any) => {
      event.preventDefault();
      if (zealiUsers.password === confirmPassword) {
        registerNewZealiUsers(zealiUsers).then((data) => {
          if (data) {
            setError(data);
            if (data.errorCode === 0) {
              NavigateTo("/Home");
            }
          }
        });
      } else {
        setError({ passwordError: "Password does not match" });
      }
    },
    [confirmPassword, zealiUsers, NavigateTo]
  );

  const verifyOTP = () => {
    if (enablePassword) {
      return;
    }
    return (
      <>
        <form onSubmit={verify ? handleVerifyOTP : handleSendOTP}>
          <Grid container spacing={3}>
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
                type="text"
                id="username"
                label="Username"
                onChange={(event) =>
                  SetZealiUsers({ ...zealiUsers, username: event.target.value })
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                disabled={!verify}
                required={verify}
                fullWidth
                type="password"
                id="otp"
                label="OTP"
                error={error.otpError ? true : false}
                helperText={error.otpError}
                onChange={(event) =>
                  SetZealiUsers({ ...zealiUsers, otp: event.target.value })
                }
              />
            </Grid>
            <Grid item xs={6}>
              <Button
                disabled={verify}
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
              >
                Send OTP
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                disabled={!verify}
                fullWidth
                variant="contained"
                color="secondary"
                type="submit"
              >
                Verify OTP
              </Button>
            </Grid>
          </Grid>
        </form>
      </>
    );
  };

  const createPassword = () => {
    if (!enablePassword) {
      return;
    }
    return (
      <>
        <form onSubmit={handleCreatePassword}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required={verify}
                fullWidth
                type="password"
                id="newPassword"
                label="Create Password"
                onChange={(event) =>
                  SetZealiUsers({ ...zealiUsers, password: event.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required={verify}
                fullWidth
                type="password"
                id="confirmPasswor"
                label="Confirm Password"
                error={error.passwordError ? true : false}
                helperText={error.passwordError}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                type="submit"
              >
                Change Password
              </Button>
            </Grid>
          </Grid>
        </form>
      </>
    );
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>REGISTER WITH YOUR DETAILS</Paper>
        </Grid>
      </Grid>
      {verifyOTP()}
      {createPassword()}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Link onClick={() => NavigateTo("/")}>
            Already having Account?
          </Link>
        </Grid>
      </Grid>
    </>
  );
};
export default Signup;
