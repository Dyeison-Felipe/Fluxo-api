import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Post, Put, UseGuards } from "@nestjs/common";
import { CreatePagesUseCase } from "../../application/usecase/createPages.usecase";
import { FindAllPagesUseCase } from "../../application/usecase/findAllPages.usecase";
import { UpdatePageseUseCase } from "../../application/usecase/updatePages.usecase";
import { DeletePagesUseCase } from "../../application/usecase/deletePages.usecase";
import { ApiBody, ApiOperation, ApiResponse, getSchemaPath } from "@nestjs/swagger";
import { findAllSchemaDocs, getItemsSchemaDocs } from "src/shared/infrastructure/docs/paginationSwagger";
import { PagePresenter } from "../presenters/pages.presenter";
import { CreatePagesDto } from "../dtos/createPages.dto";
import { UpdatePageDto } from "../dtos/updateRole.dto";
import { DeletePageDto } from "../dtos/deletePage.dto";

@Controller('api/pages/v1')
export class PageController {
  constructor(
    private readonly createPagesUseCase: CreatePagesUseCase,
    private readonly findAllPagesUseCase: FindAllPagesUseCase,
    private readonly updatePagesUseCase: UpdatePageseUseCase,
    private readonly deletePagesUseCase: DeletePagesUseCase,
  ) { }

  @ApiOperation({ summary: 'Get all pages' })
  @ApiResponse({
    status: 200,
    schema: {
      type: 'object',
      properties: {
        ...findAllSchemaDocs,
        ...getItemsSchemaDocs({ $ref: getSchemaPath(PagePresenter) }),
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'unknown error',
  })
  @Get()
  async findAll(): Promise<PagePresenter[]> {
    const pages = await this.findAllPagesUseCase.execute();
    return pages;
  }

  @ApiOperation({ summary: 'Create pages' })
  @ApiResponse({
    status: 201,
    type: PagePresenter,
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
  @ApiBody({ type: CreatePagesDto })
  @Post()
  async create(@Body() createPagesDto: CreatePagesDto): Promise<PagePresenter> {
    const create = await this.createPagesUseCase.execute(createPagesDto);

    return create;
  }

  @ApiOperation({ summary: 'Update page' })
  @ApiResponse({
    status: 201,
    type: PagePresenter,
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
  @ApiBody({ type: UpdatePageDto })
  @Put()
  async updateRole(
    @Body() updatePageDto: UpdatePageDto,
  ): Promise<PagePresenter> {
    const role = await this.updatePagesUseCase.execute(updatePageDto);

    return role;
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'delete role' })
  @ApiResponse({
    status: 200,
    description: 'ok',
  })
  @ApiResponse({
    status: 500,
    type: 'unknown error',
  })
  @Delete()
  async deleteRole(@Body() deleteRoleDto: DeletePageDto): Promise<void> {
    return await this.deletePagesUseCase.execute(deleteRoleDto);
  }
}
