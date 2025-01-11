import { OwnerTypeRepository } from 'src/core/ownerType/domain/ownerType.repository';
import { FindAllOwnerTypePaginatedUseCase } from '../findAllPaginate';
import { BadRequestError } from 'src/shared/application/errors/badRequest';

const mockOwnerTypeRepository = (): Partial<OwnerTypeRepository> => ({
  findAllPaginate: jest.fn(),
});

describe('FindAllOwnerTypePaginatedUseCase', () => {
  let findAllOwnerTypePaginatedUseCase: FindAllOwnerTypePaginatedUseCase;
  let ownerTypeRepository: OwnerTypeRepository;

  beforeEach(() => {
    ownerTypeRepository = mockOwnerTypeRepository() as OwnerTypeRepository;
    findAllOwnerTypePaginatedUseCase = new FindAllOwnerTypePaginatedUseCase(
      ownerTypeRepository,
    );
  });

  it('Should return paginated owner types', async () => {
    const input = { page: 1, limit: 10 };

    const paginatedOutput = {
      items: [
        {
          id: 1,
          type: 'Company',
        },
        {
          id: 2,
          type: 'Individual',
        },
      ],
      meta: {
        totalItems: 2,
        itemCount: 2,
        itemsPerPage: 10,
        totalPages: 1,
        currentPage: 1,
      },
    };

    // Simulando a resposta do repositório
    (ownerTypeRepository.findAllPaginate as jest.Mock).mockResolvedValue(
      paginatedOutput,
    );

    const result = await findAllOwnerTypePaginatedUseCase.execute(input);

    // Verificando se o método findAllPaginate foi chamado corretamente
    expect(ownerTypeRepository.findAllPaginate).toHaveBeenCalledTimes(1);
    expect(ownerTypeRepository.findAllPaginate).toHaveBeenCalledWith(input);

    // Verificando se o resultado é o esperado
    expect(result).toEqual(paginatedOutput);
  });

  it('Should throw an error if page or limit are invalid', async () => {
    const input = { page: -1, limit: 0 }; // Valores inválidos para o teste

    await expect(
      findAllOwnerTypePaginatedUseCase.execute(input),
    ).rejects.toThrow(BadRequestError);

    expect(ownerTypeRepository.findAllPaginate).toHaveBeenCalledTimes(0);
  });
});
