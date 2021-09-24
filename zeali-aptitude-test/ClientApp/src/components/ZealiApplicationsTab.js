import { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import { Assignment } from "@material-ui/icons";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import { getStorageDataOf } from "../common/utils";

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

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loginStatus = getStorageDataOf("isLoggedIn")?? false;
    setIsLoggedIn(loginStatus);
  }, [setIsLoggedIn]);


  const callback = useCallback((val) => {
    setIsLoggedIn(val);
  }, []);


  const renderContent = () => {
    if (isLoggedIn) {
      return <Home />;
    } else {
      return <Login loginCallback={callback} />;
    }
  };

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
        {renderContent()}
      </TabPanel>
    </div>
  );
}
