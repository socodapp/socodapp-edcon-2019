import React from 'react';

import styles from './deploy.css';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

function handleInput(value) {
  window.localStorage.setItem("referee", value);
}


function RefereeForm({state}) {

  
  console.log(state)
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Specify a Referee
      </Typography>
      <Typography variant="body1" gutterBottom spacing={24}>
        The address of the referee who will assess the challenge's completion.
      </Typography>
      <Grid container spacing={24}>
        <Grid item xs={12}>
            <TextField
              required
              id="outlined-required"
              label="Referee Ethereum Address"
              fullWidth
              // defaultValue="0x1234567890"
              className={styles.textField}
              value={state.referee}
              margin="normal"
              variant="outlined"
              onChange={(e) => {handleInput(e.target.value)}}
              // helperText="The address of the referee who will assess the challenge's completion"
            />
        </Grid>

      </Grid>
    </React.Fragment>
  );
}

export default RefereeForm;