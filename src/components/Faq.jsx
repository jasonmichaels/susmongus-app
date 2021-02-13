import React from 'react';
// eslint-disable-next-line import/no-cycle
import Container from '../containers/Container';
import styles from './Faq.module.css';

const Faq = () => {
  return (
    <Container showHeader={false}>
      <ul className={styles.list}>
        <li className={styles.listItem}>
          You must install the Sus Tracker Alexa&nbsp;&copy; skill
        </li>
        <li className={styles.listItem}>
          Ask, <em>Alexa, get my code from Sus Tracker</em>
        </li>
        <li className={styles.listItem}>
          Alexa will repeat back a six-digit code to enter to login to this app
        </li>
        <li className={styles.listItem}>
          Next, you can add suspicion by saying,{' '}
          <em>Alexa, add [color] using Sus Tracker</em>
        </li>
        <li className={styles.listItem}>
          Or, to remove sus from a color,{' '}
          <em>Alexa, remove [color] using Sus Tracker</em>
        </li>
        <li className={styles.listItem}>
          And you can clear suspicion for all colors by saying,{' '}
          <em>Alexa, clear all sus using Sus Tracker</em>
        </li>
        <li className={styles.listItem}>
          For more information, visit&nbsp;
          <a
            className={styles.link}
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
