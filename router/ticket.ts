import express from "express";
const router = express();

const {createTicket,sendAssignedTicketsToAgentInbox,getUnAssignedTickets,
    getTicketsFromSpecificChannel,getResolvedTickets,getTicketsOnSpeficiedDate,getAllTickets,
    getATicket,updateATicket,deleteATicket,setTicketToResolved,getTicketForAuthorizedAgent
,sendNotificationToAgent,msgsFromWhatsappToday,msgsFromInstagramToday,msgsFromGmailToday,
msgsFromFacebookToday,msgsFromOutlookToday,TodayDateInquiriesCount,DateRangeInquiriesCount,pendingTicketCount,
ResolvedTicketCount,getPdfAnalyticalReport}= require('../controllers/ticketController')

router.post('/createTicket',createTicket)
router.post('/sendAssignedTicketsToAgentInbox',sendAssignedTicketsToAgentInbox)
router.post('/getUnAssignedTickets',getUnAssignedTickets)
router.post('/getTicketsFromSpecificChannel',getTicketsFromSpecificChannel)
router.post('/getResolvedTickets',getResolvedTickets)
router.post('/getTicketsOnSpeficiedDate',getTicketsOnSpeficiedDate)
router.post('/setTicketToResolved',setTicketToResolved)
router.post('/getTicketForAuthorizedAgent',getTicketForAuthorizedAgent)
router.get('/getAllTickets',getAllTickets)
router.post('/getATicket',getATicket)
router.put('/updateATicket/:id',updateATicket)
router.post('/deleteATicket',deleteATicket)
router.post('/sendNotificationToAgent',sendNotificationToAgent)
router.get("/msgsFromWhatsappToday",msgsFromWhatsappToday)
router.get("/msgsFromInstagramToday",msgsFromInstagramToday)
router.get("/msgsFromGmailToday",msgsFromGmailToday)
router.get("/msgsFromFacebookToday",msgsFromFacebookToday)
router.get("/msgsFromOutlookToday",msgsFromOutlookToday)
router.get("/TodayDateInquiriesCount",TodayDateInquiriesCount)
router.post("/DateRangeInquiriesCount",DateRangeInquiriesCount)
router.get("/pendingTicketCount",pendingTicketCount)
router.get("/ResolvedTicketCount",ResolvedTicketCount)
router.post("/getPdfAnalyticalReport",getPdfAnalyticalReport)
module.exports = router;