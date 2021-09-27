import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import { Assignment } from "@material-ui/icons";
import Home from "../pages/Home/Home";
import Signin from "../pages/Login/Signin";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Signup from "../pages/Login/Signup";
import ForgotPassword from "../pages/Login/ForgotPassword";
import AptitudeQuestions from "../pages/AptitudeQuestions/AptitudeQuestions";


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: "#fcfcfc",
    maxWidth: "500px",
    height: "100vh",
    margin: "auto"
  },
  tab: {
    fontSize: "large",
  },
}));

export default function ZealiApplicationsTab() {
  const classes = useStyles();
  const value = 0;

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ background: "#3b5998" }}>
        <Tabs
          value={value}
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab
            className={classes.tab}
            label="Zeali - Aptitude Test"
            icon={<Assignment />}
            {...a11yProps(0)}
          />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Signin} />
            <Route path="/Signin" component={Signin} />
            <Route path="/Signup" component={Signup} />
            <Route path="/ForgotPassword" component={ForgotPassword} />
            <Route path="/Home" component={Home} />
            <Route path="/AptitudeQuestions" component={AptitudeQuestions} />
          </Switch>
        </BrowserRouter>


      </TabPanel>
    </div>
  );
}
