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
import { CreateOwnerAddressUseCase } from '../application/usecases/create.usecase';
import { CreateOwnerAddressDto } from './dtos/createOwnerAddress.dto';
import { OwnerAddressPresenter } from 'src/shared/infrastructure/presenters/ownerAddress.presenter';
import { FindAllUseCase } from '../application/usecases/findAll.usecase';
import { FindByIdUseCase } from '../application/usecases/findById.usecase';
import { UpdateUseCase } from '../application/usecases/update.usecase';
import { UpdateOwnerAddressDto } from './dtos/updateOwnerAddress.dto';
import { DeleteUseCase } from '../application/usecases/delete.usecase';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { FindAllPaginatedUseCase } from '../application/usecases/findAllPaginate';
import { Pagination } from 'nestjs-typeorm-paginate';
import { PaginationDto } from 'src/shared/infrastructure/dtos/pagination.dto';
import {
  findAllSchemaDocs,
  getItemsSchemaDocs,
  PaginationSchemaDocs,
} from 'src/shared/infrastructure/docs/paginationSwagger';

@ApiTags('Owner Address')
@Controller('api/owner-address/v1')
export class OwnerAddressController {
  constructor(
    private readonly createUseCase: CreateOwnerAddressUseCase,
    private readonly findAllUseCase: FindAllUseCase,
    private readonly findByIdUseCase: FindByIdUseCase,
    private readonly updateUseCase: UpdateUseCase,
    private readonly deleteUseCase: DeleteUseCase,
    private readonly findAllPaginatedUseCase: FindAllPaginatedUseCase,
  ) {}

  @ApiOperation({ summary: 'Get all address owner ' })
  @ApiResponse({
    status: 200,
    schema: {
      type: 'object',
      properties: {
        ...findAllSchemaDocs,
        ...getItemsSchemaDocs({ $ref: getSchemaPath(OwnerAddressPresenter) }),
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'unknown error',
  })
  @Get('/find-all')
  async findAll(): Promise<OwnerAddressPresenter[]> {
    const list = await this.findAllUseCase.execute();
    return list;
  }

  @ApiOperation({ summary: 'Get all address owner paged' })
  @ApiResponse({
    status: 200,
    schema: {
      type: 'object',
      properties: {
        ...PaginationSchemaDocs,
        ...getItemsSchemaDocs({ $ref: getSchemaPath(OwnerAddressPresenter) }),
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
  ): Promise<Pagination<OwnerAddressPresenter>> {
    const result = await this.findAllPaginatedUseCase.execute(paginationDto);

    return result;
  }

  @ApiOperation({ summary: 'Get address owner by id' })
  @ApiResponse({
    status: 200,
    schema: {
      type: 'array',
      properties: {
        ...findAllSchemaDocs,
        ...getItemsSchemaDocs({ $ref: getSchemaPath(OwnerAddressPresenter) }),
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'unknown error',
  })
  @Get('/:id')
  async findById(@Param('id') id: number): Promise<OwnerAddressPresenter> {
    const ownerAddressId = await this.findByIdUseCase.execute({ id });

    return ownerAddressId;
  }

  @Post()
  @ApiOperation({ summary: 'Create address owner' })
  @ApiResponse({
    status: 201,
    type: OwnerAddressPresenter,
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
  @ApiBody({ type: CreateOwnerAddressDto })
  async create(
    @Body() createOwnerAddressDto: CreateOwnerAddressDto,
  ): Promise<OwnerAddressPresenter> {
    const create = await this.createUseCase.execute(createOwnerAddressDto);

    return create;
  }

  @Put()
  @ApiOperation({ summary: 'update address owner' })
  @ApiResponse({
    status: 201,
    type: OwnerAddressPresenter,
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
  @ApiBody({ type: UpdateOwnerAddressDto })
  async update(
    @Body() updateOwnerAddressDto: UpdateOwnerAddressDto,
  ): Promise<OwnerAddressPresenter> {
    const update = await this.updateUseCase.execute(updateOwnerAddressDto);

    return update;
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  @ApiOperation({ summary: 'delete address owner' })
  @ApiResponse({
    status: 200,
    description: 'ok',
  })
  @ApiResponse({
    status: 500,
    type: 'unknown error',
  })
  async delete(@Param('id') id: number): Promise<void> {
    await this.deleteUseCase.execute({ id });
  }
}
