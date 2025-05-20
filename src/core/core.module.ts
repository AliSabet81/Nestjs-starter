import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import config from '../config';
import { LoggerService } from './logger/logger.service';
import { LoggerMiddleware } from './middleware/logger/logger.middleware';
import { TransformResponseInterceptor } from './interceptors/transform-response/transform-response.interceptor';

@Global()
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, load: [config] })],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformResponseInterceptor,
    },
    LoggerService,
  ],
  exports: [LoggerService],
})
export class CoreModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
