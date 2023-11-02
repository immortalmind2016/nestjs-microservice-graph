import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';

export const RequestUser = createParamDecorator((data, ctx: ExecutionContext) => {


    const headers = ctx.getArgs()[2].req.headers;
    if(!headers.user) return null;
    return JSON.parse(headers.user);


});
