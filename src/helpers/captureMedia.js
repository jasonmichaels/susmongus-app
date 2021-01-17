/* eslint-disable promise/catch-or-return, promise/always-return, no-restricted-syntax, no-await-in-loop */

function handleStream(stream) {
  if (stream) {
    const video = document.querySelector('video');
    if (video) {
      video.srcObject = stream;
      video.onloadedmetadata = (e) => video.play();
    }
  }
}

function handleError(e) {
  // eslint-disable-next-line
  console.log(e);
}

const captureMedia = async (id) => {
  const mandatory = {
    chromeMediaSource: 'desktop',
    chromeMediaSourceId: id,
    minWidth: 1280,
    maxWidth: 5000,
    minHeight: 720,
    maxHeight: 1440,
  };

  try {
    const stream =
      (await window.navigator.mediaDevices.getUserMedia({
        audio: false,
        video: { mandatory },
      })) ?? null;
    handleStream(stream);
  } catch (e) {
    handleError(e);
  }
};

export default captureMedia;
