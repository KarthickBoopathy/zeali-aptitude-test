import { Button, Grid, Typography } from "@material-ui/core";
import { Component } from "react";
import AptitudeTest from "./AptitudeTest";
import TopicList from "./Landing";

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

    return (
      <div>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography>
              Practice Makes a Man Perfect. Happy Cracking !!
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                this.setState({ disableHome: true });
              }}
            >
              Take Test
            </Button>
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
