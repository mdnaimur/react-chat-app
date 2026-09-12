/*
 * Title:
 * Description:
 * Author: Md Naimur Rahman
 * Date: 11/09/2026
 */

import mongoose from 'mongoose';

const conversationSchema = mongoose.Schema(
  {
    creator: {
      id: mongoose.Types.ObjectId,
      name: String,
      avatar: String,
    },

    participant: {
      id: mongoose.Types.ObjectId,
      name: String,
      avatar: String,
    },
    last_updated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

const Conversation = mongoose.model('Conversation', conversationSchema);

export default Conversation;
