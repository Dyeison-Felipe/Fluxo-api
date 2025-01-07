import {
  ReferenceObject,
  SchemaObject,
} from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

//PaginationSchemaDocs: É um objeto que define o esquema da resposta de paginação.
export const PaginationSchemaDocs: Record<
  string,
  SchemaObject | ReferenceObject
> = {
  meta: {
    type: 'object',
    properties: {
      totalItems: {
        type: 'number',
      },
      itemsCount: {
        type: 'number',
      },
      itemsPerPage: {
        type: 'number',
      },
      totalPages: {
        type: 'number',
      },
      currentPage: {
        type: 'number',
      },
    },
  },
};

// findAllSchemaDocs: Um objeto similar ao PaginationSchemaDocs, mas simplificado para incluir apenas a contagem total de itens (totalItems).
export const findAllSchemaDocs: Record<string, SchemaObject | ReferenceObject> =
  {
    meta: {
      type: 'object',
      properties: {
        totalItems: {
          type: 'number',
        },
      },
    },
  };

// getItemsSchemaDocs: É uma função que retorna um objeto contendo a estrutura para o campo items, que será um array.
export const getItemsSchemaDocs = (
  items: SchemaObject | ReferenceObject,
): Record<string, SchemaObject | ReferenceObject> => {
  return {
    items: {
      type: 'array',
      items,
    },
  };
};
