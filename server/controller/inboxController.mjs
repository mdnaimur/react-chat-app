/*
 * Title:
 * Description:
 * Author: Md Naimur Rahman
 * Date: 08/09/2026
 */

/// internal import
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
      conversations_id: req.params.conversations_id,
    }).sort('-createdAt');

    const { participant } = await Conversation.findById(
      req.params.conversations_id,
    );

    res.status(200).json({
      data: {
        messages: messages,
        participant,
      },
      user: req.user.userid,
      conversations_id: req.params.conversations_id,
    });
  } catch (error) {
    return sendErrorResponse(res);
  }
}

// send new message withs socket used

export async function sendMessage(req, res, next) {
  if (req.body.message || (req.files && req.files.length > 0)) {
    try {
      let attachment = null;

      if (req.files && req.files.length > 0) {
        attachment = [];
        req.files.foreEach((file) => {
          attachment.push(file.filename);
        });
      }

      const newMessgae = new Message({
        text: req.body.message,
        attachment: attachment,
        sender: {
          id: req.user.userid,
          name: req.user.username,
          avatar: req.user.avatar || null,
        },
        receiver: {
          id: req.boyd.receiverId,
          name: req.body.username,
          avatar: req.body.avatar || null,
        },
        conversations_id: req.body.coversationId,
      });
      const result = await newMessgae.save();

      global.io.emit('new_message', {
        message: {
          conversations_id: req.body.conversations_id,
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
      return sendErrorResponse(res);
    }
  }
}
