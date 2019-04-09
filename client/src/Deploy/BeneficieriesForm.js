import React from 'react';

import styles from './deploy.css';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

function BeneficieriesForm() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <TextField
            required
            id="outlined-required"
            label="Success Beneficiery"
            fullWidth
            //defaultValue="0x1234567890"
            className={styles.textField}
            margin="normal"
            variant="outlined"
            helperText="The beneficiery that will receive the money if you succeed at the challenge"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            id="outlined-required"
            label="Failure Beneficiery"
            fullWidth
            //defaultValue="0x1234567890"
            className={styles.textField}
            margin="normal"
            variant="outlined"
            helperText="The beneficiery that will receive the money if you fail at the challenge"
          />
        </Grid>

      </Grid>
    </React.Fragment>
  );
}

export default BeneficieriesForm;