import { useCallback, useEffect, useState } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { getAptitudeQuestions, saveTestResults } from "../../common/utils";
import Summary from "./Summary";
import { Typography } from "@material-ui/core";
import PageLoader from "../../components/PageLoader";
import { evaluateScore } from "../../common/formula";
import { exportLocalStorage } from "../../common/task";



export default function AptitudeQuestions({ homeCallback }) {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [aptitudeQuestions, setAptitudeQuestions] = useState([]);
  const [disableQuiz, SetDisableQuiz] = useState(false);
  const [disablePage, SetDisablePage] = useState(false);
  const [enableReview, SetEnableReview] = useState(false);
  const [pageLoad, SetPageLoad] = useState(true);
  const [pageLoadText, SetPageLoadText] = useState("Happy Cracking!!");
  const [startSound, SetStartSound] = useState(true);
  const [minutes, setMinutes] = useState(59);
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    getAptitudeQuestions().then((data) => setAptitudeQuestions(data));
    setTimeout(() => { SetPageLoad(false); }, 2800);
    return () => {
      setAptitudeQuestions([]);
    };
  }, []);


  useEffect(() => {
    if (!seconds) {
      if (minutes) {
        setSeconds(60);
        setMinutes(minutes - 1);
      }
      else {
        const getLocalData = exportLocalStorage();
        const getScore = evaluateScore(Object.values(aptitudeQuestions));
        saveTestResults(getLocalData?.email, getScore ).then((data) => {});
        SetStartSound(false);
        SetPageLoad(true);
        setAptitudeQuestions(a => Object.values(a));
        SetDisableQuiz(true);
        setTimeout(() => { SetPageLoad(false); }, 2800);
        return;
      }

    }
    const intervalId = setInterval(() => {
      setSeconds(seconds - 1);
    }, 1000);
    return () => {
      clearInterval(intervalId);
    }

  }, [seconds, minutes, aptitudeQuestions]);



  const renderPageLoader = () => {
    return (
      <PageLoader label={pageLoadText} start={startSound} />
    );
  };


  const renderHeader = () => {
    if (disableQuiz || disablePage || enableReview) {
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
            <Paper style={styles}>Question : {currentIndex}</Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper style={styles}>
              Time : {minutes === 60 ? "00" : minutes < 10 ? "0" + minutes : minutes}:{seconds === 60 ? "00" : seconds < 10 ? "0" + seconds : seconds}
            </Paper>
          </Grid>
          <Grid item xs={12}></Grid>
        </Grid>
        <br />
      </div>
    );
  };


  const handleSubmit= useCallback(()=>{
    SetPageLoadText("You're Rocking!!");
    const confirmSubmit = window.confirm("Do you want to submit your Aptitude Test?");
    if (confirmSubmit) {
      const getLocalData = exportLocalStorage();
      const getScore = evaluateScore(Object.values(aptitudeQuestions));
      saveTestResults(getLocalData?.email, getScore ).then((data) => {});

      SetStartSound(false);
      SetPageLoad(true);
      setAptitudeQuestions(a => Object.values(a));
      SetDisableQuiz(true);
      setTimeout(() => { SetPageLoad(false); }, 2800);
    }
  },[aptitudeQuestions]);


  const renderFooterButtons = () => {
    if (disableQuiz || disablePage || enableReview) {
      return;
    }

    const styles = {
      backgroundColor: "#69924a",
      color: "white",
    };

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

    const handleReview = () => {
      SetDisableQuiz(true);
      SetEnableReview(true);

    }

    return (
      <div>
        <br />
        <br />
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Button fullWidth variant="contained" color="primary" onClick={handleFirst}>
              First
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button fullWidth variant="contained" color="primary" onClick={handlePrev}>
              Prev
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button fullWidth variant="contained" color="primary" onClick={handleNext}>
              Next
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button fullWidth variant="contained" color="primary" onClick={handleLast}>
              Last
            </Button>
          </Grid>
          <br />
          <br />
          <Grid item xs={6}>
            <Button fullWidth variant="contained" style={styles} onClick={handleReview}>
              Review
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button fullWidth variant="contained" color="secondary" onClick={handleSubmit}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  };

  const renderAptitudeTest = () => {
    if (disableQuiz || disablePage || enableReview) {
      return;
    }

    const handleChange = (event) => {
      setAptitudeQuestions({
        ...aptitudeQuestions,
        [currentIndex - 1]: {
          ...aptitudeQuestions[currentIndex - 1],
          userAnswer: event?.target?.value,
        },
      });
    };

    return (
      <div>
        <FormControl component="fieldset">
          <Typography>
            {aptitudeQuestions[currentIndex - 1]?.question ?? []}
          </Typography>

          <br />
          <RadioGroup
            aria-label="questions"
            name="questions_"
            value={aptitudeQuestions[currentIndex - 1]?.userAnswer ?? []}
            onChange={handleChange}
          >
            <FormControlLabel
              value="A"
              control={<Radio />}
              label={aptitudeQuestions[currentIndex - 1]?.optionA ?? []}
            />
            <FormControlLabel
              value="B"
              control={<Radio />}
              label={aptitudeQuestions[currentIndex - 1]?.optionB ?? []}
            />
            <FormControlLabel
              value="C"
              control={<Radio />}
              label={aptitudeQuestions[currentIndex - 1]?.optionC ?? []}
            />
            <FormControlLabel
              value="D"
              control={<Radio />}
              label={aptitudeQuestions[currentIndex - 1]?.optionD ?? []}
            />
          </RadioGroup>
        </FormControl>
      </div>
    );
  };


  const renderExitTestButton = () => {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Button variant="contained" color="secondary" fullWidth
            onClick={() => {
              SetDisablePage(true);
              homeCallback(false);
            }}
          >
            Exit Test
          </Button>
        </Grid>
      </Grid>
    );
  }

  const renderSummary = () => {
    if (!disableQuiz || disablePage || enableReview) {
      return;
    }

    return (
      <>

        {renderExitTestButton()}
        <br />
        <Summary aptitudeQuestions={aptitudeQuestions} />
        {renderExitTestButton()}
      </>
    );
  };

  const reviewAnswersCallBack = useCallback((index) => {
    SetDisableQuiz(false);
    SetEnableReview(false);
    setCurrentIndex(index + 1);
  }, []);

  const renderReviewAnswers = () => {
    if (!disableQuiz || disablePage || !enableReview) {
      return;
    }

    const answeredButtonStyle = {
      backgroundColor: "#6a8656",
      color: "white",
    }

    const unAnsweredButtonStyle = {
      backgroundColor: "#f50057",
      color: "white",
    }

    return (
      <>
        <Grid container spacing={3}>
          {Object.values(aptitudeQuestions)?.map((item, index) => (
            <Grid item xs={6} key={index}>
              <Button
                fullWidth
                variant="contained"
                style={item?.userAnswer === "Not Answered" ? unAnsweredButtonStyle : answeredButtonStyle}
                key={index}
                onClick={() => reviewAnswersCallBack(index)}
              >
                Question {index + 1}
              </Button>
            </Grid>
          ))}
        </Grid>
      </>
    );
  }

  return (
    <div>
      {pageLoad && renderPageLoader()}
      {aptitudeQuestions && renderReviewAnswers()}
      {aptitudeQuestions && renderSummary()}
      {aptitudeQuestions && renderHeader()}
      {aptitudeQuestions && renderAptitudeTest()}
      {aptitudeQuestions && renderFooterButtons()}
    </div>
  );
}
