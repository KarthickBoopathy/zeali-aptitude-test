import { makeStyles, createStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      padding: 15,
      fontSize: 16,
      textAlign: "center",
    },
    paperbutton: {
      padding: 10,
      textAlign: "center",
      backgroundColor: "#69924a",
      color: "white",
    },
    topicslist: {
      width: "100%",
      maxWidth: "95%",
      backgroundColor: "white",
    },
    topicspaper: {
      padding: 15,
      textAlign: "center",
    },
    fab: {
      position: "fixed",
      bottom: "5%",
      right: "5%",
    },
    fabprops: {
      background: "#f50057",
    },
    questionnumber: {
      padding: 10,
      textAlign: "center",
      backgroundColor: "#f50057",
      color: "white",
    },
    ratingstarpaper: {
      padding: 6,
      textAlign: "center",
    },
    accordionroot: {
      width: "auto",
      margin: `${theme.spacing(0.5)}px auto`,
    },
    accordionheading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    tabroot: {
      backgroundColor: "#fcfcfc",
      maxWidth: "500px",
      height: "100vh",
      margin: "auto",
    },
    tabtab: {
      fontSize: "large",
    },
  })
);
