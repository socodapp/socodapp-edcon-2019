import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      registry: "0x223f38d48dA35f904D13Ce7E969353cBF0A6267E",
      apiKey: "YourApiKeyToken",
      apiUrl: "https://api-kovan.etherscan.io/api?module=logs&action=getLogs&fromBlock=10706350&toBlock=latest"
    };
  }

  componentDidMount() {
    console.log(this.state.apiUrl + "&address=" + this.state.registry + "&apikey=" + this.state.apiKey);
    fetch(this.state.apiUrl + "&address=" + this.state.registry + "&apikey=" + this.state.apiKey)
      .then(res => res.json())
     // reverse ens all addresses in res.result

      .then(
        (res) => {
          this.setState({
            isLoaded: true,
            items: res.result
          });
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
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {items.map(item => (
            <li key={item.address}>
              <p> Name: {item.address}</p>
              <p> Addr: {item.address}</p>
              {item.data}
            </li>
          ))}
        </ul>
      );
    }
  }
}

export default App;
