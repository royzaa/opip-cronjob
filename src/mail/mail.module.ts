import { Global, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MailService } from './mail.service';
import * as dotenv from 'dotenv';
import { ConfigModule, ConfigService } from '@nestjs/config';

dotenv.config();

@Global()
@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        baseURL: 'https://api.brevo.com/v3',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'api-key': config.get('BREVO_API_KEY'),
        },

      }),
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {
}

