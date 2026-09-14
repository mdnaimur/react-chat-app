/*
 * Title:
 * Description:
 * Author: Md Naimur Rahman
 * Date: 08/09/2026
 */

/// internal import
import createError from 'http-errors';
import { escape } from '../utilities/escape.js';
import Conversation from '../models/Conversation.js';
import Message from '../models/Message.js';
import User from '../models/Users.mjs';
import sendErrorResponse from '../utilities/sendErrorResponse.js';

export async function getInbox(req, res, next) {
  try {
    const conversations = await Conversation.find({
      $or: [
        {
          'creator.id': req.user.userid,
        },
        {
          'participant.id': req.user.userid,
        },
      ],
    });
    res.locals.data = conversations;

    res.render('inbox');
  } catch (error) {
    next(error);
  }
}

/// search user

export async function searchUser(req, res, next) {
  const user = req.body.user;
  console.log('I am inisde search controller.....');
  const searchQuery = user.replace('+88', '');

  const name_search_regex = new RegExp(escape(searchQuery), 'i');
  const mobile_search_regex = new RegExp('^' + escape('+88' + searchQuery));
  const email_search_regex = new RegExp('^' + escape(searchQuery) + '$', 'i');

  try {
    if (searchQuery !== '') {
      const users = await User.find(
        {
          $or: [
            { name: name_search_regex },
            {
              mobile: mobile_search_regex,
            },
            {
              email: email_search_regex,
            },
          ],
        },
        'name avatar',
      );
      res.json(users);
    } else {
      // LEARNING: createError comes from 'http-errors'. Using it without an
      // import throws ReferenceError ("createError is not defined") instead of
      // a clean "provide some text" validation error.
      throw createError('You must provide some text to search!');
    }
  } catch (error) {
    res.status(500).json({
      errors: {
        common: {
          msg: error.message,
        },
      },
    });
  }
}

// add converssation

export async function addConversation(req, res, next) {
  try {
    const newConversation = new Conversation({
      creator: {
        id: req.user.userid,
        name: req.user.username,
        avatar: req.user.avatar || null,
      },
      participant: {
        name: req.body.participant,
        id: req.body.id,
        avatar: req.body.avatar || null,
      },
    });

    const result = await newConversation.save();
    res.status(200).json({
      message: 'Conversation was added successfully',
    });
  } catch (error) {
    res.status(500).json({
      errors: {
        common: {
          msg: error.message,
        },
      },
    });
  }
}

// get messages of a conversation

export async function getMessages(req, res, next) {
  try {
    const messages = await Message.find({
      conversation_id: req.params.conversation_id,
    }).sort('-createdAt');

    // LEARNING: Model.find() always returns an array ([] if none). [] is truthy,
    // so `if (!messages)` never runs. Empty chat is a valid conversation, not 404.
    const conversation = await Conversation.findById(
      req.params.conversation_id,
    );

    if (!conversation) {
      return res.status(404).json({
        error: 'Conversation not found',
      });
    }

    res.status(200).json({
      data: {
        messages,
        participant: conversation.participant,
      },
      user: req.user.userid,
      conversation_id: req.params.conversation_id,
    });
  } catch (error) {
    return sendErrorResponse(res);
  }
}

// send new message withs socket used

export async function sendMessage(req, res, next) {
  console.log(req.body);
  if (req.body.message || (req.files && req.files.length > 0)) {
    try {
      let attachment = null;

      if (req.files && req.files.length > 0) {
        attachment = [];
        req.files.forEach((file) => {
          attachment.push(file.filename);
        });
      }

      const newMessgae = new Message({
        text: req.body.message,
        attachment,
        sender: {
          id: req.user.userid,
          name: req.user.username,
          avatar: req.user.avatar || null,
        },
        receiver: {
          id: req.body.receiverId,
          // LEARNING: inbox.ejs FormData uses `receiverName`, not `username`.
          // req.body.username is undefined, so receiver.name was saved as empty.
          name: req.body.receiverName,
          avatar: req.body.avatar || null,
        },
        conversation_id: req.body.conversationId,
      });
      const result = await newMessgae.save();

      await Conversation.updateOne(
        { _id: req.body.conversationId },
        { last_updated: result.date_time },
      );

      global.io.emit('new_message', {
        message: {
          // LEARNING: client sends conversationId (camelCase). Using
          // conversation_id here made the socket payload undefined, so the
          // inbox.ejs check `data.message.conversation_id == current_conversation_id`
          // failed and live messages never appeared.
          conversation_id: req.body.conversationId,
          sender: {
            id: req.user.userid,
            name: req.user.username,
            avatar: req.user.avatar || null,
          },
          message: req.body.message,
          attachment: attachment,
          date_time: result.date_time,
        },
      });

      res.status(200).json({
        message: 'successful',
        data: result,
      });
    } catch (error) {
      console.log('inside the controller sendmesage', error);
      return sendErrorResponse(res);
    }
  } else {
    // LEARNING: without this else, empty submit (no text, no files) never
    // calls res.json(), so the browser fetch hangs until timeout.
    return sendErrorResponse(res, 400);
  }
}
