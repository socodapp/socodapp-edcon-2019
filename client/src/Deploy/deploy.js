import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import styles from './deploy.css';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import Input from '@material-ui/core/Input';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import {deployCommitment } from '../shared/listingUtilities';
import {ensResolveName, isEthereumAddress} from "../shared/ens-utils";

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';

import { Done } from '@material-ui/icons';

const steps = ['Specify a Referee', 'Commitment Details', 'Beneficiaries'];

const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing.unit * 3,
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    height: '54px',
    width: '40px',
    marginTop: '16px',
    marginBottom: '8px',
    // padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

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


      success_ben_name: "",
      success_ben_address: null,
      failure_ben_name: "",
      failure_ben_address: null,

      success_sben: "",
      failure_sben: "",

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

  handleDateChange = date => {
    this.setState({ com_date: date });
  };

  handleTimeChange = date => {
    this.setState({ com_time: date });
  };

  handleSRChange = event => {
    const value = event.target.value;
    const success_ben_name = value.split(';')[0];
    const success_ben_address = value.split(';')[1];
    this.setState({success_ben_name, success_ben_address})
  };

  handleFRChange = event => {
    const value = event.target.value;
    const failure_ben_name = value.split(';')[0];
    const failure_ben_address = value.split(';')[1];
    this.setState({failure_ben_name, failure_ben_address})
  };



  handleSubmit = (event) => {
      const { success_ben_address, failure_ben_address, com_title, com_desc, referee_address } = this.state;
      console.log(this.state);
      deployCommitment(
        success_ben_address,
          failure_ben_address,
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
  };

  updateSuccessBenName = (event) => {
    const name = event.target.value;
    this.setState(({success_ben_name: name}));
    if(isEthereumAddress(name)) {
      this.setState({success_ben_address: name})
    } else {
      ensResolveName(name)
        .then(addr => this.setState({success_ben_address: addr}))
    }
  };

  updateFailureBenName = (event) => {
    const name = event.target.value;
    this.setState(({failure_ben_name: name}));
    if(isEthereumAddress(name)) {
      this.setState({failure_ben_address: name})
    } else {
      ensResolveName(name)
        .then(addr => this.setState({failure_ben_address: addr}))
    }
  };

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
            <Typography className={styles.itemMargin} variant="h6">
              Specify A Referee
            </Typography>
            <Typography variant="body1" spacing={24}>
              Please provide either the ENS name or Ethereum address of the referee who will assess the challenge's completion.
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
                    helperText="Input either the ENS name or Ethereum address"
                  />
                
                    { referee_address && (
                        isEthereumAddress(referee_name) ?
                        <Grid container>
                          <Done />
                          <Typography variant={'body2'}>
                              Valid ethereum address
                          </Typography>
                        </Grid>
                        :
                        <Grid container>
                          <Done />
                          <Typography variant={'body2'}>
                              Valid ENS name
                          </Typography>
                        </Grid>
                    )
                    }
                    
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

              <Grid item xs={10}>
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
                  value={this.state.success_ben_name}
                  onChange={this.updateSuccessBenName}
                />
              </Grid>
              <Grid item xs={2}>
                <NativeSelect
                  value={this.state.success_sben}
                  onChange={this.handleSRChange}
                  input={<BootstrapInput name="age" id="age-customized-native-simple"/>}
                >
                  <option value={""} />
                  <option value={"Giveth;0x30f938fED5dE6e06a9A7Cd2Ac3517131C317B1E7"}>Giveth - 0x30f9...E7</option>
                  <option value={"The Water Project;0xf624cd0f2e74fb1f936e9ae63d5257ed41f630a7"}>The Water Project - 0xf624...a7</option>
                  <option value={"GiveDirectly;0xc7464dbcA260A8faF033460622B23467Df5AEA42"}>GiveDirectly - 0xc7464...42</option>
                  <option value={"Unsung.org;0x02a13ED1805624738Cc129370Fee358ea487B0C6"}>Unsung.org - 0x02a1...C6</option>
                  <option value={"Breastcancersupport.org.uk;0x6e4c6adfa15cada2699fd2c16290ea1f71d0f9d7"}>Breastcancersupport.org.uk - 0x6e4c...d7</option>
                  <option value={"350.org;0x50990F09d4f0cb864b8e046e7edC749dE410916b"}>350.org - 0x5099...6b</option>
                  <option value={"Burn Address;0x0000000000000000000000000000000000000000"}>Burn Address - 0x0000...00</option>
                </NativeSelect>
              </Grid>

              <Grid item xs={10}>
                <TextField
                  id="beneficiary-failure"
                  label="Failure Beneficiary"
                  fullWidth
                  //defaultValue="0x1234567890"
                  className={styles.textField}
                  margin="normal"
                  variant="outlined"
                  helperText="The beneficiary that will receive the money if you fail at the challenge"
                  value={this.state.failure_ben_name}
                  onChange={this.updateFailureBenName}
                />
              </Grid>
              <Grid item xs={2}>
                <NativeSelect
                  value={this.state.failure_sben}
                  onChange={this.handleFRChange}
                  input={<BootstrapInput name="age" id="age-customized-native-simple"/>}
                >
                  <option value={""} />
                  <option value={"Giveth;0x30f938fED5dE6e06a9A7Cd2Ac3517131C317B1E7"}>Giveth - 0x30f9...E7</option>
                  <option value={"The Water Project;0xf624cd0f2e74fb1f936e9ae63d5257ed41f630a7"}>The Water Project - 0xf624...a7</option>
                  <option value={"GiveDirectly;0xc7464dbcA260A8faF033460622B23467Df5AEA42"}>GiveDirectly - 0xc7464...42</option>
                  <option value={"Unsung.org;0x02a13ED1805624738Cc129370Fee358ea487B0C6"}>Unsung.org - 0x02a1...C6</option>
                  <option value={"Breastcancersupport.org.uk;0x6e4c6adfa15cada2699fd2c16290ea1f71d0f9d7"}>Breastcancersupport.org.uk - 0x6e4c...d7</option>
                  <option value={"350.org;0x50990F09d4f0cb864b8e046e7edC749dE410916b"}>350.org - 0x5099...6b</option>
                  <option value={"Burn Address;0x0000000000000000000000000000000000000000"}>Burn Address - 0x0000...00</option>
                </NativeSelect>
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
            <Button variant="contained" color="secondary" className={styles.button}
                    onClick={this.handleSubmit}
                    disabled={this.state.success_ben_address === null || this.state.failure_ben_address === null}>
              DEPLOY
            </Button>
          }
        </Grid>
        </Paper>
      </Grid>
    );
  }
}
export default Deploy;