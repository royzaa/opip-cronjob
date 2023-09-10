import { Injectable, Res } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import process from 'process';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class MailService {
  constructor(private readonly httpService: HttpService) {
  }

  async sendMailSuccess(payload: {
    model: string,
    stock: string,
    linkType: string,
    price: string
  }) {

    const request = this.httpService.post('/smtp/email', {
        sender: {
          email: 'casplatohosin@gmail.com',
          name: 'Refurbish Official',
        },
        'to': [
          {
            'email': 'arroyanzaa@gmail.com',
          },
        ],
        'templateId': 2,
        params: {
          MODEL: payload.model || 'none',
          STOCK: payload.stock || 'none',
          'LINK': payload.linkType || 'none',
          'PRICE': payload.price || 'none',
        },
      },
      {
        validateStatus: () => true,
      },
    );

    console.log(request);

    const response = await lastValueFrom(request);
    console.log('mail error', response);
    return response.status;
  }

  async sendMailFailed() {

    const request = this.httpService.post('/smtp/email', {
        'to': [
          {
            'email': 'arroyanzaa@gmail.com',
            'name': 'Royar',
          },
        ],
        'templateId': 3,
      },
    );
    const response = await lastValueFrom(request);
    return response.status;
  }

}