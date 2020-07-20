import * as winston from "winston";

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  level: "debug",
  transports: [
    new winston.transports.File({
      filename: 'server_error.log',
      maxsize: 4096,
    }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

export default logger;