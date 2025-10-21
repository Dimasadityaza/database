import { DatabaseService } from '../src/services/database.service';

async function main() {
  const dbService = new DatabaseService();

  console.log('=== Agency Service Database Examples ===\n');

  try {
    // 1. Get all categories
    console.log('1. Getting all categories...');
    const categories = await dbService.getAllCategories();
    console.log(`Found ${categories.length} categories:`);
    categories.forEach((cat) => {
      console.log(`   - ${cat.displayName} (${cat._count?.services || 0} services)`);
    });
    console.log('');

    // 2. Get trending services
    console.log('2. Getting TRENDING SERVICES...');
    const trendingCategory = await dbService.getCategoryByName('TRENDING_SERVICES');
    if (trendingCategory) {
      console.log(`Found ${trendingCategory.services?.length || 0} trending services`);
      trendingCategory.services?.slice(0, 3).forEach((service) => {
        console.log(`   - ${service.serviceName}: $${service.price}`);
      });
    }
    console.log('');

    // 3. Search services
    console.log('3. Searching for "coingecko" services...');
    const searchResults = await dbService.searchServices('coingecko');
    console.log(`Found ${searchResults.length} services:`);
    searchResults.slice(0, 5).forEach((service) => {
      console.log(`   - ${service.serviceName} (${service.category.displayName}): $${service.price}`);
    });
    console.log('');

    // 4. Get statistics
    console.log('4. Getting database statistics...');
    const totalServices = await dbService.getServiceCount();
    const totalCategories = await dbService.getCategoryCount();
    const servicesByCategory = await dbService.getServiceCountByCategory();

    console.log(`Total Services: ${totalServices}`);
    console.log(`Total Categories: ${totalCategories}`);
    console.log('Services by Category:');
    servicesByCategory.forEach((stat) => {
      console.log(`   - ${stat.category}: ${stat.count} services`);
    });
    console.log('');

    // 5. Get paginated services
    console.log('5. Getting paginated services (page 1, limit 10)...');
    const paginatedResult = await dbService.getServicesPaginated(
      { isActive: true },
      { page: 1, limit: 10 }
    );
    console.log(`Page ${paginatedResult.pagination.page} of ${paginatedResult.pagination.totalPages}`);
    console.log(`Showing ${paginatedResult.data.length} of ${paginatedResult.pagination.total} services`);
    console.log('');

    // 6. Filter by category
    console.log('6. Getting CEX LISTING services...');
    const cexCategory = await dbService.getCategoryByName('CEX_LISTING');
    if (cexCategory) {
      const cexServices = await dbService.getServicesByCategory(cexCategory.id);
      console.log(`Found ${cexServices.length} CEX listing services:`);
      cexServices.slice(0, 5).forEach((service) => {
        console.log(`   - ${service.serviceName}: ${service.price}`);
      });
    }
    console.log('');

    console.log('✅ All examples completed successfully!');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await dbService.disconnect();
  }
}

main();
