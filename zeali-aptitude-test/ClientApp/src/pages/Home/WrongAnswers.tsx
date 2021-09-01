import { Divider, Typography } from "@material-ui/core";

const WrongAnswers = ({ aptitudeQuestions }: any) => {
  return (
    <>
      {aptitudeQuestions?.map((item: any, i: any) => (
        <div key={i}>
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
        </div>
      ))}
    </>
  );
};

export default WrongAnswers;
