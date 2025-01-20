import { Body, Controller, Post, Put, Res } from '@nestjs/common';
import { CreateUserUseCase } from '../application/usecase/create.usecase';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserPresenter } from 'src/shared/infrastructure/presenters/user.presenter';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { UpdateUserUseCase } from '../application/usecase/update.usecase';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginUseCase } from '../application/usecase/login.usecase';
import { LoginUserDto } from './dtos/login.dto';
import { LoginPresenter } from 'src/shared/infrastructure/presenters/login.presenter';
import { FastifyReply } from 'fastify';

@Controller('/api/user/v1')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly loginUseCase: LoginUseCase,
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

  @Post('/login')
  async login(
    @Res({ passthrough: true }) reply: FastifyReply,
    @Body() loginDto: LoginUserDto,
  ): Promise<LoginPresenter> {
    const output = await this.loginUseCase.execute({
      ...loginDto,
      setCookies: reply.setCookie.bind(reply),
    });
    return new LoginPresenter(output);
  }
}
