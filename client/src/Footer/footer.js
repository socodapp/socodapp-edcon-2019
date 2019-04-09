import React, { Component } from 'react';
import { Grid } from '@material-ui/core';

import styles from './footer.css'

const Footer = (props) => {

    return (
      <Grid container className={styles.container}>
        <p>this is the footer component</p>
      </Grid>
    )
}

export default Footer;