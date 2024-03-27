import mongoose, { Document } from 'mongoose';

interface ChatMessage {
  userMsg?: string;
  agentReply?: string;
  name?: string;
  email?: string;
  time?: Date;
}

interface chatWidget extends Document {
  name: string;
  agentId: string;
  userEmail: string;  // Add this line
  chat: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

const chatWidgetSchema = new mongoose.Schema<chatWidget>({
  name: { type: String },
  agentId: { type: String },
  userEmail: { type: String, required: true },  // Ensure this is required
  chat: [
    {
      userMsg: String,
      agentReply: String,
      name: String,
      email: { type: String },
      time: { type: Date, default: Date.now }
    }
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const chatWidgetModel = mongoose.model<chatWidget>('widget', chatWidgetSchema);

export { chatWidget, chatWidgetModel };
