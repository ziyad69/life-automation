// Notion SDK for JavaScript
const { Client } = require("@notionhq/client");
const notion = new Client({ auth: process.env.NOTION_KEY });
// read project data from notion data base
const readProjectDB = async () => {
  try {
    const response = await notion.dataSources.query({
      data_source_id: process.env.NOTION_Projects_ID,
    });

    const projects = response.results.map((result) => {
      const name =
        result.properties["Project name"].title[0].plain_text || "No Title";
      const status = result.properties.Status.status.name || "No Status";
      const startDate =
        result.properties["Start date"].date.start || "no start day";
      const endDate = result.properties["End date"].date.start || "no end date";
      return {
        name,
        status,
        startDate,
        endDate,
      };
    });

    return { projects };
  } catch (error) {}
};

module.exports = {
  readProjectDB,
};
