import React, { Component } from 'react';
import { Route } from 'react-router'
import { BrowserRouter } from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import {
    orange500, orange700,
    pinkA200,
    grey100, grey300, grey400, grey500,
    white, darkBlack, fullBlack,
  } from 'material-ui/styles/colors';

import { fade} from 'material-ui/utils/colorManipulator';

import Header from './Header/header.js';
import Home from './Home/home.js';
import Deploy from './Deploy/deploy.js';
import Listing from './Listing/listing.js';

const muiTheme = getMuiTheme({
  fontFamily: 'Montserrat, sans-serif',
  palette: {
    primary1Color: orange500,
    primary2Color: orange700,
    primary3Color: grey400,
    accent1Color: pinkA200,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: orange500,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
  }
})



class App extends Component {
  render() {

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
          <BrowserRouter>
          <Header />  
            <Route exact path="/" component={Home} />
            <Route path="/deploy" component={Deploy} />
            <Route path="/listing" component={Listing} />

          </BrowserRouter>
      </MuiThemeProvider>
    );
  };
};

export default App;
