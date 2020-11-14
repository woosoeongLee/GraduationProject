import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from './components/NavBar';
import Home from './pages/Home'
import Seller from './pages/Seller';
import Buyer from './pages/Buyer';
import Discover from './pages/Discover';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Router>
    <NavBar/>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/Seller" component={Seller}/>
      <Route exact path="/Discover" component={Discover}/>
      <Switch>
        <Route exact path="/Buyer/:sondId" component={Buyer}/>
        <Route exact path="/Buyer/" component={Buyer}/>
      </Switch>
    </Switch>

  </Router>,
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

// serviceWorker.register();
