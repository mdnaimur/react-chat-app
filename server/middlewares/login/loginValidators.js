/*
 * Title: Login middleware
 * Description:
 * Author: Md Naimur Rahman
 * Date: 09/09/2026
 */

// external import
import { check, validationResult } from 'express-validator';

export const doLoginValidators = [
  check('username')
    .isLength({ min: 1 })
    .withMessage('Mobole number or email is required'),
  check('password').isLength({ min: 1 }).withMessage('password is required'),
];

export function doLoginValidationHandler(req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    res.render('index', {
      data: {
        username: req.body.username,
      },
      errors: mappedErrors,
    });
  }
}
