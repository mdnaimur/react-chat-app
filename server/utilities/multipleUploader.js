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
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default function uploader(
  subfolder_path,
  allowed_file_types,
  max_file_size,
  max_number_of_files,
  error_message,
) {
  // LEARNING: attachmentUpload() passes 5 args. The 4th is max FILE COUNT (2),
  // the 5th is the type error message. If max_number_of_files is omitted, that
  // count (2) is treated as error_message, and the count check uses an undefined
  // variable / compares against max_file_size (1_000_000 bytes) instead of 2 files.
  // file uploader
  // const UPLOADS_FOLDER = `${__dirname}/../public/uploads/${subfolder_path}/`;
  const UPLOADS_FOLDER = path.join(
    __dirname,
    '../public/uploads',
    subfolder_path,
  );
  // Create upload directory if it doesn't exist
  if (!fs.existsSync(UPLOADS_FOLDER)) {
    fs.mkdirSync(UPLOADS_FOLDER, {
      recursive: true,
    });
  }

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
      // LEARNING: compare file COUNT to max_number_of_files, not max_file_size.
      // req.files can be undefined on the first file; ">= max" rejects the extra file.
      const alreadyAccepted = req.files?.length || 0;
      if (alreadyAccepted >= max_number_of_files) {
        cb(
          createError(
            `Maximum ${max_number_of_files} files are allowed to upload!`,
          ),
        );
      } else if (allowed_file_types.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(createError(error_message));
      }
    },
  });

  return upload;
}
