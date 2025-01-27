import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { UnauthorizedExceptionError } from 'src/shared/application/errors/unauthorizedExceptionError';

@Catch(UnauthorizedExceptionError)
export class UnauthorizedExceptionErrorFilter implements ExceptionFilter {
  catch(exception: UnauthorizedExceptionError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();

    response.status(401).send({
      statusCode: 401,
      error: 'Invalid credentials',
      message: exception.message,
    });
  }
}
