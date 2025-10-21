import { DatabaseService } from '../src/services/database.service';

async function main() {
  const dbService = new DatabaseService();

  console.log('=== Create New Service Example ===\n');

  try {
    // Get TRENDING_SERVICES category
    const category = await dbService.getCategoryByName('TRENDING_SERVICES');

    if (!category) {
      console.error('Category not found!');
      return;
    }

    // Create new service
    console.log('Creating new service...');
    const newService = await dbService.createService({
      categoryId: category.id,
      number: 25,
      serviceName: 'Example New Trending Service',
      price: '250',
      requirement: '15k vol',
      processingTime: '3-6 Hours',
      duration: '24 hours',
      positionBracket: '1-10',
      marketPrice: '350-450',
      notes: 'Example service for demonstration',
    });

    console.log('✅ Service created successfully!');
    console.log('Service details:');
    console.log(`   ID: ${newService.id}`);
    console.log(`   Name: ${newService.serviceName}`);
    console.log(`   Price: $${newService.price}`);
    console.log(`   Category: ${newService.category.displayName}`);
    console.log('');

    // Update the service
    console.log('Updating service price...');
    const updatedService = await dbService.updateService(newService.id, {
      price: '300',
      notes: 'Updated price - Example service for demonstration',
    });

    console.log('✅ Service updated successfully!');
    console.log(`   New Price: $${updatedService.price}`);
    console.log('');

    // Deactivate the service
    console.log('Deactivating service...');
    await dbService.deactivateService(newService.id);
    console.log('✅ Service deactivated!');
    console.log('');

    // Activate it again
    console.log('Re-activating service...');
    await dbService.activateService(newService.id);
    console.log('✅ Service activated!');
    console.log('');

    // Delete the service (cleanup)
    console.log('Cleaning up - deleting example service...');
    await dbService.deleteService(newService.id);
    console.log('✅ Example service deleted!');
    console.log('');

    console.log('✅ All CRUD operations completed successfully!');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await dbService.disconnect();
  }
}

main();
