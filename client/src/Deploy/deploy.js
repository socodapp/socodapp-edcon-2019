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

import RefereeForm from './RefereeForm';
import CommitmentForm from './CommitmentForm';
import BeneficieriesForm from './BeneficieriesForm';

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

const steps = ['Specify a Referee', 'Commitment Details', 'Beneficieries'];

function getStepContent(step, state) {
  switch (step) {
    case 0:
      return <RefereeForm state={state}/>;
    case 1:
      return <CommitmentForm />;
    case 2:
      return <BeneficieriesForm />;
    default:
      throw new Error('Unknown step');
  }
}

class Deploy extends Component {

  constructor(props) {
    super(props)

    this.state = {
      activeStep: 0,
      referee_address: "",

      com_title: "",
      com_desc: "",
      com_date: null,
      com_time: null,
      
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
    this.setState({ selectedDate: date });
  };

  handleSubmit = (event) => {
    console.log(this.state);
  }

  render() {
    const { classes } = this.props;
    const { activeStep } = this.state;

    const { selectedDate } = this.state;

    return (

      <Grid container>
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
          {/*
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Your new commitment is being prepared...
              </Typography>
              <Typography variant="subtitle1">
                Blah blah.. Click <a>here</a> to see your commitment.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep, this.state)}
              <div className={styles.buttons}>
                {activeStep !== 0 && (
                  <Button onClick={this.handleBack} className={styles.button}>
                    Back
                  </Button>
                )}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleNext}
                  className={styles.button}
                >
                  {activeStep === steps.length - 1 ? 'Deploy' : 'Next'}
                </Button>
              </div>
            </React.Fragment>
          )}
          */}

        <div id="refereeForm">
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
          </React.Fragment>
        </div>

        <div id="commitmentForm">
          <React.Fragment>
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
                  helperText="hello"
                  variant="outlined"
                  value={this.state.com_desc}
                  onChange={(e) => this.setState({com_desc: e.target.value})}
                />
              </Grid>
              
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                  <DatePicker
                    required
                    id="commitment-date"
                    margin="normal"
                    label="Date picker"
                    value={selectedDate}
                    onChange={this.handleDateChange}
                  />
                  <TimePicker
                    required
                    id="commitment-time"
                    margin="normal"
                    label="Time picker"
                    value={selectedDate}
                    onChange={this.handleDateChange}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
              

            </Grid>
          </React.Fragment>
        </div>

        <div id="beneficieriesForm">
          <React.Fragment>
            <Typography variant="h6" gutterBottom>
              Shipping address
            </Typography>
            <Grid container spacing={24}>
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
          </React.Fragment>
        </div>

        <Grid item>
          <Button variant="contained" color="secondary" onClick={this.handleSubmit}>DEPLOY</Button>
        </Grid>
        </Paper>
      </Grid>
    );
  }
}
export default Deploy;