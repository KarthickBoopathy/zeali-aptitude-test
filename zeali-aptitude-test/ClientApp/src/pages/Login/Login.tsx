import TextField from "@material-ui/core/TextField";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Grid, Link, Paper } from "@material-ui/core";
import { useCallback, useState } from "react";
import {
  generateForgotPasswordOTP,
  generateSignUpOTP,
  loginZeali,
  registerNewZealiUsers,
  userChangePassword,
} from "../../common/utils";
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
  const [enableForgotPassword, setEnableForgotPassword] = useState(false);
  const [serverOTP, setServerOTP] = useState("");
  const [userOTP, setUserOTP] = useState("");
  const [
    enableSignUpPasswordChamber,
    setEnableSignUpPasswordChamber,
  ] = useState(false);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>({
    emailError: false,
    passwordError: false,
    createPasswordError: false,
    confirmPasswordError: false,
    otpError: false,
    emailMessage: "",
    passwordMessage: "",
    createPasswordMessage: "",
    confirmPasswordMessage: "",
    otpMessage: "",
  });
  const [userDetails, SetUserDetails] = useState<ZealiUsers>({
    email: "",
    password: "",
    username: "",
  });

  const clearErrorMessages = () => {
    setErrorMessage({
      emailError: false,
      passwordError: false,
      createPasswordError: false,
      confirmPasswordError: false,
      otpError: false,
      emailMessage: "",
      passwordMessage: "",
      createPasswordMessage: "",
      confirmPasswordMessage: "",
      otpMessage: "",
    });
    setEnableSignUpPasswordChamber(false);
  };

  const handleEnableLogin = () => {
    clearErrorMessages();
    setEnableLogin(true);
    setEnableForgotPassword(false);
  };

  const handleEnableSignUp = () => {
    clearErrorMessages();
    setEnableForgotPassword(false);
    setEnableLogin(false);
  };

  const handleEnableForgotPassword = () => {
    clearErrorMessages();
    setEnableForgotPassword(true);
  };

  const handleLogin = useCallback(
    (event: any) => {
      event.preventDefault();
      loginZeali(userDetails).then((data) => {
        parentCallback(data?.isLoggedIn ?? false);
        localStorage?.setItem("loginStatus", JSON.stringify(data));

        setErrorMessage({
          emailError: data?.emailError,
          passwordError: data?.passwordError,
          createPasswordError: data?.createPasswordError,
          confirmPasswordError: data?.confirmPasswordError,
          otpError: data?.otpError,
          emailMessage: data?.emailMessage,
          passwordMessage: data?.passwordMessage,
          createPasswordMessage: data?.createPasswordMessage,
          confirmPasswordMessage: data?.confirmPasswordMessage,
          otpMessage: data?.otpMessage,
        });
      });
    },
    [userDetails, parentCallback]
  );

  const handleChangePassword = useCallback(
    (event: any) => {
      event.preventDefault();
      if (userOTP && userOTP === serverOTP) {
        if (userDetails?.password !== confirmPassword) {
          setErrorMessage({
            confirmPasswordError: true,
            confirmPasswordMessage: "Password does not match",
          });
        } else {
          userChangePassword(userDetails).then((data: any) => {
            parentCallback(data?.isLoggedIn ?? false);
            localStorage?.setItem("loginStatus", JSON.stringify(data));

            setErrorMessage({
              emailError: data?.emailError,
              passwordError: data?.passwordError,
              createPasswordError: data?.createPasswordError,
              confirmPasswordError: data?.confirmPasswordError,
              otpError: data?.otpError,
              emailMessage: data?.emailMessage,
              passwordMessage: data?.passwordMessage,
              createPasswordMessage: data?.createPasswordMessage,
              confirmPasswordMessage: data?.confirmPasswordMessage,
              otpMessage: data?.otpMessage,
            });
          });

        }
      } else {
        setErrorMessage({
          otpError: true,
          otpMessage: "OTP does not match",
        });
      }
    },
    [userDetails, parentCallback, confirmPassword, userOTP, serverOTP]
  );

  const handleSignUp = useCallback(
    (event: any) => {
      event.preventDefault();
      if (userOTP && userOTP === serverOTP) {
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
              emailError: data?.emailError,
              passwordError: data?.passwordError,
              createPasswordError: data?.createPasswordError,
              confirmPasswordError: data?.confirmPasswordError,
              otpError: data?.otpError,
              emailMessage: data?.emailMessage,
              passwordMessage: data?.passwordMessage,
              createPasswordMessage: data?.createPasswordMessage,
              confirmPasswordMessage: data?.confirmPasswordMessage,
              otpMessage: data?.otpMessage,
            });
          });
        }
      } else {
        setErrorMessage({
          otpError: true,
          otpMessage: "OTP does not match",
        });
      }
    },
    [userDetails, parentCallback, confirmPassword, userOTP, serverOTP]
  );

  const handleLoginOTP = useCallback(
    (event: any) => {
      event.preventDefault();
      
      generateForgotPasswordOTP(userDetails).then((data) => {
        setServerOTP(data?.otp);
        setErrorMessage({
          emailError: data?.emailError,
          passwordError: data?.passwordError,
          createPasswordError: data?.createPasswordError,
          confirmPasswordError: data?.confirmPasswordError,
          otpError: data?.otpError,
          emailMessage: data?.emailMessage,
          passwordMessage: data?.passwordMessage,
          createPasswordMessage: data?.createPasswordMessage,
          confirmPasswordMessage: data?.confirmPasswordMessage,
          otpMessage: data?.otpMessage,
        });
        setEnableSignUpPasswordChamber(!data?.emailError??false);
      });
    },
    [userDetails, setServerOTP, setErrorMessage]
  );

  const handleSignUpOTP = useCallback(
    (event: any) => {
      event.preventDefault();
  
      generateSignUpOTP(userDetails).then((data) => {
        setServerOTP(data?.otp);
        setErrorMessage({
          emailError: data?.emailError,
          passwordError: data?.passwordError,
          createPasswordError: data?.createPasswordError,
          confirmPasswordError: data?.confirmPasswordError,
          otpError: data?.otpError,
          emailMessage: data?.emailMessage,
          passwordMessage: data?.passwordMessage,
          createPasswordMessage: data?.createPasswordMessage,
          confirmPasswordMessage: data?.confirmPasswordMessage,
          otpMessage: data?.otpMessage,
        });

        setEnableSignUpPasswordChamber(!data?.emailError??false);
      });
    },
    [userDetails, setServerOTP, setErrorMessage]
  );

  const renderLogin = () => {
    if (!enableLogin || enableForgotPassword) {
      return;
    }

    return (
      <>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>LOGIN WITH YOUR DETAILS</Paper>
          </Grid>
        </Grid>
        <form onSubmit={handleLogin}>
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
              <Link href="#" onClick={handleEnableSignUp}>
                New to Zeali?
              </Link>
            </Grid>
            <Grid item xs={6}>
              <Link href="#" onClick={handleEnableForgotPassword}>
                Forgot password?
              </Link>
            </Grid>
          </Grid>
        </form>
      </>
    );
  };



  const renderSignUp = () => {
    if (enableLogin) {
      return;
    }

    return (
      <>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>REGISTER WITH YOUR DETAILS</Paper>
          </Grid>
        </Grid>
        <form
          onSubmit={
            enableSignUpPasswordChamber ? handleSignUp : handleSignUpOTP
          }
        >
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

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="username"
                type="text"
                label="User Name"
                onChange={(event) =>
                  SetUserDetails({
                    ...userDetails,
                    username: event.target.value,
                  })
                }
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                required={enableSignUpPasswordChamber}
                fullWidth
                error={errorMessage.otpError}
                helperText={errorMessage.otpMessage}
                id="otp"
                type="password"
                label="Enter OTP"
                onChange={(event) => setUserOTP(event.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                disabled={(enableSignUpPasswordChamber&&!errorMessage.emailError)}
                variant="contained"
                color="secondary"
                type="submit"
              >
                Send OTP
              </Button>
            </Grid>
            {enableSignUpPasswordChamber && (
              <>
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

                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    type="submit"
                  >
                    REGISTER
                  </Button>
                </Grid>
              </>
            )}
            <Grid item xs={12}>
              <Link href="#" onClick={handleEnableLogin}>
                Already having Account?
              </Link>
            </Grid>
          </Grid>
        </form>
      </>
    );
  };

  const renderForgotPassword = () => {
    if ((enableLogin && !enableForgotPassword) || (!enableForgotPassword)) {
      return;
    }

  

    return (
      <>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>CREATE YOUR NEW PASSWORD</Paper>
          </Grid>
        </Grid>
        <form
          onSubmit={
            enableSignUpPasswordChamber ? handleChangePassword : handleLoginOTP
          }
        >
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

            <Grid item xs={6}>
              <TextField
                required={enableSignUpPasswordChamber}
                fullWidth
                error={errorMessage.otpError}
                helperText={errorMessage.otpMessage}
                id="otp"
                type="password"
                label="Enter OTP"
                onChange={(event) => setUserOTP(event.target.value)}
              />
            </Grid>

            <Grid item xs={6}>
              <Button
                fullWidth
                disabled={(enableSignUpPasswordChamber&&!errorMessage.emailError)}
                variant="contained"
                color="secondary"
                type="submit"
              >
                Send OTP
              </Button>
            </Grid>
            {enableSignUpPasswordChamber && (
              <>
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

                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    type="submit"
                  >
                    REGISTER
                  </Button>
                </Grid>
              </>
            )}
            <Grid item xs={12}>
              <Link href="#" onClick={handleEnableLogin}>
                Back to Login page
              </Link>
            </Grid>
          </Grid>
        </form>
      </>
    );
  };

  return (
    <div>
      {renderLogin()}
      {renderForgotPassword()}
      {renderSignUp()}
    </div>
  );
};

export default Login;
