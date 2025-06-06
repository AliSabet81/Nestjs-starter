import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class TransformResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // ... before route handler
    return next.handle().pipe(
      map((response) => {
        if (!response) {
          return {
            data: null,
          };
        }
        if (response.data && response.meta) {
          return {
            data: response.data,
            meta: response.meta,
          };
        }
        return {
          data: response,
        };
      }),
    );
  }
}
