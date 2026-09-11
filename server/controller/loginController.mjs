/*
 * Title: Login controller
 * Description:
 * Author: Md Naimur Rahman
 * Date: 08/09/2026
 */

//  external imports
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import createError from 'http-errors';

// internal import
import User from '../models/Users.mjs';

export function getLogin(req, res, next) {
  console.log('2. Controller called');
  res.render('index');
}

// do login

export async function login(req, res, next) {
  try {
    // find a user who has this email/ username

    const user = await User.findOne({
      $or: [{ email: req.body.username }, { mobile: req.body.username }],
    });

    if (user && user._id) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user.password,
      );
      if (isValidPassword) {
        // prepare the user object to generate token
        const userObj = {
          username: user.name,
          mobile: user.mobile,
          email: user.email,
          role: 'user',
        };
        // generate token
        const token = jwt.sign(userObj, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRY,
        });

        // set cookies
        res.cookie(process.env.COOKIE_NAME, token, {
          maxAge: process.env.JWT_EXPIRY,
          httpOnly: true,
          signed: true,
        });

        // set logged in user local identifier
        res.locals.loggedInUser = userObj;

        res.render('inbox');
      } else {
        throw createError(
          'Login failed! userId or password not found. Please try again',
        );
      }
    } else {
      throw createError('Login failed! Please try again');
    }
  } catch (error) {
    res.render('index', {
      data: {
        username: req.body.username,
      },
      errors: {
        common: {
          msg: error.message,
        },
      },
    });
  }
}

export function logout(req, res) {
  res.clearCookie(process.env.COOKIE_NAME);
  res.send('Logged out');
}
