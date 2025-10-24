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

app.use(cors());
app.use(cookieParser());

//this take the express the ability to read json files
app.use(express.json());
//middleware
app.use(express.static(path.join(__dirname, "view")));
app.use("/page", pageRoute);
app.use("/user", userDBRroute);
app.use("/task", notionTaskDBRoute);
app.use("/ai", aiRoute);
app.use("/Schedule", notionScheduleDBRoute);
app.use("/timetable", notionTimetableDBRoute);

mongoose
  .connect(process.env.MONGO_URI)
  .then()
  .catch( );

app.listen(process.env.PORT);
