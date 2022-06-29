import { createParamDecorator, ExecutionContext } from '@nestjs/common';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { UserEntity } from '@instagrammer/api/auth/data-access';

export const getUser = createParamDecorator((data, context: ExecutionContext): UserEntity => {
  const reg = context.switchToHttp().getRequest();
  return reg.user;
});
