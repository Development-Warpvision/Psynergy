import { IncomingMessage, Server, ServerResponse } from "http";

let io: any;
let serverReturn: any;
let users: any = [];
let getUser: any = [];
function socketConnection(
  server: Server<typeof IncomingMessage, typeof ServerResponse>
) {
  try {
    console.log("server");

    io = require("socket.io")(server, {
      // pingTimeout: 60000,
      cors: {
        origin:["https://stg.convoportal.com", "http://localhost:3000","http://localhost:3001"]
        ,
      },
    });
    const userSockets = new Map();
    const addUser = (userId: String, socketId: String) => {
      !users.some((user: any) => user.userId === userId) &&
        users.push({ userId, socketId });
      //console.log("add user");
    };
    io.on("connection", (socket: any) => {
      // ... other event handlers ...
      socket.on('registerAdmin', (userEmail:any) => { // 'registerAdmin' is a custom event
        userSockets.set(userEmail, socket.id);
    });
      // Placeholder for handling new emails
      socket.on("newEmail", (data: any) => {
        // Handle new email data here
        console.log("New email received:", data);
      });
    });
    io.on("connection", (socket: any) => {
      // ... other event handlers ...
    
      // Placeholder for handling new emails
      socket.on("sendAgentNotification", (data: any) => {
        // Handle new email data here
        console.log("New email received:", data);
      });
      socket.on("sendAgentReplyNotification", (data: any) => {
        // Handle new email data here
        console.log("New replay received:", data);
      });
    });
    io.on("connection", (socket: any) => {
      // ... other event handlers ..
    
      // Placeholder for handling new emails
      socket.on("newTask", (data: any) => {
        // Handle new email data here
        console.log("New Chat received:", data);
      });
    });
    // User typing event handling
io.on('connection', (socket: { on: (arg0: string, arg1: ({ userId, isTyping }: { userId: any; isTyping: any; }) => void) => void; broadcast: { emit: (arg0: string, arg1: { userId: any; isTyping: any; }) => void; }; }) => {
  socket.on('userTyping', ({ userId, isTyping }) => {
    // Broadcast the typing event to other users
    socket.broadcast.emit('userTyping', { userId, isTyping });
  });
});

    
    getUser = (userId: String) => {
      //console.log(users);

      return users.find((user: any) => user.userId === userId);
    };

    io.on("connection", (socket: any) => {
      serverReturn = socket;

      console.log("🚀 Someone connected!");


      // get userId and socketId from client
      socket.on("addUser", (userId: string) => {
        addUser(userId, socket.id);
        io.emit("getUsers", users);
      });

      // get and send message
      socket.on("sendMessage", ({ senderId, receiverId, content }: any) => {
        const user = getUser(receiverId);

        io.to(user?.socketId).emit("getMessage", {
          senderId,
          content,
        });
      });

      // socket.on("webhookListen", ({ receiverId, content }: any) => {
      //   const user = getUser(receiverId);

      //   io.emit("getWebhook", {
      //     // senderId,
      //     content,
      //   });
      // });

      // user disconnected
      socket.on("disconnect", () => {
        //console.log("⚠️ Someone disconnected");
        userSockets.forEach((value, key) => {
          if (value === socket.id) {
              userSockets.delete(key);
          }
      });
        users = users.filter((user: any) => user.socketId !== socket.id);
        io.emit("getUsers", users);
        // //console.log(users);
      });
    });
  } catch (error) {
    console.error(error);
  }
}

export default socketConnection;
export { io, serverReturn, users, getUser };
