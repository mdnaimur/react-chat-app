/*
 * Title:
 * Description:
 * Author: Md Naimur Rahman
 * Date: 11/09/2026
 */

export default function sendErrorResponse(res, statusCode = 500) {
  return res.status(statusCode).json({
    errors: {
      common: {
        msg: 'Unknown error occurred!',
      },
    },
  });
}
