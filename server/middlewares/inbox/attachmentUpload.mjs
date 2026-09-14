/*
 * Title:
 * Description:
 * Author: Md Naimur Rahman
 * Date: 12/09/2026
 */

import uploader from '../../utilities/multipleUploader.js';
import sendErrorResponse from '../../utilities/sendErrorResponse.js';

export default function attachmentUpload(req, res, next) {
  // LEARNING: arg 3 = max bytes, arg 4 = max file COUNT. multipleUploader must
  // declare max_number_of_files; otherwise 2 is misread as error_message.
  const upload = uploader(
    'attachments',
    ['image/jpeg', 'image/jpg', 'image/png'],
    1000000,
    2,
    'Only .jpg, jpeg or .png format allowed!',
  );

  upload.array('attachment', 2)(req, res, (err) => {
    if (err) {
      console.log('inside attachementUpload', err);
      return sendErrorResponse(res);
    } else {
      next();
    }
  });
}
