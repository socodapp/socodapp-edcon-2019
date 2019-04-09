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

  decodeEventData = (data) => {
    return ethers.utils.defaultAbiCoder.decode(["address", "address", "address", "address", "address", "string", "string", "uint256"], data)
  }

  componentDidMount() {
    const restUrl = apiUrl + "&address=" + registryAddr + "&apikey=" + apiKey;
    console.log(restUrl);
    fetch(restUrl)
      .then(res => res.json())
     // TODO reverse ens all addresses in res.result
      .then(
        (res) => {
          this.setState({
            isLoaded: true,
            items: res.result.map(item =>
                [item.address].concat(this.decodeEventData(item.data)))
          });
          console.log(this.state.items);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {

    // TODO write a nice UI
    const items = this.state.items;
    return (
      <List className={styles.root}>
        {items.map(arr => (
          <ListItem key={arr[0]} role={undefined} dense button onClick={this.handleToggle(arr[0])}>
            <Checkbox
              checked={this.state.checked.indexOf(arr[0]) !== -1}
              tabIndex={-1}
              disableRipple
            />
            <ListItemText primary={`Title ${arr[6]}`} />
            <ListItemText primary={`Description ${arr[7]}`} />
            <ListItemText primary={`Deadline ${arr[8]}`} />
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
