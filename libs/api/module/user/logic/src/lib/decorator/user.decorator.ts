import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from '@instagrammer/api/module/user/data';

export const User = createParamDecorator((data, context: ExecutionContext): UserEntity => {
  const reg = context.switchToHttp().getRequest();
  return reg.user;
});
