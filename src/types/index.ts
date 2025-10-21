export interface ServiceFilter {
  categoryId?: string;
  categoryName?: string;
  isActive?: boolean;
  searchTerm?: string;
  minPrice?: number;
  maxPrice?: number;
}

export interface CreateServiceInput {
  categoryId: string;
  number: number;
  serviceName: string;
  price: string;
  requirement?: string;
  processingTime?: string;
  duration?: string;
  positionBracket?: string;
  marketPrice?: string;
  notes?: string;
}

export interface UpdateServiceInput {
  serviceName?: string;
  price?: string;
  requirement?: string;
  processingTime?: string;
  duration?: string;
  positionBracket?: string;
  marketPrice?: string;
  notes?: string;
  isActive?: boolean;
}

export interface CreateCategoryInput {
  name: string;
  displayName: string;
  order: number;
}

export interface UpdateCategoryInput {
  displayName?: string;
  order?: number;
}

export interface PaginationOptions {
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
