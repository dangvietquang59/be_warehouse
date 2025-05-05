import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponseDto } from '../dto/api-response.dto';

@Injectable()
export class ResponseInterceptor<T>
    implements NestInterceptor<T, ApiResponseDto<T>>
{
    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<ApiResponseDto<T>> {
        return next.handle().pipe(
            map((data) => {
                // If data is already an ApiResponseDto, return it as is
                if (data instanceof ApiResponseDto) {
                    return data;
                }

                // Handle pagination response
                if (Array.isArray(data) && data.length === 2) {
                    const [items, total] = data;
                    const request = context.switchToHttp().getRequest();
                    const page = parseInt(request.query.page) || 1;
                    const limit = parseInt(request.query.limit) || 10;

                    return new ApiResponseDto(
                        200,
                        items,
                        'Data retrieved successfully',
                        page,
                        limit,
                        total,
                    );
                }

                // For regular responses
                return new ApiResponseDto(200, data, 'Success');
            }),
        );
    }
}
