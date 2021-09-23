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
      top: false,
    };
  }

  aptitudeQuestionCallback = (value) => {
    this.setState({ disableHome: value });
  };

  toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    this.setState({ top: open });
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
    const { disableHome, top } = this.state;
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

    const drawerStyle = {
      maxWidth: 500,
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
            onClick={this.toggleDrawer(true)}
          />

          <SpeedDialAction
            key="profile"
            icon={<PersonPinIcon />}
            tooltipTitle="Profile"
            onClick={this.toggleDrawer(true)}
          />

        </SpeedDial>
        <Drawer style={drawerStyle} anchor="top" open={top} onClose={this.toggleDrawer(false)}>
          {/* <UserSettings /> */}
          <Dashboard/>
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
