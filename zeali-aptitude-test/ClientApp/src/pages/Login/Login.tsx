import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { Grid, Link, Paper } from "@material-ui/core";
import { useCallback, useState } from "react";
import { loginZeali, registerNewZealiUsers } from "../../common/utils";
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

const Login = ({ parentCallback }: any) => {
  const classes = useStyles();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [enableLogin, setEnableLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>({
    emailError: false,
    passwordError: false,
    createPasswordError: false,
    confirmPasswordError: false,
    emailMessage: "",
    passwordMessage: "",
    createPasswordMessage: "",
    confirmPasswordMessage: "",
  });
  const [userDetails, SetUserDetails] = useState<ZealiUsers>({
    email: "",
    password: ""
  });

  const handleLogin = useCallback(
    (event: any) => {
      event.preventDefault();
      loginZeali(userDetails).then((data) => {
        parentCallback(data?.isLoggedIn ?? false);
        localStorage?.setItem("loginStatus", JSON.stringify(data));

        if (data?.errorMessage === "Incorrect Password") {
          setErrorMessage({
            passwordError: !data?.isLoggedIn,
            passwordMessage: data?.errorMessage,
          });
        } else {
          setErrorMessage({
            emailError: !data?.isLoggedIn,
            emailMessage: data?.errorMessage,
          });
        }
      });
    },
    [userDetails, parentCallback]
  );

  const handleSignUp = useCallback(
    (event: any) => {
      event.preventDefault();

      if (userDetails?.password !== confirmPassword) {
        setErrorMessage({
          confirmPasswordError: true,
          confirmPasswordMessage: "Password does not match",
        });
      } else {
        registerNewZealiUsers(userDetails).then((data: any) => {
          parentCallback(data?.isLoggedIn ?? false);
          localStorage?.setItem("loginStatus", JSON.stringify(data));
          setErrorMessage({
            emailError: !data?.isLoggedIn,
            emailMessage: data?.errorMessage,
          });
        });
      }
    },
    [userDetails, parentCallback, confirmPassword]
  );

  const handleForgotPassword = () => {};

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
        <form onSubmit={enableLogin ? handleLogin : handleSignUp}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                error={errorMessage.emailError}
                helperText={errorMessage.emailMessage}
                type="email"
                id="email"
                label="Email ID"
                onChange={(event) =>
                  SetUserDetails({ ...userDetails, email: event.target.value })
                }
              />
            </Grid>
            {enableLogin && (
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  error={errorMessage.passwordError}
                  helperText={errorMessage.passwordMessage}
                  id="password"
                  type="password"
                  label="Password"
                  onChange={(event) =>
                    SetUserDetails({
                      ...userDetails,
                      password: event.target.value,
                    })
                  }
                />
              </Grid>
            )}
            {!enableLogin && (
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  error={errorMessage.createPasswordError}
                  helperText={errorMessage.createPasswordMessage}
                  id="createPassword"
                  type="password"
                  label="Create Password"
                  onChange={(event) =>
                    SetUserDetails({
                      ...userDetails,
                      password: event.target.value,
                    })
                  }
                />
              </Grid>
            )}

            {!enableLogin && (
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  error={errorMessage.confirmPasswordError}
                  helperText={errorMessage.confirmPasswordMessage}
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
              <>
                <Grid item xs={6}>
                  <Link href="#" onClick={handleEnableSignUp}>
                    New to Zeali ? 
                  </Link>
                </Grid>
                <Grid item xs={6}>
                  <Link href="#" onClick={handleForgotPassword}>
                    Forgot password ?
                  </Link>
                </Grid>
              </>
            )}
            {!enableLogin && (
              <Grid item xs={12}>
                <Link href="#" onClick={handleEnableLogin}>
                  Already having Account ?
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
