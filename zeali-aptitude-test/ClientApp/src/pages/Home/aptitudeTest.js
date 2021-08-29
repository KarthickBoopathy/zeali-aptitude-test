import { useEffect, useState } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { getAptitudeQuestions } from "./utils";

export default function AptitudeTest() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [first, setFirst] = useState(1);
  const [last, setLast] = useState(20);
  const [aptitudeQuestions, setAptitudeQuestions] = useState([{}]);
  const [apiCalled, setApiCalled] = useState(false);

  useEffect(() => {
    const headers = { "Content-Type": "application/json" };
    return (
      !apiCalled &&
      fetch("https://localhost:44349/api/zealiAptitudeTest/ZealiAptitude", {
        headers,
      })
        .then((response) => response.json())
        .then((data) => {
          setAptitudeQuestions(data);
          setApiCalled(true);
        })[(headers, setAptitudeQuestions)]
    );
  });

  const renderHeader = () => {
    const styles = { padding: 10, textAlign: "center" };

    return (
      <div>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Paper style={styles}>
              <Typography>
                Question : {currentIndex}/{last}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper style={styles}>
              <Typography>Time : </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}></Grid>
        </Grid>
        <br />
      </div>
    );
  };

  const renderButtons = () => {
    const handleNext = () => {
      setCurrentIndex(currentIndex == last ? last : currentIndex + 1);
    };

    const handlePrev = () => {
      setCurrentIndex(currentIndex == first ? first : currentIndex - 1);
    };

    const handleFirst = () => {
      setCurrentIndex(first);
    };

    const handleLast = () => {
      setCurrentIndex(last);
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
            <Button variant="contained" color="secondary">
              Submit Quiz
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  };

  const renderOnlineQuiz = () => {
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
          <br /> <br />
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

  const style = { flexGrow: "1" };

  return (
    <div style={style}>
      {renderHeader()}
      {renderOnlineQuiz()}
      {renderButtons()}
    </div>
  );
}
