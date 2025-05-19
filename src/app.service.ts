import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { LoggerService } from './core/logger/logger.service';

@Injectable()
export class AppService {
  private context = 'AppService';
  constructor(
    private configService: ConfigService,
    private logger: LoggerService,
  ) {}

  getHello(): string {
    this.logger.log('calling log from inside getHello method', this.context);
    const envTest = this.configService.get<string>('environment');
    console.log(envTest);
    return 'Hello World!';
  }
}
