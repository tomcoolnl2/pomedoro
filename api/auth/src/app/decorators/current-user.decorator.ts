import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDocument } from '../users/models/user.schema';

const getCurrentUserByContext = (ctx: ExecutionContext): UserDocument => {
	return ctx.switchToHttp().getRequest().user;
};

export const CurrentUser = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
	return getCurrentUserByContext(ctx);
});
