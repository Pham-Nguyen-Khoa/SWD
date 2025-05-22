// import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';

// @Catch(HttpException)
// export class NoLogHttpExceptionFilter implements ExceptionFilter {
//   catch(exception: HttpException, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse();
//     const request = ctx.getRequest();

//     const status = exception.getStatus
//       ? exception.getStatus()
//       : HttpStatus.INTERNAL_SERVER_ERROR;

//     const exceptionResponse = exception.getResponse();
//     const error =
//       typeof exceptionResponse === 'string'
//         ? { message: exceptionResponse }
//         : exceptionResponse;

//     // **KHÔNG log lỗi ra console ở đây**

//     response.status(status).json({
//       success: false,
//       statusCode: status,
//       timestamp: new Date().toISOString(),
//       path: request.url,
//       ...error,
//     });
//   }
// }
