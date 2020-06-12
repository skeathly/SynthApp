import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, NavLink } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';

import Navigation from './components/Navigation';
import Blog from './components/Blog';
import Home from './components/Home';
import Manufacturers from './components/Manufacturers';
import Synths from './components/Synths';
import SynthDetail from './components/SynthDetail';
import Footer from './components/Footer';

import './App.scss';

function App() {
  return (
    <Router>

      <Navigation />

      <Switch>

        <Route path="/synths/:page">
          <Synths />
        </Route>

        <Route path="/synth/:slug">
          <SynthDetail />
        </Route>
        <Route path="/manufacturers">
          <Manufacturers />
        </Route>
        <Route path="/blog">
          <Blog />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>

      <Footer />

    </Router >
  );
}

export default App;
