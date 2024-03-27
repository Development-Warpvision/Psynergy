import mongoose, { Document } from 'mongoose';

// Define the Ticket interface
interface IAgent extends Document {
  name: string;
  ticketAssigned: boolean;
  assignedNotifications:object[];
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
  loginStatus:boolean
}

const agentSchema = new mongoose.Schema<IAgent>({
name:{type:String},
ticketAssigned:{type:Boolean},
passwordHash:{type:String},
assignedNotifications:[{ type: mongoose.Schema.Types.Mixed }],
createdAt: { type: Date, default: new Date() },
updatedAt: { type: Date, default: new Date() },
loginStatus: { type: Boolean, default: false },

})



const AgentModel = mongoose.model<IAgent>('Agent', agentSchema);

export { IAgent,AgentModel };