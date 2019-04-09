import React, {Component} from 'react';
import styles from './challenge-list.css';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import {ArrowForward, LaunchRounded} from '@material-ui/icons';
import {Grid, Paper, Divider, TextField, Button} from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import { getListing } from '../shared/etherscanUtils.js';
import { assignDaiToContract, transferDaiToContract, pledged, allowance } from '../shared/commitmentUtilities.js';
import Timeago from 'react-timeago';

class ChallengeList extends Component {

  state = {
    checked: [0],
    items: [],
    open: false,
    selectedContract: null,
    selectedItem: null,
    isLoaded: false,
    pledgeAmount: 0,
    pendingPledgeAmount: '0',
    pledged: '0',
  };


  handleOpen() {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleItemSelect(address) {
    this.state.items.forEach((e, i) => {
      if (e[3] === address) {
        this.setState({selectedContract: address, selectedItem: i})
        this.setState({isLoaded: true})
        this.handleOpen()
        this.updatePledgedAmount(address)
      }
    })
  }

  handlePledgeAmountChange = event => {
    this.setState({
      pledgeAmount: event.target.value,
    });
  };

  sortItemsByDeadline() {
    const sorted = this.state.items.sort((a, b) => {
      a = new Date(a[4])
      b = new Date(b[4])
      return b > a ? -1 : b < a ? 1 : 0;
    })

    this.setState({items: sorted})
  }


  makePledge(addr, amount) {

    assignDaiToContract(addr, amount)
  }

  finalizePledge(addr) {
    transferDaiToContract(addr)
  }

  updatePledgedAmount(addr) {
    pledged(addr)
      .then(amount => this.setState({pledged: amount}));
    allowance(addr)
      .then(amount => this.setState({pendingPledgeAmount: amount}));
  }

  async componentDidMount() {
    const items = await getListing();
    this.setState({items: items});
    const {match: {params}} = this.props;
    if (params && params.address) {
      this.handleItemSelect(params.address)
    }

    setInterval(() => {
      if (this.state.selectedContract) {
        this.updatePledgedAmount(this.state.selectedContract)
      }
    }, 8000)

    this.sortItemsByDeadline()
  }

  unixTimestamp(t) {
    let dt = new Date(t*1000);
    let yr = dt.getFullYear()
    let mo = dt.getMonth()
    let da = dt.getDay()
    let hr = dt.getHours();
    let m = "0" + dt.getMinutes();
    let s = "0" + dt.getSeconds();
    return yr + '-' + mo + '-' + da + ' ' + hr+ ':' + m.substr(-2) + ':' + s.substr(-2) + ' UTC'
  }

  renderItems(items) {
    let i = 0;
    const result = items.map(arr => {

      i++;
      return (
        <Grid key={i}>
          <ListItem className={styles.list} role={undefined} dense button onClick={() => this.handleItemSelect(arr[3])}>
          <Grid item xs={3}>
          <Typography variant="h6">
              <Timeago date={new Date(arr[4]*1000)} />
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="h6">
              {arr[3].substring(0,8) + '...'}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">
              {arr[0]}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography className={styles.textRight} variant="h6">
              {arr[2]}
            </Typography>
          </Grid>
          <Grid item xs={1}>
          <ListItemSecondaryAction>
            <IconButton aria-label="View">
              <LaunchRounded />
            </IconButton>
          </ListItemSecondaryAction>
          </Grid>
        </ListItem>
        <Divider />
      </Grid>

      )
    });
    return result;
  }

  render() {
    return (
      <Paper className={styles.container}>
        <List>
          <ListItem className={styles.list}>
            <Grid item xs={3}>
              <Typography variant="h6">
                <b>Deadline</b>
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="h6">
                <b>Contract</b>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">
                <b>Commitment</b>
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography className={styles.textRight} variant="h6">
                <b>Balance (DAI)</b>
              </Typography>
            </Grid>
            <Grid item xs={1}>
            </Grid>
          </ListItem>
          <Divider/>

          {this.renderItems(this.state.items)}
        </List>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <Grid container className={styles.modal} justify="center">
            <Grid container justify="space-between">
              <Grid item xs={14} sm={7}>
                <Typography variant="h3" id="modal-title">
                {this.state.isLoaded ? this.state.items[this.state.selectedItem][0] : null}
                </Typography>
                <Typography className={styles.paddingTop} variant="h6" id="simple-modal-description">
                    {this.state.isLoaded ? this.state.items[this.state.selectedItem][1] : null}
                  </Typography>
              </Grid>
              <Grid item xs={14}  sm={4} className={styles.gridMargin}>
                <Grid container>
                  <Typography variant="h4" id="modal-title">
                    My Pledge: <b>{this.state.pledged}</b>
                  </Typography>
                </Grid>
                <Grid container>
                  ({this.state.pendingPledgeAmount} pending)
                </Grid>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={6}>
                <Grid container>
                  <Typography variant="subtitle1" id="simple-modal-description">
                    <b>Commitment Deadline:</b> {this.state.isLoaded ? this.unixTimestamp(this.state.items[this.state.selectedItem][4]) : null}
                  </Typography>
                </Grid>
                <Grid container>
                  <Typography variant="subtitle1" id="simple-modal-description">
                    <b>Contract Address:</b> {this.state.selectedContract}
                  </Typography>
                </Grid>
                <Grid container>
                  <Typography variant="subtitle1" id="simple-modal-description">
                    <b>Total Funds: </b> {this.state.isLoaded ? this.state.items[this.state.selectedItem][2] : null}
                  </Typography>
                  <Divider/>
                </Grid>
              </Grid>
              <Grid container>
                <Grid container>
                  <b>Pledge commitment in DAI:</b>
                </Grid>
                <Grid container>
                  <form noValidate autoComplete="off">
                    <TextField
                      id="outlined-number"
                      label="Amount"
                      value={this.state.pledgeAmount}
                      onChange={(e) => this.handlePledgeAmountChange(e)}
                      type="number"
                      className={styles.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      margin="normal"
                      variant="outlined"
                    />
                  </form>
                </Grid>
                <Grid container>
                  <Grid container className={styles.gridMargin}>
                    <Button variant="contained"
                            color="primary"
                            onClick={() => this.makePledge(this.state.selectedContract, this.state.pledgeAmount)}
                    >
                      PLEDGE
                    </Button>
                </Grid>

                {Number(this.state.pendingPledgeAmount) > 0 &&
                (<Grid container className={styles.gridMargin}>
                  <Button variant="contained"
                          color="primary"
                          onClick={() => this.finalizePledge(this.state.selectedContract)}
                  >
                    FINALIZE PLEDGES
                  </Button>
                </Grid>)
                }
              </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Modal>
      </Paper>
    );
  }
}

export default ChallengeList;


// todo

// add to balance
// referee can close challenge