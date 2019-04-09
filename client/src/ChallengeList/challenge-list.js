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


class ChallengeList extends Component {
  state = {
    checked: [0],
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

  render() {

    return (
      <List className={styles.root}>
        {[0, 1, 2, 3].map(value => (
          <ListItem key={value} role={undefined} dense button onClick={this.handleToggle(value)}>

            <ListItemText primary={`Line item ${value + 1}`} />
            <ListItemText primary={`Line item ${value + 1}`} />
            <ListItemText primary={`Line item ${value + 1}`} />
            <ListItemSecondaryAction>
              <IconButton aria-label="Comments">
                <ArrowForward />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    );
  }
}

export default ChallengeList;