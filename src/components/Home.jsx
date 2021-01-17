/* eslint-disable jsx-a11y/media-has-caption */

import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useContext,
} from 'react';
import fs from 'fs';
import path from 'path';
import ReactLoading from 'react-loading';

// eslint-disable-next-line
import Container from '../containers/Container';
import extractTextFromImage from '../helpers/imageHelpers';
import captureMedia from '../helpers/captureMedia';
import clearSus from '../helpers/clearSus';
// eslint-disable-next-line
import { AppContext } from '../containers/App';
import styles from './Home.css';

const { desktopCapturer } = require('electron');

const Home = () => {
  const [amongUsFound, setAmongUsFound] = useState(null);
  // eslint-disable-next-line
  const [checkInterval, setCheckInterval] = useState(null);
  const [susCleared, setSusCleared] = useState(new Date().getTime());

  const videoRef = useRef(null);

  const { code } = useContext(AppContext);

  const createCanvas = useCallback(async () => {
    if (videoRef.current) {
      const videoDetails = videoRef.current.getBoundingClientRect();

      if (videoDetails) {
        const { width, height } = videoDetails;
        const canvas = document.createElement('canvas');

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        if (ctx) {
          // Draw video on canvas
          ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

          const data = canvas.toDataURL('image/png');

          const strippedData = data.replace(/^data:image\/png;base64,/, '');

          const buffer = Buffer.from(strippedData, 'base64');

          fs.writeFileSync(
            path.join(__dirname, '..', 'test-images', 'original.png'),
            buffer,
            'base64'
          );

          const text = await extractTextFromImage();

          if (text?.toUpperCase()?.indexOf('PING:') > -1) {
            const newTime = new Date().getTime();
            if (newTime - susCleared > 60 * 1000) {
              clearSus(code);
              setSusCleared(newTime);
            }
          }
        }
        setAmongUsFound(null);
      }
    }
  }, [videoRef, code, susCleared]);

  const startCheck = useCallback(() => {
    const interval = window.setInterval(async () => {
      const sources = await desktopCapturer.getSources({
        types: ['window', 'screen'],
      });
      const amongUs = sources?.find((s) => s.name === 'Among Us') ?? null;
      if (amongUs) {
        captureMedia(amongUs.id);
      }
      setAmongUsFound(amongUs);

      if (videoRef.current) {
        createCanvas();
      }
    }, 5000);
    setCheckInterval(interval);
  }, [createCanvas, videoRef]);

  useEffect(() => {
    return () => {
      if (checkInterval) {
        clearInterval(checkInterval);
        setAmongUsFound(null);
      }
    };
  }, [checkInterval]);

  useEffect(() => {
    startCheck();
  }, [startCheck]);

  return (
    <Container>
      <ReactLoading type={amongUsFound ? 'cylon' : 'spokes'} color="#fff" />
      <div style={{ marginTop: '24px' }}>
        {amongUsFound ? (
          <span>Performing analysis...</span>
        ) : (
          <span>Waiting for Among Us...</span>
        )}
      </div>
      <video ref={videoRef} className={styles.video} />
    </Container>
  );
};

export default Home;
