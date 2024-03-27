import express from "express";
const router = express();

const {createAgent,deleteAgent,resetAgentPassword,agentLogin,onLineAgent}= require('../controllers/AgentController')

router.post('/createAgent',createAgent)
router.delete('/deleteAgent',deleteAgent)
router.post('/resetAgentPassword',resetAgentPassword)
router.post('/resetAgentPassword',resetAgentPassword)
router.post('/getOnlineAgents',onLineAgent)
router.post('/agentLogin',agentLogin)

 


module.exports=router