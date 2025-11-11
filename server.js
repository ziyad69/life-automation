require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const aiRoute = require("./Routes/aiRoute");
const notionTaskDBRoute = require("./Routes/taskRoute");
const notionScheduleDBRoute = require("./Routes/ScheduleRoute");
const notionTimetableDBRoute = require("./Routes/timeTableRoute");
const userDBRroute = require("./Routes/userRoute");
const pageRoute = require("./Routes/pageRoute");
const app = express();

app.use(cors({
  origin: "*",
  credentials: true,
}));
app.use(cookieParser());

//this take the express the ability to read json files
app.use(express.json());
//middleware
app.use(express.static(path.join(__dirname, "view")));

// health and root routes
app.get('/healthz', (req, res) => {
  res.status(200).send('ok');
});
app.get('/', (req, res) => {
  res.status(200).send('ok');
});


app.use("/page", pageRoute);
app.use("/user", userDBRroute);
app.use("/task", notionTaskDBRoute);
app.use("/ai", aiRoute);
app.use("/Schedule", notionScheduleDBRoute);
app.use("/timetable", notionTimetableDBRoute);

process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at:', p, 'reason:', reason);
  // optional: process.exit(1);
});
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  // optional: process.exit(1);
});

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
  
});
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
  });


