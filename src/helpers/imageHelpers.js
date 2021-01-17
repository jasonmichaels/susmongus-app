import { createWorker } from 'tesseract.js';
import Jimp from 'jimp';
import path from 'path';
import fs from 'fs';

const extractTextFromImage = async () => {
  const worker = createWorker({
    cachePath: path.join(__dirname, '..', 'lang-data'),
  });

  let rectangle;

  Jimp.read(
    path.join(__dirname, '..', 'test-images', 'original.png'),
    (err, image) => {
      if (err) throw err;
      // get our image size and update our rectangle for parsing only part of the image
      const { height, width } = image.bitmap;
      rectangle = {
        left: 0,
        top: 0,
        width,
        height,
      };

      image
        .greyscale() // set greyscale
        .invert() // invert colors
        .contrast(1) // boost contrast
        .write(path.join(__dirname, '..', 'test-images', 'modified.png')); // save
    }
  );

  await worker.load();
  await worker.loadLanguage('eng');
  await worker.initialize('eng');
  const {
    data: { text },
  } = await worker.recognize(
    path.join(__dirname, '..', 'test-images', 'modified.png'),
    { rectangle }
  );

  await worker.terminate();

  fs.readdir(path.join(__dirname, '..', 'test-images'), (err, files) => {
    if (err) throw err;

    if (files.length) {
      files.forEach((file) =>
        fs.unlinkSync(path.join(__dirname, '..', 'test-images', file))
      );
    }
  });

  return text;
};

export default extractTextFromImage;
