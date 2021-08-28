import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import CircularStaticProgress from "../Progress/circularStaticProgress";
import { deepOrange } from '@material-ui/core/colors';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
    padding: theme.spacing(0, 2),
  },
  paper: {
    width: 'auto',
    margin: `${theme.spacing(2)}px auto`,
    padding: theme.spacing(2),
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
}));

export type PercentagePaperProps = {
    user: string
    percentage: number;
};




const PercentagePaper = ({user, percentage}: PercentagePaperProps) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
          <Avatar alt={user} className={classes.orange} src="/"/>
          </Grid>
          <Grid item xs> 
            <Typography>Hello {user}</Typography>
            <Typography>Nice day !!!</Typography>
          </Grid>
          <Grid item>
            <CircularStaticProgress percentage= {percentage}/>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default PercentagePaper;
