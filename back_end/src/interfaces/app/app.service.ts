import { Injectable } from '@nestjs/common';
import open from 'open';

@Injectable()
export default class AppService {
  async openSwagger(): Promise<void> {
    const url = 'https://git.heroku.com/nguphaptiengnhat.git/api';

    await open(url);
  }
}
