import { Body, Controller, Post, Put } from '@nestjs/common';
import { CreateUserUseCase } from '../application/usecase/create.usecase';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserPresenter } from 'src/shared/infrastructure/presenters/user.presenter';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { UpdateUserUseCase } from '../application/usecase/update.usecase';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('/api/user/v1')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({
    status: 201,
    type: UserPresenter,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized access',
  })
  @ApiResponse({
    status: 422,
    description: 'Invalid body parameters',
  })
  @ApiResponse({
    status: 409,
    description: 'conflict',
  })
  @ApiResponse({
    status: 500,
    description: 'unknown error',
  })
  @ApiBody({ type: CreateUserDto })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserPresenter> {
    const user = await this.createUserUseCase.execute(createUserDto);

    return user;
  }

  @Put()
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({
    status: 201,
    type: UserPresenter,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized access',
  })
  @ApiResponse({
    status: 422,
    description: 'Invalid body parameters',
  })
  @ApiResponse({
    status: 409,
    description: 'conflict',
  })
  @ApiResponse({
    status: 500,
    description: 'unknown error',
  })
  @ApiBody({ type: UpdateUserDto })
  async update(@Body() updateUserDto: UpdateUserDto): Promise<UserPresenter> {
    const updateUser = await this.updateUserUseCase.execute(updateUserDto);

    return updateUser;
  }
}
