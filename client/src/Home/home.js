import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import styles from './home.css';

class Home extends Component {

  render() {
    return (
      <div className={styles.root}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Paper className={styles.paper}>xs=12</Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={styles.paper}>xs=6</Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={styles.paper}>xs=6</Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={styles.paper}>xs=3</Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={styles.paper}>xs=3</Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={styles.paper}>xs=3</Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={styles.paper}>xs=3</Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Home;