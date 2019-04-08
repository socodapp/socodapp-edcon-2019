import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import styles from './deploy.css';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';

import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

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

  render() {

    return (
      <Grid container>
        <Grid item>
          <form className={styles.container} noValidate autoComplete="off">
            <TextField
              id="outlined-name"
              label="Name"
              className={classNames(styles.textField)}
              value={this.state.name}
              onChange={this.handleChange('name')}
              margin="normal"
              variant="outlined"
            />

            <TextField
              id="outlined-uncontrolled"
              label="Uncontrolled"
              defaultValue="foo"
              className={styles.textField}
              margin="normal"
              variant="outlined"
            />

            <TextField
              required
              id="outlined-required"
              label="Required"
              defaultValue="Hello World"
              className={styles.textField}
              margin="normal"
              variant="outlined"
            />

            <TextField
              error
              id="outlined-error"
              label="Error"
              defaultValue="Hello World"
              className={styles.textField}
              margin="normal"
              variant="outlined"
            />

            <TextField
              disabled
              id="outlined-disabled"
              label="Disabled"
              defaultValue="Hello World"
              className={styles.textField}
              margin="normal"
              variant="outlined"
            />

            <TextField
              id="outlined-email-input"
              label="Email"
              className={styles.textField}
              type="email"
              name="email"
              autoComplete="email"
              margin="normal"
              variant="outlined"
            />

            <TextField
              id="outlined-password-input"
              label="Password"
              className={styles.textField}
              type="password"
              autoComplete="current-password"
              margin="normal"
              variant="outlined"
            />

            <TextField
              id="outlined-read-only-input"
              label="Read Only"
              defaultValue="Hello World"
              className={styles.textField}
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />

            <TextField
              id="outlined-dense"
              label="Dense"
              className={classNames(styles.textField, styles.dense)}
              margin="dense"
              variant="outlined"
            />

            <TextField
              id="outlined-multiline-flexible"
              label="Multiline"
              multiline
              rowsMax="4"
              value={this.state.multiline}
              onChange={this.handleChange('multiline')}
              className={styles.textField}
              margin="normal"
              helperText="hello"
              variant="outlined"
            />

            <TextField
              id="outlined-multiline-static"
              label="Multiline"
              multiline
              rows="4"
              defaultValue="Default Value"
              className={styles.textField}
              margin="normal"
              variant="outlined"
            />

            <TextField
              id="outlined-helperText"
              label="Helper text"
              defaultValue="Default Value"
              className={styles.textField}
              helperText="Some important text"
              margin="normal"
              variant="outlined"
            />

            <TextField
              id="outlined-with-placeholder"
              label="With placeholder"
              placeholder="Placeholder"
              className={styles.textField}
              margin="normal"
              variant="outlined"
            />

            <TextField
              id="outlined-textarea"
              label="Multiline Placeholder"
              placeholder="Placeholder"
              multiline
              className={styles.textField}
              margin="normal"
              variant="outlined"
            />

            <TextField
              id="outlined-number"
              label="Number"
              value={this.state.age}
              onChange={this.handleChange('age')}
              type="number"
              className={styles.textField}
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
              variant="outlined"
            />

            <TextField
              id="outlined-search"
              label="Search field"
              type="search"
              className={styles.textField}
              margin="normal"
              variant="outlined"
            />

            <TextField
              id="outlined-select-currency"
              select
              label="Select"
              className={styles.textField}
              value={this.state.currency}
              onChange={this.handleChange('currency')}
              SelectProps={{
                MenuProps: {
                  className: styles.menu,
                },
              }}
              helperText="Please select your currency"
              margin="normal"
              variant="outlined"
            >
              {currencies.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="outlined-select-currency-native"
              select
              label="Native select"
              className={styles.textField}
              value={this.state.currency}
              onChange={this.handleChange('currency')}
              SelectProps={{
                native: true,
                MenuProps: {
                  className: styles.menu,
                },
              }}
              helperText="Please select your currency"
              margin="normal"
              variant="outlined"
            >
              {currencies.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
            <TextField
              id="outlined-full-width"
              label="Label"
              style={{ margin: 8 }}
              placeholder="Placeholder"
              helperText="Full width!"
              fullWidth
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />

            <TextField
              id="outlined-bare"
              className={styles.textField}
              defaultValue="Bare"
              margin="normal"
              variant="outlined"
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