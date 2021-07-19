import { createParamDecorator } from '@nestjs/common';
import { User } from './user.entity';

export const GetUser = createParamDecorator(
  (
    _data,
    // req is the HTTP request object
    req,
  ): User => {
    // the return value is the param AFTER DECORATED
    return req.args[0].user;
  },
);
