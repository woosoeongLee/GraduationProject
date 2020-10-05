import React, { Component, useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Home, Seller, Buyer } from './pages';
// import axios from "axios";
// import web3 from 'web3';


class App extends Component {
  /*
  //rest 서버와 통신을 위한 코드
  const [userName, SetUserName] = useState(null);
  const onClickTest = () => {
    axios
      .get('api')
      .then(response => {
        let jsonData = response.data;
        SetUserName(jsonData.userName);
      })
      .catch(err => {
        console.log(err);
      })
  };*/  
  render() {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/buyer">Buyer</Link>
              </li>
              <li>
                <Link to="/seller">Seller</Link>
              </li>
            </ul>
          </nav>

          <Route exact path='/' component={Home} />
          <Route path='/buyer' component={Buyer} />
          <Route path='/seller' component={Seller} />
        </div>
      </Router>
        // <TestButton onClick={onClickTest}>
        //   Click!
        // </TestButton>
        // <TestDiv>
        //   {userName ? `Hello ${userName}` : `Hello World`};
        // </TestDiv>
        // <Web3Button onClick={onClickWeb3}>
        //   Web3테스트
        // </Web3Button>
    );
  }
}

export default App;