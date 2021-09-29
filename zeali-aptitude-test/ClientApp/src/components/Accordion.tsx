import { ReactNode } from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useStyles } from "../common/style";

export type AccordionProps = {
  title: string;
  children: ReactNode;
};

const SimpleAccordion = ({ title, children }: AccordionProps) => {
  const classes = useStyles();

  return (
    <div className={classes.accordionroot}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.accordionheading}>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails>{children}</AccordionDetails>
      </Accordion>
    </div>
  );
};

export default SimpleAccordion;
