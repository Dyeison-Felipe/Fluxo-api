import { Body, Controller, Get, HttpCode, Param, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { UserPresenter } from 'src/core/user/infrastructure/presenters/user.presenter';
import { ApiBody, ApiOperation, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { LoginPresenter } from 'src/core/user/infrastructure/presenters/login.presenter';
import { FastifyReply } from 'fastify';
import { CreateUserUseCase } from '../../application/usecase/create.usecase';
import { UpdateUserUseCase } from '../../application/usecase/update.usecase';
import { LoginUseCase } from '../../application/usecase/login.usecase';
import { LoginUserDto } from '../dtos/login.dto';
import { UpdateUserDto } from '../dtos/updateUser.dto';
import { CreateUserDto } from '../dtos/createUser.dto';
import { RefreshTokenUseCase } from '../../application/usecase/refreshToken.usecase';
import { LoggedUserUseCase } from '../../application/usecase/loggedUser.usecase';
import { repl } from '@nestjs/core';
import { RefreshTokenGuard } from '../guards/refresToken.guard';
import { FindAllUserByRoleIdUseCase } from '../../application/usecase/findAllUserByRoleId.usecase';
import { PaginationDto } from 'src/shared/infrastructure/dtos/pagination.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { getItemsSchemaDocs, PaginationSchemaDocs } from 'src/shared/infrastructure/docs/paginationSwagger';

@Controller('/api/user/v1')
export class UserController {
  constructor(
    private readonly findAllUserByRoleIdUseCase: FindAllUserByRoleIdUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
    private readonly loggedUserUseCase: LoggedUserUseCase,
  ) { }

  @ApiOperation({ summary: 'Get all User per role paged' })
  @ApiResponse({
    status: 200,
    schema: {
      type: 'object',
      properties: {
        ...PaginationSchemaDocs,
        ...getItemsSchemaDocs({ $ref: getSchemaPath(UserPresenter) }),
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'unknown error',
  })
  @Get('/user-role/:roleId')
  
  async findAllUserByRoleId(@Param('roleId') roleId: number, @Query() paginationDto: PaginationDto): Promise<Pagination<UserPresenter>> {
    const { limit, page } = paginationDto;
    const user = await this.findAllUserByRoleIdUseCase.execute({ roleId, limit, page });

    return user;
  }


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
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserPresenter> {
    const user = await this.createUserUseCase.execute(createUserDto);

    return user;
  }


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
  @Put()
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

  @ApiOperation({ summary: 'RefreshToken user' })
  @ApiResponse({
    status: 200,
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
  @HttpCode(200)
  @Post('/refresh')
  async refreshUserToken(
    @Res({ passthrough: true }) reply: FastifyReply,
  ): Promise<void> {
    await this.refreshTokenUseCase.execute({
      setCookies: reply.setCookie.bind(reply),
    });
  }

  @ApiOperation({ summary: 'Logout user' })
  @ApiResponse({
    status: 200,
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
  @HttpCode(200)
  @Post('/logout')
  userLogout(@Res({ passthrough: true }) reply: FastifyReply): void {
    this.loggedUserUseCase.execute({
      clearCookies: reply.clearCookie.bind(reply),
    });
  }
}
