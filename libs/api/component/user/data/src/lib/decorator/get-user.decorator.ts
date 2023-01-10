import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from '@instagrammer/api/core/entity';

export const getUser = createParamDecorator((data, context: ExecutionContext): UserEntity => {
  const reg = context.switchToHttp().getRequest();
  return reg.user;
});
