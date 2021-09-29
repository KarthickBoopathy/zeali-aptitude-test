import { Divider, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { evaluateScore } from "../../common/formula";
import SimpleAccordion from "../../components/Accordion";
import { AptitudeQuestion } from "../../types/schema";

const useStyles = makeStyles(() => ({
  paper: {
    padding: 10,
    textAlign: "center",
    backgroundColor: "#69924a",
    color: "white",
  },
}));

type SummaryProps = {
  aptitudeQuestions: AptitudeQuestion[]
}

const Summary = ({ aptitudeQuestions }: SummaryProps) => {
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
            {i + 1} . {item?.question ?? ""}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            A: {item?.optionA ?? ""}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            B: {item?.optionB ?? ""}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            C: {item?.optionC ?? ""}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            D: {item?.optionD ?? ""}
          </Typography>
          <br />
          <Typography variant="body2" color="primary">
            Your Answer: {item?.userAnswer ?? "Not Answered"}
          </Typography>
          <Typography variant="body2" color="secondary">
            Correct Answer: {item?.answer ?? ""}
          </Typography>
          <br />
          <SimpleAccordion
            title="Solution"
            children={
              <div>
                {item?.steps ??
                  "Sorry, the solution is not available at this moment."}
              </div>
            }
          />
          <br />
          <Divider variant="fullWidth" />
          <br />
        </div>
      ))}
    </>
  );
};



export default Summary;
