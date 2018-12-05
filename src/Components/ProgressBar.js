import React from "react";

import { withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  progress: {
    margin: theme.spacing.unit * 2,
    color: "#00695c"
  },
  linearColorPrimary: {
    backgroundColor: "#b2dfdb"
  },
  linearBarColorPrimary: {
    backgroundColor: "#00695c"
  }
});

const ProgressBar = ({ completion, classes }) => (
  <LinearProgress
    value={completion === "NaN" ? 0 : completion}
    valueBuffer={completion === "NaN" ? 0 : completion}
    variant="determinate"
    classes={{
      colorPrimary: classes.linearColorPrimary,
      barColorPrimary: classes.linearBarColorPrimary
    }}
  />
);

export default withStyles(styles)(ProgressBar);
