import React, { useState, useEffect } from 'react';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import ColorsIndex from './Components/Colors/ColorsIndex';
import Home from './Components/Home/Home';
import Register from './Components/Auth/Register';
import Login from './Components/Auth/Login';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'

function App() {

  const [sessionToken, setSessionToken] = useState('');

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setSessionToken(localStorage.getItem('token'));
    }
  }, [])

  const updateToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setSessionToken(newToken);
  }

  const clearToken = () => {
    localStorage.clear();
    setSessionToken('');
  }

  return (
    <div>
      <Router>
        <Navbar token={sessionToken} clickLogout={clearToken} />
        <Switch>
          <Route exact path="/signup"><Register updateToken={updateToken} /></Route>
          <Route exact path="/login"><Login updateToken={updateToken} /></Route>

          <Route exact path="/"><Home /></Route>
          <Route exact path="/colors"><ColorsIndex token={sessionToken} /></Route>
          <Route exact path="/about"></Route>
        </Switch>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
