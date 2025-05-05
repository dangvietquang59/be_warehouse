import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user/user.entity';

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    @ApiProperty({ description: 'The ID of the role' })
    id: number;

    @Column({ unique: true })
    @ApiProperty({ description: 'The name of the role' })
    name: string;

    @Column()
    @ApiProperty({ description: 'The description of the role' })
    description: string;

    @OneToMany(() => User, (user) => user.role)
    users: User[];
}
