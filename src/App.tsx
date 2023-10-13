/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// import lib/rn
import React, { useState } from 'react';
// import screen
import Home from './screen/Home';
import Login from './screen/Login';

function App(): JSX.Element {
  // init var
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  // check if already auth/login
  if (!isAuthenticated) {
    return <Login onAuthenticated={() => setIsAuthenticated(true)} />
  }
  return <Home />
}

export default App;
