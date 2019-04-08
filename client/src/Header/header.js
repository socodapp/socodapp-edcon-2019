import React, { Component } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';


import styles from './header.css';
import { NavLink } from 'react-router-dom';

class Header extends Component {

  constructor(props) {
    super(props)
    
    this.state = {
      anchorEl: null,
    };
  }


  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    return (
      <div id={styles.headerWrapper}>
          <AppBar position="static">
        <Toolbar>
          <Grid   container
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="h6" color="inherit">
              <NavLink to="/">Strive</NavLink>

              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6" color="inherit">
              <NavLink to="/deploy">Deploy</NavLink>

              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6" color="inherit">
              <NavLink to="/listing">Listing</NavLink>

              </Typography>
            </Grid>
 
          </Grid>

        </Toolbar>


      </AppBar>
      </div>
    )
  }
}

export default Header;
