import { Button } from "@material-ui/core";
import { useCallback, useEffect, useState } from "react";
import Topics from "./Topics";
import Paper from "@material-ui/core/Paper";

import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import TimelineIcon from "@mui/icons-material/Timeline";
import Drawer from "@material-ui/core/Drawer";
import UserSettings from "./UserSettings";

import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import Dashboard from "./Dashboard";
import { useHistory } from "react-router";
import { authorize } from "../../service/utils";
import { useStyles } from "../../common/style";


const Home = () => {
  const classes = useStyles();

  const history = useHistory();
  const NavigateTo = useCallback((path: string) => history.push(path), [
    history,
  ]);

  const [dashboard, SetDashboard] = useState(false);
  const [userSettings, SetUserSettings] = useState(false);

  useEffect(() => {
    authorize().then((data) => {
      if (data) {
        if (data.errorCode !== 0) {
          NavigateTo("/Signin");
        }
      } else {
        NavigateTo("/Signin");
      }
    });
  }, [NavigateTo]);

  const toggleUserSettings = (open: boolean) => {
    SetUserSettings(open);
  };

  const toggleDashboard = (open: boolean) => {
    SetDashboard(open);
  };

  const renderTakeTestButton = () => {
    return (
      <div>
        <Paper className={classes.paper} variant="elevation">
          Practice Makes a Man Perfect. Happy Cracking!!
          <br />
          <br />
          <Button
            variant="contained"
            color="secondary"
            onClick={() => NavigateTo("/AptitudeQuestions")}
          >
            Take Test
          </Button>
        </Paper>
        <br />
      </div>
    );
  };

  const renderTopicsDivider = () => {
    return <Topics />;
  };

  const renderFabButton = () => {
    const fabStyle = {
      background: "#f50057",
    };

    return (
      <>
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          className={classes.fab}
          icon={<EmojiObjectsIcon />}
          FabProps={{ style: fabStyle }}
        >
          <SpeedDialAction
            key="dashboard"
            icon={<TimelineIcon />}
            tooltipTitle="Dashboard"
            onClick={() => toggleDashboard(true)}
          />

          <SpeedDialAction
            key="profile"
            icon={<PersonPinIcon />}
            tooltipTitle="Profile"
            onClick={() => toggleUserSettings(true)}
          />
        </SpeedDial>
        <Drawer
          anchor="top"
          open={userSettings}
          onClose={() => toggleUserSettings(false)}
        >
          <UserSettings />
        </Drawer>
        <Drawer
          anchor="top"
          open={dashboard}
          onClose={() => toggleDashboard(false)}
        >
          <Dashboard />
        </Drawer>
      </>
    );
  };

  return (
    <>
      {renderTakeTestButton()}
      {renderTopicsDivider()}
      {renderFabButton()}
    </>
  );
};

export default Home;
