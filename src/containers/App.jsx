import React, { createContext, useState, useEffect, useCallback } from 'react';
import Store from 'electron-store';
import { Switch, Route, useHistory } from 'react-router-dom';
/* eslint-disable */
import Home from '../components/Home';
import Login from '../components/Login';
import Faq from '../components/Faq';
// eslint-disable-next-line
import GetCode from '../components/GetCode';

const store = new Store();

export const AppContext = createContext();

const App = () => {
  const [code, setCode] = useState('');

  const history = useHistory();

  useEffect(() => {
    const pin = store.get('pin');

    if (pin) {
      setCode(pin);
    }
  }, []);

  useEffect(() => {
    if (!code) {
      history.push('/login');
    } else {
      history.push('/home');
    }
  }, [code, history]);

  const getCode = useCallback(() => code, [code]);

  return (
    <AppContext.Provider
      value={{
        code,
        setCode,
        getCode,
      }}
    >
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/getCode" component={GetCode} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/faq" component={Faq} />
      </Switch>
    </AppContext.Provider>
  );
};

export default App;
