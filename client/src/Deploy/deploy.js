import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import styles from './deploy.css';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';

import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';

const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];

class Deploy extends Component {
  state = {
    name: 'Cat in the Hat',
    age: '',
    multiline: 'Controlled',
    currency: 'EUR',
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleDateChange = date => {
    this.setState({ selectedDate: date });
  };
  
  render() {

    const { selectedDate } = this.state;

    return (
      <Grid container>
        <Grid item>
          <form className={styles.container} noValidate autoComplete="off">
            <TextField
              required
              id="outlined-required"
              label="Title"
              defaultValue="Jane will quit smoking"
              className={styles.textField}
              margin="normal"
              variant="outlined"
            />

            <TextField
              required
              id="outlined-multiline-flexible"
              label="Description"
              multiline
              rowsMax="4"
              value={this.state.multiline}
              onChange={this.handleChange('multiline')}
              className={styles.textField}
              margin="normal"
              helperText="hello"
              variant="outlined"
            />
            
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

            <TextField
              required
              id="outlined-required"
              label="Success Beneficiery"
              
              defaultValue="0x1234567890"
              className={styles.textField}
              margin="normal"
              variant="outlined"
              helperText="The beneficiery that will receive the money if you succeed at the challenge"
            />

            <TextField
              id="outlined-required"
              label="Failure Beneficiery"
              
              defaultValue="0x1234567890"
              className={styles.textField}
              margin="normal"
              variant="outlined"
              helperText="The beneficiery that will receive the money if you fail at the challenge"
            />

            <TextField
              required
              id="outlined-required"
              label="Referee"
              
              defaultValue="0x1234567890"
              className={styles.textField}
              margin="normal"
              variant="outlined"
              helperText="The address of the referee who will assess the challenge's completion"
            />

          </form>

        </Grid>
        <Grid item>
          <Button variant="contained" color="secondary">DEPLOY</Button>
        </Grid>
      </Grid>
    );
  }
}
export default Deploy;