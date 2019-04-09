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

import { ethers } from 'ethers';

import getListing from '../shared/etherscanUtils.js'

const registryAddr = "0x6fff4185512B1a9E2bab8461Be1CCCb625A62064";
const apiKey = "YourApiKeyToken";
const apiUrl = "https://api-kovan.etherscan.io/api?module=logs&action=getLogs&fromBlock=10706350&toBlock=latest";

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
    console.log("items");
    console.log(items);
    this.setState({isLoaded: true, items: items});
  }

  render() {

    // TODO write a nice UI
    const items = this.state.items;
    console.log("render items");
    console.log(items);
    return (
      <List className={styles.root}>
        {items.map(arr => (
          <ListItem key={arr[0]} role={undefined} dense button onClick={this.handleToggle(arr[0])}>
            <Checkbox
              checked={this.state.checked.indexOf(arr[0]) !== -1}
              tabIndex={-1}
              disableRipple
            />
            <ListItemText primary={`Title ${arr[0]}`} />
            <ListItemText primary={`Description ${arr[1]}`} />
            <ListItemText primary={`Deadline ${arr[2]}`} />
            <ListItemText primary={`Balance 42`} />
            <ListItemSecondaryAction>
              <IconButton aria-label="Comments">
                <CommentIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    );
  }
}

            /*
            <ListItemText primary={`Contract Address ${arr[0]}`} />
            <ListItemText primary={`Challenger ${arr[1]}`} />
            <ListItemText primary={`Success Beneficiary ${arr[2]}`} />
            <ListItemText primary={`Failure Beneficiary ${arr[3]}`} />
            <ListItemText primary={`Referee ${arr[4]}`} />
            */
export default ChallengeList;
