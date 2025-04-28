import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiResponse, ApiOperation } from '@nestjs/swagger';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './role.entity';
import { RoleService } from './role.service';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiResponseDto } from '../common/dto/api-response.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Roles')
@Controller('api/roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({
    status: 201,
    description: 'The product has been successfully created.',
    type: Role,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async create(
    @Body() createRoleDto: CreateRoleDto,
  ): Promise<ApiResponseDto<any>> {
    const role = await this.roleService.create(createRoleDto);
    return new ApiResponseDto(201, role);
  }

  @Get()
  @ApiOperation({ summary: 'Get all roles' })
  @ApiResponse({ status: 200, description: 'Return all roles' })
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<ApiResponseDto<any>> {
    const [roles, total] = await this.roleService.findAll(page, limit);
    return new ApiResponseDto(200, roles, page, limit, total);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ApiResponseDto<any>> {
    const role = await this.roleService.findOne(+id);
    return new ApiResponseDto(200, role);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ): Promise<ApiResponseDto<any>> {
    const role = await this.roleService.update(+id, updateRoleDto);
    return new ApiResponseDto(200, role);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ApiResponseDto<any>> {
    await this.roleService.remove(+id);
    return new ApiResponseDto(200, { message: 'Role deleted successfully' });
  }
}
