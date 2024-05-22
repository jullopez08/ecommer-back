import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
//middleware local
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    console.log(
      `${date} ${time} ejecutando la peticion ${req.method} a la ruta ${req.url}`,
    );
    next();
  }
}
// middleware global
export function LoggerGlobal(req: Request, res: Response, next: NextFunction) {
  const actualDate = new Date();
  const date = actualDate.toLocaleDateString();
  const time = actualDate.toLocaleTimeString();

  //get     // /users    //fecha   //hora
  console.log(`${req.method} ${req.url} - ${date} ${time} global middleware`);

  next();
}
