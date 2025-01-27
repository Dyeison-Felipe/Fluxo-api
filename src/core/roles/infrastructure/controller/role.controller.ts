import { Body, Controller, Post } from '@nestjs/common';
import { RolePresenter } from '../presenters/role.presenter';
import { CreateRoleDto } from '../dtos/createRole.dto';
import { CreateRoleUseCase } from '../../application/usecase/create.usecase';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('api/role/v1')
export class RoleController {
  constructor(private readonly createRoleUseCase: CreateRoleUseCase) {}

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
    const create = await this.createRoleUseCase.execute(createRoleDto);

    return create;
  }
}
