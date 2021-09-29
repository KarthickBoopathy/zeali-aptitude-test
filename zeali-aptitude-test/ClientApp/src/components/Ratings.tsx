import { Grid, Paper } from "@material-ui/core";
import Rating from "@mui/material/Rating";
import { getUserBadge } from "../common/formula";
import { useStyles } from "../common/style";

const Ratings = ({ star }: any) => {
  const classes = useStyles();
  const badge = getUserBadge(star);
  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <Paper className={classes.ratingstarpaper} elevation={0}>
          <Rating name="read-only" value={star} readOnly />
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper className={classes.paperbutton}>{badge}</Paper>
      </Grid>
    </Grid>
  );
};

export default Ratings;

