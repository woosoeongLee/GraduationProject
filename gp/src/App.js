import React, { Component, useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Home, Seller, Buyer } from './pages';
  const App=()=>{
  
    return (
      <div>

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
      </div>
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

export default App;