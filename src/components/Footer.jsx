import React, { useCallback, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import styles from './Footer.css';
// eslint-disable-next-line
import { AppContext } from '../containers/App';

const Footer = () => {
  const history = useHistory();

  const { code, setCode } = useContext(AppContext);

  const handleLogout = useCallback(() => {
    setCode('');
    history.push('/login');
  }, [history, setCode]);

  return (
    <footer className={styles.footer}>
      <h3 className={styles.date}>Copyright {new Date().getFullYear()}</h3>
      {code && (
        // eslint-disable-next-line
        <div role="button" className={styles.logout} onClick={handleLogout}>
          Logout
        </div>
      )}
    </footer>
  );
};

export default Footer;
