/*
 * Title: file upload
 * Description: image and profile update file handle middleware
 * Author: Md Naimur Rahman
 * Date: 09/09/2026
 */

// internal file import
import uploader from '../../utilities/singleUploader.js';

export default function avatarUpload(req, res, next) {
  console.log('[1] Avatart Upload HIT');
  const upload = uploader(
    'avatars',
    ['image/jpeg', 'image/jpg', 'image/png'],
    1000000,
    'Only .jpg jpeg  or.png format allowed!!',
  );

  console.log('[2] uploader created:', !!upload);

  const uploadMiddleware = upload.any();

  console.log('[3] upload middleware created');
  uploadMiddleware(req, res, (err) => {
    console.log('[4] Multer callback HIT');
    console.error('MULTER ERROR:', err);

    if (err) {
      return res.status(500).json({
        errors: {
          avatar: {
            msg: err.message,
          },
        },
      });
    }

    console.log('[5] Upload successful');
    console.log('Files:', req.files);

    next();
  });

  // call middleware function
  //   upload.any()(req, res, (err) => {
  //     console.error('MULTER ERROR:', err);
  //     if (err) {
  //       res.status(500).json({
  //         errors: {
  //           avatar: {
  //             msg: err.message,
  //           },
  //         },
  //       });
  //     } else {
  //       next();
  //     }
  //   });
}
