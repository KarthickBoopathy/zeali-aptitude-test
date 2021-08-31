import { Button, Grid, Typography } from "@material-ui/core";
import { Component } from "react";
import AptitudeTest from "./AptitudeTest";
import TopicList from "./Landing";
import Paper from "@material-ui/core/Paper";

export default class ApplicationHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disableHome: false,
    };
  }

  callback = (value) => {
    this.setState({ disableHome: value });
  };
  renderTakeTestButton() {
    const { disableHome } = this.state;

    if (disableHome) {
      return;
    }

    const style = {
      padding: 15,
      textAlign: "center",
      "font-size": 16,
    };

    return (
      <div>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper style={style} variant="elevation">
              Practice Makes a Man Perfect. Happy Cracking !!
              <br />
              <br />
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  this.setState({ disableHome: true });
                }}
              >
                Take Test
              </Button>
            </Paper>
          </Grid>
        </Grid>
        <br />
      </div>
    );
  }

  renderInstructionBanner() {
    return (
      <div>
        <Typography>
          Dear friend, remember this quiz is all about evaluating yourself for
          your upcoming MNC Interviews.
        </Typography>
        <Typography>
          Please be consious on Timings to yourself and start your Aptitude
          Test.
        </Typography>
      </div>
    );
  }

  renderAptitudeTest() {
    const { disableHome } = this.state;
    if (!disableHome) {
      return;
    }
    return <AptitudeTest parentCallback={this.callback} />;
  }

  renderTopicsDivider() {
    const { disableHome } = this.state;
    if (disableHome) {
      return;
    }
    return <TopicList />;
  }

  render() {
    return (
      <>
        {this.renderAptitudeTest()}
        {this.renderTakeTestButton()}
        {this.renderTopicsDivider()}
      </>
    );
  }
}
