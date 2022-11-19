const fs = require('fs');

class WriteError {
  constructor(error, req, type) {
    this.error = error;
    this.error.date = new Date().toISOString();
    this.error.url = req.originalUrl;
    this.error.type = type;
    this.writeToFile();
  }

  writeToFile() {
    fs.appendFile('./error/error.log', `\n \n${JSON.stringify(this.error)}`, (e) => {
      if (e) console.log(e);
    });
  }
}

class LogToFile {
  constructor(log) {
    this.log = log;
    this.writeToFile();
  }
  writeToFile() {
    fs.appendFile('./error/console.log', `\n \n${this.log}`, (e) => {
      if (e) console.log(e);
    });
  }
}
module.exports = { WriteError, LogToFile };
