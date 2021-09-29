import { Grid } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";
import { useStyles } from "../../common/style";


const Topics = () => {
  const classes = useStyles();

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
        <Paper className={classes.topicspaper} variant="elevation">
          <List
            component="nav"
            className={classes.topicslist}
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

export default Topics;
