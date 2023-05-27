import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  async use(req: any, res: any, next: (error?: any) => void) {
    console.log({ req });
    next();
  }
}
