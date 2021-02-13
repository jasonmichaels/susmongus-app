/* eslint-disable */

import React, { useCallback, useContext, useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Store from 'electron-store';

import styles from './Footer.module.css';
// eslint-disable-next-line
import { AppContext } from '../containers/App';

const store = new Store();

const Footer = () => {
  const history = useHistory();
  const location = useLocation();

  const { code, setCode } = useContext(AppContext);

  const middleButton = useMemo(() => {
    const { pathname } = location;
    const showHome = pathname === '/faq';
    const showGetCode = !code && pathname !== '/getCode';

    return {
      route: showGetCode ? '/getCode' : showHome ? '/home' : '/faq',
      text: showGetCode ? 'Get Code' : showHome ? 'Home' : 'FAQ'
    };
}, [location.pathname, code]);

  const handleLogout = useCallback(() => {
    setCode('');
    store.set('pin', '');
    history.push('/login');
  }, [history, setCode]);

  return (
    <footer className={styles.footer}>
      <h3 className={styles.date}>
        Jogo&nbsp;&copy;&nbsp;{new Date().getFullYear()}
      </h3>
      <div
        role="button"
        className={styles.button}
        onClick={() => history.push(middleButton.route)}
      >
        {middleButton.text}
      </div>
      {code && (
        // eslint-disable-next-line
        <div role="button" className={styles.button} onClick={handleLogout}>
          Logout
        </div>
      )}
    </footer>
  );
};

export default Footer;
