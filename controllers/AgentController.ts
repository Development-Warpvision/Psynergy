
const bcrypt= require(
    'bcrypt')

import { AuthenticationHandlerOptions } from "@microsoft/microsoft-graph-client";
import { Request, Response, NextFunction } from "express";
const User = require("../models/user_model")
import {AgentModel} from '../models/agentModel'
//only admin can create agent
exports.createAgent = async(req:Request,res:Response)=>{
    try {
        const{adminId,userName,ticketAssigned,passwordHash}= req.body
        const admin= await User.findById(adminId)
        const existingUser = await AgentModel.findOne({ name:userName });
        if(existingUser){
            return res.status(401).json('agent is already exist')
        }
        if(admin.role[0] == "admin"){

            const hashed = await bcrypt.hash(passwordHash,10)
            const agent = await AgentModel.create({name:userName,ticketAssigned,passwordHash:hashed})
            await agent.save()
            return res.json('Agent Created Succesfully')
        }
        return res.json({msg:"only admin can create agent "})
    } catch (error:any) {
        return res.json({error:error.message})
    } 
}

// controllers/agentController.js

exports.agentLogin = async (req:Request,res:Response) => {
  try {
    const { userName, password } = req.body;

    // Find the agent by name
    const agent = await AgentModel.findOne({ userName });

    // Check if the agent exists
    if (!agent) {
      return res.status(404).json({ msg: 'Agent not found' });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, agent.passwordHash);

    if (passwordMatch) {
      // Passwords match, agent is authenticated
      return res.status(200).json({ user: agent });
    } else {
      // Passwords do not match, agent login failed
      return res.status(401).json({ msg: 'Invalid credentials' });
    }
  } catch (error:any) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
};

//only admin can dlete agent
exports.deleteAgent= async(req:Request,res:Response)=>{
    try {
        const{adminId,agentId}= req.body
        const admin= await User.findById(adminId)
        if(admin.role == "admin"){
            const deletedAgent= await AgentModel.findByIdAndDelete(agentId)
            return res.json({deletedAgent})
            
        }
        return res.json({msg:"only admin can delete agent "})
    } catch (error) {
        return res.json(error)   
    }
}


//admin can reset agent Password
exports.resetAgentPassword= async(req:Request,res:Response)=>{
    try {
        const {adminId,agentId,newPassword}=req.body
        const admin= await User.findById(adminId)
        if(admin.role == "admin"){

            // const agent = await AgentModel.findById(agentId)
            // const newPass = bcrypt.hash(newPassword,10)
            // // AgentModel.passwordHash= newPass
            // await agent.save()
            return res.status(200).json({msg:"admin changed agent password"})
        }


       return res.json({msg:"only admin can change or reset agent password"})
        
    } catch (error) {
        return res.json(error)   
    }
}
exports.onLineAgent = async (req:Request,res:Response) => {
    try {
      const { agentId, loginStatus } = req.body;
      const agent = await AgentModel.findById(agentId);
  
      if (!agent) {
        return res.status(404).json({ msg: 'Agent not found' });
      }
  
      // Update the loginStatus of the agent
      agent.loginStatus = loginStatus;
      await agent.save();
  
      // Retrieve IDs and login statuses of all agents
      const allAgents = await AgentModel.find({}, 'id loginStatus');
  
      return res.status(200).json({ agents: allAgents });
    } catch (error) {
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };