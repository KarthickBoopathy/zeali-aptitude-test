import { Divider, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SimpleAccordion from "../../components/Accordion/Accordion";
const useStyles = makeStyles((theme) => ({
  paper: {
    padding: 10,
    textAlign: "center",
    backgroundColor: "#f50057",
    color: "white",
  },
}));

const WrongAnswers = ({ aptitudeQuestions }: any) => {
  const score = evaluateScore(aptitudeQuestions);
  const classes = useStyles();

  return (
    <>
      <Paper className={classes.paper}>Your Score : {score}</Paper>
      <br />
      <Divider variant="fullWidth" />
      <br />
      {aptitudeQuestions?.map((item: any, i: any) => (
        <div key={i}>
          <Typography gutterBottom>
            {i + 1} . {item?.question??""}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            A: {item?.optionA??""}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            B: {item?.optionB??""}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            C: {item?.optionC??""}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            D: {item?.optionD??""}
          </Typography>
          <br />
          <Typography variant="body2" color="secondary">
            Correct Answer: {item?.answer??""}
          </Typography>
          <Typography variant="body2" color="primary">
            Your Answer: {item?.userAnswer??""}
          </Typography>
          <br />
          <SimpleAccordion
            title="Solutions"
            children={<Typography variant="body2" >{item?.steps?? "Sorry !!! Currently, the steps for this problem is not available."}</Typography>}
          />
          <br />
          <Divider variant="fullWidth" />
          <br />
        </div>
      ))}
    </>
  );
};

const evaluateScore = (aptitudeQuestions: any[]) => {
  let userScore = 0;
  aptitudeQuestions?.forEach((item: any) => {
    if (item.userAnswer === item.answer) {
      userScore = userScore + 1;
    }
  });
  return userScore;
};

const startingMinutes = 10;
let time = startingMinutes * 60;

const timerCountDown = () => {
  const minutes = Math.floor(time / 60);
  let seconds: any = time % 60;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  time--;
  return minutes + ":" + seconds;
};

export default WrongAnswers;
