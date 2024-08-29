import Winston from 'winston';
import WinstonDaily from 'winston-daily-rotate-file';

const isProd = process.env.NODE_ENV === 'production';

const {
  combine,
  timestamp,
  label,
  printf,
  splat,
  errors,
  prettyPrint,
  metadata,
} = Winston.format;
const prettyJson = Winston.format.printf((info) => {
  if (info.message.constructor === Object) {
    info.message = JSON.stringify(info.message, null, 4);
  }

  return `${info.timestamp} [${info.level}] => ${info.message}`;
});
const logDir = `${process.cwd()}/logs`;

const combineFormat = combine(
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  label({ label: 'Front Store' }),
  errors({ stack: true }),
  prettyPrint(),
  splat(),
  metadata({ fillExcept: ['message', 'level', 'timestamp', 'label'] }),
  prettyJson,
);

const logger = Winston.createLogger({
  // 로그 출력 형식 정의
  level: isProd ? 'http' : 'debug',
  format: combineFormat,
  transports: [
    new WinstonDaily({
      level: 'debug',
      datePattern: 'YYYY-MM-DD',
      dirname: logDir,
      filename: `debug.%DATE%.log`,
      maxFiles: 7,
      zippedArchive: true,
    }),
    new WinstonDaily({
      level: 'http',
      datePattern: 'YYYY-MM-DD',
      dirname: logDir,
      filename: `http.%DATE%.log`,
      maxFiles: 7,
      zippedArchive: true,
    }),
    new WinstonDaily({
      level: 'info',
      datePattern: 'YYYY-MM-DD',
      dirname: logDir,
      filename: `info.%DATE%.log`,
      maxFiles: 7,
      zippedArchive: true,
    }),
    new WinstonDaily({
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      dirname: logDir,
      filename: `error.%DATE%.log`,
      maxFiles: 7,
      zippedArchive: true,
    }),
  ],

  //* uncaughtException 발생시 파일 설정
  exceptionHandlers: [
    new WinstonDaily({
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      dirname: logDir,
      filename: `exception.%DATE%.log`,
      maxFiles: 7,
      zippedArchive: true,
    }),
  ],
});

//* Production 환경이 아닌, 개발 환경일 경우 파일 들어가서 일일히 로그 확인하기 번거로우니까 화면에서 바로 찍게 설정 (로그 파일은 여전히 생성됨)
// if (process.env.NODE_ENV !== 'production')
logger.add(
  new Winston.transports.Console({
    format: Winston.format.combine(
      Winston.format.colorize(), // 색깔 넣어서 출력
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      errors({ stack: true }),
      prettyPrint(),
      printf((info) => {
        return `${info.timestamp} [${info.level}] => ${info.message}`;
      }),
    ),
  }),
);

// const originConsoleLog = console.log;
// if (console?.log) {
//   console.log = (...args) => {
//     logger.info(args);
//   };
// }

// const originConsoleError = console.error;
// if (console?.error) {
//   console.error = (...args) => {
//     logger.error(args);
//   };
// }

export default logger;
