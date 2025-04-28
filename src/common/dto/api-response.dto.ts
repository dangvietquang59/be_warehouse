import { ApiProperty } from '@nestjs/swagger';

export class ApiResponseDto<T> {
  @ApiProperty({ example: 200 })
  status: number;

  @ApiProperty()
  data: T;

  @ApiProperty({ example: 1, required: false })
  page?: number;

  @ApiProperty({ example: 10, required: false })
  limit?: number;

  @ApiProperty({ example: 100, required: false })
  total?: number;

  constructor(status: number, data: T, page?: number, limit?: number, total?: number) {
    this.status = status;
    this.data = data;
    this.page = page;
    this.limit = limit;
    this.total = total;
  }
} 