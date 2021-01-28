import { createWorker } from 'tesseract.js';
import Jimp from 'jimp';
import path from 'path';
import fs from 'fs';

const extractTextFromImage = async (imageBuffer) => {
  const worker = createWorker({
    cachePath: path.join(__dirname, '..', 'lang-data'),
  });

  let rectangle;

  const success = Jimp.read(imageBuffer)
    .then((image) => {
      const { height, width } = image.bitmap;
      rectangle = {
        left: 0,
        top: 0,
        width: width / 2,
        height: height / 2,
      };

      image
        .greyscale() // set greyscale
        .invert() // invert colors
        .contrast(1) // boost contrast
        .write(path.join(__dirname, '..', 'test-images', 'modified.png')); // save
      return true;
    })
    .catch(() => {
      return false;
    });

  if (success) {
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

    const files = fs.readdirSync(path.join(__dirname, '..', 'test-images'));

    if (Array.isArray(files)) {
      try {
        files.forEach((file) =>
          fs.unlinkSync(path.join(__dirname, '..', 'test-images', file))
        );
      } catch {
        return false;
      }
    }
    return text;
  }
  return false;
};

export default extractTextFromImage;
