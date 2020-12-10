import logo from '../../../assets/img/logo/logo.svg';
import './App.css';
import React from "react";
import { BrowserRouter as Router, Switch, Route, HashRouter } from "react-router-dom";
import Dashboard from '../Dashboard';
import Creator from '../Dashboard/creator.js';
import Login from '../Login';
import Register from '../Register';
import Home from '../Home';
import { Provider } from 'react-redux';
import { store } from '../../../config/redux'
import Sidebar from '../Sidebar';
import '../../templates/uifont.css'

function App() {
  return (

    <div className='App' id='outer-container'>
    <Provider store={store}>
    <HashRouter> 
      <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
      <div id='page-wrap'>
        <Route path="/" exact component={Dashboard}/>
        <Route path="/creator" component={Creator}/>
        <Route path="/login" component={Login}/>
        <Route path="/register"component={Register}/>
        <Route path="/home"component={Home}/>
      </div>
    </HashRouter>
    </Provider>
    </div>
  );
}

export default App;
