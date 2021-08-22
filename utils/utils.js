const fs = require("fs");
const util = require("util");

module.exports = {
  // Generate string of random numbers and letters
  generateRandomId: () => {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  },

  // Read data from file, append content
  readAndAppend: (content, file) => {
    fs.readFile(file, "utf8", (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const parsedData = JSON.parse(data);
        parsedData.push(content);
        writeToFile(file, parsedData);
      }
    });
  },

  // Promise version of fs.readFile
  readFromFile: util.promisify(fs.readFile),
};

// Write content to JSON file
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );