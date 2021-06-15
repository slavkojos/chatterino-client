import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link as RouterLink,
  Redirect,
} from 'react-router-dom';
import { useState } from 'react';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
  const [username, setUsername] = useState('');
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Route
          exact
          path="/"
          render={props => (
            <Login {...props} username={username} setUsername={setUsername} />
          )}
        />
        <Route
          path="/home"
          render={props => {
            if (username === '') {
              return <Redirect to="/" />;
            } else return <Home {...props} username={username} />;
          }}
        />
      </Router>
    </ChakraProvider>
  );
}

export default App;
