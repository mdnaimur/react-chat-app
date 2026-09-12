/*
 * Title:
 * Description:
 * Author: Md Naimur Rahman
 * Date: 12/09/2026
 */

import uploader from '../../utilities/multipleUploader.js';
import sendErrorResponse from '../../utilities/sendErrorResponse.js';

export default function attachmentUpload(req, res, next) {
  const upload = uploader(
    'attachments',
    ['image/jpeg', 'image/jpg', 'image/png'],
    1000000,
    2,
    'Only .jpg, jpeg or .png format allowed!',
  );

  upload.any()(req, res, (err) => {
    if (err) {
      return sendErrorResponse(res);
    }
    elseP;
    next();
  });
}
