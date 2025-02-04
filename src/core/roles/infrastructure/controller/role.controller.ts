import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Post, Put } from '@nestjs/common';
import { RolePresenter } from '../presenters/role.presenter';
import { CreateRoleDto } from '../dtos/createRole.dto';
import { CreateRoleUseCase } from '../../application/usecase/create.usecase';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { FindAllRoleUseCase } from '../../application/usecase/findAll.usecase';
import { UpdateRoleUseCase } from '../../application/usecase/update.usecase';
import { UpdateRoleDto } from '../dtos/updateRole.dto';
import {
  findAllSchemaDocs,
  getItemsSchemaDocs,
} from 'src/shared/infrastructure/docs/paginationSwagger';
import { DeleteRoleDto } from '../dtos/deleteRole.dto';
import { DeleteRoleUseCase } from '../../application/usecase/deleteRole.usecase';

@Controller('api/role/v1')
export class RoleController {
  constructor(
    private readonly createRoleUseCase: CreateRoleUseCase,
    private readonly findAllRoleUseCase: FindAllRoleUseCase,
    private readonly updateRoleUseCase: UpdateRoleUseCase,
    private readonly deleteRoleUseCase: DeleteRoleUseCase,
  ) { }

  @Get()
  @ApiOperation({ summary: 'Get all roles' })
  @ApiResponse({
    status: 200,
    schema: {
      type: 'object',
      properties: {
        ...findAllSchemaDocs,
        ...getItemsSchemaDocs({ $ref: getSchemaPath(RolePresenter) }),
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'unknown error',
  })
  async findAll(): Promise<RolePresenter[]> {
    const roles = await this.findAllRoleUseCase.execute();
    return roles;
  }

  @Post()
  @ApiOperation({ summary: 'Create role' })
  @ApiResponse({
    status: 201,
    type: RolePresenter,
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
  @ApiBody({ type: CreateRoleDto })
  async create(@Body() createRoleDto: CreateRoleDto): Promise<RolePresenter> {
    console.log('createRoleDto', createRoleDto)
    const create = await this.createRoleUseCase.execute(createRoleDto);

    return create;
  }

  @Put()
  @ApiOperation({ summary: 'Update role' })
  @ApiResponse({
    status: 201,
    type: RolePresenter,
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
  @ApiBody({ type: UpdateRoleDto })
  async updateRole(
    @Body() updateRoleDto: UpdateRoleDto,
  ): Promise<RolePresenter> {
    const role = await this.updateRoleUseCase.execute(updateRoleDto);

    return role;
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete()
  @ApiOperation({ summary: 'delete role' })
  @ApiResponse({
    status: 200,
    description: 'ok',
  })
  @ApiResponse({
    status: 500,
    type: 'unknown error',
  })
  async deleteRole(@Body() deleteRoleDto: DeleteRoleDto): Promise<void> {
    return await this.deleteRoleUseCase.execute(deleteRoleDto);
  }
}
