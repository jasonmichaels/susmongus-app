import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useContext,
} from 'react';
import { useHistory } from 'react-router-dom';
import ReactCodeInput from 'react-code-input';
import axios from 'axios';
import Store from 'electron-store';

// eslint-disable-next-line
import Container from '../containers/Container';
// eslint-disable-next-line
import { AppContext } from '../containers/App';
import styles from './GetCode.module.css';

const store = new Store();

function GetCode() {
  const [code, setCodeText] = useState('');
  const [needsCode, setNeedsCode] = useState(false);

  const history = useHistory();

  const { code: storedCode, setCode } = useContext(AppContext);

  useEffect(() => {
    if (storedCode) {
      history.push('/home');
    }
  }, [storedCode, history]);

  const handleSetCode = useCallback((codeText) => {
    setCodeText(codeText);
    setNeedsCode(false);
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      axios
        .post(
          'https://n6a9k209p4.execute-api.us-east-2.amazonaws.com/get-sus',
          { id: code }
        )
        .then((res) => {
          if (res.status === 200) {
            setCode(code);
            store.set('pin', code);
            return history.push('/home');
          }
          return setNeedsCode(true);
        })
        .catch(() => {
          return setNeedsCode(true);
        });
    },
    [code, setCode, history]
  );

  const enableSubmit = useMemo(() => code?.length === 6, [code]);

  return (
    <Container>
      <h2 className={styles.instructions}>Instructions</h2>
      <p className={styles.paragraph}>
        Make sure you&apos;re running the Alexa&trade;&nbsp;<em>Susmongus</em>
        &nbsp; skill, then ask,&nbsp;
        <em>Alexa, what&apos;s my code?</em>&nbsp;and enter the six-digit code
        below to login and start tracking sus.
      </p>
      {needsCode && code.length === 6 ? (
        <p className={styles.paragraph}>Code not found!</p>
      ) : null}
      <ReactCodeInput
        type="text"
        fields={6}
        name="code"
        inputMode="verbatim"
        onChange={handleSetCode}
        className={styles.inputContainer}
        autoFocus
      />
      <button
        type="submit"
        onClick={handleSubmit}
        disabled={!enableSubmit}
        className={styles.button}
      >
        Submit
      </button>
    </Container>
  );
}

export default GetCode;
