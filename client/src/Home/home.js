import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { Card, CardHeader, CardText } from 'material-ui/Card';

import styles from './home.css';

class Home extends Component {
  render() {
    return (
      <div>
        <Paper className={styles.warningMsg} zDepth={0}>
                <Card>
                    <CardHeader />
                    <CardText>This is some stuff</CardText>
                </Card>
            </Paper>
      </div>
    )
  }
}

export default Home;