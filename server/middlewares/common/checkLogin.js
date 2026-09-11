/*
 * Title:
 * Description:
 * Author: Md Naimur Rahman
 * Date: 10/09/2026
 */

// extranal import
import jwt from 'jsonwebtoken';

export const checkLogin = (req, res, next) => {
  let cookies =
    Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;
  //   console.log(`Cookies check frm checkloging ${cookies}`);

  console.log('Cookies:', cookies);

  if (cookies) {
    try {
      const token = cookies[process.env.COOKIE_NAME];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      if (res.locals.html) {
        res.locals.loggedInUser = decoded;
      }
      next();
    } catch (error) {
      if (res.locals.html) {
        res.redirect('/');
      } else {
        res.status(500).json({
          errors: {
            common: {
              msg: 'Authentication failure!!',
            },
          },
        });
      }
    }
  } else {
    if (res.locals.html) {
      res.redirect('/');
    } else {
      res.status(401).json({
        error: 'Authetication failure!',
      });
    }
  }
};

export const redirectLoggedIn = function (req, res, next) {
  let cookies =
    Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;
  if (!cookies) {
    next();
  } else {
    res.redirect('/inbox');
  }
};
