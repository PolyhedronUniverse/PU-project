import React from 'react';
import './index.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/home';
import Test from './pages/test';
import Exp01Page from './pages/exp01Page';

export default function App( ){
  return(
    <BrowserRouter>
      <Switch>
        <Route path='/exp01' component={Exp01Page}/>
        <Route path='/test' component={Test}/>
        <Route path='/' component={Home}/>
      </Switch>
    </BrowserRouter>
  )
}
