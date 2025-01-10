import { Test, TestingModule } from '@nestjs/testing';
import { CreateOwnerAddressUseCase } from '../create.usecase';
import { getRepositoryToken } from '@nestjs/typeorm';
import { OwnerAddressSchema } from 'src/core/owner-address/infrastructure/ownerAddress.schema';
import { CreateOwnerAddressDto } from 'src/core/owner-address/infrastructure/dtos/createOwnerAddress.dto';
import { Repository } from 'typeorm';

describe('CreateOwnerAddressUseCase', () => {
  let createOwnerAddressUseCase: CreateOwnerAddressUseCase;
  let ownerRepository: Repository<OwnerAddressSchema>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateOwnerAddressUseCase,
        {
          provide: getRepositoryToken(OwnerAddressSchema),
          useValue: {
            existType: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    createOwnerAddressUseCase = module.get<CreateOwnerAddressUseCase>(
      CreateOwnerAddressUseCase,
    );
    ownerRepository = module.get<Repository<OwnerAddressSchema>>(
      getRepositoryToken(OwnerAddressSchema),
    );
  });

  it('should be defined', () => {
    expect(createOwnerAddressUseCase).toBeDefined();
  });

  it('method create', async () => {
    const input: CreateOwnerAddressDto = {
      type: 'supplier',
    };

    await ownerRepository.existType.mockResolvedValue(false);

    const result = await createOwnerAddressUseCase.execute(input);

    expect(result).toEqual(input.type);
  });
});
