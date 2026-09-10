/*
 * Title: Uploader using multier
 * Description:
 * Author: Md Naimur Rahman
 * Date: 09/09/2026
 */
// extenal import
import multer from 'multer';
import path from 'path';
import createError from 'http-errors';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default function uploader(
  subfolder_path,
  allowed_file_types,
  max_file_size,
  error_message,
) {
  // file upload folder
  const UPLOADS_FOLDER = `${__dirname}/../public/uploads/${subfolder_path}/`;
  if (!UPLOADS_FOLDER) {
    console.log('UPLOAD folder error');
  }

  // define the storage

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, UPLOADS_FOLDER);
    },
    filename: (req, file, cb) => {
      console.log(`inside singleUploader check file req: ${req.file}`);
      const fileExt = path.extname(file.originalname);
      const fileName =
        file.originalname
          .replace(fileExt, '')
          .toLocaleLowerCase()
          .split(' ')
          .join('-') + Date.now();
      cb(null, fileName + fileExt);
    },
  });

  // preapre the final multer upload object

  const upload = multer({
    storage: storage,
    limits: {
      fileSize: max_file_size,
    },
    fileFilter: (req, file, cb) => {
      if (allowed_file_types.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(createError(error_message));
      }
    },
  });

  return upload;
}
