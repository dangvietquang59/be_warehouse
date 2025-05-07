import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActivityLog } from './activity-log.entity';
import { CreateActivityLogDto } from './dto/create-activity-log.dto';

@Injectable()
export class ActivityLogService {
  constructor(
    @InjectRepository(ActivityLog)
    private readonly activityLogRepository: Repository<ActivityLog>,
  ) {}

  async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<[ActivityLog[], number]> {
    const [activityLogs, total] = await this.activityLogRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { created_at: 'DESC' },
    });
    return [activityLogs, total];
  }

  async create(createActivityLogDto: CreateActivityLogDto): Promise<ActivityLog> {
    const activityLog = this.activityLogRepository.create(createActivityLogDto);
    return this.activityLogRepository.save(activityLog);
  }

  findOne(id: string): Promise<ActivityLog> {
    return this.activityLogRepository.findOneOrFail({ where: { id } });
  }

  async findByUser(
    userId: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<[ActivityLog[], number]> {
    const [activityLogs, total] = await this.activityLogRepository.findAndCount({
      where: { user_id: userId },
      skip: (page - 1) * limit,
      take: limit,
      order: { created_at: 'DESC' },
    });
    return [activityLogs, total];
  }

  async findByTable(
    tableName: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<[ActivityLog[], number]> {
    const [activityLogs, total] = await this.activityLogRepository.findAndCount({
      where: { table_name: tableName },
      skip: (page - 1) * limit,
      take: limit,
      order: { created_at: 'DESC' },
    });
    return [activityLogs, total];
  }

  async findByRecord(
    tableName: string,
    recordId: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<[ActivityLog[], number]> {
    const [activityLogs, total] = await this.activityLogRepository.findAndCount({
      where: { table_name: tableName, record_id: recordId },
      skip: (page - 1) * limit,
      take: limit,
      order: { created_at: 'DESC' },
    });
    return [activityLogs, total];
  }
} 