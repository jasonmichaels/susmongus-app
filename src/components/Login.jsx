import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
// eslint-disable-next-line
import Container from '../containers/Container';
// eslint-disable-next-line
import { AppContext } from '../containers/App';

function Login() {
  const [hasCheckedCode, setHasCheckedCode] = useState(false);
  const history = useHistory();

  const { code, getCode } = useContext(AppContext);

  useEffect(() => {
    if (!hasCheckedCode) {
      getCode();
      setHasCheckedCode(true);
    }

    return () => {
      setHasCheckedCode(false);
    };
  }, [getCode, hasCheckedCode]);

  useEffect(() => {
    if (hasCheckedCode) {
      if (!code) {
        history.push('/getCode');
      } else {
        history.push('/home');
      }
    }
  }, [hasCheckedCode, history, code]);

  return (
    <Container>
      {!hasCheckedCode && <div>Checking for AWS code...</div>}
    </Container>
  );
}

export default Login;
