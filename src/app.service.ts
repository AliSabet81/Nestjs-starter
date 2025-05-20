import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { LoggerService } from './core/logger/logger.service';
import { DatabaseService } from './database/database.service';

@Injectable()
export class AppService {
  private context = 'AppService';
  constructor(
    private configService: ConfigService,
    private logger: LoggerService,
    private databaseService: DatabaseService,
  ) {}

  getHello(): string {
    this.logger.log('calling log from inside getHello method', this.context);
    const envTest = this.configService.get<string>('environment');
    console.log(envTest);
    this.databaseService.user.findMany();
    return 'Hello World!';
  }
}
