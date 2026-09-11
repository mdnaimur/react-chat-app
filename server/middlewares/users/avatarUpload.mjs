/*
 * Title: file upload
 * Description: image and profile update file handle middleware
 * Author: Md Naimur Rahman
 * Date: 09/09/2026
 */

// internal file import
import uploader from '../../utilities/singleUploader.js';

export default function avatarUpload(req, res, next) {
  const upload = uploader(
    'avatars',
    ['image/jpeg', 'image/jpg', 'image/png'],
    1000000,
    'Only .jpg jpeg  or.png format allowed!!',
  );

  const uploadMiddleware = upload.any();

  uploadMiddleware(req, res, (err) => {
    if (err) {
      return res.status(500).json({
        errors: {
          avatar: {
            msg: err.message,
          },
        },
      });
    }

    // console.log('[5] Upload successful');
    // console.log('Files:', req.files);

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
