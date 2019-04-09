import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import styles from './challenge-list.css';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import { AccessAlarm, ThreeDRotation, ArrowForward } from '@material-ui/icons';

import { ethers } from 'ethers';

import getListing from '../shared/etherscanUtils.js'

class ChallengeList extends Component {
  state = {
    checked: [0],
    items: [],
  };

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
  };

  async componentDidMount() {
    const items = await getListing();
    this.setState({isLoaded: true, items: items});
  }

  renderItems(items) {
  const result = items.map(arr => (
          <ListItem key={arr[0]} role={undefined} dense button onClick={this.handleToggle(arr[0])}>
            <Checkbox
              checked={this.state.checked.indexOf(arr[0]) !== -1}
              tabIndex={-1}
              disableRipple
            />
            <ListItemText primary={`Title ${arr[0]}`} />
            <ListItemText primary={`Description ${arr[1]}`} />
            <ListItemText primary={`Balance ${arr[2]}`} />
            <ListItemSecondaryAction>
              <IconButton aria-label="Comments">
                <ArrowForward />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ));
    return result;
}

  render() {
    // TODO write a nice UI
    return (
      <List className={styles.root}>
        {this.renderItems(this.state.items)}
      </List>
    );
  }
}

export default ChallengeList;
