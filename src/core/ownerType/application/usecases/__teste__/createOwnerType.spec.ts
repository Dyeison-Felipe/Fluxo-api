import { OwnerTypeRepository } from 'src/core/ownerType/domain/ownerType.repository';
import { ConflictError } from 'src/shared/application/errors/conflictExceptionError';
import { CreateOwnerTypeUseCase, Input } from '../create.usecase';
import { OwnerType } from 'src/core/ownerType/domain/ownerType.entity';
import { BadRequestError } from 'src/shared/application/errors/badRequest';

// Mock do repositório
const mockOwnerTypeRepository = (): Partial<OwnerTypeRepository> => ({
  existType: jest.fn(),
  create: jest.fn(),
});

describe('CreateOwnerTypeUseCase', () => {
  let useCase: CreateOwnerTypeUseCase;
  let ownerTypeRepository: OwnerTypeRepository;

  beforeEach(() => {
    ownerTypeRepository = mockOwnerTypeRepository() as OwnerTypeRepository;
    useCase = new CreateOwnerTypeUseCase(ownerTypeRepository);
  });

  it('deve criar um novo proprietário de endereço quando o tipo não existe', async () => {
    const input: Input = { type: 'Residencial' };

    const ownerTypeOutput = {
      id: undefined,
      type: input.type,
      createdAt: undefined,
      updatedAt: undefined,
      deletedAt: undefined,
    };

    (ownerTypeRepository.existType as jest.Mock).mockResolvedValue(false);

    (ownerTypeRepository.create as jest.Mock).mockResolvedValue(
      new OwnerType({ type: input.type }),
    );

    const output = await useCase.execute(input);

    // toHaveBeenCalledTimes(1): verifica se o metodo existType foi chamado apenas uma vez
    // toHaveBeenCalledWith: Verifica se o mock da função existType foi chamado com o argumento input.type.
    expect(ownerTypeRepository.existType).toHaveBeenCalledTimes(1);
    expect(ownerTypeRepository.existType).toHaveBeenCalledWith(input.type);

    //toHaveBeenCalledTimes: Verifica se a função mockada create foi chamada pelo menos uma vez.
    expect(ownerTypeRepository.create).toHaveBeenCalledTimes(1);
    //toBeInstanceOf: Verifica se o resultado result é uma instância da classe OwnerAddress.
    expect(output).toBeInstanceOf(OwnerType);
    // toEqual: Verifica se a propriedade type do resultado é igual ao valor input.type.
    expect(output).toEqual(ownerTypeOutput);
  });

  it('deve lançar uma exceção de conflito se o tipo já existir', async () => {
    const input: Input = { type: 'Residencial' };

    (ownerTypeRepository.existType as jest.Mock).mockResolvedValue(true);

    // rejects.toThrow: Verifica se a função useCase.execute(input) rejeita com um erro específico, no caso ConflictError.
    await expect(useCase.execute(input)).rejects.toThrow(ConflictError);

    expect(ownerTypeRepository.existType).toHaveBeenCalledTimes(1);
    expect(ownerTypeRepository.existType).toHaveBeenCalledWith(input.type);

    expect(ownerTypeRepository.create).toHaveBeenCalledTimes(0);
  });

  it('deve lançar um erro se o tipo de endereço estiver vazio', async () => {
    const input: Input = { type: '' };

    //rejects.toThrow (para erro genérico): Verifica se a função useCase.execute(input) rejeita com um erro genérico (Error).
    await expect(useCase.execute(input)).rejects.toThrow(BadRequestError);

    // not.toHaveBeenCalled:  Verifica se o método create não foi chamado.
    expect(ownerTypeRepository.existType).toHaveBeenCalledTimes(1);
    expect(ownerTypeRepository.create).toHaveBeenCalledTimes(0);
  });

  it('Deve lançar um erro se o tipo de endereço for null', async () => {
    const input: Input = { type: null };

    await expect(useCase.execute(input)).rejects.toThrow(BadRequestError);
    expect(ownerTypeRepository.existType).toHaveBeenCalledTimes(1);
    expect(ownerTypeRepository.create).toHaveBeenCalledTimes(0);
  });

  it('deve lançar um erro se ocorrer um erro ao criar o endereço', async () => {
    const input: Input = { type: 'Residencial' };

    (ownerTypeRepository.existType as jest.Mock).mockResolvedValue(false);
    (ownerTypeRepository.create as jest.Mock).mockRejectedValue(
      new Error('Erro ao criar o endereço'),
    );

    await expect(useCase.execute(input)).rejects.toThrow(
      'Erro ao criar o endereço',
    );
    expect(ownerTypeRepository.existType).toHaveBeenCalledTimes(1);
    expect(ownerTypeRepository.create).toHaveBeenCalledTimes(1);
  });

  it('deve lançar uma exceção de conflito se o tipo de endereço já existir independentemente de maiúsculas/minúsculas', async () => {
    const input: Input = { type: 'residencial' };

    // Simular que o tipo já existe com outra capitalização
    (ownerTypeRepository.existType as jest.Mock).mockResolvedValue(true);

    await expect(useCase.execute(input)).rejects.toThrow(ConflictError);

    expect(ownerTypeRepository.existType).toHaveBeenCalledTimes(1);
    expect(ownerTypeRepository.existType).toHaveBeenCalledWith(input.type);

    expect(ownerTypeRepository.create).toHaveBeenCalledTimes(0);
  });
});
