/*
 * Title: custom error hanlder
 * Description:
 * Author: Md Naimur Rahman
 * Date: 08/09/2026
 */

import createHttpError from 'http-errors';

// 404 not found handler
export function notFoundHandler(req, res, next) {
  if (req.originalUrl !== '/.well-known/appspecific/com.chrome.devtools.json') {
    console.log('404 URL:', req.method, req.originalUrl);
  }

  next(createHttpError(404, 'Your requested content page was not found'));
}

// default error handler

export function errorHandler(err, req, res, next) {
  // console.error('========== ERROR ==========');
  // console.error(err);
  // console.error('===========================');
  const statusCode = err.status || 500;

  res.locals.error =
    process.env.NODE_ENV === 'development' ? err : { message: err.message };

  res.status(statusCode);

  //   console.log(res.locals);
  if (req.accepts('html')) {
    // response to html
    return res.render('error', {
      title: 'Error page',
    });
  } else {
    return res.json(res.locals.error);
  }
}
