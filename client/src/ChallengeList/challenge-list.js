import React, { Component } from 'react';
import styles from './challenge-list.css';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import { ArrowForward } from '@material-ui/icons';
import { Grid } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import {getListing} from '../shared/etherscanUtils.js';


class ChallengeList extends Component {

  state = {
    checked: [0],
    items: [],
    open: false,
    selectedItem: null
  };


  handleOpen = (item) => {
    this.setState({selectedItem: item});
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({selectedItem: null})
    this.setState({ open: false });
    console.log(this.state.selectedItem)
  };

  async componentDidMount() {
    const items = await getListing();
    this.setState({isLoaded: true, items: items});
  }


  renderItems(items) {
    let i = 0;
    const result = items.map(e => {
      const arr = e.array
      i++;
      return (
        <Grid key={i}>
        <ListItem className={styles.list} role={undefined} dense button onClick={() => this.handleOpen(i)}>
        <Grid item xs={2}>
            <ListItemText primary={`#${i}`} />
          </Grid>
          <Grid item xs={3}>
            <ListItemText  primary={`${arr[0]}`} />
          </Grid>
          <Grid item xs={8}>
            <ListItemText primary={`${arr[1]}`} />
          </Grid>
          <Grid item xs={3}>
            <ListItemText className={styles.textRight} primary={`${arr[2]}`} />
          </Grid>
          <Grid item xs={3}>
          <ListItemSecondaryAction>
            <IconButton aria-label="View">
              <ArrowForward />
            </IconButton>
          </ListItemSecondaryAction>
          </Grid>
        </ListItem>
      </Grid>

    )});
  return result;
}

  render() {
    // TODO write a nice UI
    return (
      <Grid>
        <List className={styles.container}>
          <ListItem className={styles.list} role={undefined}>
            <Grid item xs={2}>
                <ListItemText primary={'Num'} />
              </Grid>
              <Grid item xs={3}>
                <ListItemText  primary={'Title'} />
              </Grid>
              <Grid item xs={8}>
                <ListItemText primary={'Description'} />
              </Grid>
              <Grid item xs={3}>
                <ListItemText className={styles.textRight} primary={'Pledged Balance'} />
              </Grid>
              <Grid item xs={3}>
              </Grid>
          </ListItem>
          {this.renderItems(this.state.items)}
        </List>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div className={styles.modal}>
            <Typography variant="h6" id="modal-title">
              Text in a modal

              {this.state.selectedItem}
            </Typography>
            <Typography variant="subtitle1" id="simple-modal-description">
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </div>
        </Modal>
      </Grid>
    );
  }
}

export default ChallengeList;
