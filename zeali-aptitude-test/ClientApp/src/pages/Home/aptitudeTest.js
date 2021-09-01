import { useEffect, useState } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { getAptitudeQuestions } from "./utils";
import { Divider, Typography } from "@material-ui/core";

export default function AptitudeTest({ parentCallback }) {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [aptitudeQuestions, setAptitudeQuestions] = useState([{}]);
  const [disableQuiz, SetDisablleQuiz] = useState(false);
  const [disablePage, SetDisablePage] = useState(false);

  useEffect(() => {
    getAptitudeQuestions().then((data) => setAptitudeQuestions(data));
  }, [setAptitudeQuestions]);

  const renderHeader = () => {
    if (disableQuiz || disablePage) {
      return;
    }

    const styles = {
      padding: 10,
      textAlign: "center",
      backgroundColor: "#f50057",
      color: "white",
    };

    return (
      <div>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Paper style={styles}>
              Question : {currentIndex}/{20}
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper style={styles}>Time :</Paper>
          </Grid>
          <Grid item xs={12}></Grid>
        </Grid>
        <br />
      </div>
    );
  };

  const renderButtons = () => {
    if (disableQuiz || disablePage) {
      return;
    }

    const handleNext = () => {
      setCurrentIndex(currentIndex === 20 ? 20 : currentIndex + 1);
    };

    const handlePrev = () => {
      setCurrentIndex(currentIndex === 1 ? 1 : currentIndex - 1);
    };

    const handleFirst = () => {
      setCurrentIndex(1);
    };

    const handleLast = () => {
      setCurrentIndex(20);
    };

    const handleSubmit = () => {
      setAptitudeQuestions(Object.values(aptitudeQuestions));
      SetDisablleQuiz(true);
    };

    return (
      <div>
        <br />
        <br />
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Button variant="contained" color="primary" onClick={handleFirst}>
              First
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button variant="contained" color="primary" onClick={handlePrev}>
              Prev
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button variant="contained" color="primary" onClick={handleNext}>
              Next
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button variant="contained" color="primary" onClick={handleLast}>
              Last
            </Button>
          </Grid>
          <br />
          <br />
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleSubmit}
            >
              Submit Quiz
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  };

  const renderOnlineQuiz = () => {
    if (disableQuiz || disablePage) {
      return;
    }

    const handleChange = (event) => {
      setAptitudeQuestions({
        ...aptitudeQuestions,
        [currentIndex - 1]: {
          ...aptitudeQuestions[currentIndex - 1],
          userAnswer: event.target.value,
        },
      });
    };

    return (
      <div>
        <FormControl component="fieldset">
          <FormLabel component="legend">
            {aptitudeQuestions[currentIndex - 1]?.question ?? []}
          </FormLabel>
          <br />
          <RadioGroup
            aria-label="questions"
            name="questions_"
            value={aptitudeQuestions[currentIndex - 1].userAnswer ?? []}
            onChange={handleChange}
          >
            <FormControlLabel
              value="A"
              control={<Radio />}
              label={aptitudeQuestions[currentIndex - 1].optionA ?? []}
            />
            <FormControlLabel
              value="B"
              control={<Radio />}
              label={aptitudeQuestions[currentIndex - 1].optionB ?? []}
            />
            <FormControlLabel
              value="C"
              control={<Radio />}
              label={aptitudeQuestions[currentIndex - 1].optionC ?? []}
            />
            <FormControlLabel
              value="D"
              control={<Radio />}
              label={aptitudeQuestions[currentIndex - 1].optionD ?? []}
            />
          </RadioGroup>
        </FormControl>
      </div>
    );
  };

  const renderWrongAnswers = () => {
    if (!disableQuiz || disablePage) {
      return;
    }

    return (
      <>
        <Grid container>
          <Grid item xs>
            <Typography gutterBottom>
              Score : {aptitudeQuestions.length} / {aptitudeQuestions.length}
            </Typography>
            <Divider variant="fullWidth" />
          </Grid>
        </Grid>
        <br />
        <Grid container>
          {aptitudeQuestions?.map((item, i) => (
            <Grid item xs={12} key={i}>
              <Typography gutterBottom>{item.question}</Typography>
              <Typography color="textSecondary" variant="body2">
                A: {item.optionA}
              </Typography>
              <Typography color="textSecondary" variant="body2">
                B: {item.optionB}
              </Typography>
              <Typography color="textSecondary" variant="body2">
                C: {item.optionC}
              </Typography>
              <Typography color="textSecondary" variant="body2">
                D: {item.optionD}
              </Typography>
              <br />
              <Typography variant="body2" color="secondary">
                Correct Answer: {item.answer}
              </Typography>
              <Typography variant="body2" color="primary">
                Your Answer: {item.userAnswer}
              </Typography>
              <br />
              <Divider variant="fullWidth" />
              <br />
            </Grid>
          ))}
        </Grid>
        <Grid container>
          <Grid item xs>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                setAptitudeQuestions([]);
                SetDisablePage(true);
                parentCallback(false);
              }}
            >
              Exit Quiz
            </Button>
          </Grid>
        </Grid>
      </>
    );
  };

  const renderSnackBar = () => {};

  const style = { flexGrow: "1" };

  return (
    <div style={style}>
      {renderWrongAnswers()}
      {renderHeader()}
      {renderOnlineQuiz()}
      {renderButtons()}
    </div>
  );
}
