import { OwnerTypeRepository } from 'src/core/ownerType/domain/repository/ownerType.repository';
import { DeleteOwnerTypeUseCase, Input } from '../../delete.usecase';
import { BadRequestError } from 'src/shared/application/errors/badRequest';
import { ResourceNotFoundError } from 'src/shared/application/errors/resourceNotFoundError';

const mockOwnerTypeRepository = (): Partial<OwnerTypeRepository> => ({
  findById: jest.fn(),
  delete: jest.fn(),
});

describe('Delete owner type', () => {
  let deleteUseCase: DeleteOwnerTypeUseCase;
  let ownerTypeRepository: OwnerTypeRepository;

  beforeEach(() => {
    ownerTypeRepository = mockOwnerTypeRepository() as OwnerTypeRepository;
    deleteUseCase = new DeleteOwnerTypeUseCase(ownerTypeRepository);
  });

  it('Should throw as error if the owner id is null', async () => {
    const input: Input = { id: null };

    await expect(deleteUseCase.execute(input)).rejects.toThrow(BadRequestError);

    expect(ownerTypeRepository.findById).toHaveBeenCalledTimes(0);
    expect(ownerTypeRepository.delete).toHaveBeenCalledTimes(0);
  });

  it('Should throw as error if the owner id is not exist', async () => {
    const input: Input = { id: 1 };

    (ownerTypeRepository.findById as jest.Mock).mockResolvedValue(null);

    await expect(deleteUseCase.execute(input)).rejects.toThrow(
      ResourceNotFoundError,
    );

    expect(ownerTypeRepository.findById).toHaveBeenCalledTimes(1);
    expect(ownerTypeRepository.findById).toHaveBeenCalledWith(input.id);

    expect(ownerTypeRepository.delete).toHaveBeenCalledTimes(0);
  });

  it('Should delete is ownerType', async () => {
    const input: Input = { id: 1 };

    (ownerTypeRepository.findById as jest.Mock).mockResolvedValue(true);

    const output = await deleteUseCase.execute(input);

    expect(ownerTypeRepository.findById).toHaveBeenCalledTimes(1);
    expect(ownerTypeRepository.findById).toHaveBeenCalledWith(input.id);

    expect(ownerTypeRepository.delete).toHaveBeenCalledTimes(1);
    expect(ownerTypeRepository.delete).toHaveBeenCalledWith(input.id);

    expect(output).toBeUndefined();
  });
});
