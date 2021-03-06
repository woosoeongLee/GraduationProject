import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from './components/NavBar';
import Home from './pages/Home'
import Buyer from './pages/Buyer';
import Chart from './pages/Chart';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Router>
    <NavBar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Switch>
        <Route exact path="/Buyer/:sondId" component={Buyer} />
        <Route exact path="/Buyer/" component={Buyer} />
        <Route exact path="/Chart" component={Chart} />
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
