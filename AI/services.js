const axios = require("axios");
const fs = require("fs");
const { readProjectDB } = require("./../controller/notionDBcontroller");
const { readTaskDB } = require("./../controller/notionTaskDBController");
const {
  readScheduleDB,
  createSchedule,
} = require("./../controller/ScheduleDBController");
const {
  readTimeTable,
} = require("./../controller/notionTimetableDBController");

const aiPromptCreate = async (req, res) => {
  try {
    const projectData = await readProjectDB();
    const taskData = await readTaskDB();
    const scheduleData = await readScheduleDB();
    const timeTable = await readTimeTable();
    const systemPrompt = fs.readFileSync("prompt/systemPrompt.txt", "utf-8");
    const note = fs.readFileSync("prompt/note.txt", "utf-8");
    const date = getDateTime();
  
     
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "openai/gpt-oss-20b",
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: ` prompt:${
              req.body.prompt
            } data: projectData:${JSON.stringify(
              projectData
            )},task data:${JSON.stringify(
              taskData
            )},time table : ${JSON.stringify(timeTable)},note:${note},todaydate:${date}`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    
    const responseClean = cleanAndParseJSON(response.data.choices[0].message.content)
 
    for (const schedule of responseClean) {
      await createSchedule(schedule);
    }

    res.status(200).json({responseClean});
  } catch (error) {

  
    res.status(500).send(error);
  }
};
//function to get date
function getDateTime() {
  var date = new Date();

  var hour = date.getHours();
  hour = (hour < 10 ? "0" : "") + hour;

  var min = date.getMinutes();
  min = (min < 10 ? "0" : "") + min;

  var sec = date.getSeconds();
  sec = (sec < 10 ? "0" : "") + sec;

  var year = date.getFullYear();

  var month = date.getMonth() + 1;
  month = (month < 10 ? "0" : "") + month;

  var day = date.getDate();
  day = (day < 10 ? "0" : "") + day;

  return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;
}
function cleanAndParseJSON(aiResponse) {
  try {
   
 
    let cleaned = aiResponse.replace(/```json|```/g, "").trim();
     
     
   let i = 0 ;
   let j = cleaned.length -1;
   while(cleaned[i]!=='['||cleaned[j]!==']') {
 
    if(cleaned[i]!=='['){
      i++
    }
    if(cleaned[j]!==']'){
      j--
    }
   }
    
 
    return JSON.parse(cleaned);
  } catch (err) {
 
    return null;
  }
}
module.exports = { aiPromptCreate };
