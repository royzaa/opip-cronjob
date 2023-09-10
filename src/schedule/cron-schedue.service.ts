import { Injectable, Res } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { ResponseDTO } from './response.dto';
import * as SibApiV3Sdk from '@sendinblue/client';
import * as process from 'process';
import { MailService } from '../mail/mail.service';


@Injectable()
export class CronSchedueService {
  constructor(private readonly httpService: HttpService, private mailService: MailService) {
  }

  @Cron('* 0-2,5-23 * * *')
  async handleCron() {
    const data = await this.getAllRefurbishedVivoProduct();
    const patternRegex = new RegExp(/\b(?:X80|X90|X70)\b/);

    const product = data.data.result.find(e => e.shortName.match(patternRegex));

    if (product != null) await this.mailService.sendMailSuccess({
      model: product?.shortName?.toString(),
      price: product?.proPrice?.toString(),
      stock: product?.stock?.toString(),
      linkType: product?.spuId?.toString(),
    });
      
    console.log('success')
  }

  private async getAllRefurbishedVivoProduct() {
    try {
      const request = this.httpService.get('https://shop.vivo.com/id/api/product/queryCategoryById', {
        params: {
          categoryId: 53,
          pageNum: 1,
        },
        validateStatus: () => true,
      });

      const response = await lastValueFrom(request);

      if (response.status != 200) {
        console.log(response.status)
        await this.mailService.sendMailFailed();

      }

      return <ResponseDTO>response.data;
    } catch (err) {
      console.log('error fetch data',err);
      await this.mailService.sendMailFailed();
    }
  }


}