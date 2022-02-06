import winston from "winston";

const { createLogger, format, transports } = winston;
const { combine, printf, timestamp, colorize } = format;

const logConfiguration = {
      level: 'debug',
      format: combine(
        timestamp({
          format: 'MMM-DD-YYYY HH:mm:ss',
        }),
        colorize(),
        printf((info) => `${info.level} |  ${[info.timestamp]} | ${info.message}`)
      ),
      transports: [new transports.Console()],
    };

  
export const logger = createLogger(logConfiguration)