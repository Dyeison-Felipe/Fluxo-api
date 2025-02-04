import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { OwnerTypePresenter } from 'src/core/ownerType/infrastructure/presenters/ownerType.presenter';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';
import { PaginationDto } from 'src/shared/infrastructure/dtos/pagination.dto';
import {
  findAllSchemaDocs,
  getItemsSchemaDocs,
  PaginationSchemaDocs,
} from 'src/shared/infrastructure/docs/paginationSwagger';
import { CreateOwnerTypeUseCase } from '../../application/usecases/create.usecase';
import { FindAllOwnerTypeUseCaseUseCase } from '../../application/usecases/findAll.usecase';
import { FindOwnerTypeByIdUseCase } from '../../application/usecases/findById.usecase';
import { UpdateOwnerTypeUseCase } from '../../application/usecases/update.usecase';
import { DeleteOwnerTypeUseCase } from '../../application/usecases/delete.usecase';
import { CreateOwnerTypeDto } from '../dtos/createOwnerType.dto';
import { UpdateOwnerTypeDto } from '../dtos/updateOwnerType.dto';
import { FindAllOwnerTypePaginatedUseCase } from '../../application/usecases/findAllPaginate';

@ApiTags('Owner Address')
@Controller('api/owner-address/v1')
export class OwnerTypeController {
  constructor(
    private readonly createUseCase: CreateOwnerTypeUseCase,
    private readonly findAllUseCase: FindAllOwnerTypeUseCaseUseCase,
    private readonly findByIdUseCase: FindOwnerTypeByIdUseCase,
    private readonly updateUseCase: UpdateOwnerTypeUseCase,
    private readonly deleteUseCase: DeleteOwnerTypeUseCase,
    private readonly findAllPaginatedUseCase: FindAllOwnerTypePaginatedUseCase,
  ) { }

  @ApiOperation({ summary: 'Get all types owner ' })
  @ApiResponse({
    status: 200,
    schema: {
      type: 'object',
      properties: {
        ...findAllSchemaDocs,
        ...getItemsSchemaDocs({ $ref: getSchemaPath(OwnerTypePresenter) }),
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'unknown error',
  })
  @Get('/find-all')
  async findAll(): Promise<OwnerTypePresenter[]> {
    const list = await this.findAllUseCase.execute();
    return list;
  }

  @ApiOperation({ summary: 'Get all types owner paged' })
  @ApiResponse({
    status: 200,
    schema: {
      type: 'object',
      properties: {
        ...PaginationSchemaDocs,
        ...getItemsSchemaDocs({ $ref: getSchemaPath(OwnerTypePresenter) }),
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'unknown error',
  })
  @Get('/paginated')
  async findAllPaginated(
    @Query() paginationDto: PaginationDto,
  ): Promise<Pagination<OwnerTypePresenter>> {
    const result = await this.findAllPaginatedUseCase.execute(paginationDto);

    return result;
  }

  @ApiOperation({ summary: 'Get types owner by id' })
  @ApiResponse({
    status: 200,
    schema: {
      type: 'array',
      properties: {
        ...findAllSchemaDocs,
        ...getItemsSchemaDocs({ $ref: getSchemaPath(OwnerTypePresenter) }),
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'unknown error',
  })
  @Get('/:id')
  async findById(@Param('id') id: number): Promise<OwnerTypePresenter> {
    const ownerAddressId = await this.findByIdUseCase.execute({ id });

    return ownerAddressId;
  }


  @ApiOperation({ summary: 'Create types owner' })
  @ApiResponse({
    status: 201,
    type: OwnerTypePresenter,
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
  @ApiBody({ type: CreateOwnerTypeDto })
  @Post()
  async create(
    @Body() createOwnerTypeDto: CreateOwnerTypeDto,
  ): Promise<OwnerTypePresenter> {
    const create = await this.createUseCase.execute(createOwnerTypeDto);

    return create;
  }


  @ApiOperation({ summary: 'update types owner' })
  @ApiResponse({
    status: 201,
    type: OwnerTypePresenter,
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
  @Put()
  @ApiBody({ type: UpdateOwnerTypeDto })
  async update(
    @Body() updateOwnerTypeDto: UpdateOwnerTypeDto,
  ): Promise<OwnerTypePresenter> {
    const update = await this.updateUseCase.execute(updateOwnerTypeDto);

    return update;
  }

  @ApiOperation({ summary: 'delete types owner' })
  @ApiResponse({
    status: 200,
    description: 'ok',
  })
  @ApiResponse({
    status: 500,
    type: 'unknown error',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.deleteUseCase.execute({ id });
  }
}
