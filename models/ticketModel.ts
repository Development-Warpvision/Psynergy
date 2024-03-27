import mongoose, { Document } from 'mongoose';

// Define the Ticket interface
interface ITicket extends Document {
  subject: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  createdBy:  mongoose.Types.ObjectId;
  assignedTo?:  mongoose.Types.ObjectId;
  channel: string; // New field to store the channel name
  createdAt: Date;
  updatedAt: Date;
}

// Enum for ticket status
enum TicketStatus {
  New = 'New',
  InProgress = 'Assigned:In Progress',
  Pending = 'Pending',
  Resolved = 'Resolved',
}

// Enum for ticket priority
enum TicketPriority {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
}

// Define the Ticket schema
const ticketSchema = new mongoose.Schema<ITicket>({
  subject: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: Object.values(TicketStatus), default: TicketStatus.New },
  priority: { type: String, enum: Object.values(TicketPriority), default: TicketPriority.Medium },
  createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  assignedTo: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  channel:{type:String,required:true},
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() },
});

// Create a Ticket model from the schema
const TicketModel = mongoose.model<ITicket>('Ticket', ticketSchema);

export { ITicket, TicketStatus, TicketPriority, TicketModel };
