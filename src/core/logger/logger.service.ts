/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import * as winston from 'winston';
import { ConfigService } from '@nestjs/config';
import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';

@Injectable()
export class LoggerService implements NestLoggerService {
  private logger: winston.Logger;

  constructor(private readonly configService: ConfigService) {
    const isDevelopment =
      this.configService.get<string>('environment') === 'development';

    const { combine, timestamp, json, printf, colorize } = winston.format;

    const format = isDevelopment
      ? combine(
          colorize(),
          timestamp(),
          printf(
            ({ level, message, context, timestamp }) =>
              `${timestamp} ${level} [${context}]: ${message}`,
          ),
        )
      : combine(timestamp(), json());

    this.logger = winston.createLogger({
      format,
      transports: [new winston.transports.Console()],
    });
  }

  log(message: string, context?: string) {
    this.logger.info(message, { context });
  }

  error(message: string, context?: string) {
    this.logger.error(message, { context });
  }

  warn(message: string, context?: string) {
    this.logger.warn(message, { context });
  }
}
