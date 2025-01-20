import { Test, TestingModule } from '@nestjs/testing';
import { describe } from 'node:test';
import { Repository } from 'typeorm';
import { OwnerTypeRepositoryImpl } from '../../ownerType.repository';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { OwnerTypeSchema } from '../../../ownerType.schema';
import { configDatabase } from 'src/shared/infrastructure/database/typeOrm/__test__/database.test';

describe('Owner Type repository integration tests', () => {
  let module: TestingModule;
  let ownerTypeRepository: Repository<OwnerTypeSchema>;
  let ownerTypeRepositoryImpl: OwnerTypeRepositoryImpl;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([OwnerTypeSchema]), configDatabase()],
    }).compile();

    ownerTypeRepository = module.get<Repository<OwnerTypeSchema>>(
      getRepositoryToken(OwnerTypeSchema),
    );
  });

  beforeEach(async () => {
    ownerTypeRepositoryImpl = new OwnerTypeRepositoryImpl(ownerTypeRepository);
    await ownerTypeRepository.clear();
  });

  afterAll(async () => {
    await module.close();
  });

  it('Should return null when owner not found', async () => {
    const owner = await ownerTypeRepositoryImpl.findById(9);

    expect(owner).toBeNull();
  });
});
