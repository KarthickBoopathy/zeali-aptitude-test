import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const SearchExamPapers = () => {
  const Options = ["Yes", "No"];
  const classes = useStyles();

  const [states, setStates] = React.useState(null);

  const handleChange = (event: any) => {
    setStates(event.target.value);
  };

  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-age-native-simple">Age</InputLabel>
        <Select
          native
          value={states}
          onChange={handleChange}
          label="Age"
          inputProps={{
            id: "outlined-age-native-simple",
          }}
        >
          <option aria-label="None" value="" />
          {Options.map((option: any) => (
            <option value={option}>{option}</option>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SearchExamPapers;
