const { Client } = require("@notionhq/client");
const notion = new Client({ auth: process.env.NOTION_KEY });
const readTaskDB = async () => {
  try {
    const response = await notion.dataSources.query({
      data_source_id: process.env.NOTION_TasksTracker_ID,
    });

    const row = response.results.map((result) => {
      const name = result.properties["Task name"].title[0].plain_text;
      const dueDate = result.properties["Due date"].date.start;
      const status = result.properties.Status.status.name;
      const Priority = result.properties.Priority.select.name;
      const Description =
        result.properties.Description.rich_text[0].text.content;
      return {
        name,
        dueDate,
        status,
        Priority,
        Description,
      };
    });

    return { row };
  } catch (error) {}
};
const createTaskDB = async (req, res) => {
  try {
    const { name, dueDate, status, Priority, Description } = req.body;
    const response = await notion.pages.create({
      parent: {
        type: "data_source_id",
        data_source_id: process.env.NOTION_TasksTracker_ID,
      },
      properties: {
        "Task name": {
          title: [
            {
              text: { content: name || "task" },
            },
          ],
        },
        Status: {
          status: {
            name: status || "Not started",
          },
        },
        Priority: {
          select: {
            name: Priority || "Medium",
          },
        },
        "Due date": {
          date: {
            start: dueDate || new Date().toISOString(),
          },
        },
        Description: {
          rich_text: [
            {
              text: { content: Description || "no description" },
            },
          ],
        },
      },
    });
    res.status(200).json({ response });
  } catch (err) {
    res.status(500).send("failed to create task");
  }
};

module.exports = { readTaskDB, createTaskDB };
