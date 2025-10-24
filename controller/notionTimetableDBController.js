const { Client } = require("@notionhq/client");
const notion = new Client({ auth: process.env.NOTION_KEY });
//28e63667-94c2-805e-adca-000bc20c5136
const readTimeTable = async (req, res) => {
  try {
    const response = await notion.dataSources.query({
      data_source_id: process.env.NOTION_DB_TIME_TABLE,
    });

    const row = response.results.map((result) => {
      const day = result.properties.day.title[0].plain_text;
      const time1 = result.properties["9:00 - 9:45"].rich_text[0].plain_text;
      const time2 = result.properties["9:45-10:30"].rich_text[0].plain_text;
      const time3 = result.properties["10:45 -11:30"].rich_text[0].plain_text;
      const time4 = result.properties["11:30 - 12:15"].rich_text[0].plain_text;
      const time5 = result.properties["12:30-1:15"].rich_text[0].plain_text;
      const time6 = result.properties["1:15 - 2:00"].rich_text[0].plain_text;
      const time7 = result.properties["2:15 - 3:00"].rich_text[0].plain_text;
      const time8 = result.properties["3:00-3:45"].rich_text[0].plain_text;
      return {
        day,
        time1,
        time2,
        time3,
        time4,
        time5,
        time6,
        time7,
        time8,
      };
    });

    return { row };
  } catch (error) {}
};
module.exports = { readTimeTable };
