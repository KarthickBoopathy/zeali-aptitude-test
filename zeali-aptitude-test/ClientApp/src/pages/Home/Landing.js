import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 350,
      backgroundColor: "white",
    },
  })
);

export default function TopicList() {
  const classes = useStyles();

  const style = {
    padding: 15,
    textAlign: "center",
  };
  const data = [
    "Data Interpretation",
    "Inequalities",
    "Percentages",
    "Number Series",
    "Arithmetic Aptitude",
    "Profit and Loss",
    "Simple and Compound Interest",
    "Age Problems",
    "Work And Time",
    "Time & Speed",
    "Probability",
    "Mensuration",
    "Permutation and Combination",
    "Averages",
    "Ratios and Proportions",
    "Mixture and Alligation",
  ];

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper style={style} variant="elevation">
          <List
            component="nav"
            className={classes.root}
            aria-label="mailbox folders"
          >
            {data.map((item, i) => (
              <ListItem button divider key={i}>
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>
    </Grid>
  );
}
