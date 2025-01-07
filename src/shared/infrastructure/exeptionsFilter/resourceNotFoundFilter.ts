import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { ResourceNotFoundError } from 'src/shared/application/errors/resourceNotFoundError';

@Catch(ResourceNotFoundError)
export class ResourceNotFoundErrorFilter implements ExceptionFilter {
  catch(exception: ResourceNotFoundError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();

    response.status(404).send({
      statusCode: 404,
      error: 'Not Found',
      message: exception.message,
    });
  }
}
