import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserId = createParamDecorator((data, context: ExecutionContext): string => {
  const reg = context.switchToHttp().getRequest();
  return reg.user.userId;
});
