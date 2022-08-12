import path from "path";
import fs from "fs";

export const logger = {
  console: false
}

export default class Logger {
  static save(...args) {
    try {
      const data = args.join(" - ");

      if (logger.console)
        console.log(data);

      const directoryPath = path.join( process.cwd(), process.env.LOG_PATH );
      const filePath = path.join( process.cwd(), process.env.LOG_PATH, "logs.txt" );
      const date = new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" }).format( new Date() );
      const value = JSON.stringify(data);

      if ( !fs.existsSync(directoryPath) )
        fs.mkdirSync(directoryPath);

      if ( !fs.existsSync(filePath) )
        fs.openSync(filePath, "w");

      fs.appendFileSync(filePath, `${date} - ${value}\n`);
    } catch (e) {
      console.log(e);
    }
  }
}
