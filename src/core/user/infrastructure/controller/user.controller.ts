import { Body, Controller, Post, Put, Res } from '@nestjs/common';
import { UserPresenter } from 'src/core/user/infrastructure/presenters/user.presenter';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginPresenter } from 'src/core/user/infrastructure/presenters/login.presenter';
import { FastifyReply } from 'fastify';
import { CreateUserUseCase } from '../../application/usecase/create.usecase';
import { UpdateUserUseCase } from '../../application/usecase/update.usecase';
import { LoginUseCase } from '../../application/usecase/login.usecase';
import { LoginUserDto } from '../dtos/login.dto';
import { UpdateUserDto } from '../dtos/updateUser.dto';
import { CreateUserDto } from '../dtos/createUser.dto';

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
  @ApiOperation({ summary: 'LoginUser' })
  @ApiResponse({
    status: 201,
    type: LoginPresenter,
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
  @ApiBody({ type: LoginUserDto })
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
