import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import styles from './deploy.css';
import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import {deployCommitment } from '../shared/listingUtilities';
import {ensResolveName, isEthereumAddress} from "../shared/ens-utils";

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';

const steps = ['Specify a Referee', 'Commitment Details', 'Beneficiaries'];


class Deploy extends Component {

  constructor(props) {
    super(props);

    this.state = {
      activeStep: 0,
      referee_name: "",
      referee_address: null,

      com_title: "",
      com_desc: "",
      com_date: new Date(),
      com_time: new Date(),

      success_ben: "",
      failure_ben: "",
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

  updateRefereeName = (event) => {
    const name = event.target.value;
    this.setState(({referee_name: name}));
    if(isEthereumAddress(name)) {
        this.setState({referee_address: name})
    } else {
        ensResolveName(name)
            .then(addr => this.setState({referee_address: addr}))
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
    );
    return Math.floor(deadline.getTime() / 1000);
  }

  render() {
    const { com_date, com_time, activeStep, referee_name, referee_address } = this.state;

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
        {activeStep === 0 &&
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
                    fullWidth
                    value={referee_name}
                    className={styles.textField}
                    margin="normal"
                    variant="outlined"
                    onChange={this.updateRefereeName}
                    helperText="Input either ENS name or Ethereum address"
                  />
                <Typography variant={'body2'}>
                    { referee_address && (
                        isEthereumAddress(referee_name) ?
                            "Valid ethereum address" :
                            "Valid ENS name"
                    )
                    }
                </Typography>
              </Grid>

            </Grid>
        </Grid>
        }

        {activeStep === 1 &&
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

        {activeStep === 2 &&
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
                  id="beneficiary-success"
                  label="Success Beneficiary"
                  fullWidth
                  //defaultValue="0x1234567890"
                  className={styles.textField}
                  margin="normal"
                  variant="outlined"
                  helperText="The beneficiary that will receive the money if you succeed at the challenge"
                  value={this.state.success_ben}
                  onChange={(e) => this.setState({success_ben: e.target.value})}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="beneficiary-failure"
                  label="Failure Beneficiary"
                  fullWidth
                  //defaultValue="0x1234567890"
                  className={styles.textField}
                  margin="normal"
                  variant="outlined"
                  helperText="The beneficiary that will receive the money if you fail at the challenge"
                  value={this.state.failure_ben}
                  onChange={(e) => this.setState({failure_ben: e.target.value})}
                />
              </Grid>

            </Grid>
        </Grid>
        }
        </Grid>

        <Grid container className={styles.buttons}>
          {activeStep !== 0 &&
            <Button onClick={this.handleBack} className={styles.button} >
              Back
            </Button>
          }

          {activeStep !== 2 &&
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleNext}
              className={styles.button}
              disabled={referee_address === null}
              >
              Next
            </Button>
          }

          {activeStep === 2 &&
            <Button variant="contained" color="secondary" className={styles.button} onClick={this.handleSubmit}>DEPLOY</Button>
          }
        </Grid>
        </Paper>
      </Grid>
    );
  }
}
export default Deploy;