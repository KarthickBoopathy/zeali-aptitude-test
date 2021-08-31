import { createStyles, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 500,
      backgroundColor: "white",
    },
  })
);

export default function TopicList() {
  const classes = useStyles();

  const data = [
    "Data Interpretation",
    "Inequalities",
    "Percentages",
    "Number Series",
    "Arithmetic Aptitude",
    "Profit and Loss",
    "Simple Interest and Compound Interest",
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
    <List component="nav" className={classes.root} aria-label="mailbox folders">
      {data.map((item, i) => (
        <ListItem button divider key={i}>
          <ListItemText primary={item} />
        </ListItem>
      ))}
    </List>
  );
}
