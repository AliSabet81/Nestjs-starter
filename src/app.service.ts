import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getHello(): string {
    const envTest = this.configService.get<string>('environment');
    console.log(envTest);
    return 'Hello World!';
  }
}
