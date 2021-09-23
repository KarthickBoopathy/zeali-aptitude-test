import { Button } from "@material-ui/core";
import { Component } from "react";
import AptitudeQuestions from "../AptitudeQuestions/AptitudeQuestions";
import Topics from "./Topics";
import Paper from "@material-ui/core/Paper";

import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects";
import PersonPinIcon from '@mui/icons-material/PersonPin';
import TimelineIcon from '@mui/icons-material/Timeline';
import Drawer from "@material-ui/core/Drawer";
import UserSettings from "./UserSettings";

import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import Dashboard from "./Dashboard";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disableHome: false,
      isDashboard: false,
      isUserSettings: false
    };
  }

  aptitudeQuestionCallback = (value) => {
    this.setState({ disableHome: value });
  };

  toggleUserSettings = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    this.setState({ isUserSettings: open });
  };

  toggleDashboard= (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    this.setState({ isDashboard: open });
  };

  


  renderTakeTestButton() {
    const { disableHome } = this.state;
    if (disableHome) {
      return;
    }

    const style = {
      padding: 15,
      textAlign: "center",
      fontSize: 16,
    };

    return (
      <div>
        <Paper style={style} variant="elevation">
          Practice Makes a Man Perfect. Happy Cracking!!
          <br />
          <br />
          <Button variant="contained" color="secondary" onClick={() => { this.setState({ disableHome: true }); }} >
            Take Test
          </Button>
        </Paper>
        <br />
      </div>
    );
  }


  renderAptitudeTest() {
    const { disableHome } = this.state;
    if (!disableHome) {
      return;
    }
    return <AptitudeQuestions homeCallback={this.aptitudeQuestionCallback} />;
  }

  renderTopicsDivider() {
    const { disableHome } = this.state;
    if (disableHome) {
      return;
    }
    return <Topics />;
  }

  renderFabButton() {
    const { disableHome, isDashboard, isUserSettings } = this.state;
    if (disableHome) {
      return;
    }
    const style = {
      position: "fixed",
      bottom: "5%",
      right: "5%",
    };

    const fabStyle = {
      background: "#f50057"
    }



    return (
      <>
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          style={style}
          icon={<EmojiObjectsIcon />}
          FabProps={{ style: fabStyle }}
        >
          <SpeedDialAction
            key="dashboard"
            icon={<TimelineIcon />}
            tooltipTitle="Dashboard"
            onClick={this.toggleDashboard(true)}
          />

          <SpeedDialAction
            key="profile"
            icon={<PersonPinIcon />}
            tooltipTitle="Profile"
            onClick={this.toggleUserSettings(true)}
          />

        </SpeedDial>
        <Drawer anchor="top" open={isUserSettings} onClose={this.toggleUserSettings(false)}>
          <UserSettings />
        </Drawer>
        <Drawer anchor="top" open={isDashboard} onClose={this.toggleDashboard(false)}>
          <Dashboard />
        </Drawer>
      </>
    );
  }

  render() {
    return (
      <>
        {this.renderAptitudeTest()}
        {this.renderTakeTestButton()}
        {this.renderTopicsDivider()}
        {this.renderFabButton()}
      </>
    );
  }
}
