import React from 'react';

import styles from './deploy.css';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';

class CommitmentForm extends React.Component {
  state = {
  
  };

  handleDateChange = date => {
    this.setState({ selectedDate: date });
  };

  render() {

    const { selectedDate } = this.state;
    
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Commitment Details
        </Typography>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <TextField
              required
              id="outlined-required"
              label="Title"
              className={styles.textField}
              fullWidth
              margin="normal"
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              id="outlined-multiline-flexible"
              label="Description"
              // value={state.multiline}
              multiline
              rows="4"
              rowsMax="10"
              fullWidth
              className={styles.textField}
              margin="normal"
              helperText="hello"
              variant="outlined"
            />
          </Grid>
          
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
              <DatePicker
                required
                margin="normal"
                label="Date picker"
                value={selectedDate}
                onChange={this.handleDateChange}
              />
              <TimePicker
                required
                margin="normal"
                label="Time picker"
                value={selectedDate}
                onChange={this.handleDateChange}
              />
            </Grid>
          </MuiPickersUtilsProvider>
          

        </Grid>
      </React.Fragment>
    );
  }
}

export default CommitmentForm;