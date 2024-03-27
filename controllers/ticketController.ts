const express = require('express');
const router = express.Router();
const { TicketModel, TicketStatus, TicketPriority } = require('../models/ticketModel'); 
const asyncHandler = require("express-async-handler");
import { Request, Response, NextFunction } from "express";
const User = require("../models/user_model");
const Agent = require("../models/agentModel")
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Create a new ticket/ inquiries to agents
exports.createTicket= async (req:Request, res:Response) => {
  try {
    const { subject, description, createdBy ,channel} = req.body;
    let assignedToId=""
       const freeAgent = await Agent.findOne({ticketAssigned:false})
       if(!freeAgent){
        const agents = await Agent.find(); // Retrieve all users
        const randomAgent = agents[Math.floor(Math.random() * agents.length)];
        assignedToId= randomAgent._id
      }else{   
        assignedToId=freeAgent._id
      }
    const newTicket = new TicketModel({
      subject,
      description,
      channel,
      createdBy,//id of the user creating inquiry
      assignedTo:assignedToId, //to whom agent the ticket is assigned
      status: TicketStatus.New, // Set default status to "New"
      priority: TicketPriority.Medium, // Set default priority to "Medium"
    });

    const savedTicket = await newTicket.save();
  return  res.status(200).json(savedTicket);
  } catch (error) {
   return res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.sendAssignedTicketsToAgentInbox= async (req:Request, res:Response) => {
  try {
    const { ticketId, agentId } = req.body

    const ticket = await TicketModel.findById(ticketId);

    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    //  the ticket is assigned to the specified agent
    if (ticket.assignedTo !== agentId) {
      return res.status(403).json({ error: 'ticket is not assigned to this agent' });
    }

    // move the ticket to the agent's inbox

    ticket.status = 'Assigined:In Progress'; // update the status to in Progress
    ticket.updatedAt = new Date(); 

    // save updated ticket
    const updatedTicket = await ticket.save();

    return res.json(updatedTicket);
  } catch (error) {
   return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// api to mark a ticket as resolved when the customer is happy.query done
exports.setTicketToResolved=async (req:Request, res:Response) => {
  try {
    const { ticketId,agentId } = req.body

    // Find the ticket by its ID
    const ticket = await TicketModel.findById(ticketId)
    const agent = await Agent.findById(agentId)//to whom the tiket was assigned

    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' })
    }

    // Check if the ticket is assigned to  agent (or user)

    if (ticket.assignedTo !== agentId) {
      return res.status(403).json({ error: 'You are not authorized to mark this ticket as resolved.' })
    }

    // Update the ticket status to "Resolved"
    ticket.status = TicketStatus.Resolved
    
    // Save the updated ticket
    const updatedTicket = await ticket.save()

   return  res.json(updatedTicket);//ticket is resolved .
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}



//tiket filtering
//get unassigned tickes

exports.getUnAssignedTickets= async (req:Response, res:Response) => {
    try {
      const unassignedTickets = await TicketModel.find({ assignedTo: null })
      return res.status(200).json(unassignedTickets)
    } catch (error) {
     return res.status(500).json({ error: 'Internal Server Error' })
    }
  }
  

  //get tickets from specific channel name
  
  exports.getTicketsFromSpecificChannel=async (req:Request, res:Response) => {
    try {
      const channel = req.body
      const channelTickets = await TicketModel.find({ channel:channel })
      return res.json(channelTickets)
    } catch (error) {
    return   res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  //tickets which has ben resolved
  exports.getResolvedTickets=async (req:Request, res:Response) => {
    try {
      const resolvedTickets = await TicketModel.find({ status: TicketStatus.Resolved })
      return res.json(resolvedTickets);
    } catch (error) {
    return  res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  //get tickets based on date

  exports.getTicketsOnSpeficiedDate=async (req:Request, res:Response) => {
    try {
      const dateStr = req.body; 
      const targetDate = new Date(dateStr)
  
      if (isNaN(targetDate.getTime())) {
        // Check if the provided date is invalid
        return res.status(400).json({ error: 'Invalid date format' })
      }
      
    // calculate the start and end of the target date
    const startDate = new Date(targetDate)
    startDate.setHours(0, 0, 0, 0); // Set to midnight
    const endDate = new Date(targetDate)
    endDate.setHours(23, 59, 59, 999) // end of the day

    // Find tickets created on the specific date
    const ticketsOnDate = await TicketModel.find({
      createdAt: { $gte: startDate, $lte: endDate },
    })
     return res.json(ticketsOnDate);
} catch (error) {
   return res.status(500).json({ error: 'Internal Server Error' })
}
}


// checks if agent is assigned ticket and givens ticket data matching to title
exports.getTicketForAuthorizedAgent= async (req: Request, res: Response) => {
    try {
        const{agentId,title}=req.body
        const agent= await Agent.findById(agentId)
        if(!agent){
            return res.json({error:"agent not found"})
        }
        const agentticket = await TicketModel.findOne({assignedTo: agent._id})
        if (!agentticket) {
            return res.json({ msg: 'You are not authorized to access this ticket.' })
          }
    
      // comes here only if the agent is authorized to access the ticket

      const ticket = await TicketModel.findOne({ subject: title,assignedTo: agent._id })
      if (!ticket) {
        return res.json({ error: 'ticket not found' })
      }
  
      // Return the ticket data
     return  res.json(ticket);
    } catch (error) {
     return res.status(500).json({ error: 'Internal Server Error' })
    }
  }

exports.getAllTickets= async (req:Request, res:Response) => {
  try {
    const tickets = await TicketModel.find({})
    return res.json(tickets)
  } catch (error) {
   return res.status(500).json({ error: 'Internal Server Error' })
  }
}


exports.getATicket= async (req:Request, res:Response) => {
  try {
    const{ticketId}=req.body
    const ticket = await TicketModel.findById(ticketId)
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' })
    }
    res.json(ticket)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

// Update a ticket by ID
exports.updateATicket= async (req:Request, res:Response) => {
  try {
    let update= req.body
    const updatedTicket = await TicketModel.findByIdAndUpdate(
      req.params.id,
      update,
      { new: true }
    )

    if (!updatedTicket) {
      return res.status(404).json({ error: 'Ticket not found' })
    }

    res.json(updatedTicket)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}


exports.deleteATicket= async (req:Request, res:Response) => {
  try {
    const {ticketId}=req.body
    const deletedTicket = await TicketModel.findByIdAndDelete(ticketId)

    if (!deletedTicket) {
      return res.status(404).json({ error: 'Ticket not found' })
    }

    res.json(deletedTicket);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}




exports.sendNotificationToAgent= async(req:Request,res:Response)=>{
  try {
    const {notType,message,channelName}=req.body
    let agentPicked  //let find a free or busy randomly agent
     agentPicked = await Agent.findOne({ticketAssigned:false})
    if(!agentPicked){
     const agents = await Agent.find(); // Retrieve all users
     agentPicked = agents[Math.floor(Math.random() * agents.length)];
     
   }
   //if msg type is message,any inquery or channel msg
   if(notType == "message"){ 
    const notSendDetail={
      notType,
      message,
      atTime:new Date()
    }
    agentPicked.assignedNotifications.push(notSendDetail)
    await agentPicked.save()

    // Emit the notification to a specific agent based on agentId
    io.to(agentPicked._id).emit('sendNotification', message);
 
    return  res.json({msg:"your message has been sent to the agent."})
   }
   else if(notType == "inquiry"){
    const notSendDetail={
      notType,
      message,
      atTime:new Date()
    }
    agentPicked.assignedNotifications.push(notSendDetail)
    await agentPicked.save()
    // Emit the notification to a specific agent based on agentId
    io.to(agentPicked._id).emit('sendNotification', message);
    return  res.json({msg:"your inquiry message has been sent to the agent."})
   }
   else{
    //if msg from channel,store channel name and send msg to the agent
    const notSendDetail={
      notType:"channel",
      message,
      channelName,
      atTime:new Date()
    }
    agentPicked.assignedNotifications.push(notSendDetail)
    await agentPicked.save()
    // Emit the notification to a specific agent based on agentId
    io.to(agentPicked._id).emit('sendNotification', message);
    return  res.json({msg:"your message has been sent to the agent."})
   }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}



//analytical reports part

//msgs from channel whatsapp
exports.msgsFromWhatsappToday = async(req:Request, res:Response)=>{
  try {
    let msgCountToday=0
    const today = new Date()
    today.setHours(0, 0, 0, 0)
     
   const agents = await Agent.find({})
   
   agents.map((agent: any) => {
    agent.assignedNotifications.map((msg: any) => {
      if (msg.notType === "channel" && msg.atTime >= today && msg.atTime < new Date() && msg.channelName=="whatsapp") {
        msgCountToday += 1
      }
    })
  })

  // Send the message count as a response
  return res.json({msg:`msgs from whatsapp todat are ${msgCountToday} ` });

  } catch (error) {
  return  res.status(500).json({ error: 'Internal Server Error' })
  }
}

//msgs from channel instagram
exports.msgsFromInstagramToday = async(req:Request, res:Response)=>{
  try {
    let msgCountToday=0
    const today = new Date()
    today.setHours(0, 0, 0, 0)
     
   const agents = await Agent.find({})
   
   agents.map((agent: any) => {
    agent.assignedNotifications.map((msg: any) => {
      if (msg.notType === "channel" && msg.atTime >= today && msg.atTime < new Date() && msg.channelName=="instagram") {
        msgCountToday += 1
      }
    })
  })

  // Send the message count as a response
  return res.json({msg:`msgs from instagram todat are ${msgCountToday} ` });

  } catch (error) {
  return  res.status(500).json({ error: 'Internal Server Error' })
  }
}

//msgs from channel gmail
exports.msgsFromGmailToday = async(req:Request, res:Response)=>{
  try {
    let msgCountToday=0
    const today = new Date()
    today.setHours(0, 0, 0, 0)
     
   const agents = await Agent.find({})
   
   agents.map((agent: any) => {
    agent.assignedNotifications.map((msg: any) => {
      if (msg.notType === "channel" && msg.atTime >= today && msg.atTime < new Date() && msg.channelName=="gmail") {
        msgCountToday += 1
      }
    })
  })

  // Send the message count as a response
  return res.json({msg:`msgs from gmail todat are ${msgCountToday} ` });

  } catch (error) {
  return  res.status(500).json({ error: 'Internal Server Error' })
  }
}


//msgs from channel facebook
exports.msgsFromFacebookToday = async(req:Request, res:Response)=>{
  try {
    let msgCountToday=0
    const today = new Date()
    today.setHours(0, 0, 0, 0)
     
   const agents = await Agent.find({})
   
   agents.map((agent: any) => {
    agent.assignedNotifications.map((msg: any) => {
      if (msg.notType === "channel" && msg.atTime >= today && msg.atTime < new Date() && msg.channelName=="facebook") {
        msgCountToday += 1
      }
    })
  })

  // Send the message count as a response
  return res.json({msg:`msgs from facebook todat are ${msgCountToday} ` });

  } catch (error) {
  return  res.status(500).json({ error: 'Internal Server Error' })
  }
}

//msgs from channel outlook
exports.msgsFromOutlookToday = async(req:Request, res:Response)=>{
  try {
    let msgCountToday=0
    const today = new Date()
    today.setHours(0, 0, 0, 0)
     
   const agents = await Agent.find({})
   
   agents.map((agent: any) => {
    agent.assignedNotifications.map((msg: any) => {
      if (msg.notType === "channel" && msg.atTime >= today && msg.atTime < new Date() && msg.channelName=="outlook") {
        msgCountToday += 1
      }
    })
  })

  // Send the message count as a response
  return res.json({msg:`msgs from outlook todat are ${msgCountToday} ` });

  } catch (error) {
  return  res.status(500).json({ error: 'Internal Server Error' })
  }
}


exports.TodayDateInquiriesCount = async(req:Request, res:Response)=>{
  try {

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    let msgCountToday=0
   
     
   const agents = await Agent.find({})
   
   agents.map((agent: any) => {
    agent.assignedNotifications.map((msg: any) => {
      if (msg.notType === "inquiry" && msg.atTime >= today && msg.atTime < new Date()) {
        msgCountToday += 1
      }
    })
  })

  // Send the message count as a response
  return res.json({msg:`inquiries enrollled today  are ${msgCountToday} ` });

  } catch (error) {
  return  res.status(500).json({ error: 'Internal Server Error' })
  }
}

exports.DateRangeInquiriesCount = async(req:Request, res:Response)=>{
  try {

    const { startDate, endDate } = req.body 
    if (!startDate || !endDate) {
      return res.status(400).json({ error: 'Start date and end date are required.' });
    }
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({ error: 'Invalid date format. Use ISO date format (YYYY-MM-DD).' });
    }

    let msgCountToday=0
   
     
   const agents = await Agent.find({})
   
   agents.map((agent: any) => {
    agent.assignedNotifications.map((msg: any) => {
      if (msg.notType === "inquiry" && msg.atTime >= start && msg.atTime < end) {
        msgCountToday += 1
      }
    })
  })

  // Send the message count as a response
  return res.json({msg:`inquiries enrolled between this date range are ${msgCountToday} ` });

  } catch (error) {
  return  res.status(500).json({ error: 'Internal Server Error' })
  }
}


//tickets count which are pending: in progress

exports.pendingTicketCount = async(req:Request,res:Response)=>{
try {
  const tickets = await TicketModel.find({})

  const pendingCount = (tickets.filter((ticket:any)=> ticket.status === TicketStatus.InProgress)).length
  
  return res.json({msg:`still pending tickets count is ${pendingCount}`})
} catch (error) {
  return  res.status(500).json({ error: 'Internal Server Error' })  
}
}


//tickets count which has been resolved

exports.ResolvedTicketCount = async(req:Request,res:Response)=>{
  try {
    const tickets = await TicketModel.find({})
  
    const 
    resolvedCount = (tickets.filter((ticket:any)=> ticket.status === TicketStatus.Resolved)).length
    
    return res.json({msg:`resolved ticket count is ${resolvedCount
    }`})
  } catch (error) {
    return  res.status(500).json({ error: 'Internal Server Error' })  
  }
  }
  
const PDFDocument =require('pdfkit')



exports.getPdfAnalyticalReport=async(req: Request, res: Response) => {
try{
  const { reportData } = req.body


const doc = new PDFDocument()

// Set response headers for the PDF
res.setHeader('Content-Type', 'application/pdf')
res.setHeader('Content-Disposition', 'inline; filename=report.pdf')

// Pipe the PDF content to the response
doc.pipe(res)

  // Customize the PDF content based on the reportData
  if (reportData) {
    doc.fontSize(12).text(`Report Data: ${reportData}`, { align: 'left' })
  
  }

// Final end the PDF
doc.end()
}
catch(error){
return res.json(error)
}

}










