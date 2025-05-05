import { ApiProperty } from '@nestjs/swagger';

export class ApiResponseDto<T> {
    @ApiProperty({ example: 200 })
    status: number;

    @ApiProperty({ required: false })
    data?: T;

    @ApiProperty({ example: 'Success', required: false })
    message?: string;

    @ApiProperty({ example: 1, required: false })
    page?: number;

    @ApiProperty({ example: 10, required: false })
    limit?: number;

    @ApiProperty({ example: 100, required: false })
    total?: number;

    @ApiProperty({ example: 'Error message', required: false })
    error?: string;

    constructor(
        status: number,
        data?: T,
        message?: string,
        page?: number,
        limit?: number,
        total?: number,
        error?: string,
    ) {
        this.status = status;
        this.data = data;
        this.message = message;
        this.page = page;
        this.limit = limit;
        this.total = total;
        this.error = error;
    }
}
