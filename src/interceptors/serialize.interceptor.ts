import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

export class SerializeInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    console.log('running before the handler: ', context);
    return next.handle().pipe(
      map((data) => {
        console.log('data before sending the response: ', data);
      }),
    );
  }
}
