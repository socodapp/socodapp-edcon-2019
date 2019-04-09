import React, { Component } from 'react';
import { Grid } from '@material-ui/core';

import styles from './challenge.css'

class Challenge extends Component {

  componentDidMount() {
    const { match: { params } } = this.props;
    console.log(params.address)
  }

  render() {
    return (
      <Grid className={styles.container}>
        <p>this is the Challenge item view component</p>
      </Grid>
    )
  }
}

export default Challenge;