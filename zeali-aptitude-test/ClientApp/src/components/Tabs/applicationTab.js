import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import { Assignment } from "@material-ui/icons";
import ApplicationHome from "../../pages/Home/ApplicationHome";
import Login from "../../pages/Login/Login";
import { exportLocalStorage } from "../../common/utils";

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
    height: "90vh",
    margin: "auto"
  },
  tab: {
    fontSize: "large",
  },
}));

export default function ApplicationTab() {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loginStatus = exportLocalStorage();
    setIsLoggedIn(loginStatus?.isLoggedIn);
  },[setIsLoggedIn]);


  const callback = (value) => {
    setIsLoggedIn(value);
  };


  const renderContent = () => {
    if (isLoggedIn) {
      return <ApplicationHome />;
    }
    else {
      return <Login parentCallback={callback} />;
    }
  };
  const handleChange = (newValue) => {
    setValue(newValue);
  };



  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ background: "#3b5998" }}>
        <Tabs
          value={value}
          onChange={handleChange}
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
