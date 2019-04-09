import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import styles from './deploy.css';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';

import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import withStyles from '@material-ui/core/styles/withStyles';
import {deployCommitment } from '../shared/listingUtilities';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';

import ClassNames from 'classnames';

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

const steps = ['Specify a Referee', 'Commitment Details', 'Beneficiaries'];


class Deploy extends Component {

  constructor(props) {
    super(props);

    this.state = {
      activeStep: 0,
      referee_address: "",

      com_title: "",
      com_desc: "",
      com_date: new Date(),
      com_time: new Date(),

      success_ben: "",
      failure_ben: "",

      currency: 'USD',
    };
  }

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };


  handleDateChange = date => {
    this.setState({ com_date: date });
  };

  handleTimeChange = date => {
    this.setState({ com_time: date });
  }

  handleSubmit = (event) => {
      const { success_ben, failure_ben, com_title, com_desc, referee_address } = this.state;
      console.log(this.state);
      deployCommitment(
        success_ben,
          failure_ben,
          referee_address,
          com_title,
          com_desc,
          this.deadline
      )
  };

  renderStepOne(step) {
     
  }

  renderStepTwo(step) {

  }

  renderStepThree(step) {

    if (step === 2) {

    } else {

    }
  }

  get deadline() {
    const deadline = new Date(
      this.state.com_date.getFullYear(),
      this.state.com_date.getMonth(),
      this.state.com_date.getDate(),
      this.state.com_time.getHours(),
      this.state.com_time.getMinutes(),
      this.state.com_time.getSeconds()
    )
    return Math.floor(deadline.getTime() / 1000);
  }

  render() {
    const { classes } = this.props;
    const { activeStep } = this.state;

    const { com_date, com_time } = this.state;

    return (
      
      <Grid container wrap="nowrap" className={styles.container} >
        <Paper className={styles.paper}>
          <Typography component="h1" variant="h4" align="center">
            New commitment
          </Typography>
          <Stepper activeStep={activeStep} className={styles.stepper}>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        
        <Grid container className={styles.form}>
        {activeStep == 0 &&
        <Grid container className={styles.plz}>
            <Typography variant="h6">
              Specify A Referee
            </Typography>
            <Typography variant="body1" spacing={24}>
              Please provide the ethereum address for the referee who will assess the challenge's completion.
            </Typography>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                  <TextField
                    required
                    id="referee-address"
                    label="Referee Ethereum Address"
                    fullWidth
                    // defaultValue="0x1234567890"
                    className={styles.textField}
                    value={this.state.referee_address}
                    margin="normal"
                    variant="outlined"
                    onChange={(e) => this.setState({referee_address: e.target.value})}
                    // helperText="The address of the referee who will assess the challenge's completion"
                  />
              </Grid>

            </Grid>
        </Grid>
        }

        {activeStep == 1 &&
        <Grid container className={styles.plz}>
            <Typography variant="h6" gutterBottom>
              Commitment Details
            </Typography>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <TextField
                  required
                  id="commitment-title"
                  label="Title"
                  className={styles.textField}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={this.state.com_title}
                  onChange={(e) => this.setState({com_title: e.target.value})}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  id="commitment-description"
                  label="Description"
                  // value={state.multiline}
                  multiline
                  rows="4"
                  rowsMax="10"
                  fullWidth
                  className={styles.textField}
                  margin="normal"
                  helperText="Detailed description about the commitment, and what conditions you must meet to succeed at it."
                  variant="outlined"
                  value={this.state.com_desc}
                  onChange={(e) => this.setState({com_desc: e.target.value})}
                />
              </Grid>

              <Typography variant="subtitle1" >
                Contract Expiry Date
              </Typography>

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                  <DatePicker
                    required
                    id="commitment-date"
                    margin="normal"
                    label="Date picker"
                    value={com_date}
                    onChange={this.handleDateChange}
                  />
                  <TimePicker
                    required
                    id="commitment-time"
                    margin="normal"
                    label="Time picker"
                    value={com_time}
                    onChange={this.handleTimeChange}
                  />
                </Grid>
              </MuiPickersUtilsProvider>


            </Grid>
        </Grid>
        }

        {activeStep == 2 &&
        <Grid container className={styles.plz}>
            <Typography variant="h6" gutterBottom>
              Pick The Beneficiaries
            </Typography>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  id="beneficiery-success"
                  label="Success Beneficiery"
                  fullWidth
                  //defaultValue="0x1234567890"
                  className={styles.textField}
                  margin="normal"
                  variant="outlined"
                  helperText="The beneficiery that will receive the money if you succeed at the challenge"
                  value={this.state.success_ben}
                  onChange={(e) => this.setState({success_ben: e.target.value})}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="beneficiery-failure"
                  label="Failure Beneficiery"
                  fullWidth
                  //defaultValue="0x1234567890"
                  className={styles.textField}
                  margin="normal"
                  variant="outlined"
                  helperText="The beneficiery that will receive the money if you fail at the challenge"
                  value={this.state.failure_ben}
                  onChange={(e) => this.setState({failure_ben: e.target.value})}
                />
              </Grid>

            </Grid>
        </Grid>
        }
        </Grid>

        <Grid container className={styles.buttons}>
          {activeStep != 0 &&
            <Button onClick={this.handleBack} className={styles.button} >
              Back
            </Button>
          }

          {activeStep != 2 &&
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleNext}
              className={styles.button}
              >
              Next
            </Button>
          }

          {activeStep == 2 &&
            <Button variant="contained" color="secondary" className={styles.button} onClick={this.handleSubmit}>DEPLOY</Button>
          }
        </Grid>
        </Paper>
      </Grid>
    );
  }
}
export default Deploy;