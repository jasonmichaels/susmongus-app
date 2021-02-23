/* eslint-disable jsx-a11y/media-has-caption */

import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useContext,
} from 'react';
import ReactLoading from 'react-loading';
import axios from 'axios';

// eslint-disable-next-line
import Container from '../containers/Container';
import extractTextFromImage from '../helpers/imageHelpers';
import captureMedia from '../helpers/captureMedia';
import clearSus from '../helpers/clearSus';
// eslint-disable-next-line
import { AppContext } from '../containers/App';
import styles from './Home.module.css';

const { desktopCapturer } = require('electron');

const Home = () => {
  const [amongUsFound, setAmongUsFound] = useState(null);
  const [shouldCheck, setShouldCheck] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const videoRef = useRef(null);
  const intervalRef = useRef(null);

  const { code } = useContext(AppContext);

  const checkText = useCallback(
    async (text) => {
      if (text && text?.toUpperCase()?.indexOf('SETTINGS') > -1) {
        await clearSus(code);
      }
      return true;
    },
    [code]
  );

  const createCanvas = useCallback(async () => {
    const videoDetails = videoRef.current.getBoundingClientRect();

    const { width, height } = videoDetails;
    const canvas = document.createElement('canvas');

    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    // Draw video on canvas
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    const data = canvas.toDataURL('image/png');

    const strippedData = data.replace(/^data:image\/png;base64,/, '');

    const buffer = Buffer.from(strippedData, 'base64');

    await extractTextFromImage(buffer, checkText);

    return setAmongUsFound(null);
  }, [checkText]);

  const startCheck = useCallback(async () => {
    const sources = await desktopCapturer.getSources({
      types: ['window', 'screen'],
    });
    const amongUs = sources?.find((s) => s.name === 'Among Us') ?? null;
    if (amongUs) {
      captureMedia(amongUs.id);
    }
    setAmongUsFound(amongUs);

    if (videoRef.current) {
      await createCanvas();
    }
    setIsChecking(false);
  }, [createCanvas]);

  useEffect(() => {
    intervalRef.current = setInterval(() => setShouldCheck(true), 5000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (shouldCheck && !isChecking) {
      setShouldCheck(false);
      setIsChecking(true);
      startCheck();
    }
  }, [shouldCheck, isChecking, startCheck]);

  return (
    <Container>
      <ReactLoading type={amongUsFound ? 'cylon' : 'spokes'} color="#fff" />
      <div style={{ marginTop: '24px' }}>
        {amongUsFound ? (
          <span>Checking if round has ended&nbsp;.&nbsp;.&nbsp;.</span>
        ) : (
          <span>
            Detecting <em>Among Us&trade;</em>
          </span>
        )}
      </div>
      <video ref={videoRef} className={styles.video} />
    </Container>
  );
};

export default Home;
