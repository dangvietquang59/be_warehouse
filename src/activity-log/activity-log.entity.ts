import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('activity_logs')
export class ActivityLog {
  @ApiProperty({ description: 'Activity log ID' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'User ID' })
  @Column()
  user_id: string;

  @ApiProperty({ description: 'Action performed' })
  @Column()
  action: string;

  @ApiProperty({ description: 'Table name' })
  @Column()
  table_name: string;

  @ApiProperty({ description: 'Record ID' })
  @Column()
  record_id: string;

  @ApiProperty({ description: 'Old values', type: 'object', required: false })
  @Column({ type: 'jsonb', nullable: true })
  old_values: Record<string, any>;

  @ApiProperty({ description: 'New values', type: 'object', required: false })
  @Column({ type: 'jsonb', nullable: true })
  new_values: Record<string, any>;

  @ApiProperty({ description: 'Creation timestamp' })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
} 