import React from 'react';
import { Grid, Button } from '@material-ui/core';

import styles from './footer.css'

const Footer = (props) => {

    return (
      <Grid container className={styles.container} justify="center">
        <a href="https://github.com/socodapp/stryve">
          <Button variant="contained" color="primary">
          Github
          </Button></a>
      </Grid>
    )
}

export default Footer;