import { Request, Response, NextFunction } from 'express';
import { Injectable, NestMiddleware, Logger } from '@nestjs/common';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  private logger: Logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl } = request;
    const userAgent = request.get('user-agent') || '';

    response.on('finish', () => {
      this.logger.log(
        `${method} ${originalUrl} - ${userAgent.split(')')[0]}) - ${ip}`,
      );
    });

    next();
  }
}
