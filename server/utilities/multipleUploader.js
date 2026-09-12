/*
 * Title: multi file uploder
 * Description:
 * Author: Md Naimur Rahman
 * Date: 12/09/2026
 */

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
  // file uploader
  const UPLOADS_FOLDER = `${__dirname}/../public/uploads/${subfolder_path}/`;

  // define the storage

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, UPLOADS_FOLDER);
    },
    filename: (req, file, cb) => {
      const fileExt = path.extname(file.originalname);
      const filename =
        file.originalname
          .replace(fileExt, '')
          .toLocaleLowerCase()
          .split(' ')
          .join('-') +
        '-' +
        Date.now();

      cb(null, filename + fileExt);
    },
  });

  const upload = multer({
    storage: storage,
    limits: {
      fileSize: max_file_size,
    },
    fileFilter: (req, file, cb) => {
      if (req.files.length > max_file_size) {
        cb(
          createError(
            `Maximum ${max_number_of_files} files are allowed to upload!`,
          ),
        );
      } else {
        if (allowed_file_types.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(createError(error_message));
        }
      }
    },
  });

  return upload;
}
