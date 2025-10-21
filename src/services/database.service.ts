import { PrismaClient, Service, Category } from '@prisma/client';
import {
  ServiceFilter,
  CreateServiceInput,
  UpdateServiceInput,
  CreateCategoryInput,
  UpdateCategoryInput,
  PaginationOptions,
  PaginatedResponse,
} from '../types';

export class DatabaseService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async disconnect() {
    await this.prisma.$disconnect();
  }

  // ============ CATEGORY METHODS ============

  async getAllCategories(): Promise<Category[]> {
    return this.prisma.category.findMany({
      orderBy: { order: 'asc' },
      include: {
        _count: {
          select: { services: true },
        },
      },
    });
  }

  async getCategoryById(id: string): Promise<Category | null> {
    return this.prisma.category.findUnique({
      where: { id },
      include: {
        services: {
          where: { isActive: true },
          orderBy: { number: 'asc' },
        },
      },
    });
  }

  async getCategoryByName(name: string): Promise<Category | null> {
    return this.prisma.category.findUnique({
      where: { name },
      include: {
        services: {
          where: { isActive: true },
          orderBy: { number: 'asc' },
        },
      },
    });
  }

  async createCategory(data: CreateCategoryInput): Promise<Category> {
    return this.prisma.category.create({
      data,
    });
  }

  async updateCategory(id: string, data: UpdateCategoryInput): Promise<Category> {
    return this.prisma.category.update({
      where: { id },
      data,
    });
  }

  async deleteCategory(id: string): Promise<Category> {
    return this.prisma.category.delete({
      where: { id },
    });
  }

  // ============ SERVICE METHODS ============

  async getAllServices(filter?: ServiceFilter): Promise<Service[]> {
    const where: any = {};

    if (filter?.categoryId) {
      where.categoryId = filter.categoryId;
    }

    if (filter?.categoryName) {
      where.category = {
        name: filter.categoryName,
      };
    }

    if (filter?.isActive !== undefined) {
      where.isActive = filter.isActive;
    }

    if (filter?.searchTerm) {
      where.OR = [
        { serviceName: { contains: filter.searchTerm } },
        { notes: { contains: filter.searchTerm } },
        { requirement: { contains: filter.searchTerm } },
      ];
    }

    return this.prisma.service.findMany({
      where,
      include: {
        category: true,
      },
      orderBy: [{ category: { order: 'asc' } }, { number: 'asc' }],
    });
  }

  async getServicesPaginated(
    filter?: ServiceFilter,
    pagination?: PaginationOptions
  ): Promise<PaginatedResponse<Service>> {
    const page = pagination?.page || 1;
    const limit = pagination?.limit || 10;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (filter?.categoryId) {
      where.categoryId = filter.categoryId;
    }

    if (filter?.categoryName) {
      where.category = {
        name: filter.categoryName,
      };
    }

    if (filter?.isActive !== undefined) {
      where.isActive = filter.isActive;
    }

    if (filter?.searchTerm) {
      where.OR = [
        { serviceName: { contains: filter.searchTerm } },
        { notes: { contains: filter.searchTerm } },
        { requirement: { contains: filter.searchTerm } },
      ];
    }

    const [data, total] = await Promise.all([
      this.prisma.service.findMany({
        where,
        include: {
          category: true,
        },
        orderBy: [{ category: { order: 'asc' } }, { number: 'asc' }],
        skip,
        take: limit,
      }),
      this.prisma.service.count({ where }),
    ]);

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getServiceById(id: string): Promise<Service | null> {
    return this.prisma.service.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });
  }

  async getServicesByCategory(categoryId: string): Promise<Service[]> {
    return this.prisma.service.findMany({
      where: {
        categoryId,
        isActive: true,
      },
      orderBy: { number: 'asc' },
      include: {
        category: true,
      },
    });
  }

  async createService(data: CreateServiceInput): Promise<Service> {
    return this.prisma.service.create({
      data,
      include: {
        category: true,
      },
    });
  }

  async updateService(id: string, data: UpdateServiceInput): Promise<Service> {
    return this.prisma.service.update({
      where: { id },
      data,
      include: {
        category: true,
      },
    });
  }

  async deleteService(id: string): Promise<Service> {
    return this.prisma.service.delete({
      where: { id },
    });
  }

  async deactivateService(id: string): Promise<Service> {
    return this.updateService(id, { isActive: false });
  }

  async activateService(id: string): Promise<Service> {
    return this.updateService(id, { isActive: true });
  }

  // ============ SEARCH METHODS ============

  async searchServices(searchTerm: string): Promise<Service[]> {
    return this.prisma.service.findMany({
      where: {
        OR: [
          { serviceName: { contains: searchTerm, mode: 'insensitive' } },
          { notes: { contains: searchTerm, mode: 'insensitive' } },
          { requirement: { contains: searchTerm, mode: 'insensitive' } },
        ],
        isActive: true,
      },
      include: {
        category: true,
      },
      orderBy: [{ category: { order: 'asc' } }, { number: 'asc' }],
    });
  }

  async getServicesByPriceRange(minPrice: number, maxPrice: number): Promise<Service[]> {
    // Note: Since price is stored as string, we need to parse it
    const allServices = await this.prisma.service.findMany({
      where: {
        isActive: true,
      },
      include: {
        category: true,
      },
    });

    return allServices.filter((service) => {
      const price = parseFloat(service.price);
      return !isNaN(price) && price >= minPrice && price <= maxPrice;
    });
  }

  // ============ STATISTICS METHODS ============

  async getServiceCount(): Promise<number> {
    return this.prisma.service.count({
      where: { isActive: true },
    });
  }

  async getCategoryCount(): Promise<number> {
    return this.prisma.category.count();
  }

  async getServiceCountByCategory(): Promise<
    Array<{ category: string; count: number }>
  > {
    const categories = await this.prisma.category.findMany({
      include: {
        _count: {
          select: {
            services: {
              where: { isActive: true },
            },
          },
        },
      },
      orderBy: { order: 'asc' },
    });

    return categories.map((cat) => ({
      category: cat.displayName,
      count: cat._count.services,
    }));
  }
}
