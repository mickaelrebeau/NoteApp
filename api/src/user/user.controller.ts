import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { User } from './model/user.entity';
import { UserService } from './user.service';
import { UpdateResult } from 'typeorm';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAll(): Promise<User[]> {
    return this.userService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string): Promise<User | null> {
    return this.userService.getById(id);
  }

  @Post()
  create(@Body() user: User): Promise<User> {
    return this.userService.create(user);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() user: User): Promise<UpdateResult> {
    return this.userService.update(id, user);
  }

  @Delete(':id')
  destroy(@Param('id') id: string): Promise<void> {
    return this.userService.delete(id);
  }
}
