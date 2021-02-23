import { createWorker } from 'tesseract.js';
import Jimp from 'jimp';
import path from 'path';

const extractTextFromImage = async (imageBuffer, callback) => {
  const worker = createWorker({
    cachePath: path.join(__dirname, '..', 'lang-data'),
  });

  let rectangle;
  // eslint-disable-next-line
  await Jimp.read(imageBuffer)
    // eslint-disable-next-line
    .then(async (image) => {
      const { height, width } = image.bitmap;
      rectangle = {
        left: 0,
        top: 0,
        width: width / 2,
        height: height / 2,
      };

      await image
        .greyscale() // set greyscale
        .invert() // invert colors
        .getBuffer(Jimp.MIME_JPEG, async (_, buffer) => {
          await worker.load();
          await worker.loadLanguage('eng');
          await worker.initialize('eng');
          const {
            data: { text },
          } = await worker.recognize(buffer, { rectangle });
          await worker.terminate();
          // eslint-disable-next-line promise/no-callback-in-promise
          await callback(text);
        });
    })
    // eslint-disable-next-line promise/no-callback-in-promise
    .catch(() => callback(false));
};

export default extractTextFromImage;
