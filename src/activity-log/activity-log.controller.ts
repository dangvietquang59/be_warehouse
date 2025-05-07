import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
} from '@nestjs/common';
import { ApiResponse, ApiOperation } from '@nestjs/swagger';
import { ApiTags } from '@nestjs/swagger';
import { ActivityLogService } from './activity-log.service';
import { ActivityLog } from './activity-log.entity';
import { CreateActivityLogDto } from './dto/create-activity-log.dto';
import { ApiResponseDto } from '../common/dto/api-response.dto';

@ApiTags('Activity Logs')
@Controller('api/activity-logs')
export class ActivityLogController {
    constructor(private readonly activityLogService: ActivityLogService) {}

    @Get()
    @ApiOperation({ summary: 'Get all activity logs' })
    @ApiResponse({ status: 200, description: 'Return all activity logs' })
    async findAll(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
    ): Promise<[ActivityLog[], number]> {
        return this.activityLogService.findAll(page, limit);
    }

    @Post()
    @ApiOperation({ summary: 'Create a new activity log' })
    @ApiResponse({
        status: 201,
        description: 'The activity log has been successfully created.',
        type: ActivityLog,
    })
    @ApiResponse({ status: 400, description: 'Bad request' })
    async create(
        @Body() createActivityLogDto: CreateActivityLogDto,
    ): Promise<ApiResponseDto<any>> {
        const activityLog = await this.activityLogService.create(createActivityLogDto);
        return new ApiResponseDto(
            201,
            activityLog,
            'Activity log created successfully',
        );
    }

    @Get('user/:userId')
    @ApiOperation({ summary: 'Get activity logs by user id' })
    @ApiResponse({ status: 200, description: 'Return activity logs for the user' })
    async findByUser(
        @Param('userId') userId: string,
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
    ): Promise<[ActivityLog[], number]> {
        return this.activityLogService.findByUser(userId, page, limit);
    }

    @Get('table/:tableName')
    @ApiOperation({ summary: 'Get activity logs by table name' })
    @ApiResponse({ status: 200, description: 'Return activity logs for the table' })
    async findByTable(
        @Param('tableName') tableName: string,
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
    ): Promise<[ActivityLog[], number]> {
        return this.activityLogService.findByTable(tableName, page, limit);
    }

    @Get('record/:tableName/:recordId')
    @ApiOperation({ summary: 'Get activity logs by table name and record id' })
    @ApiResponse({ status: 200, description: 'Return activity logs for the record' })
    async findByRecord(
        @Param('tableName') tableName: string,
        @Param('recordId') recordId: string,
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
    ): Promise<[ActivityLog[], number]> {
        return this.activityLogService.findByRecord(tableName, recordId, page, limit);
    }
} 