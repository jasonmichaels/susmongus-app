import React, { useCallback } from 'react';

// eslint-disable-next-line import/no-cycle
import Container from '../containers/Container';
import styles from './Faq.module.css';

const Faq = () => {
  const handleLink = useCallback((e) => {
    e.preventDefault();
    // eslint-disable-next-line global-require
    require('electron').shell.openExternal(e.target.href);
  }, []);

  return (
    <Container showHeader={false}>
      <h1 className={styles.header}>You must install the Sus Tracker skill</h1>
      <ul className={styles.list}>
        <li className={styles.listItem}>
          With the skill, ask, <em>Alexa, get my code from Sus Tracker</em>
        </li>
        <li className={styles.listItem}>
          Alexa will repeat back a six-digit code to enter to login to this app
        </li>
        <li className={styles.listItem}>
          Next, you can add suspicion by saying,&nbsp;
          <em>Alexa, add [color] with Sus Tracker</em>
        </li>
        <li className={styles.listItem}>
          Or, to remove sus from a color,&nbsp;ask,&nbsp;
          <em>Alexa, remove [color] with Sus Tracker</em>
        </li>
        <li className={styles.listItem}>
          You can clear suspicion for all suspects by saying,&nbsp;
          <em>Alexa, clear all sus with Sus Tracker</em>
        </li>
        <li className={styles.listItem}>
          For more information, visit&nbsp;
          <a
            className={styles.link}
            onClick={handleLink}
            href="https://jogo.gg/privacy-policy-for-alexa-skills/"
          >
            Jogo&nbsp;
          </a>
          to view our Play Test FAQ
        </li>
      </ul>
    </Container>
  );
};

export default Faq;
