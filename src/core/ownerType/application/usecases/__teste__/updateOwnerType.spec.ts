import { OwnerTypeRepository } from 'src/core/ownerType/domain/ownerType.repository';
import { Input, UpdateOwnerTypeUseCase } from '../update.usecase';
import { OwnerType } from 'src/core/ownerType/domain/ownerType.entity';
import { ResourceNotFoundError } from 'src/shared/application/errors/resourceNotFoundError';
import { ConflictError } from 'src/shared/application/errors/conflictExceptionError';
import { BadRequestError } from 'src/shared/application/errors/badRequest';

const mockOwnerTypeRepository = (): Partial<OwnerTypeRepository> => ({
  findById: jest.fn(),
  existType: jest.fn(),
  update: jest.fn(),
});

describe('UpdateOwnerTypeUseCase', () => {
  let updateUseCase: UpdateOwnerTypeUseCase;
  let ownerTypeRepository: OwnerTypeRepository;

  beforeEach(() => {
    ownerTypeRepository = mockOwnerTypeRepository() as OwnerTypeRepository;
    updateUseCase = new UpdateOwnerTypeUseCase(ownerTypeRepository);
  });

  it('Should update owner type ', async () => {
    const input: Input = { id: 1, type: 'Company' };
    const ownerTypeOutput = {
      id: 1,
      type: input.type,
      createdAt: undefined,
      updatedAt: undefined,
      deletedAt: undefined,
    };
    const existingOwnerType = new OwnerType({ id: input.id, type: 'OldType' });

    (ownerTypeRepository.findById as jest.Mock).mockResolvedValue(
      existingOwnerType,
    );

    (ownerTypeRepository.existType as jest.Mock).mockResolvedValue(false);

    (ownerTypeRepository.update as jest.Mock).mockResolvedValue(
      new OwnerType({ id: input.id, type: input.type }),
    );

    const output = await updateUseCase.execute(input);

    // toHaveBeenCalledWith: Verifica se o mock da função findById foi chamado com o argumento input.id.
    expect(ownerTypeRepository.findById).toHaveBeenCalledTimes(1);
    expect(ownerTypeRepository.findById).toHaveBeenCalledWith(input.id);

    expect(ownerTypeRepository.existType).toHaveBeenCalledTimes(1);
    expect(ownerTypeRepository.existType).toHaveBeenCalledWith(input.type);

    expect(ownerTypeRepository.update).toHaveBeenCalledTimes(1);
    expect(ownerTypeRepository.update).toHaveBeenCalledWith(
      expect.objectContaining({ type: input.type }),
    );
    //toBeInstanceOf: Verifica se o resultado result é uma instância da classe OwnerAddress.
    expect(output).toBeInstanceOf(OwnerType);
    // toEqual: Verifica se a propriedade type do resultado é igual ao valor input.type.
    expect(output).toEqual(ownerTypeOutput);
  });

  it('Should throw an error if the owner id not found', () => {
    const input: Input = { id: 1, type: 'Company' };

    (ownerTypeRepository.findById as jest.Mock).mockResolvedValue(null);

    expect(updateUseCase.execute(input)).rejects.toThrow(ResourceNotFoundError);

    expect(ownerTypeRepository.findById).toHaveBeenCalledTimes(1);
    expect(ownerTypeRepository.findById).toHaveBeenCalledWith(input.id);

    expect(ownerTypeRepository.existType).toHaveBeenCalledTimes(0);
    expect(ownerTypeRepository.update).toHaveBeenCalledTimes(0);
  });

  it('Should throw an error if the owner type already exists', async () => {
    const input: Input = { id: 1, type: 'Company' };

    (ownerTypeRepository.findById as jest.Mock).mockResolvedValue(true);

    (ownerTypeRepository.existType as jest.Mock).mockResolvedValue(true);

    await expect(updateUseCase.execute(input)).rejects.toThrow(ConflictError);

    expect(ownerTypeRepository.findById).toHaveBeenCalledTimes(1);
    expect(ownerTypeRepository.findById).toHaveBeenCalledWith(input.id);

    expect(ownerTypeRepository.existType).toHaveBeenCalledTimes(1);
    expect(ownerTypeRepository.existType).toHaveBeenCalledWith(input.type);
    expect(ownerTypeRepository.update).toHaveBeenCalledTimes(0);
  });

  it('Should throw as error if the owner type is null', async () => {
    const input: Input = {
      id: 1,
      type: null,
    };

    await expect(updateUseCase.execute(input)).rejects.toThrow(BadRequestError);

    expect(ownerTypeRepository.findById).toHaveBeenCalledTimes(0);
    expect(ownerTypeRepository.existType).toHaveBeenCalledTimes(0);
    expect(ownerTypeRepository.update).toHaveBeenCalledTimes(0);
  });
});
