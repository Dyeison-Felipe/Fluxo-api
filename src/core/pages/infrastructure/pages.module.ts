import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PagesSchema } from "./pages.schema";
import { CreatePagesUseCase } from "../application/usecase/createPages.usecase";
import { UpdatePageseUseCase } from "../application/usecase/updatePages.usecase";
import { FindAllPagesUseCase } from "../application/usecase/findAllPages.usecase";
import { DeletePagesUseCase } from "../application/usecase/deletePages.usecase";
import { Providers } from "src/shared/infrastructure/constants/moduleConstants";
import { PagesRepositoryImpl } from "./typeorm/repositories/pages.repository";
import { PagesRepository } from "../domain/repositories/pages.repository";
import { PageController } from "./controllers/pages.controller";

@Module({
  imports: [TypeOrmModule.forFeature([PagesSchema])],
  controllers: [PageController],
  providers: [
    CreatePagesUseCase,
    UpdatePageseUseCase,
    FindAllPagesUseCase,
    DeletePagesUseCase,
    {
      provide: Providers.PAGES_REPOSITORY,
      useClass: PagesRepositoryImpl,
    },
    {
      provide: CreatePagesUseCase,
      useFactory: (pagesRepository: PagesRepository) => {
        return new CreatePagesUseCase(pagesRepository);
      },
      inject: [Providers.PAGES_REPOSITORY],
    },
    {
      provide: FindAllPagesUseCase,
      useFactory: (pagesRepository: PagesRepository) => {
        return new FindAllPagesUseCase(pagesRepository);
      },
      inject: [Providers.PAGES_REPOSITORY],
    },
    {
      provide: UpdatePageseUseCase,
      useFactory: (pagesRepository: PagesRepository) => {
        return new UpdatePageseUseCase(pagesRepository);
      },
      inject: [Providers.PAGES_REPOSITORY],
    },
    {
      provide: DeletePagesUseCase,
      useFactory: (pagesRepository: PagesRepository) => {
        return new DeletePagesUseCase(pagesRepository);
      },
      inject: [Providers.PAGES_REPOSITORY],
    },
  ],
  exports: [Providers.PAGES_REPOSITORY],
})
export class PageModule {}
