import React, { Component } from 'react';
import { Route } from 'react-router'
import { BrowserRouter } from 'react-router-dom';

import Header from './Header/header.js';
import Home from './Home/home.js';
import Deploy from './Deploy/deploy.js';
import styles from './App.css';
import ChallengeList from './ChallengeList/challenge-list.js';

import Footer from './Footer/footer.js';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className={styles.App}>
          <Header />
          <Route exact path="/" component={Home} />
          <Route path="/deploy" component={Deploy} />
          <Route path="/commitments/:address?" component={ChallengeList} />
          <Footer />
        </div>
      </BrowserRouter>);
  };
};

export default App;
