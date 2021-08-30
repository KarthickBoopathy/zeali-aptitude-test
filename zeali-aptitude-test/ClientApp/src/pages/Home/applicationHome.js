import { Button, Grid, Typography } from "@material-ui/core";
import { Component } from "react";
import AptitudeTest from "./AptitudeTest";
import TopicList from "./Landing";

export default class ApplicationHome extends Component {
  renderTakeTestButton() {
    return (
      <div>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography>
              Practice Makes a Man Perfect. Happy Cracking !!
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" color="primary">
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
    return <AptitudeTest />;
  }

  renderTopicsDivider() {
    return <TopicList />;
  }

  render() {
    return (
      <>
        {this.renderAptitudeTest()}
        {/* {this.renderTakeTestButton()} */}
      </>
    );
  }
}
