import { OwnerAddressRepository } from 'src/core/owner-address/domain/ownerAddress.repository';
import { ConflictError } from 'src/shared/application/errors/conflictExceptionError';
import { CreateOwnerAddressUseCase } from '../create.usecase';
import { OwnerAddress } from 'src/core/owner-address/domain/ownerAddress.entity';
import { BadRequestError } from 'src/shared/application/errors/badRequest';

// Mock do repositório
const mockOwnerAddressRepository = (): Partial<OwnerAddressRepository> => ({
  existType: jest.fn(),
  create: jest.fn(),
});

describe('CreateOwnerAddressUseCase', () => {
  let useCase: CreateOwnerAddressUseCase;
  let ownerAddressRepository: OwnerAddressRepository;

  beforeEach(() => {
    ownerAddressRepository =
      mockOwnerAddressRepository() as OwnerAddressRepository;
    useCase = new CreateOwnerAddressUseCase(ownerAddressRepository);
  });

  it('deve criar um novo proprietário de enedreço quando o tipo não existe', async () => {
    const input = { type: 'Residencial' };

    // Simular que o tipo não existe
    (ownerAddressRepository.existType as jest.Mock).mockResolvedValue(false);

    // Simular o retorno do método create
    (ownerAddressRepository.create as jest.Mock).mockResolvedValue(
      new OwnerAddress({ type: input.type }),
    );

    const result = await useCase.execute(input);

    // toHaveBeenCalledWith: Verifica se o mock da função existType foi chamado com o argumento input.type.
    expect(ownerAddressRepository.existType).toHaveBeenCalledWith(input.type);
    //toHaveBeenCalled: Verifica se a função mockada create foi chamada pelo menos uma vez.
    expect(ownerAddressRepository.create).toHaveBeenCalled();
    //toBeInstanceOf: Verifica se o resultado result é uma instância da classe OwnerAddress.
    expect(result).toBeInstanceOf(OwnerAddress);
    // toEqual: Verifica se a propriedade type do resultado é igual ao valor input.type.
    expect(result.type).toEqual(input.type);
  });

  it('deve lançar uma exceção de conflito se o tipo já existir', async () => {
    const input = { type: 'Residencial' };

    // Simular que o tipo já existe
    (ownerAddressRepository.existType as jest.Mock).mockResolvedValue(true);

    // rejects.toThrow: Verifica se a função useCase.execute(input) rejeita com um erro específico, no caso ConflictError.
    await expect(useCase.execute(input)).rejects.toThrow(ConflictError);

    expect(ownerAddressRepository.existType).toHaveBeenCalledWith(input.type);
    expect(ownerAddressRepository.create).not.toHaveBeenCalled();
  });

  it('deve lançar um erro se o tipo de endereço estiver vazio', async () => {
    const input = { type: '' };

    //rejects.toThrow (para erro genérico): Verifica se a função useCase.execute(input) rejeita com um erro genérico (Error).
    await expect(useCase.execute(input)).rejects.toThrow(BadRequestError);

    // not.toHaveBeenCalled:  Verifica se o método create não foi chamado.
    expect(ownerAddressRepository.create).not.toHaveBeenCalled();
  });
});
