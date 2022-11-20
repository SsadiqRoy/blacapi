const fs = require('fs');

class WriteError {
  constructor(error, req, type) {
    this.error = error;
    this.error.date = new Date().toISOString();
    this.error.url = req.originalUrl;
    this.error.host = req.get('host');
    this.error.type = type;
    this.writeToFile();
  }

  writeToFile() {
    fs.appendFile('./errors/error.log', `\n \n${JSON.stringify(this.error)}`, (e) => {
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
    fs.appendFile('./errors/console.log', `\n \n${JSON.stringify(this.log || {})}`, (e) => {
      if (e) console.log(e);
    });
  }
}
module.exports = { WriteError, LogToFile };
