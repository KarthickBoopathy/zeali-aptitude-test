import { Grid, makeStyles, Paper } from "@material-ui/core";
import Rating from "@mui/material/Rating";
import { getUserBadge } from "../common/formula";
const useStyles = makeStyles(() => ({
  paper: {
    padding: 10,
    textAlign: "center",
    backgroundColor: "#69924a",
    color: "white",
  },
  ratingPaper: {
    padding: 6,
    textAlign: "center",
  },
}));

const Ratings = ({ star }: any) => {
  const classes = useStyles();
  const badge = getUserBadge(star);
  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <Paper className={classes.ratingPaper} elevation={0}>
          <Rating name="read-only" value={star} readOnly />
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper className={classes.paper}>{badge}</Paper>
      </Grid>
    </Grid>
  );
};

export default Ratings;

