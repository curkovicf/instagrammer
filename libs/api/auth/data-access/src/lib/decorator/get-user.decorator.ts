import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from '../entity/user.entity';

export const getUser = createParamDecorator((data, context: ExecutionContext): UserEntity => {
  const reg = context.switchToHttp().getRequest();
  return reg.user;
});
