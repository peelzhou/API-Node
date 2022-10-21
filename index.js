// This file receive two arguments from the command line:
// Arguments: categoryName is a string, limitNum is a number,
// return an array of result objects.
const request = require("request");

// Get the arguments from the command line.
const categoryName = process.argv[2];
const limitNum = Number(process.argv[3]);

const showResult = (category, limit) => {
  // First, get the data from the API endpoint
  request(
    "https://api.publicapis.org/entries",
    function (error, response, body) {
      if (!error && response.statusCode === 200) {
        // Parse the JSON body to object and get the entries.
        const APIData = JSON.parse(body);
        const data = APIData.entries;

        // Set the result and the count to stop the loop.
        const result = [];
        let count = 0;

        // Iterate every objects in data, if the object meet the requirement,
        // save it into the result. Return the result while count >= limit.
        data.forEach((v, i) => {
          if (count >= limit) {
            return result;
          }
          if (v.Category === category) {
            result.push(v);
            count++;
          }
        });

        // If the count is 0, return no results, otherwise, return the result.
        console.log(count === 0 ? "No results" : result);
        return count === 0 ? "No results" : result;
      } else {
        console.error("error:", error);
        console.log("statusCode:", response && response.statusCode);
        console.log("body:", body);
      }
    }
  );
};

showResult(categoryName, limitNum);
