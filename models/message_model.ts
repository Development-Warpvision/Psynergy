import mongoose, { model, Schema } from "mongoose";

const messageModelSchema = new Schema({
  _parentid: {
    type: String,
  },
  _msgid: {
    type: String,
    unique: true,
  },
  recievingMedium: {
    type: String,
    require: true,
  },
  messages: {
    type: Array,
  },
  senderId: {
    type: String,
  },
  reciverId: {
    type: String,
  },
  media: {
    message: {
      type: String,
    },

    msgId: {
      type: String,
    },
    emailMsg: {
      subject: {
        type: String,
      },
      body: {
        type: String,
      },
      replyto: {
        type: String,
      },
    },
    image: {
      type: [String],
    },
    video: {
      type: [String],
    },
    document: {
      type: [String],
    },
  },
  msgType: {
    type: [String],
  },
  isRead: {
    type: Boolean,
    require: true,
  },
  contact: {
    name: {
      type: String,
    },
    from: {
      type: String,
    },
    to: {
      type: [],
    },
    cc: {
      type: [String],
    },
  },
  receiveTime: {
    type: Date,
  },
  messageBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  cmpId: {
    type: String,
  },
  conversationsId: {
    type: Schema.Types.ObjectId,
    ref: "Conversations",
  },
});

const Messages = mongoose.model("MessageSchema", messageModelSchema);
export { Messages };
