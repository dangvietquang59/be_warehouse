import { Controller, Get, Put, Param, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiResponseDto } from '../common/dto/api-response.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ApiResponseDto<any>> {
    const user = await this.userService.findById(+id);
    return new ApiResponseDto(200, user);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ApiResponseDto<any>> {
    const updatedUser = await this.userService.updateUser(id, updateUserDto);
    return new ApiResponseDto(200, updatedUser);
  }
}
