/**
 * Title: Decorate HTML Response
 * Description: Decorates HTML responses with common local variables
 * Author: Md Naimur Rahman
 * Date: 08/09/2026
 */

export function decorateHtmlResponse(pageTitle) {
  return function (req, res, next) {
    console.log('1. Decorator called');
    res.locals.html = true;
    res.locals.title = `${pageTitle} - ${process.env.APP_NAME}`;

    next();
  };
}
