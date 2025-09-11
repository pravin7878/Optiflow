require("dotenv").config();
const cors = require("cors")
const express = require("express");
const {createServer} = require("http")
const {Server} = require("socket.io")
const registerSocketEvents = require("./src/config/socket")

const connectToDB = require("./src/config/db");
const userRouter = require("./src/routes/user.route");
const todoRouter = require("./src/routes/todo.routes");
const teamRouter = require("./src/routes/team")
const activityRouter = require("./src/routes/activity")

const app = express()
const httpServer = createServer(app)

const io = new Server(httpServer,{
  cors: {
    origin: "*", 
    methods: ["GET", "POST"],
  },
})
app.use(cors("*"));
app.set("socketio",io)

const port = process.env.PORT || 3000


app.get("/" , (req,res)=>{
    res.send("wellcome to server")
})
app.use(express.json())
app.use("/user" , userRouter)
app.use("/tasks" , todoRouter)
app.use("/team" , teamRouter)
app.use("/activity" , activityRouter)


// Register socket events
registerSocketEvents(io);

httpServer.listen(port , async()=>{
console.log(`server is runing on http://localhost:${port}`);
try {
    await connectToDB()
    console.log("DB Connected Success");
} catch (error) {
    console.log("DB connection failld",error);
}
})