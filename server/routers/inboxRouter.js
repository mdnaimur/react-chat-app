/*
 * Title: inbox route
 * Description: Route fro inbox router
 * Author: Md Naimur Rahman
 * Date: 08/09/2026
 */

import express from 'express';
import { decorateHtmlResponse } from '../middlewares/common/decorateHtmlResponse.mjs';
import {
  addConversation,
  getInbox,
  searchUser,
  getMessages,
  sendMessage,
} from '../controller/inboxController.mjs';

import { checkLogin } from '../middlewares/common/checkLogin.js';

import attachmentUpload from '../middlewares/inbox/attachmentUpload.mjs';

const router = express.Router();

router.get('/', decorateHtmlResponse('Inbox'), checkLogin, getInbox);

router.post('/search', checkLogin, searchUser);

// add conversation
router.post('/conversation', checkLogin, addConversation);

// get messages of a conversation
router.get('/messages/:conversation_id', checkLogin, getMessages);

// send message

router.post('/message', checkLogin, attachmentUpload, sendMessage);

export default router;
