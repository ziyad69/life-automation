const { Client } = require("@notionhq/client");
const notion = new Client({ auth: process.env.NOTION_KEY });

const readScheduleDB = async (req, res) => {
  try {
    const response = await notion.dataSources.query({
      data_source_id: process.env.NOTION_SCHEDULE_ID,
    });

    const row = response.results.map((result) => {
      const name = result.properties.Name.title[0].text.content;
      const status = result.properties.Status.status.name;
      const time = result.properties.Time.select.name;
      const note = result.properties.Note.rich_text[0].text.content;
      const date = result.properties.Date.date.start;
      return {
        name,
        status,
        time,
        note,
        date,
      };
    });
  } catch (error) {
    res.send("failed");
  }
};
const createSchedule = async (data) => {
  try {
    const { name, status, time, note, date } = data;

    await notion.pages.create({
      parent: {
        type: "data_source_id",
        data_source_id: process.env.NOTION_SCHEDULE_ID,
      },
      properties: {
        Name: {
          title: [
            {
              text: { content: name || "no task name" },
            },
          ],
        },
        Status: {
          status: {
            name: status || "Not started",
          },
        },
        Time: {
          select: {
            name: time || "4:00",
          },
        },
        Note: {
          rich_text: [
            {
              text: { content: note || "no note" },
            },
          ],
        },

        Date: {
          date: {
            start: "2025-10-17",
          },
        },
      },
    });
  } catch (error) {}
};

const getSchedule = async (id) => {
  const response = await notion.pages.retrieve({ page_id: id });
  const row = {
    name: response.properties.Name.title[0].text.content,
    status: response.properties.Status.status.name,
    time: response.properties.Time.select.name,
    note: response.properties.Note.rich_text[0].text.content,
    date: response.properties.Date.date.start,
  };
  return row;
};

const updateSchedule = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, status, time, note, date } = await getSchedule(id);

    const { nameBody, statusBody, timeBody, noteBody, dateBody } = req.body;
    const response = notion.pages.update({
      page_id: id,
      properties: {
        Name: {
          title: [
            {
              text: { content: nameBody || name },
            },
          ],
        },
        Status: {
          status: {
            name: statusBody || status,
          },
        },
        Time: {
          select: {
            name: timeBody || time,
          },
        },
        Note: {
          rich_text: [
            {
              text: { content: noteBody || note },
            },
          ],
        },

        Date: {
          date: {
            start: dateBody || date,
          },
        },
      },
    });
    res.status(200).json({ response });
  } catch (error) {
    res.status(500).send("failed to update schedule");
  }
};
module.exports = { readScheduleDB, createSchedule, updateSchedule };
