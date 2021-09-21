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
      maxWidth: "95%",
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
    "Time and Distance",
    "Trains",
    "Time and Work",
    "Ratio and Proportion",
    "Boats and Streams",
    "Simple Interest",
    "Areas",
    "Averages",
    "LCM and HCF",
    "Pipes and Cisterns",
    "Numbers",
    "Compound Interest",
    "Volume & Surface Area",
    "Profit and Loss",
    "Odd Man Out",
    "Races and Games",
    "Numbers and Ages",
    "Mixtures and Alligations",
    "Percentages",
    "Simple Equations",
    "Quadratic Equations",
    "Surds and Indices",
    "Mensuration",
    "Permutations",
    "Probability",
    "Simplification",
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
