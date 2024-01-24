import winston from "winston";

import { createColors } from "picocolors";

const { NODE_ENV, LOGGING } = process.env;

const isProduction = NODE_ENV === "production";
const verboseLogging = LOGGING === "json";

export const colorizer = createColors(!isProduction && !verboseLogging);

const {
  transports,
  createLogger,
  format: { printf, timestamp, combine, json },
} = winston;

const loggingTimestamp = timestamp({ format: "DD/MM/YYYY HH:mm:ss" });

const parseLogLevelColor = (level: string) => {
  switch (level) {
    case "info":
      return colorizer.cyan(level.toUpperCase());
    case "error":
      return colorizer.red(level.toUpperCase());
    case "warn":
      return colorizer.yellow(level.toUpperCase());
    case "http":
      return colorizer.blue(level.toUpperCase());
    case "debug":
      return colorizer.gray(level.toUpperCase());
    default:
      return level.toUpperCase();
  }
};

const configureDevelopmentFormat = printf(({ level, message, timestamp }) => {
  const colouredLevel = parseLogLevelColor(level);

  if (typeof message === "string" && message.startsWith("\n")) {
    message = message.slice(0, message.length - 2);
  }

  if (typeof message === "object") {
    message = `Object:\n${JSON.stringify(message, null, 2)}`;
  }

  const formattedTimestamp = colorizer.gray(colorizer.bold(timestamp));

  return `[${colouredLevel}] ${formattedTimestamp} ${colorizer.white(message)}`;
});

const configureTransports = () => {
  if (!isProduction) {
    const loggerConfig = {
      ...(LOGGING === "json" ? { format: json({ space: 2 }) } : {}),
      ...(!LOGGING
        ? { format: combine(loggingTimestamp, configureDevelopmentFormat) }
        : {}),
    };

    const developmentLogger = new transports.Console({ ...loggerConfig });

    return [developmentLogger];
  }

  return [];
};

export const LoggingService = createLogger({
  level: isProduction ? "http" : "debug",
  format: combine(
    loggingTimestamp,
    json({ ...(LOGGING === "json" ? { space: 2 } : {}) }),
  ),
  transports: configureTransports(),
  exitOnError: false,
});
