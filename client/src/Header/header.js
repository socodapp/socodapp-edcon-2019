import React, { Component } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import styles from './header.css';
import { NavLink } from 'react-router-dom';
import {initalize, web3Injected } from "../shared/metamaskUtils";

class Header extends Component {

  async componentWillMount() {
    await initalize();
  }

  render() {
    return (
        <Toolbar >
          <Grid 
            container
            direction="row"
            alignItems="center"
            spacing={24}
          >
            <Grid item>
              <img src="/img/stryve-logo.svg" className={styles.logo} alt="stryve" />
              </Grid>
            <Grid item>
              <Button className={styles.navButton}>
                <NavLink to="/">Stryve</NavLink>
              </Button>
            </Grid>
            <Grid item>
              <Typography variant="h6" color="inherit">
                <Button classes={styles.navButton}>
                  <NavLink to="/deploy">Deploy</NavLink>
                </Button>
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6" color="inherit">
                <Button className={styles.navButton}>
                  <NavLink to="/commitments">Commitments</NavLink>
                </Button>
              </Typography>
            </Grid>
          </Grid>
        { !web3Injected() &&
          <Grid container className={styles.container} justify="center">
            <a href="https://metamask.io">
              <Button variant="contained" color="primary">
              Please install metamask for full experience of Stryve.
              </Button>
            </a>
          </Grid>
        }
        </Toolbar>
    )
  }
}

export default Header;
